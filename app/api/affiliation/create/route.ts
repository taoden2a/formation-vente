import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userHasAccess } from "@/lib/acces";

function generateCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Utilisateur invalide." }, { status: 401 });
  }

  // Seuls les membres (clients de la formation) peuvent devenir affiliés
  const hasAccess = await userHasAccess(userId);
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Vous devez être client de la formation pour rejoindre le programme d'affiliation." },
      { status: 403 }
    );
  }

  // Vérifier si un compte affilié existe déjà
  const existing = await prisma.affiliate.findFirst({ where: { userId } });
  if (existing) {
    return NextResponse.json({
      code: existing.code,
      createdAt: existing.createdAt,
      isNew: false,
    });
  }

  // Générer un code unique (loop anti-collision)
  let code = generateCode();
  let attempts = 0;
  while (attempts < 10) {
    const collision = await prisma.affiliate.findFirst({ where: { code } });
    if (!collision) break;
    code = generateCode();
    attempts++;
  }

  const affiliate = await prisma.affiliate.create({
    data: {
      userId,
      code,
      commissionRate: 25.0,
    },
  });

  return NextResponse.json({
    code: affiliate.code,
    createdAt: affiliate.createdAt,
    isNew: true,
  });
}
