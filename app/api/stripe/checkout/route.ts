import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MAIN_COURSE_SLUG } from "@/lib/acces";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour acheter." },
      { status: 401 },
    );
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur invalide." },
      { status: 401 },
    );
  }

  // Lire affiliateCode depuis le body (envoyé par CheckoutButton depuis localStorage)
  let bodyAffiliateCode: string | undefined;
  try {
    const body = await req.json();
    bodyAffiliateCode = typeof body?.affiliateCode === "string" ? body.affiliateCode : undefined;
  } catch {
    // body vide ou non-JSON : pas de problème
  }

  // Lire le cookie d'affiliation (priorité au cookie)
  const cookieHeader = req.headers.get("cookie") ?? "";
  const affiliateMatch = cookieHeader.match(/affiliate_ref=([^;]+)/);
  const cookieRef = affiliateMatch ? decodeURIComponent(affiliateMatch[1]) : undefined;

  // Cookie en priorité, sinon fallback localStorage (body)
  const affiliateRef = cookieRef ?? bodyAffiliateCode;

  try {
    const metadata: Record<string, string> = {
      userId,
      courseSlug: MAIN_COURSE_SLUG,
    };

    if (affiliateRef) {
      metadata.affiliate = affiliateRef;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/paiement/annule`,
      customer_email: session.user.email,
      metadata,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 },
    );
  }
}
