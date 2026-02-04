import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ProgrammePage() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Programme détaillé de la formation</h1>
            <p className="text-xl text-gray-600">
              7 modules complets • 45+ leçons détaillées • Exercices pratiques • Modèles prêts à l'emploi
            </p>
          </div>
        </div>
      </section>

      {/* Modules détaillés */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-5xl mx-auto space-y-12">
            {programModules.map((module, moduleIndex) => (
              <Card key={moduleIndex} className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-pedagogy-blue-600">
                      {String(moduleIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                      <p className="text-gray-600">{module.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Badge variant="default">{module.lessons} leçons</Badge>
                      <Badge variant="default">{module.duration}</Badge>
                      <Badge variant="default">{module.exercises} exercices</Badge>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold mb-3">Objectifs d'apprentissage :</h4>
                      <ul className="space-y-2">
                        {module.objectives.map((objective, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-pedagogy-green-500 mt-1">✓</span>
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {module.deliverables && (
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-3">Livrables :</h4>
                        <ul className="space-y-2">
                          {module.deliverables.map((deliverable, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-pedagogy-orange-500">→</span>
                              <span className="text-gray-700">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4">
                      <details className="group">
                        <summary className="cursor-pointer text-pedagogy-blue-600 font-medium hover:text-pedagogy-blue-700">
                          Voir le détail des leçons ({module.lessons})
                        </summary>
                        <div className="mt-4 space-y-2 pl-4 border-l-2 border-gray-200">
                          {module.lessonsList?.map((lesson, i) => (
                            <div key={i} className="text-gray-600 text-sm">
                              Leçon {i + 1} : {lesson}
                            </div>
                          ))}
                          {!module.lessonsList && (
                            <p className="text-sm text-gray-500 italic">
                              Contenu détaillé accessible après inscription
                            </p>
                          )}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2>Prêt à commencer ?</h2>
            <p className="text-lg text-gray-600">
              Accès immédiat à tous les modules • Paiement unique • Accès à vie
            </p>
            <Button variant="action" size="lg" asChild>
              <Link href="/#prix">Accéder à la formation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const programModules = [
  {
    title: 'Fondations : Comprendre la psychologie de la persuasion',
    description: 'Les bases essentielles pour comprendre comment les humains prennent des décisions et comment vous pouvez influencer positivement ce processus.',
    lessons: 6,
    duration: '2h30',
    exercises: 5,
    objectives: [
      'Comprendre les mécanismes de prise de décision humaine',
      'Identifier les différents types de motivations d\'achat',
      'Distinguer influence éthique et manipulation',
      'Maîtriser les 6 principes de persuasion de Cialdini',
    ],
    deliverables: [
      'Carte mentale des motivations d\'achat',
      'Grille d\'analyse de votre audience cible',
    ],
    lessonsList: [
      'Introduction : Influence vs Manipulation',
      'Comment le cerveau prend des décisions',
      'Les 3 niveaux de motivation',
      'Les 6 principes universels de persuasion',
      'Le rôle des émotions dans l\'achat',
      'Synthèse et exercice d\'application',
    ],
  },
  {
    title: 'Les biais cognitifs et leur utilisation éthique',
    description: 'Découverte approfondie des biais cognitifs les plus puissants et comment les utiliser de manière éthique pour faciliter la prise de décision.',
    lessons: 8,
    duration: '3h',
    exercises: 8,
    objectives: [
      'Identifier et comprendre les 20 biais cognitifs principaux',
      'Savoir quand et comment utiliser chaque biais',
      'Reconnaître les utilisations éthiques vs manipulatrices',
      'Intégrer les biais dans votre communication',
    ],
    deliverables: [
      'Guide de référence des biais cognitifs',
      'Checklist d\'application éthique',
    ],
  },
  {
    title: 'L\'art du storytelling et de la communication',
    description: 'Maîtrisez l\'art de raconter des histoires qui captivent, résonnent et persuadent votre audience.',
    lessons: 7,
    duration: '2h45',
    exercises: 6,
    objectives: [
      'Structurer une histoire persuasive avec le modèle du voyage du héros',
      'Créer des messages qui résonnent émotionnellement',
      'Adapter votre communication à différents profils',
      'Utiliser les métaphores et analogies efficacement',
    ],
    deliverables: [
      'Template de structure narrative',
      'Bibliothèque d\'histoires type',
    ],
  },
  {
    title: 'Créer de la valeur et la communiquer',
    description: 'Apprenez à identifier la vraie valeur de votre offre et à la communiquer de manière convaincante.',
    lessons: 6,
    duration: '2h30',
    exercises: 7,
    objectives: [
      'Identifier les véritables bénéfices de votre offre',
      'Transformer des caractéristiques en bénéfices',
      'Créer et présenter votre proposition de valeur unique',
      'Positionner votre prix comme un investissement',
    ],
    deliverables: [
      'Votre proposition de valeur unique',
      'Matrice bénéfices/objections',
    ],
  },
  {
    title: 'Le processus de vente éthique',
    description: 'Construisez un processus de vente complet qui convertit naturellement, sans forcer ni manipuler.',
    lessons: 7,
    duration: '3h15',
    exercises: 9,
    objectives: [
      'Structurer un tunnel de vente éthique',
      'Créer du contenu qui éduque et qualifie',
      'Mettre en place un système de nurturing',
      'Optimiser chaque étape du parcours client',
    ],
    deliverables: [
      'Votre tunnel de vente complet',
      'Séquence d\'emails de nurturing',
    ],
  },
  {
    title: 'Objections, négociation et closing',
    description: 'Gérez les objections avec élégance, négociez avec intégrité et concluez des ventes dans le respect mutuel.',
    lessons: 6,
    duration: '2h30',
    exercises: 8,
    objectives: [
      'Anticiper et prévenir les objections principales',
      'Répondre aux objections sans être défensif',
      'Négocier en créant de la valeur pour les deux parties',
      'Closer avec confiance et authenticité',
    ],
    deliverables: [
      'Scripts de réponse aux objections',
      'Framework de négociation',
    ],
  },
  {
    title: 'Marketing de contenu et croissance long terme',
    description: 'Créez une machine de marketing de contenu qui attire, éduque et convertit votre audience naturellement.',
    lessons: 7,
    duration: '3h',
    exercises: 6,
    objectives: [
      'Créer une stratégie de contenu alignée avec votre tunnel',
      'Produire du contenu qui positionne votre expertise',
      'Optimiser pour le SEO et la viralité éthique',
      'Mesurer et optimiser vos performances',
    ],
    deliverables: [
      'Calendrier éditorial 3 mois',
      'Templates de contenus performants',
    ],
  },
]
