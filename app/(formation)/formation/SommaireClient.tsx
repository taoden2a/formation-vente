"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExerciseData {
  lessonKey: string;
  lessonTitle: string;
  title: string;
  description: string;
}

interface LessonData {
  id: number;
  lessonKey: string;
  title: string;
}

interface ModuleData {
  id: number;
  title: string;
  objective: string;
  lessons: LessonData[];
  exercises: ExerciseData[];
}

interface Props {
  modules: ModuleData[];
  totalLessons: number;
  totalExercises: number;
}

// ─── Icônes ───────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      className={`text-gray-500 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function StatusDot({ status }: { status: "todo" | "in_progress" | "completed" }) {
  if (status === "completed") {
    return (
      <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
        <CheckIcon />
      </span>
    );
  }
  if (status === "in_progress") {
    return <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex-shrink-0" />;
  }
  return <span className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex-shrink-0" />;
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function SommaireClient({ modules, totalLessons, totalExercises }: Props) {
  const { progress, isLoaded, getLessonStatus, getModuleProgress } = useProgress();

  const [openModuleId, setOpenModuleId] = useState<number | null>(1);

  // Ouvrir le module en cours au chargement
  useEffect(() => {
    if (isLoaded && progress.currentModule) {
      setOpenModuleId(progress.currentModule);
    }
  }, [isLoaded, progress.currentModule]);

  const completedLessonsCount = isLoaded ? progress.completedLessons.length : 0;
  const completedExercisesCount = isLoaded ? progress.completedExercises.length : 0;
  const globalPercent = isLoaded ? progress.progressPercent : 0;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span className="text-sm font-medium text-orange-300">
            {modules.length} modules · {totalLessons} leçons
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Formation</h1>
        <p className="text-gray-400">8 modules progressifs pour maîtriser la vente par la compréhension.</p>
      </div>

      {/* ── Barre de progression globale ────────────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">Progression globale</span>
          <span className="text-2xl font-bold text-orange-400">{globalPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${globalPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {completedLessonsCount} leçon{completedLessonsCount !== 1 ? "s" : ""} · {completedExercisesCount} exercice{completedExercisesCount !== 1 ? "s" : ""} terminés sur {totalLessons + totalExercises} éléments
        </p>
      </div>

      {/* ── Modules ─────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const isModuleOpen = openModuleId === mod.id;
          const modulePercent = isLoaded ? getModuleProgress(mod.id, mod.lessons.length) : 0;

          return (
            <div
              key={mod.id}
              className={`bg-white/5 border rounded-2xl overflow-hidden transition-colors duration-200 ${
                isModuleOpen ? "border-white/20" : "border-white/10"
              }`}
            >
              {/* Header module */}
              <button
                onClick={() => setOpenModuleId(isModuleOpen ? null : mod.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-base font-bold text-orange-400 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                  {String(mod.id).padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base leading-snug">{mod.title}</h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {mod.lessons.length} leçon{mod.lessons.length > 1 ? "s" : ""}
                    </span>
                    {mod.exercises.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
                        {mod.exercises.length} exercice{mod.exercises.length > 1 ? "s" : ""}
                      </span>
                    )}
                    {mod.lessons.length > 0 && modulePercent > 0 && (
                      <span className="text-xs text-gray-600">{modulePercent}%</span>
                    )}
                  </div>
                </div>

                <ChevronDown open={isModuleOpen} />
              </button>

              {/* Contenu module — CSS grid-rows accordion for smooth animation */}
              <div className={`accordion-grid ${isModuleOpen ? "accordion-grid-open" : ""}`}>
                <div className="overflow-hidden">
                <div className="border-t border-white/10">

                  {/* Objectif */}
                  {mod.objective && (
                    <div className="px-5 py-4 bg-white/[0.02]">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Objectif</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{mod.objective}</p>
                    </div>
                  )}

                  {/* Module 9 : 100% pratique */}
                  {mod.lessons.length === 0 && (
                    <div className="px-5 py-4 text-sm text-gray-500 italic">
                      Ce module est entièrement pratique — voir les exercices ci-dessous.
                    </div>
                  )}

                  {/* Liste des leçons (cliquables → page leçon) */}
                  {mod.lessons.length > 0 && (
                    <div className="divide-y divide-white/5">
                      {mod.lessons.map((lesson) => {
                        const status = isLoaded ? getLessonStatus(mod.id, lesson.id) : "todo";

                        return (
                          <Link
                            key={lesson.id}
                            href={`/formation/${mod.id}/${lesson.id}`}
                            className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.06] transition-colors group"
                          >
                            <StatusDot status={status} />
                            <span className="flex-1 text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-snug">
                              {lesson.title}
                            </span>
                            <svg
                              width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2"
                              className="flex-shrink-0 text-gray-600 group-hover:text-blue-400 transition-all duration-200 group-hover:translate-x-0.5"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Exercices du module */}
                  {mod.exercises.length > 0 && (
                    <div className="border-t border-white/10 px-5 py-5">
                      <p className="text-xs font-semibold text-orange-400/70 uppercase tracking-wider mb-3">
                        Exercices du module
                      </p>
                      <div className="space-y-3">
                        {mod.exercises.map((ex) => (
                          <Link
                            key={ex.lessonKey}
                            href={`/exercices/${ex.lessonKey.replace("-", "/")}`}
                            className="block bg-orange-500/5 border border-orange-500/15 rounded-xl p-4 hover:bg-orange-500/10 hover:border-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 group"
                          >
                            <h4 className="text-sm font-semibold text-orange-300 mb-1 group-hover:text-orange-200 transition-colors">{ex.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{ex.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lien Exercices ──────────────────────────────────────────────────── */}
      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">Tous les exercices de la formation</p>
        <Link
          href="/exercices"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/40 transition-all duration-200 group"
        >
          Voir tous les exercices
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
