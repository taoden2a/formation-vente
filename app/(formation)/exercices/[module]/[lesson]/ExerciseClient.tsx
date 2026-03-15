"use client";

/**
 * EXERCICE CLIENT — CLIENT COMPONENT
 *
 * - Charge la réponse sauvegardée depuis localStorage
 * - Auto-sauvegarde à chaque modification (onChange)
 * - Bouton "Marquer comme terminé" (toggle via useProgress)
 * - Section correction pédagogique (révélée après clic sur "Voir la correction")
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useProgress } from "@/hooks/useProgress";
import { BackNav } from "@/components/ui/BackNav";
import type { Exercise } from "@/lib/server/programme-content";
import type { ExerciseCorrection } from "@/lib/server/exercise-corrections";

interface ExerciseClientProps {
  moduleId: number;
  lessonId: number;
  moduleTitle: string;
  lessonTitle: string;
  exercise: Exercise;
  correction: ExerciseCorrection | null;
  totalLessons: number;
  totalExercises: number;
}

export function ExerciseClient({
  moduleId,
  lessonId,
  moduleTitle,
  lessonTitle,
  exercise,
  correction,
  totalLessons,
  totalExercises,
}: ExerciseClientProps) {
  const responseKey = `exercise_response_${moduleId}_${lessonId}`;
  const [response, setResponse] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const hasLoaded = useRef(false);

  const { isLoaded, getExerciseStatus, toggleExerciseStatus, progress } =
    useProgress();

  const isDone = isLoaded ? getExerciseStatus(moduleId, lessonId) === "done" : false;
  const completedCount = isLoaded ? progress.completedExercises.length : 0;

  // Load saved response from localStorage
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    try {
      const saved = localStorage.getItem(responseKey);
      if (saved) setResponse(saved);
    } catch {
      // localStorage unavailable
    }
  }, [responseKey]);

  // Auto-save response on change
  function handleResponseChange(value: string) {
    setResponse(value);
    try {
      localStorage.setItem(responseKey, value);
    } catch {
      // Storage full
    }
  }

  function handleToggleDone() {
    toggleExerciseStatus(moduleId, lessonId, totalLessons, totalExercises);
  }

  const exerciseKey = `${moduleId}-${lessonId}`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark">
          <main className="max-w-3xl mx-auto px-6 py-12">

            {/* Back nav */}
            <BackNav
              items={[
                { label: "Formation", href: "/formation" },
                { label: "Exercices", href: "/exercices" },
                { label: exercise.title },
              ]}
            />

            <ScrollReveal>
              {/* Module + lesson context */}
              <div className="mb-2">
                <span className="text-xs font-mono text-orange-400/80 uppercase tracking-wider">
                  M{String(moduleId).padStart(2, "0")} · {moduleTitle}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-sm text-gray-400">
                  Exercice de la leçon : {lessonTitle}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-3">
                {exercise.title}
              </h1>
            </ScrollReveal>

            {/* Exercise card */}
            <ScrollReveal delay={0.05}>
              <div className="bg-orange-500/8 border border-orange-500/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-orange-200/80 text-sm font-medium mb-0.5">Consigne</p>
                    <p className="text-gray-200 leading-relaxed">{exercise.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Response area */}
            <ScrollReveal delay={0.08}>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Votre réponse
                </label>
                <textarea
                  value={response}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  placeholder="Écrivez votre réponse ici…"
                  rows={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-gray-200 placeholder-gray-600 text-sm leading-relaxed focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.07] resize-y transition-colors"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Sauvegardé automatiquement dans votre navigateur.
                </p>
              </div>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                {/* Mark as done */}
                <button
                  onClick={handleToggleDone}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
                    isDone
                      ? "bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/25"
                      : "bg-orange-500/15 border border-orange-500/25 text-orange-300 hover:bg-orange-500/25"
                  }`}
                >
                  {isDone ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Exercice terminé
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                      Marquer comme terminé
                    </>
                  )}
                </button>

                {/* See correction */}
                {correction && (
                  <button
                    onClick={() => setShowCorrection((v) => !v)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {showCorrection ? "Masquer la correction" : "Voir la correction"}
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Correction pédagogique */}
            {correction && showCorrection && (
              <div className="animate-reveal mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-orange-400 to-orange-600" />
                    <h2 className="text-lg font-semibold text-white">Correction</h2>
                  </div>

                  {/* Objective */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Objectif de l&apos;exercice
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {correction.objective}
                    </p>
                  </div>

                  {/* Key points */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Points clés attendus
                    </p>
                    <ul className="space-y-2">
                      {correction.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Exemple de bonne réflexion
                    </p>
                    <div className="bg-white/5 border-l-2 border-orange-500/40 rounded-r-lg px-4 py-3">
                      <p className="text-gray-300 text-sm leading-relaxed italic">
                        {correction.example}
                      </p>
                    </div>
                  </div>

                  {/* Takeaways */}
                  <div className="bg-green-500/8 border border-green-500/20 rounded-xl p-4">
                    <p className="text-xs font-medium text-green-400/80 uppercase tracking-wider mb-3">
                      À retenir
                    </p>
                    <ul className="space-y-2">
                      {correction.takeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-green-200/80">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 mt-0.5 text-green-400">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Progress summary */}
            {isLoaded && (
              <ScrollReveal delay={0.12}>
                <div className="flex items-center justify-between py-4 border-t border-white/8 text-sm text-gray-500 mb-8">
                  <span>
                    {completedCount} / {totalExercises} exercices terminés
                  </span>
                  <Link
                    href="/exercices"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Tous les exercices
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            )}

            {/* Navigation: back to lesson */}
            <ScrollReveal delay={0.14}>
              <div className="flex items-center gap-3">
                <Link
                  href={`/formation/${moduleId}/${lessonId}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Retour à la leçon
                </Link>
              </div>
            </ScrollReveal>

          </main>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
