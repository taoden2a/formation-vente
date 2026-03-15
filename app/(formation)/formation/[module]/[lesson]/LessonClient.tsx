"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { BackNav } from "@/components/ui/BackNav";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLesson    { href: string; title: string }
interface Exercise     { title: string; description: string }
interface ModuleLesson { id: number; title: string; hasExercise: boolean }

interface Props {
  moduleId: number;
  moduleTitle: string;
  lessonId: number;
  title: string;
  description: string;
  content: string[];
  takeaways: string[];
  exercise: Exercise | null;
  prevLesson: NavLesson | null;
  nextLesson: NavLesson | null;
  totalLessons: number;
  totalExercises: number;
  moduleLessons: ModuleLesson[];
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function parseSection(text: string): { title: string | null; body: string } {
  const idx = text.indexOf(" : ");
  if (idx > 0 && idx < 90) {
    const candidate = text.slice(0, idx);
    if (!candidate.includes(".") && candidate.length < 80) {
      return { title: candidate, body: text.slice(idx + 3) };
    }
  }
  return { title: null, body: text };
}

function estimateReadingTime(content: string[], takeaways: string[]): number {
  const words = [...content, ...takeaways].join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContentSection({ text }: { text: string }) {
  const { title, body } = parseSection(text);
  return (
    <div className="space-y-2">
      {title && <h3 className="text-white font-semibold text-[15px]">{title}</h3>}
      <p className="text-gray-300 leading-8 text-[15px]">{body}</p>
    </div>
  );
}

function LessonStatusDot({
  status,
  current,
}: {
  status: "todo" | "in_progress" | "completed";
  current?: boolean;
}) {
  if (status === "completed") {
    return (
      <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 text-green-400">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    );
  }
  if (current || status === "in_progress") {
    return <span className="w-4 h-4 rounded-full bg-orange-500/30 border border-orange-500/50 flex-shrink-0" />;
  }
  return <span className="w-4 h-4 rounded-full bg-white/10 border border-white/10 flex-shrink-0" />;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LessonClient({
  moduleId,
  moduleTitle,
  lessonId,
  title,
  description,
  content,
  takeaways,
  exercise,
  prevLesson,
  nextLesson,
  totalLessons,
  totalExercises,
  moduleLessons,
}: Props) {
  const { progress, isLoaded, toggleLessonStatus, getLessonStatus, getModuleProgress } = useProgress();
  const [note, setNote] = useState("");
  const hasAutoMarked = useRef(false);

  const noteKey = `lesson_notes_${moduleId}_${lessonId}`;

  useEffect(() => {
    const saved = localStorage.getItem(noteKey);
    if (saved) setNote(saved);
  }, [noteKey]);

  useEffect(() => {
    if (!isLoaded || hasAutoMarked.current) return;
    hasAutoMarked.current = true;
    const s = getLessonStatus(moduleId, lessonId);
    if (s === "todo") toggleLessonStatus(moduleId, lessonId, totalLessons, totalExercises);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const handleNoteBlur = () => {
    try { localStorage.setItem(noteKey, note); } catch { /* ignore */ }
  };

  const status         = isLoaded ? getLessonStatus(moduleId, lessonId) : "todo";
  const globalPercent  = isLoaded ? progress.progressPercent : 0;
  const completedCount = isLoaded ? progress.completedLessons.length : 0;
  const modulePercent  = isLoaded ? getModuleProgress(moduleId, moduleLessons.length) : 0;

  const completedInModule = isLoaded
    ? moduleLessons.filter((l) => getLessonStatus(moduleId, l.id) === "completed").length
    : 0;

  const moduleHasExercise = moduleLessons.some((l) => l.hasExercise);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readingTime = useMemo(() => estimateReadingTime(content, takeaways), []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-10">

        {/* Back nav */}
        <BackNav
          items={[
            { label: "Formation", href: "/formation" },
            { label: moduleTitle },
            { label: title },
          ]}
        />

        {/* 3-column grid — mobile: 1 col | md: 2 col (content + notes) | lg: 3 col */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[320px_minmax(0,700px)_260px] gap-6 items-start">

          {/* ── CENTER — Lesson content ── order-1 mobile, col-1 at md, col-2 at lg */}
          <main className="order-1 md:col-start-1 md:row-start-1 lg:col-start-2 lg:row-start-1 w-full">

            {/* Module badge */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
                {String(moduleId).padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-500 truncate">{moduleTitle}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">{title}</h1>

            {/* Status button */}
            <button
              onClick={() => toggleLessonStatus(moduleId, lessonId, totalLessons, totalExercises)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 mb-6 md:mb-10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
                status === "completed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/25"
                  : status === "in_progress"
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {status === "completed" ? (
                <><CheckIcon /> Leçon terminée</>
              ) : status === "in_progress" ? (
                <><span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" /> Marquer comme terminée</>
              ) : (
                <><span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Marquer comme terminée</>
              )}
            </button>

            {/* Objectif */}
            {description && (
              <section className="mb-10">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Objectif de la leçon</p>
                <p className="text-gray-200 text-base leading-8 border-l-2 border-orange-500/40 pl-4 italic">
                  {description}
                </p>
              </section>
            )}

            <div className="border-t border-white/10 mb-10" />

            {/* Contenu */}
            {content.length > 0 && (
              <section className="space-y-6 mb-12">
                {content.map((para, i) => (
                  <ContentSection key={i} text={para} />
                ))}
              </section>
            )}

            {/* Points clés */}
            {takeaways.length > 0 && (
              <section className="mb-10">
                <div className="bg-green-500/[0.08] border border-green-500/20 rounded-2xl p-6">
                  <h2 className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    Points clés à retenir
                  </h2>
                  <ul className="space-y-3">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-gray-200 leading-7">
                        <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-green-400">
                          <CheckIcon />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Question de réflexion */}
            {exercise && (
              <section className="mb-10">
                <div className="bg-blue-500/[0.05] border border-blue-500/15 rounded-2xl p-6">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                    Question de réflexion
                  </p>
                  <h3 className="text-white font-semibold text-base mb-2">{exercise.title}</h3>
                  <p className="text-gray-300 text-[15px] leading-7">{exercise.description}</p>
                </div>
              </section>
            )}

            <div className="border-t border-white/10 mb-10" />

            {/* Progression globale */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${globalPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">{completedCount}/{totalLessons}</span>
              <span className="text-xs font-semibold text-orange-400 flex-shrink-0">{globalPercent}%</span>
            </div>

            {/* Prev / Next */}
            <div className="grid grid-cols-2 gap-3">
              {prevLesson ? (
                <Link
                  href={prevLesson.href}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <ArrowLeft />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 mb-0.5">Précédent</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{prevLesson.title}</div>
                  </div>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link
                  href={nextLesson.href}
                  className="flex items-center justify-end gap-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group text-right"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 mb-0.5">Suivant</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{nextLesson.title}</div>
                  </div>
                  <ArrowRight />
                </Link>
              ) : (
                <Link
                  href="/formation"
                  className="flex items-center justify-end gap-2 px-4 py-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 group text-right"
                >
                  <div>
                    <div className="text-xs text-orange-400/70 mb-0.5">Formation terminée</div>
                    <div className="text-sm text-orange-300">Retour au sommaire</div>
                  </div>
                  <ArrowRight />
                </Link>
              )}
            </div>

          </main>

          {/* ── LEFT — Notes ── order-3 mobile, col-2/row-1 at md (sticky right panel), col-1 at lg */}
          <aside className="order-3 md:col-start-2 md:row-start-1 lg:col-start-1 lg:row-start-1 md:sticky md:top-16 lg:h-[calc(100vh-4rem)]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:flex lg:flex-col lg:h-full">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Notes de la leçon
              </h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={handleNoteBlur}
                placeholder="Notez vos réflexions ici…"
                rows={8}
                className="flex-1 min-h-0 w-full px-3 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10 focus:bg-white/[0.06] outline-none resize-none transition-all duration-200 text-sm leading-7"
              />
              <p className="text-xs text-gray-600 mt-2 flex-shrink-0">Sauvegarde automatique</p>
            </div>
          </aside>

          {/* ── RIGHT — Module nav ── order-2 mobile, col-span-2/row-2 at md, col-3/row-1 at lg */}
          <aside className="order-2 md:col-start-1 md:col-span-2 md:row-start-2 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:sticky lg:top-20">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5">

              {/* Module header + progress */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">
                    {String(moduleId).padStart(2, "00")}
                  </span>
                  <span className="text-sm font-medium text-white leading-snug truncate">{moduleTitle}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{completedInModule} / {moduleLessons.length} leçons terminées</span>
                  <span className="text-orange-400 font-medium">{modulePercent}%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${modulePercent}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* Lesson list */}
              <div className="space-y-0.5 lg:max-h-72 lg:overflow-y-auto">
                {moduleLessons.map((l) => {
                  const lStatus   = isLoaded ? getLessonStatus(moduleId, l.id) : "todo";
                  const isCurrent = l.id === lessonId;
                  return (
                    <Link
                      key={l.id}
                      href={`/formation/${moduleId}/${l.id}`}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors text-sm ${
                        isCurrent
                          ? "bg-orange-500/10 border border-orange-500/20 text-orange-300"
                          : "hover:bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <LessonStatusDot status={lStatus} current={isCurrent} />
                      <span className="truncate flex-1 leading-snug">{l.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-white/10" />

              {/* Reading time */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Temps de lecture : {readingTime} min
              </div>

              {/* Exercise link */}
              {exercise ? (
                <Link
                  href={`/exercices/${moduleId}/${lessonId}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-300 text-sm hover:bg-orange-500/15 hover:border-orange-500/40 transition-all duration-200 hover:-translate-y-0.5 font-medium"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Faire l&apos;exercice
                </Link>
              ) : moduleHasExercise ? (
                <Link
                  href="/exercices"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-orange-500/5 border border-orange-500/15 text-orange-300/80 text-sm hover:bg-orange-500/10 hover:border-orange-500/30 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Exercices du module
                </Link>
              ) : null}

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
