import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminAffiliatesClient } from "./AdminAffiliatesClient";

export const metadata = {
  title: "Admin — Affiliés | Comprendre pour Vendre",
};

export default async function AdminAffiliatesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/connexion");

  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/connexion");

  const user = await prisma.user.findFirst({ where: { id: userId } });
  if (user?.role !== "admin") redirect("/");

  return <AdminAffiliatesClient />;
}
