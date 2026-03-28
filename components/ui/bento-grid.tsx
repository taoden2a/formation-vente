"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, X, Check, ShieldCheck } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ─── Card avec reveal au scroll + hover glow ──────────────────────────────────

function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover="hover"
      className={`relative group rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden ${className}`}
    >
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 70%)",
          },
        }}
        initial={{ background: "none" }}
        transition={{ duration: 0.35 }}
      />
      {children}
    </motion.div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

      {/* Grande card gauche — Transformation Avant/Après */}
      <BentoCard className="md:col-span-2 p-6 sm:p-8" delay={0}>
        <div className="space-y-5 relative z-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-400/70 uppercase mb-1">
              La transformation réelle
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Avant / Après la formation
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Colonne AVANT */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-red-400/80 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center">
                  <X size={10} className="text-red-400" strokeWidth={3} />
                </span>
                Avant
              </p>
              <ul className="space-y-2.5">
                {avantItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X size={9} className="text-red-400" strokeWidth={3} />
                    </span>
                    <span className="text-xs sm:text-sm text-white/50 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne APRÈS */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-orange-400/80 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-orange-500/15 flex items-center justify-center">
                  <Check size={10} className="text-orange-400" strokeWidth={3} />
                </span>
                Après
              </p>
              <ul className="space-y-2.5">
                {apresItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-orange-500/15 flex items-center justify-center">
                      <Check size={9} className="text-orange-400" strokeWidth={3} />
                    </span>
                    <span className="text-xs sm:text-sm text-white/80 leading-snug font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Petite card haut droite — 8h de contenu */}
      <BentoCard className="p-5 sm:p-6" delay={0.1}>
        <div className="space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Brain size={20} className="text-orange-400" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              8h de contenu dense
            </h3>
            <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
              Zéro remplissage. Chaque leçon est actionnable dès le lendemain.
            </p>
          </div>
          <span className="inline-block bg-orange-500/20 text-orange-400 rounded-full px-3 py-1 text-xs font-semibold">
            43 leçons
          </span>
        </div>
      </BentoCard>

      {/* Petite card bas gauche — Résultats */}
      <BentoCard className="p-5 sm:p-6" delay={0.18}>
        <div className="space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <TrendingUp size={20} className="text-orange-400" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              Résultats rapportés
            </h3>
            <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
              ×2 taux de closing en moyenne sur les 3 premiers mois.
            </p>
          </div>
          <span className="inline-block bg-orange-500/20 text-orange-400 rounded-full px-3 py-1 text-xs font-semibold">
            Membres actifs
          </span>
        </div>
      </BentoCard>

      {/* Grande card bas droite — Garantie */}
      <BentoCard className="md:col-span-2 p-5 sm:p-6" delay={0.24}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 relative z-10">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <ShieldCheck size={24} className="text-orange-400" />
          </div>
          <div className="flex-1 space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              Satisfait ou remboursé
            </h3>
            <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
              14 jours pour tester. Sans justification.
            </p>
          </div>
          <span className="inline-block flex-shrink-0 bg-orange-500/20 text-orange-400 rounded-full px-3 py-1 text-xs font-semibold self-start sm:self-center">
            Garantie incluse
          </span>
        </div>
      </BentoCard>

    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const avantItems = [
  "Tu convaincs en espérant",
  "Tu subis les objections",
  "Tu baisses tes prix",
  "Tu perds des clients évidents",
];

const apresItems = [
  "Tu comprends pourquoi ils achètent",
  "Tu anticipes les freins",
  "Tu défends ta valeur",
  "Tu fermes sereinement",
];
