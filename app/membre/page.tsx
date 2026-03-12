"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
function PlayIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function FileTextIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  );
}

function MousePointerIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="m13 13 6 6" />
    </svg>
  );
}

function ShoppingBagIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function EuroIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 10h12" />
      <path d="M4 14h9" />
      <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    </svg>
  );
}

function TrendingUpIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function DownloadIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ClipboardIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function CheckSquareIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ChevronRightIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const PROGRESS_STORAGE_KEY = "cpv_progress";
const NOTES_PREFIX = "lesson_notes_";
const TOTAL_MODULES = 9;
const TOTAL_LESSONS = 48;

interface ProgressData {
  currentModule: number;
  currentLesson: number;
  completedLessons: string[];
  inProgressLessons: string[];
  progressPercent: number;
}

interface NotesInfo {
  count: number;
  lastModified: string | null;
}

// Simulated affiliate stats
const affiliateStats = {
  clicks: 847,
  sales: 23,
  commission: 1150,
  conversionRate: 2.7,
};

export default function MembrePage() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [notesInfo, setNotesInfo] = useState<NotesInfo>({ count: 0, lastModified: null });

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.inProgressLessons) {
          parsed.inProgressLessons = [];
        }
        setProgress(parsed);
      }
    } catch {
      // Use default
    }
  }, []);

  // Count notes and get last modified
  useEffect(() => {
    let count = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(NOTES_PREFIX)) {
        const content = localStorage.getItem(key) || "";
        if (content.trim()) count++;
      }
    }

    setNotesInfo({ count, lastModified: null });
  }, []);

  // Get next recommended action
  const getNextAction = () => {
    if (!progress) {
      return { text: "Commencer le Module 1", href: "/formation" };
    }
    if (progress.progressPercent === 100) {
      return { text: "Revoir les exercices pratiques", href: "/formation" };
    }
    return {
      text: `Continuer la Leçon ${progress.currentLesson} du Module ${progress.currentModule}`,
      href: "/formation",
    };
  };

  const nextAction = getNextAction();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-12 md:py-20">
            {/* Hero compact */}
            <ScrollReveal>
              <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Mon espace
                </h1>
                <p className="text-gray-400">
                  Suivez votre progression et vos performances.
                </p>
              </div>
            </ScrollReveal>

            {/* Section 1: Progression Formation - Full width */}
            <ScrollReveal delay={0.05}>
              <div className="membre-premium-card membre-premium-card-highlight p-6 md:p-8 rounded-2xl mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left: Progress info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                        <PlayIcon size={18} className="text-orange-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-white">Progression Formation</h2>
                    </div>

                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-5xl md:text-6xl font-bold text-white">
                        {progress?.progressPercent ?? 0}%
                      </span>
                      <div className="text-gray-400 text-sm">
                        <div>Module {progress?.currentModule ?? 1}/{TOTAL_MODULES}</div>
                        <div>{progress?.completedLessons.length ?? 0}/{TOTAL_LESSONS} leçons</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 transition-all duration-700 rounded-full"
                        style={{ width: `${progress?.progressPercent ?? 0}%` }}
                      />
                    </div>

                    {/* Next action recommendation */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Prochaine action recommandée
                      </p>
                      <p className="text-white font-medium">{nextAction.text}</p>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="lg:pl-8 lg:border-l lg:border-white/10">
                    <Link
                      href={nextAction.href}
                      className="membre-premium-cta inline-flex items-center justify-center gap-3 w-full lg:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/25"
                    >
                      <PlayIcon size={20} />
                      Reprendre la formation
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 2: Statistiques Affilié - Grid 2x2 */}
            <ScrollReveal delay={0.1}>
              <div className="membre-premium-card p-6 md:p-8 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Statistiques Affilié</h2>
                  <Link
                    href="/affiliation"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    Voir détails
                    <ChevronRightIcon size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Clicks */}
                  <div className="membre-stat-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MousePointerIcon size={16} className="text-blue-400" />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Clics</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{affiliateStats.clicks}</p>
                  </div>

                  {/* Sales */}
                  <div className="membre-stat-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBagIcon size={16} className="text-green-400" />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Ventes</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{affiliateStats.sales}</p>
                  </div>

                  {/* Commission */}
                  <div className="membre-stat-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <EuroIcon size={16} className="text-orange-400" />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Commission</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{affiliateStats.commission}€</p>
                  </div>

                  {/* Conversion rate */}
                  <div className="membre-stat-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUpIcon size={16} className="text-purple-400" />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Conversion</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{affiliateStats.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 3 & 4: Notes + Resources - Side by side on desktop */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Section 3: Mes Notes */}
              <ScrollReveal delay={0.15}>
                <div className="membre-premium-card p-6 rounded-2xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                      <FileTextIcon size={18} className="text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Mes Notes</h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-gray-400">Notes enregistrées</span>
                      <span className="text-2xl font-bold text-white">{notesInfo.count}</span>
                    </div>

                    {notesInfo.lastModified && (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-gray-400">Dernière modification</span>
                        <span className="text-white font-medium">{notesInfo.lastModified}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/notes"
                    className="membre-premium-btn-secondary inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 group"
                  >
                    Accéder à mes notes
                    <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Section 4: Ressources exclusives */}
              <ScrollReveal delay={0.2}>
                <div className="membre-premium-card p-6 rounded-2xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                      <DownloadIcon size={18} className="text-purple-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Ressources exclusives</h2>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/ressources/scripts"
                      className="membre-resource-card p-4 rounded-xl flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <ClipboardIcon size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-blue-300 transition-colors">Scripts de vente</p>
                        <p className="text-xs text-gray-500">Scripts personnalisables par situation</p>
                      </div>
                      <ChevronRightIcon size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/ressources/checklists"
                      className="membre-resource-card p-4 rounded-xl flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                        <CheckSquareIcon size={18} className="text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-orange-300 transition-colors">Checklists de vente</p>
                        <p className="text-xs text-gray-500">Listes de vérification pratiques</p>
                      </div>
                      <ChevronRightIcon size={18} className="text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/ressources/frameworks"
                      className="membre-resource-card p-4 rounded-xl flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                        <TrendingUpIcon size={18} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-green-300 transition-colors">Frameworks de persuasion</p>
                        <p className="text-xs text-gray-500">Structures d&apos;argumentation éprouvées</p>
                      </div>
                      <ChevronRightIcon size={18} className="text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
