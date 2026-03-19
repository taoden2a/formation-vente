import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { Paywall } from "@/components/Paywall";

export const metadata = {
  title: "Programme | Comprendre pour Vendre",
  description: "Découvrez le programme complet : 8 modules, 43 leçons, exercices pratiques et templates exclusifs.",
};

export default async function ProgrammePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  const hasAccess = userId ? await userHasAccess(userId) : false;

  // Membres avec accès → zone formation
  if (hasAccess) {
    redirect("/formation");
  }

  // Sans accès (non connecté ou connecté sans paiement) → Paywall unifié
  return <Paywall isLoggedIn={!!session?.user} />;
}
