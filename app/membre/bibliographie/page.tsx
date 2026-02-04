'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const mockBibliography = [
  {
    id: 'bib1',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    type: 'Livre',
    description: 'Ouvrage fondamental sur les biais cognitifs et la prise de décision',
    year: 2011,
    url: null,
  },
  {
    id: 'bib2',
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert Cialdini',
    type: 'Livre',
    description: 'Les 6 principes universels de persuasion expliqués par un expert',
    year: 1984,
    url: null,
  },
  {
    id: 'bib3',
    title: 'Predictably Irrational',
    author: 'Dan Ariely',
    type: 'Livre',
    description: 'Comment nous prenons des décisions irrationnelles de manière prévisible',
    year: 2008,
    url: null,
  },
  {
    id: 'bib4',
    title: 'The Science of Persuasion',
    author: 'Robert Cialdini',
    type: 'Article',
    description: 'Article scientifique résumant les principes de persuasion',
    year: 2001,
    url: 'https://example.com',
  },
]

export default function BibliographiePage() {
  const [filterType, setFilterType] = useState<string>('all')

  const filteredBiblio = mockBibliography.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false
    return true
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pedagogy-yellow-400 to-pedagogy-yellow-500 text-gray-900 py-12">
        <div className="container-width">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Bibliographie</h1>
            <p className="text-gray-700 text-lg">
              Sources, références et ressources pour approfondir vos connaissances
            </p>
          </div>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="space-y-8">
          {/* Filtres */}
          <Card>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type de ressource</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:border-pedagogy-yellow-400 focus:ring-2 focus:ring-pedagogy-yellow-400 focus:ring-opacity-20 outline-none"
              >
                <option value="all">Tous les types</option>
                <option value="Livre">Livres</option>
                <option value="Article">Articles</option>
                <option value="Étude">Études</option>
                <option value="Vidéo">Vidéos</option>
              </select>
            </div>
          </Card>

          {/* Liste bibliographie */}
          <div className="grid gap-4">
            {filteredBiblio.map((item) => (
              <Card key={item.id} className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pedagogy-yellow-100 flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.author} • {item.year}
                        </p>
                      </div>
                      <Badge variant="default">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-700">{item.description}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-pedagogy-blue-600 hover:text-pedagogy-blue-700 hover:underline inline-flex items-center gap-1"
                      >
                        Accéder à la ressource →
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
