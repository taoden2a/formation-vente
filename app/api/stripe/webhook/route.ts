import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { MAIN_COURSE_SLUG } from "@/lib/acces";
import { generateInvoicePDF } from "@/lib/generate-invoice";
import {
  buildWelcomeEmailHtml,
  buildInternalNotificationHtml,
} from "@/lib/emails/welcome-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("[webhook] signature manquante");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[webhook] vérification signature échouée:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log("[webhook] paiement reçu — event type:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      console.error("[webhook] erreur lors du traitement checkout:", err);
      return NextResponse.json(
        { error: "Erreur de traitement" },
        { status: 500 },
      );
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    // Traiter uniquement les remboursements complets
    if (charge.refunded) {
      try {
        await handleChargeRefunded(charge);
      } catch (err) {
        console.error("[webhook] erreur lors du traitement remboursement:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const customerEmail = session.customer_email;

  // Résoudre l'utilisateur : metadata d'abord, fallback sur l'email
  let resolvedUserId = userId;
  if (!resolvedUserId && customerEmail) {
    const user = await prisma.user.findFirst({
      where: { email: customerEmail },
    });
    resolvedUserId = user?.id;
  }

  if (!resolvedUserId) {
    console.error(
      "[webhook] impossible de trouver l'utilisateur pour la session",
      session.id,
    );
    return;
  }

  console.log("[webhook] userId trouvé:", resolvedUserId);

  // Trouver le cours principal
  const course = await prisma.course.findFirst({
    where: { slug: MAIN_COURSE_SLUG },
  });

  if (!course) {
    console.error("[webhook] cours principal introuvable (slug:", MAIN_COURSE_SLUG, ")");
    return;
  }

  // Upsert Payment (dédoublonnage sur stripeSessionId @unique)
  await prisma.payment.upsert({
    where: { stripeSessionId: session.id },
    update: {
      status: "completed",
      stripePaymentId: session.payment_intent as string | null,
      completedAt: new Date(),
    },
    create: {
      userId: resolvedUserId,
      courseId: course.id,
      stripeSessionId: session.id,
      stripePaymentId: session.payment_intent as string | null,
      amount: session.amount_total ?? 0,
      status: "completed",
      completedAt: new Date(),
    },
  });

  // Activer l'accès : user.paid = true
  await prisma.user.update({
    where: { id: resolvedUserId },
    data: { paid: true },
  });

  console.log("[webhook] accès activé pour user", resolvedUserId, "cours", course.id);

  // Envoi email bienvenue + facture PDF (fire-and-forget — ne bloque pas la réponse webhook)
  const buyerEmail = customerEmail ?? session.customer_details?.email ?? null;
  if (buyerEmail) {
    sendPurchaseEmails({
      customerEmail: buyerEmail,
      amountCents: session.amount_total ?? 0,
      stripeSessionId: session.id,
      date: new Date(),
    }).catch((err) => {
      console.error("[webhook] erreur envoi email bienvenue:", err);
    });
  }

  // Attribution de commission affilié
  const affiliateCode = session.metadata?.affiliate;
  if (
    affiliateCode &&
    session.payment_status === "paid" &&
    (session.amount_total ?? 0) > 0
  ) {
    await handleAffiliateCommission({
      affiliateCode,
      buyerUserId: resolvedUserId,
      stripeSessionId: session.id,
      amountCents: session.amount_total ?? 0,
    });
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === "string"
    ? charge.payment_intent
    : charge.payment_intent?.id;

  if (!paymentIntentId) {
    console.warn("[webhook] remboursement: pas de payment_intent sur le charge", charge.id);
    return;
  }

  // Retrouver le Payment via stripePaymentId
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentId: paymentIntentId },
  });

  if (!payment) {
    console.warn("[webhook] remboursement: Payment introuvable pour payment_intent", paymentIntentId);
    return;
  }

  // Idempotence : si déjà traité, ne pas re-révoquer
  if (payment.status === "refunded") {
    console.warn("[webhook] remboursement déjà traité pour session", payment.stripeSessionId);
    return;
  }

  // Retrouver l'AffiliateSale via stripeSessionId (peut ne pas exister)
  const sale = await prisma.affiliateSale.findFirst({
    where: { stripeSessionId: payment.stripeSessionId },
  });

  const hasActiveCommission = sale && sale.status !== "refunded";

  // Transaction atomique : révocation accès + marquage paiement + (si applicable) annulation commission
  if (hasActiveCommission) {
    await prisma.$transaction([
      // 1. Révoquer l'accès immédiatement
      prisma.user.update({
        where: { id: payment.userId },
        data: { paid: false },
      }),
      // 2. Marquer le paiement comme remboursé
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: "refunded" },
      }),
      // 3. Annuler la commission affilié
      prisma.affiliateSale.update({
        where: { id: sale.id },
        data: { status: "refunded" },
      }),
      prisma.affiliate.update({
        where: { id: sale.affiliateId },
        data: { totalEarnings: { decrement: sale.commission } },
      }),
    ]);
    console.log(
      `[webhook] remboursement: accès révoqué (user ${payment.userId}) + commission ${sale.commission / 100}€ déduite (affilié ${sale.affiliateId})`
    );
  } else {
    await prisma.$transaction([
      // 1. Révoquer l'accès immédiatement
      prisma.user.update({
        where: { id: payment.userId },
        data: { paid: false },
      }),
      // 2. Marquer le paiement comme remboursé
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: "refunded" },
      }),
    ]);
    console.log(
      `[webhook] remboursement: accès révoqué pour user ${payment.userId} (session ${payment.stripeSessionId})`
    );
  }
}

