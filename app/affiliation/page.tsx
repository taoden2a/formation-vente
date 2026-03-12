"use client";

import { useState, useMemo, memo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Constants
const FORMATION_PRICE = 59;
const COMMISSION_RATE = 0.25;
const COMMISSION_PERCENT = Math.round(COMMISSION_RATE * 100);
const SLIDER_MAX = 200;
const THUMB_WIDTH = 20; // Match CSS thumb width

// Icons
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

// Milestones for visual feedback
const MILESTONES = [50, 100, 150, 200];
const LABEL_VALUES = [0, 50, 100, 150, 200];

// Isolated simulator component to prevent full page re-renders
const CommissionSimulator = memo(function CommissionSimulator() {
  const [salesCount, setSalesCount] = useState(10);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const commissionAmount = useMemo(
    () => FORMATION_PRICE * COMMISSION_RATE * salesCount,
    [salesCount]
  );

  // Calculate pixel position for a given value
  const getPixelPosition = useCallback((value: number): number => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_WIDTH;
    return (value / SLIDER_MAX) * usableWidth + THUMB_WIDTH / 2;
  }, [sliderWidth]);

  // Track slider width on mount and resize
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateWidth = () => {
      setSliderWidth(slider.offsetWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(slider);

    return () => resizeObserver.disconnect();
  }, []);

  const isMilestone = MILESTONES.includes(salesCount);

  return (
    <div className="affiliation-simulator-card p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
          <CalculatorIcon size={20} className="text-orange-400" />
        </div>
        <span className="text-white font-medium">Simulateur de commission</span>
      </div>

      {/* Slider */}
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
          {/* Milestone marker */}
          {isMilestone && sliderWidth > 0 && (
            <div
              className="absolute top-full mt-1 w-0.5 h-2 bg-orange-500 rounded-full transition-opacity duration-150"
              style={{ left: getPixelPosition(salesCount), transform: 'translateX(-50%)' }}
            />
          )}
        </div>
        <div className="relative mt-3 h-4 text-xs text-gray-500">
          {LABEL_VALUES.map((value) => (
            <span
              key={value}
              className={`absolute transition-all duration-[180ms] ${
                salesCount === value && value !== 0
                  ? 'text-orange-400 scale-110 -translate-y-0.5 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]'
                  : ''
              }`}
              style={{
                left: sliderWidth > 0 ? getPixelPosition(value) : `${(value / SLIDER_MAX) * 100}%`,
                transform: value === 0 ? 'none' : value === SLIDER_MAX ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
        <p className="text-gray-400 text-sm mb-2">
          {salesCount} vente{salesCount > 1 ? "s" : ""} =
        </p>
        <p className="text-4xl md:text-5xl font-bold text-orange-400">
          {commissionAmount.toFixed(2)} €
        </p>
        <p className="text-xs text-gray-500 mt-1">de commission</p>
      </div>

      {/* Subtle note */}
      <p className="text-center text-gray-500 text-xs mt-6">
        Quelques ventes par mois suffisent à générer un revenu complémentaire.
      </p>
    </div>
  );
});

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
    description: `Gagnez ${Math.round(COMMISSION_RATE * 100)}% sur chaque vente. Paiement mensuel par virement dès 5 ventes atteintes.`,
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
    answer: "Par virement bancaire mensuel, dès que vous atteignez le seuil de 5 ventes",
  },
  {
    question: "Puis-je utiliser de la publicité payante ?",
    answer: "Oui, tant que vous respectez la charte éthique et ne faites pas de fausses promesses dans vos annonces.",
  },
  {
    question: "Que se passe-t-il si un client demande un remboursement ?",
    answer: "La commission liée à cette vente est automatiquement déduite de votre solde.",
  },
  {
    question: "Combien de temps dure le cookie d'affiliation ?",
    answer: "60 jours. Si quelqu'un clique sur votre lien, vous êtes crédité même s'il achète 2 mois plus tard.",
  },
];

export default function AffiliationPage() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const affiliateLink = "https://comprendrepourvendre.com/?ref=VOTRE_CODE";

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-16 md:py-24">
            {/* Hero */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <LinkIcon size={18} className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Programme partenaire</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Programme d&apos;affiliation
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
                  Recommandez la formation et recevez {COMMISSION_PERCENT}% de commission sur chaque vente générée.
                </p>

                {/* Commission badge */}
                <div className="inline-flex items-center gap-5 p-6 rounded-2xl affiliation-commission-card">
                  <div className="affiliation-badge-percent w-20 h-20 min-w-[5rem] min-h-[5rem] rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/30 flex items-center justify-center p-4">
                    <span className="text-3xl font-bold text-orange-400 leading-none">{COMMISSION_PERCENT}%</span>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-semibold text-white">Commission par vente</p>
                    <p className="text-sm text-gray-400">Cookie de 60 jours • Paiement mensuel</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Info box */}
            <ScrollReveal delay={0.05}>
              <div className="max-w-3xl mx-auto mb-16">
                <div className="affiliation-info-box p-6 rounded-2xl border-l-4 border-orange-500">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-white mb-2">
                        Programme réservé aux clients de la formation
                      </p>
                      <p className="text-gray-400 text-sm">
                        Nous voulons que nos affiliés connaissent réellement le contenu qu&apos;ils recommandent
                        et puissent en parler avec authenticité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Exemple concret - Simulateur */}
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

            {/* Timeline */}
            <ScrollReveal delay={0.1}>
              <div className="max-w-4xl mx-auto mb-20">
                <h2 className="text-2xl font-bold text-white text-center mb-12">
                  Comment ça fonctionne ?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const colorClasses = {
                      blue: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30",
                      orange: "from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/30",
                      green: "from-green-500/20 to-green-600/20 text-green-400 border-green-500/30",
                    };
                    return (
                      <div key={index} className="affiliation-step-card p-6 rounded-2xl relative">
                        {/* Step number */}
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

            {/* Affiliate link section */}
            <ScrollReveal delay={0.15}>
              <div className="max-w-2xl mx-auto mb-20">
                <div className="affiliation-link-card p-8 rounded-2xl text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Votre lien d&apos;affiliation</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Partagez ce lien pour commencer à gagner des commissions
                  </p>
                  <div className="flex gap-3">
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
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.25}>
              <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                  Questions fréquentes
                </h2>
                <div className="space-y-3">
                  {affiliateFAQs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div key={index} className="affiliation-faq-item rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-5 flex items-center justify-between text-left group"
                        >
                          <span className="text-white font-medium group-hover:text-orange-300 transition-colors">
                            {faq.question}
                          </span>
                          <ChevronDownIcon
                            size={20}
                            className={`text-gray-500 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-400 overflow-hidden ${
                            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-5 pb-5">
                            <p className="text-gray-400 text-sm">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.3}>
              <div className="max-w-2xl mx-auto text-center">
                <div className="affiliation-cta-card p-8 rounded-2xl">
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
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
