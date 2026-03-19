import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { CheckIcon } from "@/components/ui/Icons";

const features = [
  "8 modules structurés",
  "43 leçons",
  "Exercices concrets",
  "Templates utilisables",
  "Mises à jour incluses",
];

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
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-10">

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

            {/* Carte prix */}
            <div className="cta-card-v6 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-gray-900 space-y-5 sm:space-y-8">

              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Comprendre pour Vendre
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Accès immédiat à l&apos;ensemble de la formation.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-end gap-2 sm:gap-3 justify-center">
                  <span className="text-gray-400 line-through text-lg sm:text-xl">199€</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">59€</span>
                </div>
                <p className="text-gray-500 text-sm">Paiement unique • Accès à vie</p>
                <p className="text-gray-400 text-xs pt-0.5 sm:pt-1 italic">
                  Moins cher qu&apos;un seul prospect perdu.
                </p>
              </div>

              <ul className="text-left space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-600 max-w-full sm:max-w-sm mx-auto">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckIcon size={12} className="text-green-600" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <CheckoutButton />

              <p className="text-xs text-gray-500">
                Paiement sécurisé par Stripe. Satisfait ou remboursé sous 14 jours.
              </p>

            </div>

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
