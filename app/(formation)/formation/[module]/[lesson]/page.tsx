/**
 * PAGE LEÇON - SERVER COMPONENT
 *
 * Route : /formation/[module]/[lesson]
 * Ex : /formation/1/2 = Module 1, Leçon 2
 *
 * Contenu premium importé depuis lib/server/programme-content.ts (server-only).
 * Accès vérifié par le layout parent (/app/(formation)/layout.tsx).
 */

import { notFound } from "next/navigation";
import { programModules, getTotalLessons, getTotalExercises } from "@/lib/server/programme-content";
import { LessonClient } from "./LessonClient";

interface PageProps {
  params: { module: string; lesson: string };
}

export default function LessonPage({ params }: PageProps) {
  const moduleId = parseInt(params.module, 10);
  const lessonId = parseInt(params.lesson, 10);

  if (isNaN(moduleId) || isNaN(lessonId)) {
    notFound();
  }

  const mod = programModules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const lessonIdx = mod.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIdx === -1) notFound();

  const lesson = mod.lessons[lessonIdx];
  const totalLessons = getTotalLessons();
  const totalExercises = getTotalExercises();

  const moduleLessons = mod.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    hasExercise: !!l.exercise,
  }));

  // ── Calcul prev / next ─────────────────────────────────────────────────────
  type NavLesson = { href: string; title: string } | null;

  let prevLesson: NavLesson = null;
  let nextLesson: NavLesson = null;

  // Précédent : leçon précédente dans le même module, ou dernière du module précédent
  if (lessonIdx > 0) {
    const prev = mod.lessons[lessonIdx - 1];
    prevLesson = { href: `/formation/${moduleId}/${prev.id}`, title: prev.title };
  } else {
    // Chercher le module précédent qui a des leçons
    for (let m = moduleId - 1; m >= 1; m--) {
      const prevMod = programModules.find((mod) => mod.id === m);
      if (prevMod && prevMod.lessons.length > 0) {
        const last = prevMod.lessons[prevMod.lessons.length - 1];
        prevLesson = { href: `/formation/${m}/${last.id}`, title: last.title };
        break;
      }
    }
  }

  // Suivant : leçon suivante dans le même module, ou première du module suivant
  if (lessonIdx < mod.lessons.length - 1) {
    const next = mod.lessons[lessonIdx + 1];
    nextLesson = { href: `/formation/${moduleId}/${next.id}`, title: next.title };
  } else {
    // Chercher le module suivant qui a des leçons
    const maxModuleId = Math.max(...programModules.map((m) => m.id));
    for (let m = moduleId + 1; m <= maxModuleId; m++) {
      const nextMod = programModules.find((mod) => mod.id === m);
      if (nextMod && nextMod.lessons.length > 0) {
        const first = nextMod.lessons[0];
        nextLesson = { href: `/formation/${m}/${first.id}`, title: first.title };
        break;
      }
    }
  }

  return (
    <LessonClient
      moduleId={moduleId}
      moduleTitle={mod.title}
      lessonId={lessonId}
      title={lesson.title}
      description={lesson.description}
      content={lesson.content ?? []}
      takeaways={lesson.takeaways}
      exercise={lesson.exercise ?? null}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      totalLessons={totalLessons}
      totalExercises={totalExercises}
      moduleLessons={moduleLessons}
    />
  );
}
