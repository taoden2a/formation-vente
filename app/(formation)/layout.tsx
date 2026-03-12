import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/connexion");
  }

  const userId = (session.user as { id?: string }).id;

  if (!userId) {
    redirect("/connexion");
  }

  const hasAccess = await userHasAccess(userId);

  if (!hasAccess) {
    redirect("/programme?access=denied");
  }

  return <>{children}</>;
}
