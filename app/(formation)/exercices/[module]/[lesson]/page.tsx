/**
 * PAGE EXERCICE — SERVER COMPONENT
 *
 * Route : /exercices/[module]/[lesson]
 * Ex : /exercices/1/3 = Module 1, Leçon 3 (exercice associé)
 *
 * Contenu premium importé depuis lib/server (server-only).
 * Corrections importées depuis lib/server/exercise-corrections.ts (server-only).
 * Accès vérifié par le layout parent (/app/(formation)/layout.tsx).
 */

import { notFound } from "next/navigation";
import { getExerciseByLesson, getTotalExercises, getTotalLessons } from "@/lib/server/programme-content";
import { exerciseCorrections } from "@/lib/server/exercise-corrections";
import { ExerciseClient } from "./ExerciseClient";

interface PageProps {
  params: { module: string; lesson: string };
}

export default function ExercisePage({ params }: PageProps) {
  const moduleId = parseInt(params.module, 10);
  const lessonId = parseInt(params.lesson, 10);

  if (isNaN(moduleId) || isNaN(lessonId)) notFound();

  const data = getExerciseByLesson(moduleId, lessonId);
  if (!data) notFound();

  const correction = exerciseCorrections[`${moduleId}-${lessonId}`] ?? null;
  const totalExercises = getTotalExercises();
  const totalLessons = getTotalLessons();

  return (
    <ExerciseClient
      moduleId={moduleId}
      lessonId={lessonId}
      moduleTitle={data.moduleTitle}
      lessonTitle={data.lessonTitle}
      exercise={data.exercise}
      correction={correction}
      totalLessons={totalLessons}
      totalExercises={totalExercises}
    />
  );
}
