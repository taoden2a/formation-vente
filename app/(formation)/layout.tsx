import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { Paywall } from "@/components/Paywall";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Non connecté → redirection vers la page de connexion
  if (!session?.user) {
    redirect("/connexion");
  }

  const userId = (session.user as { id?: string })?.id;
  const hasAccess = userId ? await userHasAccess(userId) : false;

  // Connecté mais sans accès (non payé) → Paywall
  if (!hasAccess) {
    return <Paywall isLoggedIn={true} />;
  }

  return <>{children}</>;
}
