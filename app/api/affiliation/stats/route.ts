import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Utilisateur invalide." }, { status: 401 });
  }

  const affiliate = await prisma.affiliate.findFirst({
    where: { userId },
    include: {
      _count: {
        select: { clicks: true },
      },
    },
  });

  if (!affiliate) {
    return NextResponse.json({ hasAffiliate: false });
  }

  // Calcul dynamique depuis les ventes réelles (plus fiable que totalEarnings cumulé)
  const [pendingStats, paidStats, allSalesCount] = await Promise.all([
    prisma.affiliateSale.aggregate({
      where: { affiliateId: affiliate.id, status: "pending" },
      _sum: { commission: true },
      _count: true,
    }),
    prisma.affiliateSale.aggregate({
      where: { affiliateId: affiliate.id, status: "paid" },
      _sum: { commission: true },
      _count: true,
    }),
    prisma.affiliateSale.count({
      where: { affiliateId: affiliate.id, status: { not: "refunded" } },
    }),
  ]);

  const clicksCount = affiliate._count.clicks;
  const pendingAmountCents = pendingStats._sum.commission ?? 0;
  const paidAmountCents = paidStats._sum.commission ?? 0;
  const totalAmountCents = pendingAmountCents + paidAmountCents;

  const conversionRate =
    clicksCount > 0 ? Math.round((allSalesCount / clicksCount) * 100) : 0;

  return NextResponse.json({
    hasAffiliate: true,
    code: affiliate.code,
    commissionRate: affiliate.commissionRate,
    // Totaux distincts
    pendingAmountEur: (pendingAmountCents / 100).toFixed(2),
    paidAmountEur: (paidAmountCents / 100).toFixed(2),
    totalEarningsEur: (totalAmountCents / 100).toFixed(2),
    pendingCount: pendingStats._count,
    paidCount: paidStats._count,
    // Compatibilité ancienne interface
    totalEarnings: totalAmountCents,
    clicks: clicksCount,
    sales: allSalesCount,
    conversionRate,
    createdAt: affiliate.createdAt,
  });
}
