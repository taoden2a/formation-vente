import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body as { token?: string; password?: string };

    if (!token || !password) {
      return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }

    const record = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    if (!record) {
      return NextResponse.json({ error: "Token invalide ou déjà utilisé." }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ error: "Ce lien a expiré. Refais une demande de réinitialisation." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Mettre à jour le mot de passe et supprimer le token en transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.delete({ where: { token } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[reset-password/confirm] Error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
