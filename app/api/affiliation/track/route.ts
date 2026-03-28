import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code manquant." }, { status: 400 });
    }

    const affiliate = await prisma.affiliate.findFirst({ where: { code } });
    if (!affiliate || !affiliate.isActive) {
      return NextResponse.json({ error: "Code invalide." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    // Déduplication : ignorer si même IP a déjà cliqué sur ce même affilié dans les 24h
    if (ip) {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentClick = await prisma.affiliateClick.findFirst({
        where: {
          affiliateId: affiliate.id,
          ip,
          createdAt: { gte: cutoff },
        },
      });
      if (recentClick) {
        // Clic dupliqué — on le silencieusement ignore
        return NextResponse.json({ ok: true });
      }
    }

    // Enregistrer le clic
    await prisma.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        ip,
        userAgent: req.headers.get("user-agent") ?? null,
        referer: req.headers.get("referer") ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
