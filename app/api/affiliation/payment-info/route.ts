import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encrypt, safeDecrypt } from "@/lib/encryption";

// Validation email basique
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Validation IBAN basique : 2 lettres + chiffres/lettres, 15-34 chars
function isValidIban(value: string): boolean {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  return /^[A-Z]{2}[A-Z0-9]{13,32}$/.test(cleaned);
}

// Génère un masque sans déchiffrer complètement en mémoire plus longtemps que nécessaire
function maskDetails(plaintext: string, method: string): string {
  if (method === "paypal") {
    const [local, domain] = plaintext.split("@");
    const visible = local.slice(0, Math.min(3, local.length));
    return `${visible}***@${domain}`;
  } else if (method === "iban") {
    const cleaned = plaintext.replace(/\s/g, "").toUpperCase();
    return `${cleaned.slice(0, 4)}****${cleaned.slice(-4)}`;
  }
  return "****";
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Utilisateur invalide." }, { status: 401 });
  }

  const affiliate = await prisma.affiliate.findFirst({ where: { userId } });
  if (!affiliate) {
    return NextResponse.json({ error: "Compte affilié introuvable." }, { status: 404 });
  }

  const { paymentMethod, paymentDetails } = await req.json();

  if (paymentMethod !== "paypal" && paymentMethod !== "iban") {
    return NextResponse.json(
      { error: "Méthode invalide. Choisissez 'paypal' ou 'iban'." },
      { status: 400 }
    );
  }

  if (!paymentDetails || typeof paymentDetails !== "string" || paymentDetails.trim().length === 0) {
    return NextResponse.json({ error: "Coordonnées manquantes." }, { status: 400 });
  }

  const details = paymentMethod === "iban"
    ? paymentDetails.trim().replace(/\s/g, "").toUpperCase()
    : paymentDetails.trim();

  if (paymentMethod === "paypal" && !isValidEmail(details)) {
    return NextResponse.json(
      { error: "Adresse email PayPal invalide." },
      { status: 400 }
    );
  }

  if (paymentMethod === "iban" && !isValidIban(details)) {
    return NextResponse.json(
      { error: "Format IBAN invalide. Doit commencer par 2 lettres (ex: FR76…)." },
      { status: 400 }
    );
  }

  // Chiffrement AES-256 avant stockage en base
  const encryptedDetails = encrypt(details);

  await prisma.affiliate.update({
    where: { id: affiliate.id },
    data: {
      paymentMethod,
      paymentDetails: encryptedDetails,
    },
  });

  return NextResponse.json({ ok: true });
}

// GET : retourne les coordonnées partiellement masquées (jamais en clair)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Utilisateur invalide." }, { status: 401 });
  }

  const affiliate = await prisma.affiliate.findFirst({ where: { userId } });
  if (!affiliate) {
    return NextResponse.json({ hasAffiliate: false });
  }

  let maskedDetails: string | null = null;
  if (affiliate.paymentDetails && affiliate.paymentMethod) {
    const plaintext = safeDecrypt(affiliate.paymentDetails);
    if (plaintext) {
      maskedDetails = maskDetails(plaintext, affiliate.paymentMethod);
    }
  }

  return NextResponse.json({
    hasAffiliate: true,
    paymentMethod: affiliate.paymentMethod,
    maskedDetails,
    hasPaymentInfo: !!affiliate.paymentDetails,
  });
}
