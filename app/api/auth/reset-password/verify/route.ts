import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ valid: false, reason: "Token manquant." });
  }

  console.log(`[verify] token reçu: ${token.substring(0, 8)}... (length=${token.length})`);

  try {
    const record = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    console.log(`[verify] record trouvé: ${!!record}`);

    if (!record) {
      return NextResponse.json({ valid: false, reason: "Token introuvable." });
    }

    if (record.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ valid: false, reason: "Token expiré." });
    }

    return NextResponse.json({ valid: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[verify] erreur:", message, err);
    return NextResponse.json({ valid: false, reason: message });
  }
}
