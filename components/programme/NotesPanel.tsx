"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { NotesIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

interface NotesPanelProps {
  lessonKey: string;
  lessonTitle?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const NOTES_STORAGE_KEY = "cpv_notes";
const DEBOUNCE_DELAY = 600;

// Icons
function DownloadIcon({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ChevronDownSmallIcon({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// File type icons
function PDFIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function TXTIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function MDIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2l1 2 1-2h2" />
    </svg>
  );
}

function DOCXIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 13l1.5 6 1.5-4 1.5 4 1.5-6" />
    </svg>
  );
}

export function NotesPanel({
  lessonKey,
  lessonTitle = "Leçon en cours",
  isCollapsed,
  onToggleCollapse
}: NotesPanelProps) {
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [showSavedGlow, setShowSavedGlow] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const prevLessonKey = useRef(lessonKey);

  // Calculate word count
  useEffect(() => {
    const words = notes.trim() ? notes.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [notes]);

  // Load notes from localStorage when lesson changes
  useEffect(() => {
    if (lessonKey !== prevLessonKey.current) {
      setIsTransitioning(true);
      setTimeout(() => {
        loadNotes();
        prevLessonKey.current = lessonKey;
        setIsTransitioning(false);
      }, 200);
    } else {
      loadNotes();
    }
  }, [lessonKey]);

  const loadNotes = () => {
    try {
      const stored = localStorage.getItem(NOTES_STORAGE_KEY);
      if (stored) {
        const allNotes = JSON.parse(stored);
        setNotes(allNotes[lessonKey] || "");
      } else {
        setNotes("");
      }
      setIsSaved(true);
    } catch {
      setNotes("");
    }
  };

  // Save notes to localStorage
  const saveNotes = useCallback(
    (content: string) => {
      try {
        const stored = localStorage.getItem(NOTES_STORAGE_KEY);
        const allNotes = stored ? JSON.parse(stored) : {};
        allNotes[lessonKey] = content;
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));
        setIsSaved(true);

        // Show glow animation
        setShowSavedGlow(true);
        setTimeout(() => setShowSavedGlow(false), 1500);
      } catch {
        // Storage full or unavailable
      }
    },
    [lessonKey]
  );

