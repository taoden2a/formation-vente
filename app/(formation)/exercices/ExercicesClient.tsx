"use client";

/**
 * EXERCICES CLIENT — CLIENT COMPONENT
 *
 * Interface catalogue reorganisée :
 * - Barre de progression globale
 * - Navigation rapide par module (scroll anchors)
 * - Filtres : Tous / À faire / Terminés
 * - Exercices groupés par module, grille de cartes
 * - Tri : exercices non terminés en premier dans chaque module
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExerciceItem {
  moduleId: number;
  moduleTitle: string;
  lessonId: number;
  lessonTitle: string;
  exercise: { title: string; description: string };
}

interface ExerciceModule {
  id: number;
  title: string;
  exercises: ExerciceItem[];
}

type Filter = "all" | "todo" | "done";

interface ExercicesClientProps {
  modules: ExerciceModule[];
  totalExercises: number;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ExerciseCard({ item, isDone }: { item: ExerciceItem; isDone: boolean }) {
  return (
    <Link
      href={`/exercices/${item.moduleId}/${item.lessonId}`}
      className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all group h-full"
    >
      {/* Icon + module label */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            isDone
              ? "bg-green-500/15 border border-green-500/20"
              : "bg-orange-500/15 border border-orange-500/20"
          }`}
        >
          {isDone ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )}
        </div>

        {/* Status badge */}
        {isDone ? (
          <span className="text-xs font-medium text-green-400 flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Terminé
          </span>
        ) : (
          <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
            À faire
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-orange-100 transition-colors flex-1">
        {item.exercise.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
        {item.exercise.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/8">
        <span className="text-xs text-gray-600 truncate max-w-[140px]">
          {item.lessonTitle}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-700 group-hover:text-gray-400 flex-shrink-0 transition-colors"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ExercicesClient({ modules, totalExercises }: ExercicesClientProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const { isLoaded, getExerciseStatus, progress } = useProgress();

  const completedCount = isLoaded ? progress.completedExercises.length : 0;
  const progressPercent =
    totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  const scrollToModule = useCallback((id: number) => {
    document.getElementById(`module-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  // Build display data: apply sort + filter per module
  const displayModules = modules
    .map((mod) => {
      const withStatus = mod.exercises.map((ex) => ({
        ...ex,
        isDone: isLoaded
          ? getExerciseStatus(ex.moduleId, ex.lessonId) === "done"
          : false,
      }));

      // Sort: todo first, done last (only meaningful after hydration)
      const sorted = isLoaded
        ? [...withStatus].sort((a, b) => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0))
        : withStatus;

      // Filter
      const filtered =
        filter === "all"
          ? sorted
          : filter === "todo"
          ? sorted.filter((e) => !e.isDone)
          : sorted.filter((e) => e.isDone);

      return {
        ...mod,
        exercises: filtered,
        doneCount: withStatus.filter((e) => e.isDone).length,
        totalCount: withStatus.length,
      };
    })
    .filter((mod) => mod.exercises.length > 0);

  return (
    <div>
      {/* ── Global progress ───────────────────────────────────────────────── */}
      <ScrollReveal>
      <div className="mb-8 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
        <div className="flex items-center justify-between mb-2.5 text-sm">
          <span className="text-gray-300 font-medium">Progression exercices</span>
          <span className="text-gray-400">
            {isLoaded ? completedCount : "—"} / {totalExercises} terminés
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700"
            style={{ width: `${isLoaded ? progressPercent : 0}%` }}
          />
        </div>
        {isLoaded && completedCount === totalExercises && totalExercises > 0 && (
          <p className="text-xs text-green-400 mt-2">
            🎉 Tous les exercices terminés !
          </p>
        )}
      </div>
      </ScrollReveal>

      {/* ── Quick nav ─────────────────────────────────────────────────────── */}
      <ScrollReveal delay={80}>
      <div className="mb-6 flex flex-wrap gap-2">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => scrollToModule(mod.id)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            M{String(mod.id).padStart(2, "0")}
          </button>
        ))}
      </div>
      </ScrollReveal>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <ScrollReveal delay={140}>
      <div className="mb-8 flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
        {(
          [
            { value: "all", label: "Tous" },
            { value: "todo", label: "À faire" },
            { value: "done", label: "Terminés" },
          ] as { value: Filter; label: string }[]
        ).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === value
                ? "bg-white/10 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      </ScrollReveal>

      {/* ── Modules ───────────────────────────────────────────────────────── */}
      {displayModules.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          {filter === "done"
            ? "Aucun exercice terminé pour l'instant."
            : "Tous les exercices sont terminés."}
        </div>
      ) : (
        <div className="space-y-12">
          {displayModules.map((mod, index) => (
            <ScrollReveal key={mod.id} delay={index * 60}>
            <section id={`module-${mod.id}`} className="scroll-mt-20">
              {/* Module header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-mono font-bold text-orange-400/70 bg-orange-500/10 border border-orange-500/15 rounded-lg px-2.5 py-1">
                  M{String(mod.id).padStart(2, "0")}
                </span>
                <h2 className="text-base font-semibold text-white flex-1 leading-snug">
                  {mod.title}
                </h2>
                <span className="text-xs text-gray-600 flex-shrink-0">
                  {isLoaded ? `${mod.doneCount}/${mod.totalCount}` : `${mod.totalCount}`}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mod.exercises.map((ex) => (
                  <ExerciseCard
                    key={`${ex.moduleId}-${ex.lessonId}`}
                    item={ex}
                    isDone={ex.isDone}
                  />
                ))}
              </div>
            </section>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
