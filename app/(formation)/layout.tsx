import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { PricingGate } from "@/components/PricingGate";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Non connecté → page connexion
  if (!session?.user) {
    redirect("/connexion");
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    redirect("/connexion");
  }

  const hasAccess = await userHasAccess(userId);

  // Connecté mais pas payé → PricingGate (zéro contenu formation exposé)
  if (!hasAccess) {
    return <PricingGate />;
  }

  return <>{children}</>;
}
