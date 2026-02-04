'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const mockExercises = [
  {
    id: 'ex1',
    title: 'Identifier les biais dans la publicité',
    description: 'Analysez 5 publicités et identifiez les biais cognitifs utilisés',
    type: 'Analyse',
    module: 'Les biais cognitifs',
    difficulty: 'Facile',
    duration: 20,
  },
  {
    id: 'ex2',
    title: 'Créer un message utilisant l\'ancrage',
    description: 'Rédigez un message de vente en utilisant le biais d\'ancrage de manière éthique',
    type: 'Application',
    module: 'Les biais cognitifs',
    difficulty: 'Moyen',
    duration: 30,
  },
  {
    id: 'ex3',
    title: 'Raconter l\'histoire de votre marque',
    description: 'Structurez l\'histoire de votre marque avec le modèle du voyage du héros',
    type: 'Création',
    module: 'Storytelling',
    difficulty: 'Avancé',
    duration: 45,
  },
]

export default function ExercicesPage() {
  const [filterType, setFilterType] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')

  const filteredExercises = mockExercises.filter(ex => {
    if (filterType !== 'all' && ex.type !== filterType) return false
    if (filterDifficulty !== 'all' && ex.difficulty !== filterDifficulty) return false
    return true
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pedagogy-orange-500 to-pedagogy-orange-600 text-white py-12">
        <div className="container-width">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Exercices pratiques</h1>
            <p className="text-pedagogy-orange-100 text-lg">
              Mettez en pratique ce que vous apprenez avec des exercices concrets
            </p>
          </div>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="space-y-8">
          {/* Filtres */}
          <Card>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type d'exercice</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:border-pedagogy-orange-500 focus:ring-2 focus:ring-pedagogy-orange-500 focus:ring-opacity-20 outline-none"
                >
                  <option value="all">Tous les types</option>
                  <option value="Analyse">Analyse</option>
                  <option value="Application">Application</option>
                  <option value="Création">Création</option>
                  <option value="Réflexion">Réflexion</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Difficulté</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:border-pedagogy-orange-500 focus:ring-2 focus:ring-pedagogy-orange-500 focus:ring-opacity-20 outline-none"
                >
                  <option value="all">Toutes les difficultés</option>
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Liste des exercices */}
          <div className="grid gap-6">
            {filteredExercises.map((exercise) => (
              <Link key={exercise.id} href={`/membre/exercices/${exercise.id}`}>
                <Card hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pedagogy-orange-100 flex items-center justify-center group-hover:bg-pedagogy-orange-200 transition">
                      <span className="text-2xl">✍️</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold group-hover:text-pedagogy-orange-600 transition">
                          {exercise.title}
                        </h3>
                        <Badge variant="default" className="flex-shrink-0">{exercise.difficulty}</Badge>
                      </div>
                      <p className="text-gray-600">{exercise.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Badge variant="default" className="bg-pedagogy-blue-100 text-pedagogy-blue-700">
                          {exercise.module}
                        </Badge>
                        <Badge variant="default">{exercise.type}</Badge>
                        <span className="text-gray-500">⏱️ {exercise.duration} min</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-gray-500">Aucun exercice ne correspond à vos filtres</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
