import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { safeDecrypt } from "@/lib/encryption";

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

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const affiliates = await prisma.affiliate.findMany({
    include: {
      user: { select: { email: true, name: true } },
      _count: { select: { clicks: true, sales: true } },
      sales: {
        select: {
          id: true,
          buyerUserId: true,
          amount: true,
          commission: true,
          status: true,
          createdAt: true,
          paidAt: true,
          stripeSessionId: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculer les totaux par affilié
  const result = affiliates.map((aff) => {
    const pendingCents = aff.sales
      .filter((s) => s.status === "pending")
      .reduce((sum, s) => sum + s.commission, 0);
    const paidCents = aff.sales
      .filter((s) => s.status === "paid")
      .reduce((sum, s) => sum + s.commission, 0);

    // Indicateur de suspicion : > 100 clics et 0 ventes
    const isSuspect = aff._count.clicks > 100 && aff._count.sales === 0;

    return {
      id: aff.id,
      code: aff.code,
      email: aff.user.email,
      name: aff.user.name,
      isActive: aff.isActive,
      clicks: aff._count.clicks,
      totalSales: aff._count.sales,
      pendingAmountEur: (pendingCents / 100).toFixed(2),
      paidAmountEur: (paidCents / 100).toFixed(2),
      paymentMethod: aff.paymentMethod,
      // Déchiffrement pour affichage admin (AES-256)
      paymentDetails: aff.paymentDetails ? safeDecrypt(aff.paymentDetails) : null,
      isSuspect,
      createdAt: aff.createdAt,
      sales: aff.sales.map((s) => ({
        ...s,
        amountEur: (s.amount / 100).toFixed(2),
        commissionEur: (s.commission / 100).toFixed(2),
      })),
    };
  });

  return NextResponse.json(result);
}
