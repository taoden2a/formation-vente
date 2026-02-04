'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const mockCaseStudies = [
  {
    id: 'cs1',
    title: 'Comment Amazon utilise les biais cognitifs',
    description: 'Analyse détaillée des techniques de persuasion d\'Amazon : preuve sociale, rareté, urgence',
    category: 'E-commerce',
    module: 'Les biais cognitifs',
    tags: ['Preuve sociale', 'Rareté', 'Ancrage'],
  },
  {
    id: 'cs2',
    title: 'La campagne Dove "Real Beauty"',
    description: 'Comment Dove a créé une connexion émotionnelle authentique avec son audience',
    category: 'Marketing',
    module: 'Storytelling',
    tags: ['Storytelling', 'Émotion', 'Authenticité'],
  },
  {
    id: 'cs3',
    title: 'Apple et le positionnement premium',
    description: 'Stratégie de communication et justification du prix élevé',
    category: 'Tech',
    module: 'Créer de la valeur',
    tags: ['Positionnement', 'Valeur', 'Premium'],
  },
]

export default function EtudesDeCasPage() {
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredCases = mockCaseStudies.filter(cs => {
    if (filterCategory !== 'all' && cs.category !== filterCategory) return false
    return true
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pedagogy-green-500 to-pedagogy-green-600 text-white py-12">
        <div className="container-width">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Études de cas</h1>
            <p className="text-pedagogy-green-100 text-lg">
              Exemples réels de stratégies de persuasion analysées en profondeur
            </p>
          </div>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="space-y-8">
          {/* Filtres */}
          <Card>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Catégorie</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:border-pedagogy-green-500 focus:ring-2 focus:ring-pedagogy-green-500 focus:ring-opacity-20 outline-none"
              >
                <option value="all">Toutes les catégories</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Marketing">Marketing</option>
                <option value="Tech">Tech</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </Card>

          {/* Liste des études de cas */}
          <div className="grid gap-6">
            {filteredCases.map((caseStudy) => (
              <Link key={caseStudy.id} href={`/membre/etudes-de-cas/${caseStudy.id}`}>
                <Card hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pedagogy-green-100 flex items-center justify-center group-hover:bg-pedagogy-green-200 transition">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold group-hover:text-pedagogy-green-600 transition">
                        {caseStudy.title}
                      </h3>
                      <p className="text-gray-600">{caseStudy.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default" className="bg-pedagogy-green-100 text-pedagogy-green-700">
                          {caseStudy.category}
                        </Badge>
                        <Badge variant="default" className="bg-pedagogy-blue-100 text-pedagogy-blue-700">
                          {caseStudy.module}
                        </Badge>
                        {caseStudy.tags.map((tag, i) => (
                          <Badge key={i} variant="default">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
