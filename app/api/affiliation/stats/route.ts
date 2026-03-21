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
        select: { clicks: true, sales: true },
      },
    },
  });

  if (!affiliate) {
    return NextResponse.json({ hasAffiliate: false });
  }

  const salesCount = affiliate._count.sales;
  const clicksCount = affiliate._count.clicks;
  const conversionRate =
    clicksCount > 0 ? Math.round((salesCount / clicksCount) * 100) : 0;

  return NextResponse.json({
    hasAffiliate: true,
    code: affiliate.code,
    commissionRate: affiliate.commissionRate,
    totalEarnings: affiliate.totalEarnings, // en centimes
    totalEarningsEur: (affiliate.totalEarnings / 100).toFixed(2),
    clicks: clicksCount,
    sales: salesCount,
    conversionRate,
    createdAt: affiliate.createdAt,
  });
}
