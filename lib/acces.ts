import { prisma } from "@/lib/prisma";

export const MAIN_COURSE_SLUG = "formation-vente";

export async function userHasAccess(userId: string) {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      course: { slug: MAIN_COURSE_SLUG },
    },
  });

  return !!enrollment;
}