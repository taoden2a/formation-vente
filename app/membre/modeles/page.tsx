'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const mockTemplates = [
  {
    id: 'tmp1',
    title: 'Checklist des biais cognitifs',
    description: 'Liste complète des 20 biais cognitifs avec exemples et utilisation éthique',
    category: 'Guide',
    module: 'Les biais cognitifs',
    format: 'PDF',
  },
  {
    id: 'tmp2',
    title: 'Structure de page de vente',
    description: 'Template de page de vente éthique avec tous les éléments essentiels',
    category: 'Template',
    module: 'Processus de vente',
    format: 'Document',
  },
  {
    id: 'tmp3',
    title: 'Framework de storytelling',
    description: 'Structure pour raconter votre histoire de marque de manière impactante',
    category: 'Framework',
    module: 'Storytelling',
    format: 'Document',
  },
]

export default function ModelesPage() {
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredTemplates = mockTemplates.filter(tmp => {
    if (filterCategory !== 'all' && tmp.category !== filterCategory) return false
    return true
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pedagogy-blue-500 to-pedagogy-blue-600 text-white py-12">
        <div className="container-width">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Modèles et templates</h1>
            <p className="text-pedagogy-blue-100 text-lg">
              Des ressources prêtes à l&apos;emploi pour appliquer immédiatement
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
                className="px-4 py-2 rounded-xl border border-gray-300 focus:border-pedagogy-blue-500 focus:ring-2 focus:ring-pedagogy-blue-500 focus:ring-opacity-20 outline-none"
              >
                <option value="all">Toutes les catégories</option>
                <option value="Guide">Guides</option>
                <option value="Template">Templates</option>
                <option value="Framework">Frameworks</option>
                <option value="Checklist">Checklists</option>
              </select>
            </div>
          </Card>

          {/* Liste des modèles */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} hover className="group space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center group-hover:bg-pedagogy-blue-200 transition">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-pedagogy-blue-600 transition">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="bg-pedagogy-blue-100 text-pedagogy-blue-700">
                    {template.module}
                  </Badge>
                  <Badge variant="default">{template.category}</Badge>
                  <Badge variant="default">{template.format}</Badge>
                </div>

                <Button variant="primary" size="sm" fullWidth>
                  Télécharger
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
