"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { programPreview } from "@/lib/programme-preview";

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

function ClockIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROGRESS_STORAGE_KEY = "cpv_progress";
const NOTES_PREFIX = "lesson_notes_";
const EXERCISE_PREFIX = "exercise_response_";
const TOTAL_MODULES = 8;
const TOTAL_LESSONS = 43;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgressData {
  currentModule: number;
  currentLesson: number;
  completedLessons: string[];
  inProgressLessons: string[];
  completedExercises: string[];
  progressPercent: number;
}

interface NotesInfo {
  count: number;
}

interface ActivityData {
  lastLesson: { title: string; moduleId: number; lessonId: number } | null;
  lastExercise: { moduleTitle: string; moduleId: number; lessonId: number } | null;
  lastNote: { lessonTitle: string; moduleId: number; lessonId: number } | null;
}

interface AffiliateStats {
  hasAffiliate: boolean;
  clicks: number;
  sales: number;
  totalEarningsEur: string;
  conversionRate: number;
  code?: string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MembrePage() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [notesInfo, setNotesInfo] = useState<NotesInfo>({ count: 0 });
  const [activityData, setActivityData] = useState<ActivityData>({
    lastLesson: null,
    lastExercise: null,
    lastNote: null,
  });
  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats | null>(null);
  const [affiliateLoading, setAffiliateLoading] = useState(true);

  // Fetch real affiliate stats
  useEffect(() => {
    fetch("/api/affiliation/stats")
      .then((res) => res.json())
      .then((data: AffiliateStats) => setAffiliateStats(data))
      .catch(() => setAffiliateStats({ hasAffiliate: false, clicks: 0, sales: 0, totalEarningsEur: "0.00", conversionRate: 0 }))
      .finally(() => setAffiliateLoading(false));
  }, []);

