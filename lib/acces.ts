import { prisma } from "@/lib/prisma";

export const MAIN_COURSE_SLUG = "formation-vente";

/**
 * Verifie si un utilisateur a acces au contenu premium.
 *
 * Logique d'acces :
 * 1. Si l'utilisateur a le role 'admin' → acces immediat
 * 2. Sinon, verification de l'enrollment dans la formation
 *
 * @param userId - ID de l'utilisateur
 * @returns true si l'utilisateur a acces, false sinon
 */
export async function userHasAccess(userId: string): Promise<boolean> {
  // Etape 1 : Recuperer l'utilisateur avec son role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    return false;
  }

  // Etape 2 : Acces immediat pour les admins
  if (user.role === "admin") {
    return true;
  }

  // Etape 3 : Verification enrollment pour les utilisateurs normaux
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      course: { slug: MAIN_COURSE_SLUG },
    },
  });

  return !!enrollment;
}

/**
 * Verifie si un utilisateur est admin.
 * Utile pour afficher des elements specifiques dans l'UI (cote serveur uniquement).
 *
 * @param userId - ID de l'utilisateur
 * @returns true si l'utilisateur est admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "admin";
}
