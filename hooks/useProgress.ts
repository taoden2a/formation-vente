"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cpv_progress";

export type LessonStatus = "todo" | "in_progress" | "completed";

export interface ProgressData {
  currentModule: number;
  currentLesson: number;
  completedLessons: string[]; // Format: "module-lesson" e.g., "1-3"
  inProgressLessons: string[]; // New: Lessons marked as "in progress"
  progressPercent: number;
  lastVisitedAt: number;
}

const defaultProgress: ProgressData = {
  currentModule: 1,
  currentLesson: 1,
  completedLessons: [],
  inProgressLessons: [],
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
        // Ensure inProgressLessons exists for backward compatibility
        if (!parsed.inProgressLessons) {
          parsed.inProgressLessons = [];
        }
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
    (moduleIndex: number, lessonIndex: number, totalLessons: number) => {
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

      const newPercent = Math.round((newCompleted.length / totalLessons) * 100);

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
    (moduleIndex: number, lessonIndex: number, totalLessons: number) => {
      const lessonKey = `${moduleIndex}-${lessonIndex}`;
      if (progress.completedLessons.includes(lessonKey)) return;

      let newCompleted = [...progress.completedLessons, lessonKey];
      let newInProgress = progress.inProgressLessons.filter((k) => k !== lessonKey);
      const newPercent = Math.round((newCompleted.length / totalLessons) * 100);

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
    resetProgress,
  };
}
