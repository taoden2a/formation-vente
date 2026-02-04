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
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      console.error("Webhook: erreur lors du traitement checkout:", err);
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
    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });
    resolvedUserId = user?.id;
  }

  if (!resolvedUserId) {
    console.error(
      "Webhook: impossible de trouver l'utilisateur pour la session",
      session.id,
    );
    return;
  }

  // Trouver le cours principal
  const course = await prisma.course.findUnique({
    where: { slug: MAIN_COURSE_SLUG },
  });

  if (!course) {
    console.error("Webhook: cours principal introuvable (slug:", MAIN_COURSE_SLUG, ")");
    return;
  }

  // Créer le Payment
  await prisma.payment.create({
    data: {
      userId: resolvedUserId,
      courseId: course.id,
      stripeSessionId: session.id,
      stripePaymentId: session.payment_intent as string | null,
      amount: session.amount_total ?? 0,
      status: "completed",
      completedAt: new Date(),
    },
  });

  // Créer l'Enrollment s'il n'existe pas déjà
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: resolvedUserId,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      userId: resolvedUserId,
      courseId: course.id,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Webhook: accès créé pour user", resolvedUserId, "cours", course.id);
  }
}
