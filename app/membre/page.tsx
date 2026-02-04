import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'

// TODO: Récupérer ces données depuis la base de données avec Prisma
const mockUserProgress = {
  totalLessons: 45,
  completedLessons: 8,
  inProgressLessons: 2,
  currentModule: 2,
}

const mockModules = [
  {
    id: '1',
    title: 'Fondations : Comprendre la psychologie de la persuasion',
    slug: 'fondations-psychologie-persuasion',
    description: 'Les bases de la psychologie cognitive et les principes fondamentaux de l\'influence.',
    lessons: 6,
    duration: 150, // minutes
    status: 'completed' as const,
    progress: 100,
    order: 1,
  },
  {
    id: '2',
    title: 'Les biais cognitifs et leur utilisation éthique',
    slug: 'biais-cognitifs-ethique',
    description: 'Découvrez les 20 biais cognitifs les plus puissants.',
    lessons: 8,
    duration: 180,
    status: 'in_progress' as const,
    progress: 38,
    order: 2,
  },
  {
    id: '3',
    title: 'L\'art du storytelling et de la communication',
    slug: 'storytelling-communication',
    description: 'Structurer vos messages et raconter des histoires impactantes.',
    lessons: 7,
    duration: 165,
    status: 'not_started' as const,
    progress: 0,
    order: 3,
  },
  {
    id: '4',
    title: 'Créer de la valeur et la communiquer',
    slug: 'creer-valeur-communiquer',
    description: 'Identifier la vraie valeur de votre offre.',
    lessons: 6,
    duration: 150,
    status: 'not_started' as const,
    progress: 0,
    order: 4,
  },
  {
    id: '5',
    title: 'Le processus de vente éthique',
    slug: 'processus-vente-ethique',
    description: 'Construire un tunnel de vente qui convertit sans forcer.',
    lessons: 7,
    duration: 195,
    status: 'not_started' as const,
    progress: 0,
    order: 5,
  },
  {
    id: '6',
    title: 'Objections, négociation et closing',
    slug: 'objections-negociation-closing',
    description: 'Gérer les objections avec élégance et conclure des ventes.',
    lessons: 6,
    duration: 150,
    status: 'not_started' as const,
    progress: 0,
    order: 6,
  },
  {
    id: '7',
    title: 'Marketing de contenu et croissance long terme',
    slug: 'marketing-contenu-croissance',
    description: 'Créer une stratégie de contenu qui attire et convertit.',
    lessons: 7,
    duration: 180,
    status: 'not_started' as const,
    progress: 0,
    order: 7,
  },
]

