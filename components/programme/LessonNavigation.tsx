"use client";

import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@/components/ui/Icons";
import type { LessonStatus } from "@/hooks/useProgress";

// Clock icon for in-progress state
function ClockIcon({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

interface LessonNavigationProps {
  currentModule: number;
  currentLesson: number;
  totalLessons: number;
  lessonTitle: string;
  lessonStatus: LessonStatus;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleStatus: () => void;
}

export function LessonNavigation({
  currentModule,
  currentLesson,
  totalLessons,
  lessonTitle,
  lessonStatus,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onToggleStatus,
}: LessonNavigationProps) {
  return (
    <div className="lesson-navigation sticky bottom-0 left-0 right-0 z-20">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4">
          {/* Previous button */}
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              hasPrevious
                ? "bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white"
                : "bg-white/5 text-gray-600 cursor-not-allowed"
            }`}
          >
            <ChevronLeftIcon size={18} />
            <span className="hidden sm:inline text-sm font-medium">Précédent</span>
          </button>

          {/* Center - Lesson info */}
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 mb-0.5">
              Module {currentModule} • Leçon {currentLesson}/{totalLessons}
            </p>
            <p className="text-sm font-medium text-gray-300 truncate max-w-xs mx-auto">
              {lessonTitle}
            </p>
          </div>

          {/* Right side - Status toggle & Next */}
          <div className="flex items-center gap-2">
            {/* 3-state toggle button: todo -> in_progress -> completed -> todo */}
            <button
              onClick={onToggleStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                lessonStatus === "completed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : lessonStatus === "in_progress"
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
                  : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
              }`}
            >
              {lessonStatus === "completed" && <CheckIcon size={16} />}
              {lessonStatus === "in_progress" && <ClockIcon size={16} />}
              {lessonStatus === "todo" && <span className="w-4 h-4 rounded-full border-2 border-current" />}
              <span className="hidden sm:inline text-sm font-medium">
                {lessonStatus === "completed" && "Terminé"}
                {lessonStatus === "in_progress" && "En cours"}
                {lessonStatus === "todo" && "À faire"}
              </span>
            </button>

            {/* Next button */}
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                hasNext
                  ? "bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline text-sm font-medium">Suivant</span>
              <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
