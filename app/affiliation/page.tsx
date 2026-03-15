/**
 * PAGE AFFILIATION — SERVER COMPONENT
 *
 * Vérifie côté serveur si l'utilisateur a acheté la formation (userHasAccess).
 * Passe `hasAccess: boolean` à AffiliationClient.
 *
 * hasAccess === false  → page marketing + bloc "Accès réservé aux membres"
 * hasAccess === true   → dashboard affilié complet
 *
 * La vérification est TOUJOURS faite côté serveur — impossible à contourner
 * côté client.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { AffiliationClient } from "./AffiliationClient";

export const metadata = {
  title: "Programme d'affiliation | Comprendre pour Vendre",
  description: "Gagnez 25% de commission en recommandant la formation Comprendre pour Vendre. Programme réservé aux membres.",
};

export default async function AffiliationPage() {
  const session = await getServerSession(authOptions);

  let hasAccess = false;

  if (session?.user) {
    const userId = (session.user as { id?: string }).id;
    if (userId) {
      hasAccess = await userHasAccess(userId);
    }
  }

  return <AffiliationClient hasAccess={hasAccess} />;
}
