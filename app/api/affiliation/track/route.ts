import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code manquant." }, { status: 400 });
    }

    const affiliate = await prisma.affiliate.findUnique({ where: { code } });
    if (!affiliate || !affiliate.isActive) {
      return NextResponse.json({ error: "Code invalide." }, { status: 404 });
    }

    // Enregistrer le clic
    await prisma.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
        referer: req.headers.get("referer") ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
