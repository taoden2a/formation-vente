"use client";

import { usePathname } from "next/navigation";
import { AuroraFixed } from "./aurora-background";

// Pages qui ont leur propre fond — on n'affiche pas l'aurora globale
const AURORA_HIDDEN_PATHS = [
  "/connexion",
  "/inscription",
  "/deconnexion",
  "/mot-de-passe-oublie",
  "/reinitialisation-mdp",
];

export function ClientAurora() {
  const pathname = usePathname();
  const hidden = AURORA_HIDDEN_PATHS.some((p) => pathname?.startsWith(p));
  if (hidden) return null;
  return <AuroraFixed />;
}
