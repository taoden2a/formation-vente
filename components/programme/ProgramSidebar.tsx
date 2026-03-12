"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@/components/ui/Icons";
import type { LessonStatus } from "@/hooks/useProgress";

interface Lesson {
  id: number;
  title: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface ProgramSidebarProps {
  modules: Module[];
  currentModule: number;
  currentLesson: number;
  completedLessons: string[];
  inProgressLessons?: string[];
  onSelectLesson: (moduleId: number, lessonId: number) => void;
  getModuleProgress: (moduleId: number, lessonsCount: number) => number;
  getLessonStatus?: (moduleId: number, lessonId: number) => LessonStatus;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Clock icon for in-progress state
function ClockIcon({ className = "", size = 10 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ProgramSidebar({
  modules,
  currentModule,
  currentLesson,
  completedLessons,
  inProgressLessons = [],
  onSelectLesson,
  getModuleProgress,
  getLessonStatus,
  isCollapsed,
  onToggleCollapse,
}: ProgramSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([currentModule]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getStatus = (moduleId: number, lessonId: number): LessonStatus => {
    if (getLessonStatus) {
      return getLessonStatus(moduleId, lessonId);
    }
    // Fallback for backward compatibility
    if (completedLessons.includes(`${moduleId}-${lessonId}`)) return "completed";
    if (inProgressLessons.includes(`${moduleId}-${lessonId}`)) return "in_progress";
    return "todo";
  };

  // Sidebar width: w-72 = 288px
  const SIDEBAR_WIDTH = 288;

  return (
    <>
      {/* Fixed toggle button - always visible, outside scroll flow */}
      <button
        onClick={onToggleCollapse}
        className={`sidebar-toggle-fixed panel-toggle-btn panel-toggle-btn-sidebar ${
          isCollapsed ? "sidebar-toggle-collapsed" : "sidebar-toggle-expanded"
        }`}
        aria-label={isCollapsed ? "Déplier le programme" : "Replier le programme"}
        style={{
          left: isCollapsed ? "12px" : `${SIDEBAR_WIDTH - 22}px`,
        }}
      >
        {isCollapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar-programme flex-shrink-0 h-screen sticky top-0 overflow-hidden ${
          isCollapsed ? "sidebar-collapsed w-0" : "w-72"
        }`}
      >
        <div className="w-72 h-full overflow-y-auto">
          <div className="p-6 space-y-2">
            <h2 className="text-lg font-semibold text-white mb-6">Programme</h2>

            {modules.map((module) => {
              const isExpanded = expandedModules.includes(module.id);
              const isCurrentModule = module.id === currentModule;
              const moduleProgress = getModuleProgress(module.id, module.lessons.length);

              return (
                <div key={module.id} className="module-sidebar-item">
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                      isCurrentModule
                        ? "bg-blue-500/15 border border-blue-500/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* Module number */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        moduleProgress === 100
                          ? "bg-green-500/20 text-green-400"
                          : isCurrentModule
                          ? "bg-blue-500/30 text-blue-300"
                          : "bg-white/10 text-gray-400 group-hover:bg-white/15"
                      }`}
                    >
                      {moduleProgress === 100 ? (
                        <CheckIcon size={16} className="text-green-400" />
                      ) : (
                        String(module.id).padStart(2, "0")
                      )}
                    </div>

                    {/* Module title */}
                    <div className="flex-1 text-left">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isCurrentModule ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                        }`}
                      >
                        {module.title}
                      </span>
                      {/* Progress bar */}
                      <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDownIcon
                      size={16}
                      className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Lessons list */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-6 pr-2 py-2 space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive =
                          module.id === currentModule && lesson.id === currentLesson;
                        const status = getStatus(module.id, lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(module.id, lesson.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 group ${
                              isActive
                                ? "bg-blue-500/20 text-white"
                                : "hover:bg-white/5 text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            {/* Lesson status indicator */}
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                status === "completed"
                                  ? "bg-green-500/30"
                                  : status === "in_progress"
                                  ? "bg-orange-500/30"
                                  : isActive
                                  ? "bg-blue-500/30 ring-2 ring-blue-500/50"
                                  : "bg-white/10 group-hover:bg-white/15"
                              }`}
                            >
                              {status === "completed" && (
                                <CheckIcon size={10} className="text-green-400" />
                              )}
                              {status === "in_progress" && (
                                <ClockIcon size={10} className="text-orange-400" />
                              )}
                            </div>

                            <span className="text-sm truncate">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
