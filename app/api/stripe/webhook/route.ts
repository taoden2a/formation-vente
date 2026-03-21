import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { MAIN_COURSE_SLUG } from "@/lib/acces";

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

  // Créer la vente affiliée (create avec contrainte unique pour dédoublonnage)
  try {
    await prisma.affiliateSale.create({
      data: {
        affiliateId: affiliate.id,
        buyerUserId,
        stripeSessionId,
        amount: amountCents,
        commission: commissionCents,
        status: "pending",
      },
    });

    // Mettre à jour le total des gains
    await prisma.affiliate.update({
      where: { id: affiliate.id },
      data: { totalEarnings: { increment: commissionCents } },
    });

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
