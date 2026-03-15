import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import Link from "next/link";
import { programPreview, templatesPreview, programStats } from "@/lib/programme-preview";
import { getAllExercises, templates as serverTemplates } from "@/lib/server/programme-content";
import { PageTransition } from "@/components/ui/PageTransition";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * PAGE PROGRAMME - HUB GLOBAL DE LA FORMATION
 *
 * Vue d'ensemble du programme, servant de hub pour les 4 sections :
 *   - Modules & Leçons
 *   - Exercices
 *   - Templates & Ressources
 *
 * Comportement :
 * - Visiteur / Connecté sans accès  → preview marketing + overlay paywall
 * - Connecté avec accès             → contenu complet + liens actifs vers /membre/*
 *
 * Sécurité :
 * - Page Server Component : import lib/server/programme-content.ts est sûr (jamais bundlé côté client)
 * - Pour non-membres : seules les données de lib/programme-preview.ts sont utilisées
 * - Aucune redirection automatique vers /membre/*
 */

export const metadata = {
  title: "Programme | Comprendre pour Vendre",
  description: "Decouvrez le programme complet : 8 modules, 43 lecons, exercices pratiques et templates exclusifs.",
};

export default async function ProgrammePage() {
  const session = await getServerSession(authOptions);
  let hasAccess = false;

  if (session?.user) {
    const userId = (session.user as { id?: string }).id;
    if (userId) {
      hasAccess = await userHasAccess(userId);
    }
  }

  // Membres avec accès → redirigés vers la vraie zone de formation
  if (hasAccess) {
    redirect("/formation");
  }

  // Données serveur uniquement pour les membres
  const exercises = hasAccess ? getAllExercises() : [];
  const fullTemplates = hasAccess ? serverTemplates : [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">

      {/* ─── Overlay paywall (fixed) — non-membres uniquement ─── */}
      {!hasAccess && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#0a0a0f]" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="bg-[#12141a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md mx-4 text-center shadow-2xl shadow-black/50">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Acces complet a la formation
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                {programStats.modules} modules · {programStats.lessons} lecons · {programStats.exercises} exercices · {programStats.templates} templates
              </p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white">59 EUR</div>
                <div className="text-sm text-gray-500">Paiement unique · Acces a vie</div>
              </div>
              <div className="space-y-3">
                <Link
                  href="/#prix"
                  className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5"
                >
                  Commencer maintenant
                </Link>
                {!session && (
                  <Link
                    href="/connexion"
                    className="block w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-colors"
                  >
                    Deja membre ? Se connecter
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <PageTransition>
        {/* ─── Bannière membre sticky — membres uniquement ─── */}
        {hasAccess && (
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/98">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
              <span className="text-sm text-green-400 flex items-center gap-2 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Acces debloque
              </span>
              <nav className="flex items-center gap-1 overflow-x-auto">
                <Link href="/formation" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Formation
                </Link>
                <Link href="/exercices" className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Exercices
                </Link>
                <Link href="/membre" className="flex-shrink-0 ml-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 hover:bg-orange-500/20 transition-colors">
                  Tableau de bord
                </Link>
              </nav>
            </div>
          </header>
        )}

        <BackgroundAnimated variant="dark">
          <main className="max-w-5xl mx-auto px-6 py-12">

            {/* ─── Hero ─── */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  <span className="text-sm font-medium text-orange-300">Comprendre pour Vendre</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Le programme complet
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  {programStats.modules} modules progressifs pour maitriser la vente par la comprehension du cerveau humain.
                </p>
              </div>
            </ScrollReveal>

            {/* ─── Stats ─── */}
            <ScrollReveal delay={0.05}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {[
                  { value: programStats.modules, label: "Modules" },
                  { value: programStats.lessons, label: "Lecons" },
                  { value: programStats.exercises, label: "Exercices" },
                  { value: programStats.templates, label: "Templates" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* ─── Section : Modules & Leçons ─── */}
            <ScrollReveal delay={0.1}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Modules & Lecons</h2>
                {hasAccess && (
                  <Link
                    href="/formation"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    Voir toutes les lecons
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                )}
              </div>
            </ScrollReveal>

            <div className="space-y-4 mb-20">
              {programPreview.map((mod, index) => (
                <ScrollReveal key={mod.id} delay={0.12 + index * 0.03}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-lg font-bold text-orange-400">
                        {String(mod.id).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                        <p className="text-sm text-gray-500">{mod.lessons.length} lecons</p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-1">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          {hasAccess ? (
                            <Link
                              href="/formation"
                              className="text-gray-300 text-sm hover:text-orange-300 transition-colors"
                            >
                              {lesson.title}
                            </Link>
                          ) : (
                            <span className="text-gray-400 text-sm">{lesson.title}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* ─── Section : Exercices ─── */}
            <ScrollReveal delay={0.15}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Exercices pratiques</h2>
                {hasAccess && (
                  <Link
                    href="/exercices"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    Voir les {programStats.exercises} exercices
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              {hasAccess ? (
                <div className="grid sm:grid-cols-2 gap-4 mb-20">
                  {exercises.map((item) => (
                    <Link
                      key={`${item.moduleId}-${item.lessonId}`}
                      href="/exercices"
                      className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm group-hover:text-orange-300 transition-colors mb-1">
                          {item.exercise.title}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500">
                          Module {item.moduleId}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-2">{programStats.exercises} exercices pratiques</p>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Des mises en pratique concretes pour appliquer chaque concept directement sur votre activite.
                  </p>
                </div>
              )}
            </ScrollReveal>

            {/* ─── Section : Templates & Ressources ─── */}
            <ScrollReveal delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Templates & Ressources</h2>
                {hasAccess && (
                  <Link
                    href="/formation"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    Voir les {programStats.templates} templates
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.23}>
              <div className="grid md:grid-cols-3 gap-4">
                {(hasAccess ? fullTemplates : templatesPreview).map((template) => {
                  const typeColors = {
                    PDF: { bg: "bg-red-500/10", text: "text-red-400" },
                    Template: { bg: "bg-blue-500/10", text: "text-blue-400" },
                    Schema: { bg: "bg-purple-500/10", text: "text-purple-400" },
                  };
                  const colors = typeColors[template.type] ?? typeColors.Template;

                  return (
                    <div key={template.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={colors.text}>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          {hasAccess ? (
                            <Link
                              href="/formation"
                              className="text-sm font-medium text-white hover:text-orange-300 transition-colors block truncate"
                            >
                              {template.title}
                            </Link>
                          ) : (
                            <p className="text-sm font-medium text-white truncate">{template.title}</p>
                          )}
                          <p className="text-xs text-gray-500">{template.type}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Spacer pour le paywall fixe */}
            {!hasAccess && <div className="h-64" />}

          </main>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
