import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PricingCard } from "@/components/pricing/PricingCard";

interface PaywallProps {
  /** true = utilisateur connecté (mais pas payé), false = non connecté */
  isLoggedIn?: boolean;
}

/**
 * Paywall — composant unique affiché pour tout utilisateur sans accès.
 *
 * Couvre deux cas :
 *   1. Utilisateur non connecté    → isLoggedIn = false → affiche lien "Se connecter"
 *   2. Connecté mais pas payé      → isLoggedIn = true  → texte adapté, pas de lien connexion
 *
 * Sécurité : rendu server-side par les layouts.
 * Le contenu protégé (children) n'est jamais transmis ici.
 */
export function Paywall({ isLoggedIn = false }: PaywallProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <BackgroundAnimated variant="darker">
        <div className="container-width section-spacing">
          <div className="max-w-lg mx-auto text-center space-y-6 sm:space-y-10">

            {/* Badge + titre */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-orange-400 uppercase tracking-wider">
                Accès formation requis
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                La compétence que personne ne t&apos;enseigne,
                <span className="block mt-1 text-gray-400">mais dont tout dépend.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
                {isLoggedIn
                  ? "Tu as un compte. Il ne te reste qu'un seul geste pour accéder à la formation complète."
                  : "Rejoins les membres et accède à la formation complète dès aujourd'hui."}
              </p>
            </div>

            {/* PricingCard animée */}
            <PricingCard />

            {/* Lien connexion — uniquement pour les utilisateurs non connectés */}
            {!isLoggedIn && (
              <p className="text-sm text-gray-600">
                Déjà membre ?{" "}
                <Link
                  href="/connexion"
                  className="text-gray-400 hover:text-white transition-colors underline underline-offset-2"
                >
                  Se connecter
                </Link>
              </p>
            )}

          </div>
        </div>
      </BackgroundAnimated>
    </div>
  );
}
