/**
 * PAGE FORMATION - SERVER COMPONENT
 *
 * Hub central de la formation. Tous les modules, leçons et exercices.
 * Contenu premium importé depuis lib/server/programme-content.ts (server-only).
 * Objectifs importés depuis lib/programme-preview.ts (public, safe).
 * Accès vérifié par le layout parent (/app/(formation)/layout.tsx).
 */

import { programModules, getTotalLessons } from "@/lib/server/programme-content";
import { programPreview } from "@/lib/programme-preview";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { SommaireClient } from "./SommaireClient";

export const metadata = {
  title: "Formation | Comprendre pour Vendre",
  description: "Accès complet à la formation Comprendre pour Vendre — modules, leçons et exercices.",
};

export default function FormationPage() {
  const totalLessons = getTotalLessons();

  // Données allégées pour le sommaire — pas de contenu de leçon
  const modules = programModules.map((mod) => {
    const preview = programPreview.find((p) => p.id === mod.id);
    return {
      id: mod.id,
      title: mod.title,
      objective: preview?.objective ?? "",
      lessons: mod.lessons.map((lesson) => ({
        id: lesson.id,
        lessonKey: `${mod.id}-${lesson.id}`,
        title: lesson.title,
      })),
      exercises: mod.lessons
        .filter((l) => !!l.exercise)
        .map((l) => ({
          lessonKey: `${mod.id}-${l.id}`,
          lessonTitle: l.title,
          title: l.exercise!.title,
          description: l.exercise!.description,
        })),
    };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark">
          <SommaireClient modules={modules} totalLessons={totalLessons} />
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
