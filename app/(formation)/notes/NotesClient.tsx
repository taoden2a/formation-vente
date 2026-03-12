"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { programPreview, type ModulePreview } from "@/lib/programme-preview";

const NOTES_PREFIX = "lesson_notes_";

interface NoteEntry {
  key: string;
  moduleId: number;
  lessonId: number;
  moduleTitle: string;
  lessonTitle: string;
  content: string;
}

function buildLessonMap(modules: ModulePreview[]) {
  const map = new Map<string, { moduleId: number; moduleTitle: string; lessonId: number; lessonTitle: string }>();
  modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      map.set(`${NOTES_PREFIX}${mod.id}_${lesson.id}`, {
        moduleId: mod.id,
        moduleTitle: mod.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
      });
    });
  });
  return map;
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function NotesClient() {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lessonMap = buildLessonMap(programPreview);
    const found: NoteEntry[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(NOTES_PREFIX)) continue;

      const content = localStorage.getItem(key) || "";
      if (!content.trim()) continue;

      const info = lessonMap.get(key);
      if (!info) continue;

      found.push({ key, content, ...info });
    }

    // Sort by module then lesson
    found.sort((a, b) => a.moduleId !== b.moduleId ? a.moduleId - b.moduleId : a.lessonId - b.lessonId);
    setNotes(found);
    setIsLoaded(true);
  }, []);

  // Group by module
  const grouped = notes.reduce<Record<number, NoteEntry[]>>((acc, note) => {
    if (!acc[note.moduleId]) acc[note.moduleId] = [];
    acc[note.moduleId].push(note);
    return acc;
  }, {});

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <p className="text-gray-400 mb-2">Aucune note enregistrée.</p>
        <p className="text-gray-600 text-sm mb-6">Ouvrez une leçon et commencez à prendre des notes.</p>
        <Link
          href="/formation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium hover:bg-orange-500/20 transition-colors"
        >
          Accéder à la formation
          <ArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([moduleIdStr, moduleNotes]) => {
        const moduleId = parseInt(moduleIdStr);
        const moduleTitle = moduleNotes[0].moduleTitle;

        return (
          <div key={moduleId}>
            {/* Module header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">
                {String(moduleId).padStart(2, "0")}
              </span>
              <h2 className="text-base font-semibold text-white">{moduleTitle}</h2>
              <span className="text-xs text-gray-600 ml-1">
                {moduleNotes.length} note{moduleNotes.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              {moduleNotes.map((note) => (
                <div
                  key={note.key}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-sm font-medium text-gray-300 leading-snug">
                      Leçon {note.lessonId} — {note.lessonTitle}
                    </p>
                    <Link
                      href={`/formation/${note.moduleId}/${note.lessonId}`}
                      className="flex items-center gap-1.5 text-xs text-orange-400/80 hover:text-orange-300 transition-colors flex-shrink-0 hover:underline"
                    >
                      Aller à la leçon
                      <ArrowRight />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-sm leading-7 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
