import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Vérification admin centralisée
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const userId = (session.user as { id?: string }).id;
  if (!userId) return null;
  const user = await prisma.user.findFirst({ where: { id: userId } });
  if (user?.role !== "admin") return null;
  return user;
}

// POST /api/admin/affiliates/pay
// Body: { affiliateId: string }
// Passe toutes les ventes "pending" de l'affilié → "paid" avec paidAt = now()
export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { affiliateId } = await req.json();
  if (!affiliateId || typeof affiliateId !== "string") {
    return NextResponse.json({ error: "affiliateId manquant." }, { status: 400 });
  }

  const affiliate = await prisma.affiliate.findFirst({ where: { id: affiliateId } });
  if (!affiliate) {
    return NextResponse.json({ error: "Affilié introuvable." }, { status: 404 });
  }

  const now = new Date();

  const updated = await prisma.affiliateSale.updateMany({
    where: { affiliateId, status: "pending" },
    data: { status: "paid", paidAt: now },
  });

  return NextResponse.json({
    ok: true,
    updatedCount: updated.count,
    paidAt: now,
  });
}
