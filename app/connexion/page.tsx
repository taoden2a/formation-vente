"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";

function EyeIcon({ off = false }: { off?: boolean }) {
  if (off) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
    </svg>
  );
}

function ConnexionForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/formation";
  const isCheckout = next === "checkout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"login" | "checkout">("login");
  const [shake, setShake] = useState(false);

  async function triggerCheckout() {
    setLoadingStep("checkout");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Impossible de lancer le paiement. Veuillez réessayer.");
    } catch {
      setError("Connexion impossible. Vérifiez votre connexion internet.");
    }
    setLoading(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setLoadingStep("login");

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl: isCheckout ? "/" : next,
      });

      if (!res || res.error) {
        setLoading(false);
        setError("Email ou mot de passe incorrect.");
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return;
      }

      if (isCheckout) {
        await triggerCheckout();
      } else {
        window.location.href = res.url ?? next;
      }
    } catch {
      setError("Connexion impossible. Vérifiez votre connexion internet.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setLoading(false);
    }
  }

  const inscriptionHref = `/inscription?next=${encodeURIComponent(next)}`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-center px-4 py-8 sm:py-16 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-sm">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Connexion</h1>
                <p className="text-sm text-gray-500">
                  {isCheckout
                    ? "Connecte-toi pour accéder directement au paiement."
                    : "Accédez à votre espace de formation."}
                </p>
              </div>

              {/* Purchase context banner — visible uniquement quand next=checkout */}
              {isCheckout && (
                <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/[0.07] border border-blue-500/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white leading-tight">Comprendre pour Vendre</p>
                    <p className="text-xs text-gray-500 mt-0.5">59€ · Accès à vie · Paiement sécurisé Stripe</p>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-4">

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      className="auth-input w-full rounded-xl px-4 py-2.5 text-sm"
                      placeholder="vous@exemple.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Mot de passe
                      </label>
                      <a
                        href="/contact?subject=probleme-technique"
                        className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        className="auth-input w-full rounded-xl px-4 py-2.5 pr-11 text-sm"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        tabIndex={-1}
                      >
                        <EyeIcon off={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 ${shake ? "animate-shake" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 flex-shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-interactive w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        {loadingStep === "checkout" ? "Redirection vers le paiement..." : "Connexion..."}
                      </>
                    ) : (
                      isCheckout ? "Se connecter et payer" : "Se connecter"
                    )}
                  </button>
                </form>
              </div>

              {/* Create account */}
              <p className="text-center mt-5 text-sm text-gray-500">
                Pas encore membre ?{" "}
                <Link
                  href={inscriptionHref}
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                >
                  Créer un compte
                </Link>
              </p>

            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  );
}
