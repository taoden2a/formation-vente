import { Card } from '@/components/ui/Card'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AffiliationPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Programme d'affiliation</h1>
            <p className="text-xl text-gray-600">
              Recommandez la formation et recevez 20% de commission sur chaque vente
            </p>
            <PedagogyBox color="yellow" className="text-left">
              <p className="font-semibold">
                ⚠️ Le programme d'affiliation est exclusivement réservé aux clients de la formation.
              </p>
              <p className="mt-2">
                Nous voulons que nos affiliés connaissent réellement le contenu qu'ils recommandent
                et puissent en parler avec authenticité.
              </p>
            </PedagogyBox>
          </div>
        </div>
      </section>

      {/* Comment ça fonctionne */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2>Comment fonctionne le programme ?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pedagogy-blue-100 flex items-center justify-center mx-auto text-3xl">
                  1
                </div>
                <h3 className="text-xl font-semibold">Suivez la formation</h3>
                <p className="text-gray-600">
                  Une fois que vous avez acheté la formation, vous accédez automatiquement
                  au programme d'affiliation dans votre espace membre.
                </p>
              </Card>

              <Card className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pedagogy-orange-100 flex items-center justify-center mx-auto text-3xl">
                  2
                </div>
                <h3 className="text-xl font-semibold">Partagez votre lien</h3>
                <p className="text-gray-600">
                  Vous recevez un lien d'affiliation unique. Partagez-le sur vos réseaux,
                  votre blog, vos newsletters ou directement avec vos contacts.
                </p>
              </Card>

              <Card className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pedagogy-green-100 flex items-center justify-center mx-auto text-3xl">
                  3
                </div>
                <h3 className="text-xl font-semibold">Recevez vos commissions</h3>
                <p className="text-gray-600">
                  Vous touchez 20% de commission sur chaque vente générée. Les paiements
                  sont effectués mensuellement par virement.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions et commissions */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Conditions et commissions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <h3 className="text-xl font-semibold mb-4">💰 Commission</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <div>
                      <strong>20% de commission</strong> sur chaque vente (soit ~17€ par vente)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <div>
                      Paiement mensuel dès que vous atteignez <strong>50€ de commissions</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <div>
                      Cookie de <strong>60 jours</strong> : si quelqu'un clique sur votre lien, vous êtes crédité
                      même s'il achète 2 mois plus tard
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <div>
                      Remboursements déduits : en cas de remboursement client, la commission est annulée
                    </div>
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-4">📊 Tableau de bord</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-blue-500">→</span>
                    <div>
                      Suivez vos <strong>clics</strong> en temps réel
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-blue-500">→</span>
                    <div>
                      Visualisez vos <strong>ventes</strong> et commissions
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-blue-500">→</span>
                    <div>
                      Accédez à des <strong>ressources marketing</strong> prêtes à l'emploi
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-blue-500">→</span>
                    <div>
                      Consultez l'<strong>historique</strong> de vos paiements
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Charte éthique */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Charte de l'affilié éthique</h2>
              <p className="text-lg text-gray-600 mt-4">
                En devenant affilié, vous vous engagez à respecter ces principes
              </p>
            </div>

            <Card className="border-l-4 border-pedagogy-green-500">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-pedagogy-green-700">
                    ✓ Vous devez
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Avoir suivi la formation avant de la recommander</li>
                    <li>• Être honnête sur votre expérience personnelle</li>
                    <li>• Présenter la formation de manière transparente et réaliste</li>
                    <li>• Mentionner que vous touchez une commission (obligation légale)</li>
                    <li>• Répondre aux questions de votre audience avec authenticité</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-lg mb-3 text-red-700">
                    ✗ Vous ne devez pas
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Faire de fausses promesses ou exagérer les résultats</li>
                    <li>• Utiliser des techniques de manipulation (urgence artificielle, etc.)</li>
                    <li>• Créer de faux témoignages ou de fausses critiques</li>
                    <li>• Spammer vos contacts ou utiliser des pratiques intrusives</li>
                    <li>• Cacher que vous êtes affilié</li>
                    <li>• Utiliser le spam, l'achat de trafic frauduleux ou tout moyen déloyal</li>
                  </ul>
                </div>
              </div>
            </Card>

            <PedagogyBox color="yellow" title="Violation de la charte">
              <p>
                Toute violation de cette charte éthique entraînera la suspension immédiate de votre compte d'affilié
                et la perte de vos commissions non payées. Nous prenons l'éthique très au sérieux.
              </p>
            </PedagogyBox>
          </div>
        </div>
      </section>

      {/* Ressources disponibles */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Ressources marketing fournies</h2>
              <p className="text-lg text-gray-600 mt-4">
                Nous vous facilitons la tâche avec du contenu prêt à utiliser
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-semibold mb-2">📝 Textes de promotion</h4>
                <p className="text-gray-600 text-sm">
                  Messages pré-rédigés pour emails, réseaux sociaux, articles de blog
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold mb-2">🎨 Visuels</h4>
                <p className="text-gray-600 text-sm">
                  Bannières, images pour réseaux sociaux, logos
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold mb-2">💬 Templates d'emails</h4>
                <p className="text-gray-600 text-sm">
                  Emails à envoyer à votre liste pour présenter la formation
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold mb-2">📊 Études de cas</h4>
                <p className="text-gray-600 text-sm">
                  Exemples concrets de résultats obtenus par des élèves
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Affiliation */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Questions fréquentes</h2>
            </div>

            <div className="space-y-4">
              {affiliateFAQs.map((faq, index) => (
                <Card key={index}>
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-b from-pedagogy-blue-50 to-white">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2>Prêt à devenir affilié ?</h2>
            <p className="text-lg text-gray-600">
              Commencez par suivre la formation, puis accédez au programme d'affiliation
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

const affiliateFAQs = [
  {
    question: 'Dois-je obligatoirement être client pour devenir affilié ?',
    answer: 'Oui, c\'est une condition non négociable. Nous voulons que vous connaissiez réellement le contenu que vous recommandez.',
  },
  {
    question: 'Y a-t-il une limite au nombre de ventes que je peux générer ?',
    answer: 'Non, aucune limite. Plus vous partagez avec authenticité, plus vous pouvez gagner.',
  },
  {
    question: 'Comment suis-je payé ?',
    answer: 'Par virement bancaire mensuel, dès que vous atteignez le seuil de 50€ de commissions.',
  },
  {
    question: 'Puis-je utiliser de la publicité payante (Google Ads, Facebook Ads) ?',
    answer: 'Oui, tant que vous respectez la charte éthique et que vous ne faites pas de fausses promesses dans vos annonces.',
  },
  {
    question: 'Que se passe-t-il si un client demande un remboursement ?',
    answer: 'La commission liée à cette vente est automatiquement déduite de votre solde.',
  },
]
