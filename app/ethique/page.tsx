import { Card } from '@/components/ui/Card'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function EthiquePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Notre approche éthique</h1>
            <p className="text-xl text-gray-600">
              Il existe une différence fondamentale entre influencer et manipuler.
              Voici notre vision et nos engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Différence influence vs manipulation */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2>Influence vs Manipulation : Comprendre la différence</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-pedagogy-green-500 bg-pedagogy-green-50">
                <h3 className="text-xl font-semibold text-pedagogy-green-800 mb-4">
                  ✓ Influence éthique
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-600 font-bold">•</span>
                    <div>
                      <strong>Transparence :</strong> Le client comprend clairement ce qu'on lui propose et pourquoi
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-600 font-bold">•</span>
                    <div>
                      <strong>Valeur réelle :</strong> Le produit ou service répond à un vrai besoin
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-600 font-bold">•</span>
                    <div>
                      <strong>Liberté :</strong> Le client peut dire non sans pression
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-600 font-bold">•</span>
                    <div>
                      <strong>Long terme :</strong> L'objectif est de créer une relation durable
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-600 font-bold">•</span>
                    <div>
                      <strong>Win-win :</strong> Les deux parties gagnent dans l'échange
                    </div>
                  </li>
                </ul>
              </Card>

              <Card className="border-l-4 border-red-500 bg-red-50">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  ✗ Manipulation
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <div>
                      <strong>Opacité :</strong> On cache des informations ou on ment sur le produit
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <div>
                      <strong>Promesses vides :</strong> On survend ou promet l'impossible
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <div>
                      <strong>Pression :</strong> Urgence artificielle, culpabilisation, intimidation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <div>
                      <strong>Court terme :</strong> On cherche la vente rapide sans se soucier du client
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <div>
                      <strong>Win-lose :</strong> Un seul gagne, généralement au détriment de l'autre
                    </div>
                  </li>
                </ul>
              </Card>
            </div>

            <PedagogyBox color="yellow" title="Le test de l'éthique">
              <p className="mb-3">
                Avant d'utiliser une technique de persuasion, posez-vous ces questions :
              </p>
              <ul className="space-y-2">
                <li>• Serais-je à l'aise si cette technique était utilisée sur moi ou mes proches ?</li>
                <li>• Le client a-t-il toutes les informations pour décider en connaissance de cause ?</li>
                <li>• Est-ce que je crois sincèrement que mon offre lui apportera de la valeur ?</li>
                <li>• Serais-je fier de raconter cette vente publiquement ?</li>
              </ul>
              <p className="mt-3 font-semibold">
                Si vous répondez "oui" à toutes ces questions, vous êtes dans l'influence éthique.
              </p>
            </PedagogyBox>
          </div>
        </div>
      </section>

      {/* Ce que la formation refuse */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Ce que cette formation refuse d'enseigner</h2>
              <p className="text-lg text-gray-600 mt-4">
                Nous avons fait des choix conscients sur ce que nous n'enseignerons jamais
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <h4 className="font-semibold text-lg mb-3 text-red-700">
                  ✗ Les fausses urgences et la rareté artificielle
                </h4>
                <p className="text-gray-600">
                  "Plus que 3 places !" alors qu'il n'y a aucune limite réelle. "Offre qui expire dans 10 minutes"
                  avec un compte à rebours qui redémarre. Ces techniques créent du stress inutile et érodent la confiance.
                  <strong className="text-gray-900 block mt-2">
                    Ce que nous enseignons à la place : Comment communiquer une vraie rareté ou urgence quand elle existe,
                    et comment aider le client à prendre une décision sans pression artificielle.
                  </strong>
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold text-lg mb-3 text-red-700">
                  ✗ Les promesses irréalistes et le sensationnalisme
                </h4>
                <p className="text-gray-600">
                  "Gagnez 10 000€ par mois en travaillant 2h par jour !" "Cette méthode secrète que les millionnaires
                  ne veulent pas que vous sachiez !" Ces promesses attirent mais déçoivent systématiquement.
                  <strong className="text-gray-900 block mt-2">
                    Ce que nous enseignons à la place : Comment présenter des bénéfices réalistes et vérifiables,
                    comment gérer les attentes et créer de la vraie crédibilité.
                  </strong>
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold text-lg mb-3 text-red-700">
                  ✗ La manipulation émotionnelle
                </h4>
                <p className="text-gray-600">
                  Jouer sur la peur, la culpabilité ou l'insécurité pour forcer une vente. "Si vous n'achetez pas,
                  vous allez rester pauvre toute votre vie." "Vos enfants méritent mieux que ça."
                  <strong className="text-gray-900 block mt-2">
                    Ce que nous enseignons à la place : Comment créer une connexion émotionnelle authentique,
                    comment parler aux aspirations plutôt qu'aux peurs.
                  </strong>
                </p>
              </Card>

              <Card>
                <h4 className="font-semibold text-lg mb-3 text-red-700">
                  ✗ Les dark patterns et l'exploitation des failles
                </h4>
                <p className="text-gray-600">
                  Cacher le bouton d'annulation, rendre le désabonnement intentionnellement compliqué, ajouter des
                  produits au panier sans consentement clair.
                  <strong className="text-gray-900 block mt-2">
                    Ce que nous enseignons à la place : Comment créer une expérience utilisateur fluide qui
                    facilite la décision sans la forcer, comment la transparence devient un avantage compétitif.
                  </strong>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision long terme */}
      <section className="section-spacing bg-pedagogy-blue-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2>Notre vision : Le marketing éthique est l'avenir</h2>
            </div>

            <Card>
              <div className="space-y-6 text-lg">
                <p>
                  Nous croyons que <strong>le marketing éthique n'est pas un handicap, c'est un avantage compétitif</strong>.
                </p>

                <p className="text-gray-700">
                  À l'ère de la transparence totale et des réseaux sociaux, les pratiques manipulatrices sont rapidement
                  exposées et punies. Les marques qui durent sont celles qui construisent la confiance, créent de la
                  vraie valeur et respectent leur audience.
                </p>

                <p className="text-gray-700">
                  L'influence éthique demande plus de réflexion et de travail que la manipulation. Il faut vraiment
                  comprendre son audience, créer un produit de qualité, communiquer clairement... Mais les résultats
                  sont durables : des clients satisfaits, du bouche-à-oreille positif, une réputation solide.
                </p>

                <PedagogyBox color="green" title="Notre promesse">
                  <p>
                    Cette formation vous donnera tous les outils pour être persuasif et efficace dans votre communication,
                    sans jamais compromettre votre intégrité. Vous apprendrez à vendre plus, mieux, et en restant fier
                    de votre méthode.
                  </p>
                </PedagogyBox>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2>Prêt à apprendre l'influence éthique ?</h2>
            <Button variant="action" size="lg" asChild>
              <Link href="/#prix">Accéder à la formation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