  // Read all localStorage data in a single effect
  useEffect(() => {
    try {
      // ── Progress ──────────────────────────────────────────────────────────
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      let parsed: ProgressData | null = null;

      if (stored) {
        parsed = JSON.parse(stored) as ProgressData;
        if (!parsed.inProgressLessons) parsed.inProgressLessons = [];
        if (!parsed.completedExercises) parsed.completedExercises = [];
        setProgress(parsed);
      }

      // ── Activity: last lesson ─────────────────────────────────────────────
      let lastLesson: ActivityData["lastLesson"] = null;
      if (
        parsed &&
        (parsed.completedLessons?.length > 0 || parsed.inProgressLessons?.length > 0)
      ) {
        const mod = programPreview.find((m) => m.id === parsed!.currentModule);
        const lesson = mod?.lessons.find((l) => l.id === parsed!.currentLesson);
        if (mod && lesson) {
          lastLesson = {
            title: lesson.title,
            moduleId: parsed.currentModule,
            lessonId: parsed.currentLesson,
          };
        }
      }

      // ── Activity: last exercise ───────────────────────────────────────────
      let lastExercise: ActivityData["lastExercise"] = null;
      if (parsed && (parsed.completedExercises?.length ?? 0) > 0) {
        const lastKey = parsed.completedExercises![parsed.completedExercises!.length - 1];
        const [mId, lId] = lastKey.split("-").map(Number);
        const exMod = programPreview.find((m) => m.id === mId);
        if (exMod && !isNaN(mId) && !isNaN(lId)) {
          lastExercise = { moduleTitle: exMod.title, moduleId: mId, lessonId: lId };
        }
      } else {
        // Fallback: scan for any written exercise response
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith(EXERCISE_PREFIX)) {
            const content = localStorage.getItem(key) ?? "";
            if (content.trim()) {
              const suffix = key.slice(EXERCISE_PREFIX.length);
              const parts = suffix.split("_");
              if (parts.length >= 2) {
                const mId = parseInt(parts[0]);
                const lId = parseInt(parts[1]);
                const exMod = programPreview.find((m) => m.id === mId);
                if (exMod && !isNaN(mId) && !isNaN(lId)) {
                  lastExercise = { moduleTitle: exMod.title, moduleId: mId, lessonId: lId };
                  break;
                }
              }
            }
          }
        }
      }

      // ── Notes ─────────────────────────────────────────────────────────────
      let noteCount = 0;
      let lastNote: ActivityData["lastNote"] = null;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(NOTES_PREFIX)) {
          const content = localStorage.getItem(key) ?? "";
          if (content.trim()) {
            noteCount++;
            if (!lastNote) {
              const suffix = key.slice(NOTES_PREFIX.length);
              const parts = suffix.split("_");
              if (parts.length >= 2) {
                const mId = parseInt(parts[0]);
                const lId = parseInt(parts[1]);
                const noteMod = programPreview.find((m) => m.id === mId);
                const noteLesson = noteMod?.lessons.find((l) => l.id === lId);
                if (noteLesson && !isNaN(mId) && !isNaN(lId)) {
                  lastNote = { lessonTitle: noteLesson.title, moduleId: mId, lessonId: lId };
                }
              }
            }
          }
        }
      }

      setNotesInfo({ count: noteCount });
      setActivityData({ lastLesson, lastExercise, lastNote });
    } catch {
      // Use defaults
    }
  }, []);

  // Get next recommended action
  const getNextAction = () => {
    if (!progress) {
      return { text: "Commencer le Module 1", href: "/formation" };
    }
    if (progress.progressPercent === 100) {
      return { text: "Revoir les exercices pratiques", href: "/exercices" };
    }
    return {
      text: `Continuer la Leçon ${progress.currentLesson} du Module ${progress.currentModule}`,
      href: "/formation",
    };
  };

  const nextAction = getNextAction();

  const hasActivity =
    activityData.lastLesson !== null ||
    activityData.lastExercise !== null ||
    activityData.lastNote !== null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-8 md:py-12 lg:py-20">
            {/* Hero compact */}
            <ScrollReveal>
              <div className="mb-6 md:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  Mon espace
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                  Suivez votre progression et vos performances.
                </p>
              </div>
            </ScrollReveal>

            {/* Section 1: Progression Formation */}
            <ScrollReveal delay={0.05}>
              <div className="membre-premium-card membre-premium-card-highlight p-6 md:p-8 rounded-2xl mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                        <PlayIcon size={18} className="text-orange-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-white">Progression Formation</h2>
                    </div>

                    <div className="flex items-baseline gap-3 sm:gap-4 mb-4">
                      <span className="text-4xl sm:text-5xl font-bold text-white">
                        {progress?.progressPercent ?? 0}%
                      </span>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        <div>Module {progress?.currentModule ?? 1}/{TOTAL_MODULES}</div>
                        <div>{progress?.completedLessons.length ?? 0}/{TOTAL_LESSONS} leçons</div>
                      </div>
                    </div>

                    <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 transition-all duration-700 rounded-full"
                        style={{ width: `${progress?.progressPercent ?? 0}%` }}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Prochaine action recommandée
                      </p>
                      <p className="text-white font-medium">{nextAction.text}</p>
                    </div>
                  </div>

                  <div className="lg:pl-8 lg:border-l lg:border-white/10">
                    <Link
                      href={nextAction.href}
                      className="membre-premium-cta inline-flex items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/25"
                    >
                      <PlayIcon size={20} />
                      Reprendre la formation
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 2: Statistiques Affilié */}
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

                {affiliateLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <svg className="animate-spin text-gray-600" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                    </svg>
                  </div>
                ) : !affiliateStats?.hasAffiliate ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm mb-4">
                      Vous n&apos;avez pas encore activé votre programme d&apos;affiliation.
                      <br />Gagnez <strong className="text-orange-400">25% de commission</strong> sur chaque vente dès votre première recommandation.
                    </p>
                    <Link
                      href="/affiliation"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/20 transition-all"
                    >
                      Activer l&apos;affiliation
                      <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="membre-stat-card p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointerIcon size={16} className="text-blue-400" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Clics</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{affiliateStats.clicks}</p>
                    </div>
                    <div className="membre-stat-card p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBagIcon size={16} className="text-green-400" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Ventes</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{affiliateStats.sales}</p>
                    </div>
                    <div className="membre-stat-card p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <EuroIcon size={16} className="text-orange-400" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Commissions</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{affiliateStats.totalEarningsEur}€</p>
                    </div>
                    <div className="membre-stat-card p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUpIcon size={16} className="text-purple-400" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Conversion</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{affiliateStats.conversionRate}%</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Section 3 & 4: Notes + Dernière activité */}
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

              {/* Section 4: Dernière activité */}
              <ScrollReveal delay={0.2}>
                <div className="membre-premium-card p-6 rounded-2xl h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                      <ClockIcon size={18} className="text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Dernière activité</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 sm:mb-6 pl-0 sm:pl-[52px]">
                    Reprenez là où vous vous êtes arrêté.
                  </p>

                  {!hasActivity ? (
                    /* Empty state */
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                        <PlayIcon size={20} className="text-gray-600" />
                      </div>
                      <p className="text-gray-500 text-sm mb-5 max-w-xs">
                        Commencez la formation pour voir votre activité apparaître ici.
                      </p>
                      <Link
                        href="/formation"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/20 transition-all"
                      >
                        Commencer la formation
                        <ArrowRightIcon size={14} />
                      </Link>
                    </div>
                  ) : (
                    /* Activity rows */
                    <div className="flex-1 space-y-3">
                      {/* Last lesson */}
                      {activityData.lastLesson && (
                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                            <PlayIcon size={14} className="text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">Dernière leçon suivie</p>
                            <p className="text-sm text-white font-medium truncate">
                              {activityData.lastLesson.title}
                            </p>
                          </div>
                          <Link
                            href={`/formation/${activityData.lastLesson.moduleId}/${activityData.lastLesson.lessonId}`}
                            className="flex-shrink-0 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors whitespace-nowrap"
                          >
                            Reprendre
                            <ChevronRightIcon size={13} />
                          </Link>
                        </div>
                      )}

                      {/* Last exercise */}
                      {activityData.lastExercise && (
                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircleIcon size={14} className="text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">Dernier exercice travaillé</p>
                            <p className="text-sm text-white font-medium truncate">
                              M{String(activityData.lastExercise.moduleId).padStart(2, "0")} — {activityData.lastExercise.moduleTitle}
                            </p>
                          </div>
                          <Link
                            href={`/exercices/${activityData.lastExercise.moduleId}/${activityData.lastExercise.lessonId}`}
                            className="flex-shrink-0 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors whitespace-nowrap"
                          >
                            Continuer
                            <ChevronRightIcon size={13} />
                          </Link>
                        </div>
                      )}

                      {/* Last note */}
                      {activityData.lastNote && (
                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <FileTextIcon size={14} className="text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">Dernière note enregistrée</p>
                            <p className="text-sm text-white font-medium truncate">
                              {activityData.lastNote.lessonTitle}
                            </p>
                          </div>
                          <Link
                            href="/notes"
                            className="flex-shrink-0 text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors whitespace-nowrap"
                          >
                            Voir
                            <ChevronRightIcon size={13} />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
