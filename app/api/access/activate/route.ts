import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MAIN_COURSE_SLUG } from "@/lib/acces";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * POST /api/access/activate
 * Failsafe : si le webhook Stripe n'a pas déclenché, cette route
 * vérifie directement la session Stripe et crée l'enrollment si le paiement est confirmé.
 *
 * Body: { sessionId: string }
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ activated: false, error: "Non authentifié" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ activated: false, error: "Utilisateur invalide" }, { status: 401 });
  }

  let sessionId: string;
  try {
    const body = await req.json();
    sessionId = body.sessionId;
  } catch {
    return NextResponse.json({ activated: false, error: "Body invalide" }, { status: 400 });
  }

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ activated: false, error: "sessionId manquant" }, { status: 400 });
  }

  try {
    // Vérifier la session Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Vérifier que la session appartient bien à cet utilisateur
    if (stripeSession.metadata?.userId !== userId) {
      console.warn("[activate] session Stripe ne correspond pas à l'utilisateur", userId);
      return NextResponse.json({ activated: false, error: "Session invalide" }, { status: 403 });
    }

    // Vérifier que le paiement est bien confirmé
    if (stripeSession.payment_status !== "paid") {
      return NextResponse.json({ activated: false, error: "Paiement non confirmé" }, { status: 402 });
    }

    // Trouver le cours
    const course = await prisma.course.findUnique({
      where: { slug: MAIN_COURSE_SLUG },
    });

    if (!course) {
      console.error("[activate] cours introuvable:", MAIN_COURSE_SLUG);
      return NextResponse.json({ activated: false, error: "Cours introuvable" }, { status: 500 });
    }

    // Upsert Payment
    await prisma.payment.upsert({
      where: { stripeSessionId: sessionId },
      update: {
        status: "completed",
        completedAt: new Date(),
      },
      create: {
        userId,
        courseId: course.id,
        stripeSessionId: sessionId,
        stripePaymentId: stripeSession.payment_intent as string | null,
        amount: stripeSession.amount_total ?? 0,
        status: "completed",
        completedAt: new Date(),
      },
    });

    // Upsert Enrollment
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: { userId, courseId: course.id },
      },
      update: {},
      create: { userId, courseId: course.id },
    });

    console.log("[activate] accès activé (failsafe) pour user", userId);

    return NextResponse.json({ activated: true });
  } catch (err) {
    console.error("[activate] erreur:", err);
    return NextResponse.json({ activated: false, error: "Erreur serveur" }, { status: 500 });
  }
}
