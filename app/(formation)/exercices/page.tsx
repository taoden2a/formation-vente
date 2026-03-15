/**
 * PAGE EXERCICES - SERVER COMPONENT
 *
 * Affiche tous les exercices groupés par module.
 * Données importées depuis lib/server/programme-content.ts (server-only).
 * Accès vérifié par le layout parent (/app/(formation)/layout.tsx).
 */

import Link from "next/link";
import { getAllExercises, getTotalExercises } from "@/lib/server/programme-content";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ExercicesClient } from "./ExercicesClient";

export const metadata = {
  title: "Exercices | Comprendre pour Vendre",
  description: "Exercices pratiques de la formation Comprendre pour Vendre",
};

export default function ExercicesPage() {
  const allExercises = getAllExercises();
  const totalExercises = getTotalExercises();

  // Group exercises by module (preserves order from programModules)
  const moduleMap = new Map<number, { id: number; title: string; exercises: typeof allExercises }>();
  for (const ex of allExercises) {
    if (!moduleMap.has(ex.moduleId)) {
      moduleMap.set(ex.moduleId, { id: ex.moduleId, title: ex.moduleTitle, exercises: [] });
    }
    moduleMap.get(ex.moduleId)!.exercises.push(ex);
  }
  const modules = Array.from(moduleMap.values());

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark">
          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
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
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span className="text-sm font-medium text-orange-300">{totalExercises} exercices</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Exercices pratiques
                </h1>
                <p className="text-gray-400">
                  {modules.length} modules · Trouvez un exercice en 3 secondes.
                </p>
              </div>
            </ScrollReveal>

            {/* Client: progress + quick-nav + filters + grouped grid */}
            <ExercicesClient modules={modules} totalExercises={totalExercises} />
          </main>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
