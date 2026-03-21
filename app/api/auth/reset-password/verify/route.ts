import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ valid: false, reason: "Token manquant." });
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: { select: { email: true } } },
    });

    if (!record) {
      return NextResponse.json({ valid: false, reason: "Token invalide." });
    }

    if (record.expiresAt < new Date()) {
      // Nettoyer les tokens expirés
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ valid: false, reason: "Token expiré." });
    }

    return NextResponse.json({ valid: true, email: record.user.email });
  } catch (err) {
    console.error("[reset-password/verify] Error:", err);
    return NextResponse.json({ valid: false, reason: "Erreur serveur." });
  }
}