  // Debounced save
  useEffect(() => {
    if (isSaved) return;

    const timeout = setTimeout(() => {
      saveNotes(notes);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [notes, isSaved, saveNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setIsSaved(false);
  };

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format lesson key for display
  const formatLessonKey = (key: string) => {
    const parts = key.split("-");
    return `Module ${parts[0]}, Leçon ${parts[1]}`;
  };

  // Export functions
  const getExportHeader = () => {
    const date = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      title: "Comprendre pour Vendre - Mes Notes",
      lesson: lessonTitle,
      location: formatLessonKey(lessonKey),
      date,
      wordCount,
    };
  };

  const exportToPDF = () => {
    const header = getExportHeader();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${header.title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 40px;
              line-height: 1.8;
              color: #1a1a1a;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { font-size: 24px; margin-bottom: 8px; color: #0f172a; }
            h2 { font-size: 18px; color: #3b82f6; margin-top: 0; margin-bottom: 4px; }
            .meta {
              color: #64748b;
              font-size: 14px;
              margin-bottom: 32px;
              padding-bottom: 16px;
              border-bottom: 2px solid #e2e8f0;
            }
            .content { white-space: pre-wrap; font-size: 16px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>${header.title}</h1>
          <h2>${header.lesson}</h2>
          <div class="meta">
            ${header.location}<br>
            ${header.wordCount} mots &bull; Export&eacute; le ${header.date}
          </div>
          <div class="content">${notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    setIsExportOpen(false);
  };

  const exportToTXT = () => {
    const header = getExportHeader();
    const content = `${header.title}
${header.lesson}
${header.location}
${header.wordCount} mots | Exporté le ${header.date}

${"=".repeat(50)}

${notes}
`;
    downloadFile(content, `notes-${lessonKey}.txt`, "text/plain");
    setIsExportOpen(false);
  };

  const exportToMarkdown = () => {
    const header = getExportHeader();
    const content = `# ${header.title}

## ${header.lesson}

**${header.location}**
*${header.wordCount} mots | Exporté le ${header.date}*

---

${notes}
`;
    downloadFile(content, `notes-${lessonKey}.md`, "text/markdown");
    setIsExportOpen(false);
  };

  const exportToDOCX = () => {
    // Simple HTML-based DOCX export (browsers will offer to open in Word)
    const header = getExportHeader();
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
        <head><meta charset="UTF-8"><title>${header.title}</title></head>
        <body>
          <h1>${header.title}</h1>
          <h2 style="color:#3b82f6">${header.lesson}</h2>
          <p style="color:#64748b">${header.location}<br>${header.wordCount} mots | Exporté le ${header.date}</p>
          <hr>
          <p style="white-space:pre-wrap">${notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </body>
      </html>
    `;
    downloadFile(htmlContent, `notes-${lessonKey}.doc`, "application/msword");
    setIsExportOpen(false);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Notes panel width: w-80 = 320px
  const NOTES_WIDTH = 320;

  return (
    <>
      {/* Fixed toggle button - always visible, outside scroll flow */}
      <button
        onClick={onToggleCollapse}
        className={`notes-toggle-fixed panel-toggle-btn panel-toggle-btn-notes`}
        aria-label={isCollapsed ? "Déplier les notes" : "Replier les notes"}
        style={{
          right: isCollapsed ? "12px" : `${NOTES_WIDTH - 22}px`,
        }}
      >
        {isCollapsed ? <ChevronLeftIcon size={20} /> : <ChevronRightIcon size={20} />}
      </button>

      {/* Notes panel */}
      <aside
        className={`notes-panel flex-shrink-0 h-screen sticky top-0 overflow-hidden flex flex-col ${
          isCollapsed ? "notes-collapsed w-0" : "w-80"
        } ${showSavedGlow ? "notes-panel-saved" : ""}`}
      >
        <div className="w-80 h-full flex flex-col">
          <div className="p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <NotesIcon size={18} className="text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Mes notes</h3>
              </div>
              <div className="flex items-center gap-2">
                {!isSaved && (
                  <span className="text-xs text-orange-400 animate-pulse">Sauvegarde...</span>
                )}
                {isSaved && showSavedGlow && (
                  <span className="notes-saved-text text-xs text-green-400">Sauvegardé</span>
                )}
              </div>
            </div>

            {/* Lesson indicator */}
            <div className="mb-4 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-300 truncate">
                Notes liées à : <span className="font-medium text-blue-200">{lessonTitle}</span>
              </p>
            </div>

            {/* Notes textarea with transition */}
            <div className={`flex-1 relative transition-opacity duration-200 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
              <textarea
                value={notes}
                onChange={handleChange}
                placeholder="Prenez des notes sur cette leçon..."
                className="notes-textarea w-full h-full resize-none p-4 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none"
              />
            </div>

            {/* Footer with word count and export */}
            <div className="mt-4 space-y-3">
              {/* Word count */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-gray-500">
                  {wordCount} {wordCount === 1 ? "mot" : "mots"}
                </span>
                <span className="text-xs text-gray-600">Auto-save ({DEBOUNCE_DELAY}ms)</span>
              </div>

              {/* Export dropdown */}
              <div ref={exportRef} className="relative">
                <button
                  onClick={() => setIsExportOpen(!isExportOpen)}
                  disabled={!notes.trim()}
                  className={`notes-export-btn w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    notes.trim()
                      ? "bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <DownloadIcon size={14} />
                  <span>Exporter mes notes</span>
                  <ChevronDownSmallIcon
                    size={14}
                    className={`transition-transform duration-200 ${isExportOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute bottom-full left-0 right-0 mb-2 py-2 rounded-xl bg-[#1a1a24] border border-white/10 shadow-xl transition-all duration-200 ${
                    isExportOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <button
                    onClick={exportToPDF}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <PDFIcon />
                    <span>PDF (impression)</span>
                  </button>
                  <button
                    onClick={exportToDOCX}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <DOCXIcon />
                    <span>Word (.doc)</span>
                  </button>
                  <button
                    onClick={exportToTXT}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <TXTIcon />
                    <span>Texte brut (.txt)</span>
                  </button>
                  <button
                    onClick={exportToMarkdown}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <MDIcon />
                    <span>Markdown (.md)</span>
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500">
                  Chaque leçon a son propre espace de notes. Elles sont sauvegardées automatiquement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
