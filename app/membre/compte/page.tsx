'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ComptePage() {
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  // TODO: Récupérer les vraies données utilisateur
  const mockUser = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    enrolledDate: '15 janvier 2024',
    invoiceUrl: '/factures/invoice-2024-01-15.pdf',
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pedagogy-blue-500 to-pedagogy-blue-600 text-white py-12">
        <div className="container-width">
          <h1 className="text-4xl font-bold">Mon compte</h1>
        </div>
      </section>

      <div className="container-width section-spacing">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Informations personnelles */}
          <Card>
            <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Nom</label>
                <input
                  type="text"
                  value={mockUser.name}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                <input
                  type="email"
                  value={mockUser.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Inscrit depuis</label>
                <input
                  type="text"
                  value={mockUser.enrolledDate}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </Card>

          {/* Mot de passe */}
          <Card>
            <h2 className="text-2xl font-bold mb-6">Sécurité</h2>
            {!isEditingPassword ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mot de passe</p>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
                <Button variant="secondary" onClick={() => setIsEditingPassword(true)}>
                  Modifier
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pedagogy-blue-500 focus:ring-2 focus:ring-pedagogy-blue-500 focus:ring-opacity-20 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pedagogy-blue-500 focus:ring-2 focus:ring-pedagogy-blue-500 focus:ring-opacity-20 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pedagogy-blue-500 focus:ring-2 focus:ring-pedagogy-blue-500 focus:ring-opacity-20 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="primary">Enregistrer</Button>
                  <Button variant="secondary" onClick={() => setIsEditingPassword(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Accès et factures */}
          <Card>
            <h2 className="text-2xl font-bold mb-6">Accès et facturation</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium">Type d&apos;accès</p>
                  <p className="text-sm text-gray-600">Accès à vie</p>
                </div>
                <span className="px-3 py-1 bg-pedagogy-green-100 text-pedagogy-green-700 rounded-full text-sm font-medium">
                  Actif
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Facture</p>
                  <p className="text-sm text-gray-600">Téléchargez votre facture d&apos;achat</p>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <a href={mockUser.invoiceUrl} download>
                    Télécharger
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Programme d'affiliation */}
          <Card className="bg-gradient-to-br from-pedagogy-orange-50 to-white border-2 border-pedagogy-orange-200">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Programme d&apos;affiliation</h3>
              <p className="text-gray-600">
                Recommandez la formation et gagnez 20% de commission sur chaque vente.
              </p>
              <Button variant="action" asChild>
                <a href="/membre/affiliation">Accéder au programme d&apos;affiliation</a>
              </Button>
            </div>
          </Card>

          {/* Déconnexion */}
          <div className="text-center pt-4">
            <Button variant="secondary">Se déconnecter</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
