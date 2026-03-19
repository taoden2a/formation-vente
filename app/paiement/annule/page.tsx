import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";

export default function PaiementAnnulePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-center px-4 py-16 sm:py-24 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-md text-center">

              {/* Icône premium */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
              </div>

              {/* Texte */}
              <div className="space-y-3 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Paiement annulé
                </h1>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  Aucun débit n&apos;a été effectué.
                  <br />
                  Vous pouvez reprendre le paiement à tout moment.
                </p>
              </div>

              {/* Card rassurante */}
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-2.5">
                {[
                  "Aucun montant n'a été débité",
                  "Votre compte est actif et sécurisé",
                  "La formation reste disponible au même prix",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">{item}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/#prix"
                  className="btn-premium inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold text-white w-full"
                >
                  Reprendre le paiement
                </Link>
                <Link
                  href="/"
                  className="btn-premium-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-gray-400 w-full"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>

              <p className="mt-6 text-xs text-gray-600">
                Un problème ?{" "}
                <a href="/contact" className="text-gray-500 hover:text-gray-400 transition-colors underline underline-offset-2">
                  Contactez-nous
                </a>
              </p>

            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