export default function MembreHomePage() {
  const globalProgress = Math.round(
    (mockUserProgress.completedLessons / mockUserProgress.totalLessons) * 100
  )

  const nextRecommendedModule = mockModules.find(
    (m) => m.status === 'in_progress' || m.status === 'not_started'
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header avec progression globale */}
      <section className="bg-gradient-to-r from-pedagogy-blue-500 to-pedagogy-blue-600 text-white py-12">
        <div className="container-width">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Bienvenue dans votre formation !</h1>
              <p className="text-pedagogy-blue-100 text-lg">
                L'Art de Convaincre - Formation complète
              </p>
            </div>

            <div className="max-w-2xl">
              <ProgressBar value={globalProgress} showLabel className="mb-4" />
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{mockUserProgress.completedLessons}</span>
                  <span className="text-pedagogy-blue-100">leçons terminées</span>
                </div>
                <span className="text-pedagogy-blue-300">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{mockUserProgress.inProgressLessons}</span>
                  <span className="text-pedagogy-blue-100">en cours</span>
                </div>
                <span className="text-pedagogy-blue-300">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {mockUserProgress.totalLessons - mockUserProgress.completedLessons - mockUserProgress.inProgressLessons}
                  </span>
                  <span className="text-pedagogy-blue-100">à découvrir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message de bienvenue et liberté */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <PedagogyBox color="green" title="🎯 Vous êtes libre de naviguer comme vous le souhaitez">
              <p className="mb-3">
                Tous les modules et toutes les leçons sont <strong>accessibles immédiatement</strong>.
                Vous pouvez explorer librement selon vos besoins, votre niveau ou votre curiosité.
              </p>
              <p>
                Nous vous proposons un <strong>parcours recommandé</strong> pour une progression optimale,
                mais vous n'êtes jamais obligé de le suivre. C'est votre formation, votre rythme.
              </p>
            </PedagogyBox>

            {/* Prochain module recommandé */}
            {nextRecommendedModule && (
              <Card className="bg-gradient-to-br from-pedagogy-orange-50 to-white border-2 border-pedagogy-orange-200">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="default" className="bg-pedagogy-orange-100 text-pedagogy-orange-700 mb-3">
                        📚 Prochaine étape recommandée
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{nextRecommendedModule.title}</h3>
                      <p className="text-gray-600">{nextRecommendedModule.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{nextRecommendedModule.lessons} leçons</span>
                    <span>•</span>
                    <span>{Math.floor(nextRecommendedModule.duration / 60)}h{(nextRecommendedModule.duration % 60).toString().padStart(2, '0')}</span>
                    {nextRecommendedModule.status === 'in_progress' && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-pedagogy-blue-600">
                          {nextRecommendedModule.progress}% complété
                        </span>
                      </>
                    )}
                  </div>

                  <Button variant="action" size="lg" asChild>
                    <Link href={`/membre/module/${nextRecommendedModule.slug}`}>
                      {nextRecommendedModule.status === 'in_progress' ? 'Continuer' : 'Commencer'}
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Grille de tous les modules */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2>Tous les modules</h2>
              <div className="flex gap-2">
                <Badge variant="not-started">Non commencé</Badge>
                <Badge variant="in-progress">En cours</Badge>
                <Badge variant="completed">Terminé</Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {mockModules.map((module) => (
                <Link key={module.id} href={`/membre/module/${module.slug}`}>
                  <Card hover className="group">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center group-hover:bg-pedagogy-blue-200 transition">
                        <span className="text-2xl font-bold text-pedagogy-blue-600">
                          {String(module.order).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-pedagogy-blue-600 transition">
                              {module.title}
                            </h3>
                            <p className="text-gray-600">{module.description}</p>
                          </div>
                          <Badge variant={module.status.replace('_', '-') as any}>
                            {module.status === 'completed' && 'Terminé'}
                            {module.status === 'in_progress' && 'En cours'}
                            {module.status === 'not_started' && 'Non commencé'}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>{module.lessons} leçons</span>
                          <span>•</span>
                          <span>
                            {Math.floor(module.duration / 60)}h
                            {(module.duration % 60).toString().padStart(2, '0')}
                          </span>
                        </div>

                        {module.status !== 'not_started' && (
                          <ProgressBar value={module.progress} />
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accès rapide aux bibliothèques */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="space-y-8">
            <h2>Ressources complémentaires</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/membre/exercices">
                <Card hover className="text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-xl bg-pedagogy-orange-100 flex items-center justify-center mx-auto group-hover:bg-pedagogy-orange-200 transition">
                    <span className="text-3xl">✍️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-pedagogy-orange-600 transition">
                      Exercices
                    </h4>
                    <p className="text-sm text-gray-600">Pratiques et réflexions</p>
                  </div>
                </Card>
              </Link>

              <Link href="/membre/modeles">
                <Card hover className="text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center mx-auto group-hover:bg-pedagogy-blue-200 transition">
                    <span className="text-3xl">📋</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-pedagogy-blue-600 transition">
                      Modèles
                    </h4>
                    <p className="text-sm text-gray-600">Templates prêts à l'emploi</p>
                  </div>
                </Card>
              </Link>

              <Link href="/membre/etudes-de-cas">
                <Card hover className="text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-xl bg-pedagogy-green-100 flex items-center justify-center mx-auto group-hover:bg-pedagogy-green-200 transition">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-pedagogy-green-600 transition">
                      Études de cas
                    </h4>
                    <p className="text-sm text-gray-600">Exemples réels analysés</p>
                  </div>
                </Card>
              </Link>

              <Link href="/membre/bibliographie">
                <Card hover className="text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-xl bg-pedagogy-yellow-100 flex items-center justify-center mx-auto group-hover:bg-pedagogy-yellow-200 transition">
                    <span className="text-3xl">📚</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-pedagogy-yellow-600 transition">
                      Bibliographie
                    </h4>
                    <p className="text-sm text-gray-600">Sources et références</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
