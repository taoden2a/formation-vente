import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { Paywall } from "@/components/Paywall";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  const hasAccess = userId ? await userHasAccess(userId) : false;

  // Sans accès (non connecté ou connecté sans paiement) → Paywall unifié
  if (!hasAccess) {
    return <Paywall isLoggedIn={!!session?.user} />;
  }

  return <>{children}</>;
}