async function handleAffiliateCommission({
  affiliateCode,
  buyerUserId,
  stripeSessionId,
  amountCents,
}: {
  affiliateCode: string;
  buyerUserId: string;
  stripeSessionId: string;
  amountCents: number;
}) {
  // Trouver l'affilié
  const affiliate = await prisma.affiliate.findFirst({
    where: { code: affiliateCode },
  });

  if (!affiliate || !affiliate.isActive) {
    console.warn("[webhook] affiliation: code affilié invalide ou inactif:", affiliateCode);
    return;
  }

  // Ne pas attribuer de commission si c'est l'affilié lui-même qui achète
  if (affiliate.userId === buyerUserId) {
    console.log("[webhook] affiliation: auto-achat ignoré pour", affiliateCode);
    return;
  }

  // Calculer la commission (25%)
  const commissionCents = Math.round(amountCents * (affiliate.commissionRate / 100));

  // Transaction atomique : create + increment dans la même opération DB
  try {
    await prisma.$transaction([
      prisma.affiliateSale.create({
        data: {
          affiliateId: affiliate.id,
          buyerUserId,
          stripeSessionId,
          amount: amountCents,
          commission: commissionCents,
          status: "pending",
        },
      }),
      prisma.affiliate.update({
        where: { id: affiliate.id },
        data: { totalEarnings: { increment: commissionCents } },
      }),
    ]);

    console.log(
      `[webhook] affiliation: commission ${commissionCents / 100}€ pour affilié ${affiliateCode}`
    );
  } catch (err: unknown) {
    // Erreur de contrainte unique = vente déjà traitée (dédoublonnage)
    const isUniqueConstraint =
      err instanceof Error && err.message.includes("Unique constraint");
    if (isUniqueConstraint) {
      console.warn("[webhook] affiliation: session déjà traitée:", stripeSessionId);
    } else {
      console.error("[webhook] affiliation: erreur création commission:", err);
    }
  }
}

// ─── Envoi emails achat ────────────────────────────────────────────────────────

async function sendPurchaseEmails({
  customerEmail,
  amountCents,
  stripeSessionId,
  date,
}: {
  customerEmail: string;
  amountCents: number;
  stripeSessionId: string;
  date: Date;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[webhook] RESEND_API_KEY absent — emails non envoyés");
    return;
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const amountEur = Math.round(amountCents / 100);

  // Numéro de facture séquentiel : CPV-[ANNÉE]-[NNNN]
  const paymentCount = await prisma.payment.count();
  const year = date.getFullYear();
  const seq = String(paymentCount).padStart(4, "0");
  const invoiceNumber = `CPV-${year}-${seq}`;

  // Générer la facture PDF
  let pdfBuffer: Buffer | null = null;
  try {
    pdfBuffer = await generateInvoicePDF({
      invoiceNumber,
      date,
      customerEmail,
      amount: amountEur,
    });
  } catch (pdfErr) {
    console.error("[webhook] erreur génération PDF:", pdfErr);
    // On continue — l'email bienvenue est envoyé sans pièce jointe
  }

  // Email 1 — Bienvenue à l'acheteur
  const attachments = pdfBuffer
    ? [{ filename: `facture-${invoiceNumber}.pdf`, content: pdfBuffer }]
    : [];

  try {
    const { error } = await resend.emails.send({
      from: `Comprendre pour Vendre <${fromEmail}>`,
      to: customerEmail,
      subject: "Bienvenue dans Comprendre pour Vendre",
      html: buildWelcomeEmailHtml(),
      attachments,
    });
    if (error) {
      console.error("[webhook] Resend email bienvenue error:", JSON.stringify(error));
    } else {
      console.log(`[webhook] email bienvenue envoyé à ${customerEmail} (facture ${invoiceNumber})`);
    }
  } catch (err) {
    console.error("[webhook] Resend email bienvenue exception:", err);
  }

  // Email 2 — Notification interne
  try {
    const { error } = await resend.emails.send({
      from: `Comprendre pour Vendre <${fromEmail}>`,
      to: process.env.ADMIN_EMAIL ?? "deneutao@gmail.com",
      subject: `Nouvelle vente — ${customerEmail}`,
      html: buildInternalNotificationHtml({
        customerEmail,
        amount: amountEur,
        date,
        stripeSessionId,
      }),
    });
    if (error) {
      console.error("[webhook] Resend notif interne error:", JSON.stringify(error));
    }
  } catch (err) {
    console.error("[webhook] Resend notif interne exception:", err);
  }
}
