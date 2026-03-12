/**
 * PAGE EXERCICES - SERVER COMPONENT
 *
 * Affiche tous les exercices de la formation.
 * Données importées depuis lib/server/programme-content.ts (server-only).
 * Accès vérifié par le layout parent (/app/(formation)/layout.tsx).
 */

import Link from "next/link";
import { getAllExercises } from "@/lib/server/programme-content";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Exercices | Comprendre pour Vendre",
  description: "Exercices pratiques de la formation Comprendre pour Vendre",
};

export default function ExercicesPage() {
  const exercises = getAllExercises();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>

        <BackgroundAnimated variant="dark">
          <main className="max-w-4xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                href="/formation"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Formation
              </Link>
            </div>

            {/* Hero */}
            <ScrollReveal>
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span className="text-sm font-medium text-orange-300">{exercises.length} exercices</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Exercices pratiques
                </h1>
                <p className="text-gray-400">
                  Récapitulatif de tous les exercices de la formation.
                </p>
              </div>
            </ScrollReveal>

            {/* Exercises list */}
            <div className="space-y-4">
              {exercises.map((item, index) => (
                <ScrollReveal key={`${item.moduleId}-${item.lessonId}`} delay={index * 0.04}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-white/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {item.exercise.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                          {item.exercise.description}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                            Module {item.moduleId}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.moduleTitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </main>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
