"use client";

/**
 * AFFILIATION CLIENT — CLIENT COMPONENT
 *
 * Reçoit `hasAccess: boolean` calculé côté serveur (getServerSession + userHasAccess).
 *
 * hasAccess === false  → page marketing "Accès réservé aux membres"
 * hasAccess === true   → dashboard affilié (ou bouton activation si pas encore affilié)
 */

import { useState, useMemo, memo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ─── Constants ────────────────────────────────────────────────────────────────

const FORMATION_PRICE = 59;
const COMMISSION_RATE = 0.25;
const COMMISSION_PERCENT = Math.round(COMMISSION_RATE * 100);
const SLIDER_MAX = 200;
const THUMB_WIDTH = 20;
const SITE_URL = "https://comprendrepourvendre.com";

// ─── Icons ────────────────────────────────────────────────────────────────────

function LinkIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function UserIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ShareIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

function CoinIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="8" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="14.5" y1="12" y2="12" />
    </svg>
  );
}

function CopyIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ChevronDownIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CalculatorIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function LockIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ─── Commission Simulator ─────────────────────────────────────────────────────

const MILESTONES = [50, 100, 150, 200];
const LABEL_VALUES = [0, 50, 100, 150, 200];

const CommissionSimulator = memo(function CommissionSimulator() {
  const [salesCount, setSalesCount] = useState(10);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const commissionAmount = useMemo(
    () => FORMATION_PRICE * COMMISSION_RATE * salesCount,
    [salesCount]
  );

  const getPixelPosition = useCallback((value: number): number => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_WIDTH;
    return (value / SLIDER_MAX) * usableWidth + THUMB_WIDTH / 2;
  }, [sliderWidth]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const updateWidth = () => setSliderWidth(slider.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(slider);
    return () => resizeObserver.disconnect();
  }, []);

  const isMilestone = MILESTONES.includes(salesCount);

  return (
    <div className="affiliation-simulator-card p-5 sm:p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
          <CalculatorIcon size={20} className="text-orange-400" />
        </div>
        <span className="text-white font-medium">Simulateur de commission</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Nombre de ventes</span>
          <span className="text-white font-semibold">{salesCount}</span>
        </div>
        <div className="relative">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max={SLIDER_MAX}
            step="1"
            value={salesCount}
            onChange={(e) => setSalesCount(Number(e.target.value))}
            className="affiliation-slider w-full"
          />
          {isMilestone && sliderWidth > 0 && (
            <div
              className="absolute top-full mt-1 w-0.5 h-2 bg-orange-500 rounded-full transition-opacity duration-150"
              style={{ left: getPixelPosition(salesCount), transform: "translateX(-50%)" }}
            />
          )}
        </div>
        <div className="relative mt-3 h-4 text-xs text-gray-500">
          {LABEL_VALUES.map((value) => {
            const isActive = salesCount === value && value !== 0;
            const base = value === 0 ? "translateX(0)" : "translateX(-50%)";
            return (
              <span
                key={value}
                className={`absolute transition-all duration-[180ms] ${
                  isActive ? "text-orange-400 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]" : ""
                }`}
                style={{
                  left: sliderWidth > 0 ? getPixelPosition(value) : `${(value / SLIDER_MAX) * 100}%`,
                  transform: isActive ? `${base} translateY(-2px) scale(1.1)` : base,
                }}
              >
                {value}
              </span>
            );
          })}
        </div>
      </div>

      <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
        <p className="text-gray-400 text-sm mb-2">
          {salesCount} vente{salesCount > 1 ? "s" : ""} =
        </p>
        <p className="text-4xl md:text-5xl font-bold text-orange-400">
          {commissionAmount.toFixed(2)} €
        </p>
        <p className="text-xs text-gray-500 mt-1">de commission</p>
      </div>

      <p className="text-center text-gray-500 text-xs mt-6">
        Quelques ventes par mois suffisent à générer un revenu complémentaire.
      </p>
    </div>
  );
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface AffiliateStats {
  hasAffiliate: boolean;
  code?: string;
  commissionRate?: number;
  totalEarnings?: number;
  totalEarningsEur?: string;
  pendingAmountEur?: string;
  paidAmountEur?: string;
  pendingCount?: number;
  paidCount?: number;
  clicks?: number;
  sales?: number;
  conversionRate?: number;
}

// ─── Dashboard affilié (uniquement pour les membres ayant acheté la formation) ─

function AffiliateDashboard() {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const affiliateLink = stats?.code ? `${SITE_URL}/?ref=${stats.code}` : "";

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/affiliation/stats");
      if (res.ok) {
        setStats(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleCreate = async () => {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/affiliation/create", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création.");
      } else {
        await loadStats();
      }
    } finally {
      setCreating(false);
    }
  };

  const copyLink = () => {
    if (!affiliateLink) return;
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse">
          <div className="h-6 bg-white/10 rounded w-48 mb-4" />
          <div className="h-4 bg-white/5 rounded w-full mb-2" />
          <div className="h-4 bg-white/5 rounded w-3/4" />
        </div>
      </div>
    );
  }

  // Membre sans affiliation → bouton activation
  if (stats && !stats.hasAffiliate) {
    return (
      <div className="max-w-2xl mx-auto mb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-5">
            <LinkIcon size={24} className="text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Rejoignez le programme
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Vous êtes client de la formation. Activez votre compte affilié pour obtenir votre lien personnel et commencer à gagner des commissions.
          </p>
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}
          <button
            onClick={handleCreate}
            disabled={creating}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? "Activation en cours…" : "Activer mon programme d'affiliation"}
          </button>
        </div>
      </div>
    );
  }

  // Affilié actif → dashboard complet
  if (stats?.hasAffiliate && stats.code) {
    return (
      <div className="max-w-3xl mx-auto mb-20 space-y-6">
        {/* Header dashboard */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-green-400 font-medium">Compte affilié actif</span>
        </div>

        {/* Lien affilié */}
        <div className="affiliation-link-card p-4 sm:p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-3">Votre lien d&apos;affiliation</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              readOnly
              value={affiliateLink}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm"
            />
            <button
              onClick={copyLink}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                copied
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              <CopyIcon size={18} />
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Clics" value={String(stats.clicks ?? 0)} />
          <StatCard label="Ventes" value={String(stats.sales ?? 0)} />
          <StatCard
            label="Total gagné"
            value={`${stats.totalEarningsEur ?? "0.00"} €`}
            accent
          />
          <StatCard
            label="Conversion"
            value={`${stats.conversionRate ?? 0} %`}
          />
        </div>

        {/* Détail pending / payé */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
            <p className="text-xs text-orange-400/70 uppercase tracking-wider mb-1">
              En attente de paiement
            </p>
            <p className="text-2xl font-bold text-orange-400">
              {stats.pendingAmountEur ?? "0.00"} €
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {stats.pendingCount ?? 0} vente{(stats.pendingCount ?? 0) !== 1 ? "s" : ""} non versée{(stats.pendingCount ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
            <p className="text-xs text-green-400/70 uppercase tracking-wider mb-1">
              Déjà reçu
            </p>
            <p className="text-2xl font-bold text-green-400">
              {stats.paidAmountEur ?? "0.00"} €
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {stats.paidCount ?? 0} vente{(stats.paidCount ?? 0) !== 1 ? "s" : ""} versée{(stats.paidCount ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center pt-2">
          Les commissions sont versées mensuellement par virement dès votre première vente.
        </p>
      </div>
    );
  }

  return null;
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${accent ? "text-orange-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

// ─── Données statiques ────────────────────────────────────────────────────────

const timelineSteps = [
  {
    number: "1",
    title: "Suivez la formation",
    description: "Devenez client de la formation et accédez automatiquement au programme d'affiliation.",
    icon: UserIcon,
    color: "blue",
  },
  {
    number: "2",
    title: "Partagez votre lien",
    description: "Utilisez votre lien unique sur vos réseaux, blog, newsletter ou auprès de vos contacts.",
    icon: ShareIcon,
    color: "orange",
  },
  {
    number: "3",
    title: "Recevez vos commissions",
    description: `Gagnez ${Math.round(COMMISSION_RATE * 100)}% sur chaque vente. Paiement mensuel par virement dès votre première vente — sans seuil minimum.`,
    icon: CoinIcon,
    color: "green",
  },
];

const affiliateFAQs = [
  {
    question: "Dois-je obligatoirement être client pour devenir affilié ?",
    answer: "Oui, c'est une condition non négociable. Nous voulons que vous connaissiez réellement le contenu que vous recommandez.",
  },
  {
    question: "Y a-t-il une limite au nombre de ventes que je peux générer ?",
    answer: "Non, aucune limite. Plus vous partagez avec authenticité, plus vous pouvez gagner.",
  },
  {
    question: "Comment suis-je payé ?",
    answer: "Par virement bancaire mensuel, dès votre première vente. Il n'y a aucun seuil minimum.",
  },
  {
    question: "Puis-je utiliser de la publicité payante ?",
    answer: "Oui, tant que vous respectez nos conditions d'utilisation et ne faites pas de fausses promesses dans vos annonces.",
  },
  {
    question: "Que se passe-t-il si un client demande un remboursement ?",
    answer: "La commission liée à cette vente est automatiquement déduite de votre solde.",
  },
  {
    question: "Combien de temps dure le suivi d'affiliation ?",
    answer: "1 an. Le lien de suivi est également stocké en local sur le navigateur du visiteur, ce qui signifie que vous êtes crédité même si le cookie est effacé.",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function AffiliationClient({ hasAccess }: { hasAccess: boolean }) {

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-10 md:py-16 lg:py-24">

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 sm:mb-6">
                  <LinkIcon size={18} className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Programme partenaire</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Programme d&apos;affiliation
                </h1>
                <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8">
                  Recommandez la formation et recevez {COMMISSION_PERCENT}% de commission sur chaque vente générée.
                </p>

                <div className="inline-flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl affiliation-commission-card">
                  <div className="affiliation-badge-percent w-16 h-16 sm:w-20 sm:h-20 min-w-[4rem] sm:min-w-[5rem] min-h-[4rem] sm:min-h-[5rem] rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/30 flex items-center justify-center p-3 sm:p-4">
                    <span className="text-2xl sm:text-3xl font-bold text-orange-400 leading-none">{COMMISSION_PERCENT}%</span>
                  </div>
                  <div className="text-left">
                    <p className="text-base sm:text-lg font-semibold text-white">Commission par vente</p>
                    <p className="text-xs sm:text-sm text-gray-400">Suivi 1 an • Dès la 1ère vente • Sans limite</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Dashboard affilié (membres ayant acheté) ──────────────── */}
            {hasAccess && (
              <ScrollReveal delay={0.05}>
                <AffiliateDashboard />
              </ScrollReveal>
            )}

            {/* ── Accès réservé aux membres (non-clients) ───────────────── */}
            {!hasAccess && (
              <ScrollReveal delay={0.05}>
                <div className="max-w-2xl mx-auto mb-16">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 text-center">
                    <div className="w-14 h-14 rounded-xl bg-white/[0.08] flex items-center justify-center mx-auto mb-5">
                      <LockIcon size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Accès réservé aux membres
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                      Vous devez posséder la formation pour rejoindre le programme d&apos;affiliation et obtenir votre lien personnel.
                    </p>
                    <Link
                      href="/#prix"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
                    >
                      Accéder à la formation
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ── Simulateur ─────────────────────────────────────────────── */}
            <ScrollReveal delay={0.08}>
              <div className="max-w-2xl mx-auto mb-20">
                <h2 className="text-2xl font-bold text-white text-center mb-3">
                  Exemple concret
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  Voici ce que représente votre commission sur {FORMATION_PRICE} €.
                </p>
                <CommissionSimulator />
              </div>
            </ScrollReveal>

            {/* ── Avantages (non-clients seulement) ─────────────────────── */}
            {!hasAccess && (
              <ScrollReveal delay={0.09}>
                <div className="max-w-3xl mx-auto mb-20">
                  <h2 className="text-2xl font-bold text-white text-center mb-10">
                    Pourquoi rejoindre le programme
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Revenus passifs", desc: "Chaque lien partagé peut continuer à convertir grâce au cookie de 30 jours." },
                      { title: "Formation facile à recommander", desc: "Un contenu premium, concret, avec une thèse claire et des résultats tangibles." },
                      { title: "Lien unique", desc: "Un seul lien personnalisé, suivi automatiquement pour chaque visite." },
                      { title: "Statistiques en temps réel", desc: "Clics, ventes, commissions — tout est visible dans votre dashboard." },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mb-3" />
                        <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ── Timeline ───────────────────────────────────────────────── */}
            <ScrollReveal delay={0.1}>
              <div className="max-w-4xl mx-auto mb-12 md:mb-20">
                <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
                  Comment ça fonctionne ?
                </h2>
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const colorClasses = {
                      blue: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30",
                      orange: "from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/30",
                      green: "from-green-500/20 to-green-600/20 text-green-400 border-green-500/30",
                    };
                    return (
                      <div key={index} className="affiliation-step-card p-5 sm:p-6 rounded-2xl relative">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses].split(" ").slice(0, 2).join(" ")} flex items-center justify-center mb-4`}>
                          <Icon size={22} className={colorClasses[step.color as keyof typeof colorClasses].split(" ")[2]} />
                        </div>
                        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-gray-500">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <ScrollReveal delay={0.25}>
              <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                  Questions fréquentes
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {affiliateFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={String(index)}
                      className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/8 hover:border-white/15 transition-colors duration-200"
                    >
                      <AccordionTrigger className="p-4 sm:p-5 py-0 font-medium text-sm sm:text-base text-white hover:no-underline gap-4 [&>svg]:text-gray-400 [&>svg]:flex-shrink-0">
                        <span className="leading-snug text-left">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-5 sm:pb-5">
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>

            {/* ── CTA final (non-clients) ────────────────────────────────── */}
            {!hasAccess && (
              <ScrollReveal delay={0.3}>
                <div className="max-w-2xl mx-auto text-center">
                  <div className="affiliation-cta-card p-5 sm:p-8 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Prêt à devenir affilié ?
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Commencez par suivre la formation, puis accédez à votre espace affilié.
                    </p>
                    <Link
                      href="/#prix"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
                    >
                      Accéder à la formation
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
