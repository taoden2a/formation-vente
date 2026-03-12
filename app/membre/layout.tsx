import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";

/**
 * MEMBRE LAYOUT - PROTECTION SERVEUR
 *
 * Ce layout protege TOUTES les routes sous /membre/*
 * Verification en 2 etapes :
 * 1. Authentification (session NextAuth valide)
 * 2. Autorisation (enrollment dans la formation)
 *
 * Si l'une des conditions echoue, redirect vers la page appropriee.
 */
export default async function MembreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Etape 1 : Verifier l'authentification
  if (!session?.user) {
    redirect("/connexion");
  }

  // Etape 2 : Verifier l'acces (enrollment)
  const userId = (session.user as { id?: string }).id;

  if (!userId) {
    // Cas anormal : session sans userId
    redirect("/connexion");
  }

  const hasAccess = await userHasAccess(userId);

  if (!hasAccess) {
    // Utilisateur connecte mais n'a pas paye
    // Redirect vers la page programme avec indication
    redirect("/programme?access=denied");
  }

  // Acces autorise - rendre le contenu
  return <>{children}</>;
}
