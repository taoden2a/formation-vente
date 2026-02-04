'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'

// TODO: Récupérer depuis la base de données
const mockLesson = {
  id: '4',
  title: 'Le biais de rareté',
  slug: 'biais-rarete',
  moduleTitle: 'Les biais cognitifs et leur utilisation éthique',
  moduleSlug: 'biais-cognitifs-ethique',
  objective: 'Comprendre le biais de rareté, son fonctionnement psychologique, et apprendre à l\'utiliser de manière éthique pour mettre en valeur une offre limitée sans créer d\'urgence artificielle.',
  duration: 22,
  order: 4,
  previousLesson: { title: 'La preuve sociale', slug: 'preuve-sociale' },
  nextLesson: { title: 'L\'effet de halo', slug: 'effet-halo' },
  isCompleted: false,
}

const mockUserNotes = 'Mes notes sur cette leçon...'

export default function LessonPage({ params }: { params: { slug: string } }) {
  const [notes, setNotes] = useState(mockUserNotes)
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [isCompleted, setIsCompleted] = useState(mockLesson.isCompleted)

  const handleSaveNotes = async () => {
    setIsSavingNotes(true)
    // TODO: Sauvegarder les notes dans la base de données
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSavingNotes(false)
  }

  const handleMarkAsCompleted = async () => {
    setIsCompleted(!isCompleted)
    // TODO: Mettre à jour le statut dans la base de données
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-width">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Link href="/membre" className="hover:text-pedagogy-blue-600 transition">
                Formation
              </Link>
              <span>→</span>
              <Link href={`/membre/module/${mockLesson.moduleSlug}`} className="hover:text-pedagogy-blue-600 transition">
                {mockLesson.moduleTitle}
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-medium">Leçon {mockLesson.order}</span>
            </div>

            <Badge variant={isCompleted ? 'completed' : 'in-progress'}>
              {isCompleted ? '✓ Terminée' : 'En cours'}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Titre et objectif */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{mockLesson.title}</h1>

            <PedagogyBox color="blue" title="Objectif de cette leçon">
              <p>{mockLesson.objective}</p>
              <p className="text-sm text-gray-600 mt-2">⏱️ Temps de lecture estimé : {mockLesson.duration} minutes</p>
            </PedagogyBox>
          </div>

          {/* Contenu de la leçon */}
          <Card>
            <div className="prose prose-lg max-w-none space-y-6">
              {/* Introduction */}
              <div>
                <h2>Qu'est-ce que le biais de rareté ?</h2>
                <p>
                  Le biais de rareté (ou "scarcity bias" en anglais) est un biais cognitif qui nous pousse à accorder
                  plus de valeur à quelque chose quand nous percevons qu'il est rare, limité ou en voie de disparition.
                </p>
                <p>
                  Ce biais trouve son origine dans notre évolution : nos ancêtres devaient rapidement saisir les
                  opportunités rares (nourriture, eau, abri) sous peine de les perdre définitivement. Aujourd'hui,
                  ce mécanisme subsiste et influence nos décisions d'achat.
                </p>
              </div>

              {/* Point théorique */}
              <PedagogyBox color="blue" title="La psychologie derrière le biais">
                <p>
                  Deux mécanismes psychologiques expliquent ce biais :
                </p>
                <ul className="space-y-2 mt-3">
                  <li>
                    <strong>La réactance psychologique :</strong> Quand notre liberté est menacée (possibilité
                    de perdre quelque chose), nous voulons encore plus cette chose pour restaurer notre liberté.
                  </li>
                  <li>
                    <strong>L'heuristique de rareté :</strong> Notre cerveau utilise un raccourci mental simple :
                    "Si c'est rare, c'est probablement précieux." C'est souvent vrai, mais pas toujours.
                  </li>
                </ul>
              </PedagogyBox>

              {/* Point clé / Attention */}
              <PedagogyBox color="yellow" title="⚠️ Point critique : Rareté réelle vs artificielle">
                <p>
                  C'est ici que se joue la frontière entre éthique et manipulation.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-pedagogy-green-50 border-l-4 border-pedagogy-green-500 rounded">
                    <p className="font-semibold text-pedagogy-green-800 mb-2">✓ Rareté éthique (réelle)</p>
                    <ul className="text-sm space-y-1">
                      <li>• Places limitées par contrainte physique</li>
                      <li>• Stock réellement limité</li>
                      <li>• Offre temporaire avec raison valable</li>
                      <li>• Édition limitée authentique</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="font-semibold text-red-800 mb-2">✗ Rareté manipulatrice (artificielle)</p>
                    <ul className="text-sm space-y-1">
                      <li>• "Plus que 3 places" qui se renouvellent</li>
                      <li>• Faux compte à rebours qui recommence</li>
                      <li>• "Offre expire dans 10 minutes" sans raison</li>
                      <li>• Stock "limité" mais illimité</li>
                    </ul>
                  </div>
                </div>
              </PedagogyBox>

              {/* Exemple concret */}
              <div>
                <h3>Exemples concrets</h3>

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div>
                    <h4 className="font-semibold text-pedagogy-green-700 mb-2">
                      ✓ Exemple éthique : Les sneakers en édition limitée
                    </h4>
                    <p className="text-sm">
                      Les marques comme Nike ou Adidas sortent des modèles en vraie édition limitée. Elles
                      annoncent clairement la quantité produite (ex: 1000 paires), expliquent pourquoi c'est
                      limité (collaboration unique avec un artiste), et ne reproduisent pas le modèle ensuite.
                      La rareté est réelle et transparente.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-red-700 mb-2">
                      ✗ Exemple manipulateur : Les fausses urgences e-commerce
                    </h4>
                    <p className="text-sm">
                      Un site affiche "Plus que 2 en stock !" mais cette mention apparaît toujours, peu importe
                      quand vous visitez. Un compte à rebours "L'offre expire dans 15:00" recommence à chaque
                      visite. Ces techniques créent une fausse urgence pour forcer la décision.
                    </p>
                  </div>
                </div>
              </div>

              {/* Application pratique */}
              <PedagogyBox color="orange" title="Comment l'utiliser de manière éthique">
                <p className="mb-3">Si vous voulez utiliser le biais de rareté sans manipuler :</p>
                <ol className="space-y-3">
                  <li>
                    <strong>1. Créez une vraie rareté</strong> : Limitez réellement votre offre pour une raison
                    valable (votre temps, votre capacité de production, exclusivité voulue).
                  </li>
                  <li>
                    <strong>2. Soyez transparent</strong> : Expliquez pourquoi c'est limité. Les gens apprécient
                    l'honnêteté.
                  </li>
                  <li>
                    <strong>3. Donnez du temps</strong> : Évitez les urgences de dernière minute. Prévenez à
                    l'avance quand une offre va se terminer.
                  </li>
                  <li>
                    <strong>4. Tenez parole</strong> : Si vous dites "édition limitée", ne reproduisez pas
                    l'offre la semaine suivante. Votre crédibilité en dépend.
                  </li>
                </ol>
              </PedagogyBox>

              {/* Résumé */}
              <PedagogyBox color="green" title="📝 Résumé de la leçon">
                <ul className="space-y-2">
                  <li>✓ Le biais de rareté nous fait valoriser ce qui est limité ou rare</li>
                  <li>✓ Il vient de notre évolution et de deux mécanismes : réactance et heuristique</li>
                  <li>✓ La différence éthique cruciale : rareté réelle vs artificielle</li>
                  <li>✓ Pour l'utiliser éthiquement : vraie limitation + transparence + temps + parole tenue</li>
                </ul>
              </PedagogyBox>
            </div>
          </Card>

          {/* Exercice */}
          <Card className="border-l-4 border-pedagogy-orange-500">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>✍️</span>
              Exercice pratique
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Analysez votre propre offre :</strong>
              </p>
              <ol className="space-y-2 text-gray-700">
                <li>1. Votre produit ou service a-t-il une rareté naturelle ? (Temps limité, places limitées, stock réel...)</li>
                <li>2. Si oui, comment pouvez-vous la communiquer de manière transparente ?</li>
                <li>3. Si non, y a-t-il un moyen de créer une vraie rareté éthique ? (Édition spéciale, bonus temporaire...)</li>
              </ol>
              <p className="text-sm text-gray-600 italic">
                Prenez le temps de noter vos réflexions dans la zone de notes ci-dessous.
              </p>
            </div>
          </Card>

          {/* Zone de notes personnelles */}
          <Card className="bg-pedagogy-yellow-50 border-2 border-pedagogy-yellow-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>📝</span>
              Vos notes personnelles
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Prenez des notes, répondez aux exercices ou notez vos réflexions. Vos notes sont privées
                et sauvegardées automatiquement.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleSaveNotes}
                className="w-full h-48 px-4 py-3 rounded-xl border border-pedagogy-yellow-300 focus:border-pedagogy-yellow-500 focus:ring-2 focus:ring-pedagogy-yellow-500 focus:ring-opacity-20 outline-none transition resize-none bg-white"
                placeholder="Écrivez vos notes ici..."
              />
              {isSavingNotes && (
                <p className="text-sm text-pedagogy-green-600">💾 Notes sauvegardées...</p>
              )}
            </div>
          </Card>

          {/* Navigation et actions */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <div>
              {mockLesson.previousLesson && (
                <Link href={`/membre/lecon/${mockLesson.previousLesson.slug}`}>
                  <Button variant="secondary">
                    ← Leçon précédente : {mockLesson.previousLesson.title}
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={isCompleted ? 'secondary' : 'success'}
                onClick={handleMarkAsCompleted}
              >
                {isCompleted ? '✓ Marquée comme terminée' : 'Marquer comme terminée'}
              </Button>

              {mockLesson.nextLesson && (
                <Link href={`/membre/lecon/${mockLesson.nextLesson.slug}`}>
                  <Button variant="primary">
                    Leçon suivante : {mockLesson.nextLesson.title} →
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Retour au module */}
          <div className="text-center pt-4">
            <Link
              href={`/membre/module/${mockLesson.moduleSlug}`}
              className="text-pedagogy-blue-600 hover:text-pedagogy-blue-700 hover:underline"
            >
              ← Retour au module : {mockLesson.moduleTitle}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
