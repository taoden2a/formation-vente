import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  // Delete in dependency order to avoid FK constraint issues
  // Note, Progress, Enrollment cascade from user but we do it explicitly
  await prisma.note.deleteMany({ where: { userId } });
  await prisma.progress.deleteMany({ where: { userId } });
  await prisma.enrollment.deleteMany({ where: { userId } });

  // Affiliate cascade: clicks and sales first
  const affiliate = await prisma.affiliate.findUnique({ where: { userId } });
  if (affiliate) {
    await prisma.affiliateClick.deleteMany({ where: { affiliateId: affiliate.id } });
    await prisma.affiliateSale.deleteMany({ where: { affiliateId: affiliate.id } });
    await prisma.affiliate.delete({ where: { userId } });
  }

  // Delete user last (payments are cascade-deleted via schema)
  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ success: true });
}
