"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cpv_progress";

export type LessonStatus = "todo" | "in_progress" | "completed";
export type ExerciseStatus = "todo" | "done";

export interface ProgressData {
  currentModule: number;
  currentLesson: number;
  completedLessons: string[]; // Format: "module-lesson" e.g., "1-3"
  inProgressLessons: string[]; // Lessons marked as "in progress"
  completedExercises: string[]; // Format: "module-lesson" e.g., "1-3"
  progressPercent: number;
  lastVisitedAt: number;
}

const defaultProgress: ProgressData = {
  currentModule: 1,
  currentLesson: 1,
  completedLessons: [],
  inProgressLessons: [],
  completedExercises: [],
  progressPercent: 0,
  lastVisitedAt: Date.now(),
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProgressData;
        // Backward compatibility guards
        if (!parsed.inProgressLessons) parsed.inProgressLessons = [];
        if (!parsed.completedExercises) parsed.completedExercises = [];
        setProgress(parsed);
      }
    } catch {
      // If error, use default
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  const saveProgress = useCallback((newProgress: ProgressData) => {
    const updated = {
      ...newProgress,
      lastVisitedAt: Date.now(),
    };
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // Dispatch custom event for cross-component sync (e.g., ProductHeader)
      window.dispatchEvent(new CustomEvent('cpv-progress-update'));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  // Navigate to specific lesson
  const goToLesson = useCallback(
    (moduleIndex: number, lessonIndex: number) => {
      saveProgress({
        ...progress,
        currentModule: moduleIndex,
        currentLesson: lessonIndex,
      });
    },
    [progress, saveProgress]
  );

  // Get lesson status
  const getLessonStatus = useCallback(
    (moduleIndex: number, lessonIndex: number): LessonStatus => {
      const lessonKey = `${moduleIndex}-${lessonIndex}`;
      if (progress.completedLessons.includes(lessonKey)) {
        return "completed";
      }
      if (progress.inProgressLessons.includes(lessonKey)) {
        return "in_progress";
      }
      return "todo";
    },
    [progress.completedLessons, progress.inProgressLessons]
  );

  // Toggle lesson status: todo -> in_progress -> completed -> todo
  const toggleLessonStatus = useCallback(
    (moduleIndex: number, lessonIndex: number, totalLessons: number, totalExercises = 0) => {
      const lessonKey = `${moduleIndex}-${lessonIndex}`;
      const currentStatus = getLessonStatus(moduleIndex, lessonIndex);

      let newCompleted = [...progress.completedLessons];
      let newInProgress = [...progress.inProgressLessons];

      switch (currentStatus) {
        case "todo":
          // Move to in_progress
          newInProgress.push(lessonKey);
          break;
        case "in_progress":
          // Move to completed
          newInProgress = newInProgress.filter((k) => k !== lessonKey);
          newCompleted.push(lessonKey);
          break;
        case "completed":
          // Back to todo
          newCompleted = newCompleted.filter((k) => k !== lessonKey);
          break;
      }

      const totalItems = totalLessons + totalExercises;
      const completedExercisesCount = totalExercises > 0 ? progress.completedExercises.length : 0;
      const newPercent = totalItems > 0
        ? Math.round(((newCompleted.length + completedExercisesCount) / totalItems) * 100)
        : 0;

      saveProgress({
        ...progress,
        completedLessons: newCompleted,
        inProgressLessons: newInProgress,
        progressPercent: newPercent,
      });
    },
    [progress, getLessonStatus, saveProgress]
  );

  // Mark lesson as complete directly (for backward compatibility)
  const completeLesson = useCallback(
    (moduleIndex: number, lessonIndex: number, totalLessons: number, totalExercises = 0) => {
      const lessonKey = `${moduleIndex}-${lessonIndex}`;
      if (progress.completedLessons.includes(lessonKey)) return;

      const newCompleted = [...progress.completedLessons, lessonKey];
      const newInProgress = progress.inProgressLessons.filter((k) => k !== lessonKey);
      const totalItems = totalLessons + totalExercises;
      const completedExercisesCount = totalExercises > 0 ? progress.completedExercises.length : 0;
      const newPercent = totalItems > 0
        ? Math.round(((newCompleted.length + completedExercisesCount) / totalItems) * 100)
        : 0;

      saveProgress({
        ...progress,
        completedLessons: newCompleted,
        inProgressLessons: newInProgress,
        progressPercent: newPercent,
      });
    },
    [progress, saveProgress]
  );

  // Check if lesson is completed (backward compatibility)
  const isLessonCompleted = useCallback(
    (moduleIndex: number, lessonIndex: number) => {
      return progress.completedLessons.includes(`${moduleIndex}-${lessonIndex}`);
    },
    [progress.completedLessons]
  );

  // Get module completion percentage
  const getModuleProgress = useCallback(
    (moduleIndex: number, lessonsInModule: number) => {
      const completed = progress.completedLessons.filter((key) =>
        key.startsWith(`${moduleIndex}-`)
      ).length;
      return lessonsInModule > 0
        ? Math.round((completed / lessonsInModule) * 100)
        : 0;
    },
    [progress.completedLessons]
  );

  // Get exercise status (binary: todo / done)
  const getExerciseStatus = useCallback(
    (moduleIndex: number, lessonIndex: number): ExerciseStatus => {
      const key = `${moduleIndex}-${lessonIndex}`;
      return progress.completedExercises.includes(key) ? "done" : "todo";
    },
    [progress.completedExercises]
  );

  // Toggle exercise status: todo <-> done
  const toggleExerciseStatus = useCallback(
    (moduleIndex: number, lessonIndex: number, totalLessons = 0, totalExercises = 0) => {
      const key = `${moduleIndex}-${lessonIndex}`;
      const isDone = progress.completedExercises.includes(key);
      const newCompleted = isDone
        ? progress.completedExercises.filter((k) => k !== key)
        : [...progress.completedExercises, key];
      const totalItems = totalLessons + totalExercises;
      const completedLessonsCount = totalLessons > 0 ? progress.completedLessons.length : 0;
      const newPercent = totalItems > 0
        ? Math.round(((completedLessonsCount + newCompleted.length) / totalItems) * 100)
        : 0;
      saveProgress({ ...progress, completedExercises: newCompleted, progressPercent: newPercent });
    },
    [progress, saveProgress]
  );

  // Reset progress
  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    isLoaded,
    goToLesson,
    completeLesson,
    toggleLessonStatus,
    getLessonStatus,
    isLessonCompleted,
    getModuleProgress,
    getExerciseStatus,
    toggleExerciseStatus,
    resetProgress,
  };
}
