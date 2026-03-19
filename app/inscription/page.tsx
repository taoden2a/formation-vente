"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";

function EyeIcon({ off = false }: { off?: boolean }) {
  if (off)
    return (
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

function InscriptionForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/#prix";
  const isCheckout = next === "checkout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"register" | "checkout">("register");
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

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

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      triggerShake();
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      triggerShake();
      return;
    }

    setLoading(true);
    setLoadingStep("register");
    setEmailExists(false);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Lecture défensive : le serveur peut renvoyer du HTML en cas d'erreur 500
      let data: { error?: string; code?: string } = {};
      try { data = await res.json(); } catch { /* réponse non-JSON */ }

      if (!res.ok) {
        // Cas spécial : email déjà existant → proposer la connexion
        if (res.status === 409 && data.code === "EMAIL_EXISTS") {
          setEmailExists(true);
          setLoading(false);
          return;
        }
        setError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
        triggerShake();
        setLoading(false);
        return;
      }

      // Auto sign-in after account creation
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInRes || signInRes.error) {
        // Compte créé mais sign-in échoué — envoyer vers connexion
        window.location.href = `/connexion${isCheckout ? "?next=checkout" : ""}`;
        return;
      }

      if (isCheckout) {
        await triggerCheckout();
      } else {
        window.location.href = next;
      }
    } catch {
      // Erreur réseau ou exception non prévue
      setError("Connexion impossible. Vérifiez votre connexion internet.");
      triggerShake();
      setLoading(false);
    }
  }

  const connexionHref = `/connexion?next=${encodeURIComponent(next)}`;

  const loadingLabel = loading
    ? loadingStep === "checkout"
      ? "Redirection vers le paiement..."
      : "Création du compte..."
    : isCheckout
      ? "Créer mon compte et payer"
      : "Créer mon compte";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-center px-4 py-8 sm:py-16 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-sm">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Créer un compte</h1>
                <p className="text-sm text-gray-500">
                  {isCheckout
                    ? "Crée ton compte pour accéder immédiatement à la formation."
                    : "Accédez à la formation en quelques secondes."}
                </p>
              </div>

              {/* Purchase context banner — visible uniquement quand next=checkout */}
              {isCheckout && (
                <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500/[0.07] border border-orange-500/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
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
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        className="auth-input w-full rounded-xl px-4 py-2.5 pr-11 text-sm"
                        placeholder="8 caractères minimum"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        tabIndex={-1}
                      >
                        <EyeIcon off={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        className="auth-input w-full rounded-xl px-4 py-2.5 pr-11 text-sm"
                        placeholder="••••••••"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        tabIndex={-1}
                      >
                        <EyeIcon off={showConfirm} />
                      </button>
                    </div>
                  </div>

                  {/* Email déjà existant — CTA connexion */}
                  {emailExists && (
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 space-y-3">
                      <p className="text-sm text-blue-300 leading-snug">
                        Un compte existe déjà avec cette adresse email.
                        {isCheckout ? " Connecte-toi pour continuer ton achat." : " Connecte-toi pour accéder à ton espace."}
                      </p>
                      <Link
                        href={`/connexion?next=${encodeURIComponent(next)}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 transition-colors text-white font-medium text-sm"
                      >
                        Se connecter et continuer
                      </Link>
                    </div>
                  )}

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
                    className="btn-interactive w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        {loadingStep === "checkout" ? "Redirection vers le paiement..." : "Création du compte..."}
                      </>
                    ) : (
                      loadingLabel
                    )}
                  </button>
                </form>
              </div>

              {/* Already have account */}
              <p className="text-center mt-5 text-sm text-gray-500">
                Déjà un compte ?{" "}
                <Link
                  href={connexionHref}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Se connecter
                </Link>
              </p>

            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense>
      <InscriptionForm />
    </Suspense>
  );
}
