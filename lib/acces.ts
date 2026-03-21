import { prisma } from "@/lib/prisma";

export const MAIN_COURSE_SLUG = "formation-vente";

/**
 * Verifie si un utilisateur a acces au contenu premium.
 *
 * Logique d'acces :
 * 1. Si l'utilisateur a le role 'admin' → acces immediat
 * 2. Si user.paid === true → acces (paiement Stripe confirmé)
 *
 * @param userId - ID de l'utilisateur
 * @returns true si l'utilisateur a acces, false sinon
 */
export async function userHasAccess(userId: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { role: true, paid: true },
  });

  if (!user) return false;

  // Admins ont toujours accès
  if (user.role === "admin") return true;

  // Accès conditionné au paiement
  return user.paid;
}

/**
 * Verifie si un utilisateur est admin.
 *
 * @param userId - ID de l'utilisateur
 * @returns true si l'utilisateur est admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "admin";
}
