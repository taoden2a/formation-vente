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
  description: string;
  content: string[];
  takeaways: string[];
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

// ─── Status dot ───────────────────────────────────────────────────────────────

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

export function ProgrammeClient({ modules, totalLessons }: Props) {
  const { progress, isLoaded, toggleLessonStatus, getLessonStatus, getModuleProgress } = useProgress();

  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const [openLessonKey, setOpenLessonKey] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Charger toutes les notes au mount
  useEffect(() => {
    const loaded: Record<string, string> = {};
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        const saved = localStorage.getItem(`cpv_notes_${lesson.lessonKey}`);
        if (saved) loaded[lesson.lessonKey] = saved;
      }
    }
    setNotes(loaded);
  }, [modules]);

  const handleLessonClick = (lesson: LessonData, moduleId: number) => {
    const key = lesson.lessonKey;
    if (openLessonKey === key) {
      setOpenLessonKey(null);
    } else {
      setOpenLessonKey(key);
      // Auto-marquer "en cours" si pas encore commencé
      const status = getLessonStatus(moduleId, lesson.id);
      if (status === "todo") {
        toggleLessonStatus(moduleId, lesson.id, totalLessons);
      }
    }
  };

  const handleNoteBlur = (lessonKey: string) => {
    try {
      localStorage.setItem(`cpv_notes_${lessonKey}`, notes[lessonKey] ?? "");
    } catch {
      // ignore
    }
  };

  const completedCount = isLoaded ? progress.completedLessons.length : 0;
  const globalPercent = isLoaded ? progress.progressPercent : 0;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

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
        <p className="text-gray-400">9 modules progressifs pour maîtriser la vente par la compréhension.</p>
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
          {completedCount} leçon{completedCount !== 1 ? "s" : ""} terminée{completedCount !== 1 ? "s" : ""} sur {totalLessons}
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
              className={`bg-white/5 border rounded-2xl overflow-hidden transition-colors ${
                isModuleOpen ? "border-white/20" : "border-white/10"
              }`}
            >
              {/* Header module */}
              <button
                onClick={() => setOpenModuleId(isModuleOpen ? null : mod.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.04] transition-colors"
              >
                {/* Badge numéro */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-base font-bold text-orange-400 flex-shrink-0">
                  {String(mod.id).padStart(2, "0")}
                </div>

                {/* Titre + méta */}
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
                    {mod.lessons.length > 0 && (
                      <span className="text-xs text-gray-600">{modulePercent}%</span>
                    )}
                  </div>
                </div>

                <ChevronDown open={isModuleOpen} />
              </button>

              {/* Contenu module */}
              {isModuleOpen && (
                <div className="border-t border-white/10">

                  {/* Objectif */}
                  {mod.objective && (
                    <div className="px-5 py-4 bg-white/[0.02]">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Objectif</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{mod.objective}</p>
                    </div>
                  )}

                  {/* Module 9 : pas de leçons, 100% pratique */}
                  {mod.lessons.length === 0 && (
                    <div className="px-5 py-4 text-sm text-gray-500 italic">
                      Ce module est entièrement pratique — voir les exercices ci-dessous.
                    </div>
                  )}

                  {/* Liste des leçons */}
                  {mod.lessons.length > 0 && (
                    <div className="divide-y divide-white/5">
                      {mod.lessons.map((lesson) => {
                        const status = isLoaded ? getLessonStatus(mod.id, lesson.id) : "todo";
                        const isLessonOpen = openLessonKey === lesson.lessonKey;

                        return (
                          <div key={lesson.id}>
                            {/* Ligne de la leçon */}
                            <button
                              onClick={() => handleLessonClick(lesson, mod.id)}
                              className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-white/[0.04] transition-colors group"
                            >
                              <div className="mt-0.5">
                                <StatusDot status={status} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors leading-snug block">
                                  {lesson.title}
                                </span>
                              </div>
                              <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2"
                                className={`flex-shrink-0 mt-0.5 transition-transform text-gray-600 ${isLessonOpen ? "rotate-180 text-blue-400" : "group-hover:text-blue-400"}`}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>

                            {/* Contenu inline de la leçon */}
                            {isLessonOpen && (
                              <div className="bg-[#0d0d15] border-t border-white/10 px-5 py-6 space-y-6">

                                {/* Description */}
                                {lesson.description && (
                                  <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
                                )}

                                {/* Contenu */}
                                {lesson.content.length > 0 && (
                                  <div className="space-y-3">
                                    {lesson.content.map((para, i) => (
                                      <p key={i} className="text-gray-400 text-sm leading-relaxed">{para}</p>
                                    ))}
                                  </div>
                                )}

                                {/* Takeaways */}
                                {lesson.takeaways.length > 0 && (
                                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                                    <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      Points clés
                                    </h3>
                                    <ul className="space-y-2">
                                      {lesson.takeaways.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                          <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckIcon />
                                          </span>
                                          {t}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Mes notes */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Mes notes
                                  </label>
                                  <textarea
                                    value={notes[lesson.lessonKey] ?? ""}
                                    onChange={(e) =>
                                      setNotes((prev) => ({ ...prev, [lesson.lessonKey]: e.target.value }))
                                    }
                                    onBlur={() => handleNoteBlur(lesson.lessonKey)}
                                    placeholder="Écrivez vos notes ici — sauvegardées automatiquement."
                                    className="w-full h-28 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none transition-colors text-sm"
                                  />
                                </div>

                                {/* Bouton terminer */}
                                <button
                                  onClick={() => toggleLessonStatus(mod.id, lesson.id, totalLessons)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                                    status === "completed"
                                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                                  }`}
                                >
                                  {status === "completed" ? (
                                    <>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M20 6 9 17l-5-5" />
                                      </svg>
                                      Leçon terminée
                                    </>
                                  ) : (
                                    <>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                      </svg>
                                      Marquer comme terminée
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
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
                          <div
                            key={ex.lessonKey}
                            className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-4"
                          >
                            <h4 className="text-sm font-semibold text-orange-300 mb-1">{ex.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{ex.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Lien Exercices ──────────────────────────────────────────────────── */}
      <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
        <p className="text-sm text-gray-500">Tous les exercices de la formation</p>
        <Link
          href="/exercices"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
        >
          Voir tous les exercices
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
