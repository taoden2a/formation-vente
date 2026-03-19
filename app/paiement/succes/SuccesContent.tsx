"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";

export function SuccesContent({ initialAccess }: { initialAccess: boolean }) {
  const [access, setAccess] = useState(initialAccess);
  const [polling, setPolling] = useState(!initialAccess);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Failsafe : si webhook n'a pas activé l'accès, on appelle activate directement
  useEffect(() => {
    if (access || !sessionId) return;

    const activate = async () => {
      try {
        const res = await fetch("/api/access/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.activated) {
            setAccess(true);
            setPolling(false);
            return;
          }
        }
      } catch {
        // on laisse le polling prendre le relais
      }
    };

    // Tentative immédiate, puis après 3s si le webhook est en retard
    activate();
    const timer = setTimeout(activate, 3000);
    return () => clearTimeout(timer);
  }, [access, sessionId]);

  // Polling de vérification côté DB (filet de sécurité supplémentaire)
  useEffect(() => {
    if (access || !polling) return;

    let attempts = 0;
    const maxAttempts = 8;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch("/api/access");
        if (!res.ok) return;
        const data = await res.json();
        if (data.access) {
          setAccess(true);
          setPolling(false);
          clearInterval(interval);
        }
      } catch {
        // on réessaie silencieusement
      }
      if (attempts >= maxAttempts) {
        setPolling(false);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [access, polling]);

  if (access) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <PageTransition>
          <BackgroundAnimated variant="dark" className="min-h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-center px-4 py-16 sm:py-24 min-h-[calc(100vh-4rem)]">
              <div className="w-full max-w-md text-center">

                {/* Icône succès */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-400"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Accès activé !
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                    Merci pour ton achat. La formation est disponible immédiatement.
                  </p>
                </div>

                <Link
                  href="/formation"
                  className="btn-premium inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold text-white w-full"
                >
                  Accéder à la formation
                </Link>

              </div>
            </div>
          </BackgroundAnimated>
        </PageTransition>
      </div>
    );
  }

  if (polling) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="flex items-center justify-center px-4 min-h-screen">
          <div className="text-center space-y-4">
            <div className="animate-spin inline-block w-10 h-10 border-4 border-white/10 border-t-white/60 rounded-full" />
            <h1 className="text-xl font-semibold text-white">
              Finalisation de l&apos;accès...
            </h1>
            <p className="text-gray-500 text-sm">Un instant, ça prend quelques secondes.</p>
          </div>
        </div>
      </div>
    );
  }

  // Polling terminé sans accès détecté — afficher bouton reload
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-center px-4 py-16 sm:py-24 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-md text-center space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Paiement reçu
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
                L&apos;activation prend parfois quelques minutes. Rechargez la page ou contactez-nous si le problème persiste.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-premium inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold text-white w-full"
                >
                  Recharger la page
                </button>
                <Link
                  href="/contact"
                  className="btn-premium-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-gray-400 w-full"
                >
                  Contacter le support
                </Link>
              </div>
            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
