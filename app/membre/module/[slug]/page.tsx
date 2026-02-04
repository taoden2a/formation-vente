import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'

// TODO: Récupérer les données depuis la base avec Prisma selon le slug
const mockModule = {
  id: '2',
  title: 'Les biais cognitifs et leur utilisation éthique',
  slug: 'biais-cognitifs-ethique',
  description: 'Découvrez les 20 biais cognitifs les plus puissants et apprenez à les utiliser de manière éthique pour faciliter la prise de décision.',
  objectives: [
    'Identifier et comprendre les 20 biais cognitifs principaux',
    'Savoir quand et comment utiliser chaque biais',
    'Reconnaître les utilisations éthiques vs manipulatrices',
    'Intégrer les biais dans votre communication',
  ],
  duration: 180,
  order: 2,
  progress: 38,
  lessons: [
    { id: '1', title: 'Introduction aux biais cognitifs', slug: 'introduction-biais-cognitifs', status: 'completed', duration: 20 },
    { id: '2', title: 'Le biais d\'ancrage', slug: 'biais-ancrage', status: 'completed', duration: 25 },
    { id: '3', title: 'La preuve sociale', slug: 'preuve-sociale', status: 'completed', duration: 20 },
    { id: '4', title: 'Le biais de rareté', slug: 'biais-rarete', status: 'in_progress', duration: 22 },
    { id: '5', title: 'L\'effet de halo', slug: 'effet-halo', status: 'not_started', duration: 23 },
    { id: '6', title: 'Le biais de réciprocité', slug: 'biais-reciprocite', status: 'not_started', duration: 25 },
    { id: '7', title: 'L\'aversion à la perte', slug: 'aversion-perte', status: 'not_started', duration: 22 },
    { id: '8', title: 'Synthèse et application pratique', slug: 'synthese-application', status: 'not_started', duration: 23 },
  ],
  relatedExercises: [
    { id: 'ex1', title: 'Identifier les biais dans la publicité' },
    { id: 'ex2', title: 'Créer un message utilisant l\'ancrage' },
    { id: 'ex3', title: 'Analyser l\'utilisation éthique vs manipulatrice' },
  ],
  relatedCaseStudies: [
    { id: 'cs1', title: 'Comment Amazon utilise les biais cognitifs' },
    { id: 'cs2', title: 'La campagne Dove et la preuve sociale' },
  ],
  relatedTemplates: [
    { id: 'tmp1', title: 'Checklist des biais cognitifs' },
    { id: 'tmp2', title: 'Guide d\'utilisation éthique des biais' },
  ],
  sources: [
    'Thinking, Fast and Slow - Daniel Kahneman',
    'Influence: The Psychology of Persuasion - Robert Cialdini',
    'Predictably Irrational - Dan Ariely',
  ],
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const completedLessons = mockModule.lessons.filter(l => l.status === 'completed').length
  const totalLessons = mockModule.lessons.length
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const nextLesson = mockModule.lessons.find(l => l.status === 'in_progress' || l.status === 'not_started')

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header du module */}
      <section className="bg-gradient-to-r from-pedagogy-blue-500 to-pedagogy-blue-600 text-white py-12">
        <div className="container-width">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-pedagogy-blue-100 text-sm">
              <Link href="/membre" className="hover:text-white transition">
                Formation
              </Link>
              <span>→</span>
              <span>Module {mockModule.order}</span>
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-3">{mockModule.title}</h1>
              <p className="text-pedagogy-blue-100 text-lg">{mockModule.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{totalLessons}</span>
                <span className="text-pedagogy-blue-100">leçons</span>
              </div>
              <span className="text-pedagogy-blue-300">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{Math.floor(mockModule.duration / 60)}h{(mockModule.duration % 60).toString().padStart(2, '0')}</span>
                <span className="text-pedagogy-blue-100">estimées</span>
              </div>
            </div>

            <ProgressBar value={progress} showLabel />
          </div>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Objectifs */}
            <Card>
              <h2 className="text-2xl font-bold mb-4">Objectifs d&apos;apprentissage</h2>
              <PedagogyBox color="green">
                <p className="font-semibold mb-3">À la fin de ce module, vous saurez :</p>
                <ul className="space-y-2">
                  {mockModule.objectives.map((objective, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pedagogy-green-500 mt-1">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </PedagogyBox>
            </Card>

            {/* Prochain cours recommandé */}
            {nextLesson && (
              <Card className="bg-gradient-to-br from-pedagogy-orange-50 to-white border-2 border-pedagogy-orange-200">
                <div className="space-y-4">
                  <Badge variant="default" className="bg-pedagogy-orange-100 text-pedagogy-orange-700">
                    {nextLesson.status === 'in_progress' ? '📖 Continuer' : '📚 Commencer'}
                  </Badge>
                  <h3 className="text-xl font-semibold">{nextLesson.title}</h3>
                  <p className="text-sm text-gray-600">{nextLesson.duration} minutes</p>
                  <Button variant="action" asChild>
                    <Link href={`/membre/lecon/${nextLesson.slug}`}>
                      {nextLesson.status === 'in_progress' ? 'Continuer la leçon' : 'Commencer la leçon'}
                    </Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Liste des leçons */}
            <Card>
              <h2 className="text-2xl font-bold mb-6">Leçons du module</h2>
              <div className="space-y-3">
                {mockModule.lessons.map((lesson, index) => (
                  <Link key={lesson.id} href={`/membre/lecon/${lesson.slug}`}>
                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition group border border-transparent hover:border-gray-200">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pedagogy-blue-100 flex items-center justify-center group-hover:bg-pedagogy-blue-200 transition">
                        <span className="font-semibold text-pedagogy-blue-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-pedagogy-blue-600 transition">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-500">{lesson.duration} min</p>
                      </div>
                      <Badge variant={lesson.status.replace('_', '-') as any} className="text-xs">
                        {lesson.status === 'completed' && '✓'}
                        {lesson.status === 'in_progress' && '→'}
                        {lesson.status === 'not_started' && '○'}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exercices liés */}
            {mockModule.relatedExercises.length > 0 && (
              <Card>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">✍️</span>
                  Exercices
                </h3>
                <ul className="space-y-2">
                  {mockModule.relatedExercises.map((exercise) => (
                    <li key={exercise.id}>
                      <Link
                        href={`/membre/exercices/${exercise.id}`}
                        className="text-sm text-pedagogy-orange-600 hover:text-pedagogy-orange-700 hover:underline"
                      >
                        {exercise.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Études de cas */}
            {mockModule.relatedCaseStudies.length > 0 && (
              <Card>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Études de cas
                </h3>
                <ul className="space-y-2">
                  {mockModule.relatedCaseStudies.map((caseStudy) => (
                    <li key={caseStudy.id}>
                      <Link
                        href={`/membre/etudes-de-cas/${caseStudy.id}`}
                        className="text-sm text-pedagogy-green-600 hover:text-pedagogy-green-700 hover:underline"
                      >
                        {caseStudy.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Modèles */}
            {mockModule.relatedTemplates.length > 0 && (
              <Card>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Modèles
                </h3>
                <ul className="space-y-2">
                  {mockModule.relatedTemplates.map((template) => (
                    <li key={template.id}>
                      <Link
                        href={`/membre/modeles/${template.id}`}
                        className="text-sm text-pedagogy-blue-600 hover:text-pedagogy-blue-700 hover:underline"
                      >
                        {template.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Sources */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">📚</span>
                Sources
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {mockModule.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
