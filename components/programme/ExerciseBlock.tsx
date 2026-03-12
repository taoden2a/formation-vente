"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckIcon } from "@/components/ui/Icons";

interface ExerciseBlockProps {
  exerciseId: string;
  title: string;
  description: string;
  className?: string;
}

const EXERCISES_STORAGE_KEY = "cpv_exercises";

interface ExerciseData {
  response: string;
  isCompleted: boolean;
  completedAt?: number;
}

// Exercise icon SVG
function ExerciseIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

export function ExerciseBlock({
  exerciseId,
  title,
  description,
  className = "",
}: ExerciseBlockProps) {
  const [response, setResponse] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedAnimation, setShowSavedAnimation] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXERCISES_STORAGE_KEY);
      if (stored) {
        const allExercises = JSON.parse(stored);
        const exercise = allExercises[exerciseId] as ExerciseData | undefined;
        if (exercise) {
          setResponse(exercise.response || "");
          setIsCompleted(exercise.isCompleted || false);
        }
      }
    } catch {
      // If error, start empty
    }
  }, [exerciseId]);

  // Save to localStorage
  const saveExercise = useCallback(
    (newResponse: string, completed: boolean) => {
      setIsSaving(true);
      try {
        const stored = localStorage.getItem(EXERCISES_STORAGE_KEY);
        const allExercises = stored ? JSON.parse(stored) : {};
        allExercises[exerciseId] = {
          response: newResponse,
          isCompleted: completed,
          completedAt: completed ? Date.now() : undefined,
        };
        localStorage.setItem(EXERCISES_STORAGE_KEY, JSON.stringify(allExercises));

        // Show saved animation
        setShowSavedAnimation(true);
        setTimeout(() => setShowSavedAnimation(false), 1500);
      } catch {
        // Storage full or unavailable
      }
      setIsSaving(false);
    },
    [exerciseId]
  );

  // Debounced save for response
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (response) {
        saveExercise(response, isCompleted);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [response, isCompleted, saveExercise]);

  const handleMarkComplete = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    saveExercise(response, newCompleted);
  };

  return (
    <div className={`exercise-block rounded-2xl p-6 space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="exercise-icon-container w-10 h-10 rounded-xl flex items-center justify-center">
            <ExerciseIcon size={20} className="text-orange-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="exercise-badge px-2.5 py-0.5 rounded-full text-xs font-medium">
                Exercice
              </span>
              {isCompleted && (
                <span className="text-xs text-green-400">Terminé</span>
              )}
            </div>
            <h4 className="text-lg font-semibold text-white mt-1">{title}</h4>
          </div>
        </div>

        {/* Completion indicator */}
        <button
          onClick={handleMarkComplete}
          className={`exercise-complete-btn flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 ${
            isCompleted
              ? "bg-green-500/20 border-green-500/40"
              : "bg-white/5 border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30"
          }`}
        >
          <CheckIcon
            size={18}
            className={`transition-all duration-400 ${
              isCompleted ? "text-green-400" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

      {/* Response textarea */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">
          Votre réponse
        </label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Écrivez votre réponse ici..."
          rows={5}
          className="exercise-textarea w-full p-4 rounded-xl text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showSavedAnimation && (
            <span className="exercise-saved-indicator text-xs text-green-400 animate-fade-in">
              Sauvegardé
            </span>
          )}
          {isSaving && (
            <span className="text-xs text-gray-500">Sauvegarde...</span>
          )}
        </div>

        <button
          onClick={() => saveExercise(response, isCompleted)}
          className="exercise-save-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        >
          Sauvegarder mon travail
        </button>
      </div>
    </div>
  );
}
