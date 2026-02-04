import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PedagogyBox } from '@/components/pedagogy/PedagogyBox'
import { CheckoutButton } from '@/components/CheckoutButton'

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Promesse claire */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              Apprenez l&apos;art de convaincre{' '}
              <span className="text-pedagogy-blue-500">sans manipuler</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Une formation complète basée sur la psychologie, les biais cognitifs et le marketing éthique.
              Découvrez comment influencer positivement et vendre avec intégrité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="primary" size="lg" asChild>
                <Link href="#prix">Accéder à la formation</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/programme">Voir le programme</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* À qui s'adresse la formation */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-center">Cette formation est pour vous si...</h2>

            <div className="grid gap-6">
              <Card>
                <h3 className="text-xl font-semibold mb-3">Vous êtes entrepreneur ou freelance</h3>
                <p className="text-gray-600">
                  Vous devez vendre vos services ou produits, mais vous détestez l&apos;idée de &quot;faire du commercial&quot;
                  de manière agressive ou manipulatrice.
                </p>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-3">Vous travaillez dans la vente ou le marketing</h3>
                <p className="text-gray-600">
                  Vous voulez améliorer vos compétences en persuasion tout en restant aligné avec vos valeurs
                  et en construisant des relations durables avec vos clients.
                </p>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-3">Vous créez du contenu ou communiquez</h3>
                <p className="text-gray-600">
                  Vous souhaitez comprendre comment capter l&apos;attention, engager votre audience et créer
                  du contenu qui résonne vraiment avec vos lecteurs ou spectateurs.
                </p>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-3">Vous êtes curieux de psychologie humaine</h3>
                <p className="text-gray-600">
                  Vous voulez comprendre comment fonctionnent les biais cognitifs, la prise de décision
                  et les mécanismes d&apos;influence dans les interactions quotidiennes.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats concrets */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2>Ce que vous saurez faire après cette formation</h2>
              <p className="text-lg text-gray-600">
                Des compétences concrètes que vous pourrez appliquer immédiatement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <PedagogyBox color="blue" title="Comprendre la psychologie de l'achat">
                <p>
                  Identifier les véritables motivations d&apos;achat, comprendre le processus de décision
                  et anticiper les objections avant qu&apos;elles n&apos;apparaissent.
                </p>
              </PedagogyBox>

              <PedagogyBox color="yellow" title="Utiliser les biais cognitifs de manière éthique">
                <p>
                  Maîtriser les principaux biais cognitifs (ancrage, preuve sociale, rareté...) et
                  savoir les utiliser pour faciliter la décision sans manipulation.
                </p>
              </PedagogyBox>

              <PedagogyBox color="green" title="Créer des messages qui résonnent">
                <p>
                  Structurer vos arguments, raconter des histoires impactantes et adapter votre
                  communication à votre audience pour un impact maximal.
                </p>
              </PedagogyBox>

              <PedagogyBox color="orange" title="Construire une stratégie de vente éthique">
                <p>
                  Mettre en place un processus de vente complet qui convertit sans forcer,
                  en créant de la valeur réelle pour vos clients.
                </p>
              </PedagogyBox>
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu des modules */}
      <section className="section-spacing" id="modules">
        <div className="container-width">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2>Un programme complet et structuré</h2>
              <p className="text-lg text-gray-600">
                7 modules, 45+ leçons détaillées, des exercices pratiques et des modèles prêts à l&apos;emploi
              </p>
            </div>

            <div className="grid gap-6">
              {modules.map((module, index) => (
                <Card key={index} hover className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-pedagogy-blue-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold">{module.title}</h3>
                      <p className="text-gray-600">{module.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{module.lessons} leçons</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">
                    🔒 Verrouillé
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/programme">Voir le programme complet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode pédagogique */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2>Une pédagogie pensée pour l&apos;apprentissage</h2>
              <p className="text-lg text-gray-600">
                Pas de vidéos interminables. Du contenu texte structuré, détaillé et facile à revisiter.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold">Contenu texte approfondi</h3>
                <p className="text-gray-600">
                  Chaque leçon est rédigée avec soin, structurée de manière claire, et va en profondeur
                  sur chaque concept. Vous pouvez lire à votre rythme et revenir facilement sur n&apos;importe quelle partie.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-pedagogy-yellow-100 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold">Code couleur pédagogique</h3>
                <p className="text-gray-600">
                  Bleu pour la théorie, jaune pour les points clés, vert pour les résumés, orange pour les exercices.
                  Chaque couleur a une fonction, pour une navigation intuitive.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-pedagogy-orange-100 flex items-center justify-center">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-xl font-semibold">Exercices pratiques</h3>
                <p className="text-gray-600">
                  Des exercices concrets à chaque étape pour ancrer vos apprentissages. Vous prenez des notes
                  directement dans la plateforme, comme dans un cahier numérique.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-pedagogy-green-100 flex items-center justify-center">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-xl font-semibold">Liberté totale</h3>
                <p className="text-gray-600">
                  Tous les modules sont accessibles immédiatement. Suivez le parcours recommandé ou explorez
                  librement selon vos besoins et votre niveau.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positionnement éthique */}
      <section className="section-spacing bg-pedagogy-green-50">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2>Notre engagement éthique</h2>
              <p className="text-lg text-gray-600">
                Cette formation ne vous apprendra jamais à manipuler ou tromper vos clients
              </p>
            </div>

            <Card className="border-l-4 border-pedagogy-green-500">
              <div className="space-y-6">
                <p className="text-lg">
                  Il existe une différence fondamentale entre <strong>influencer</strong> et <strong>manipuler</strong>.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pedagogy-green-700 mb-2">✓ Ce que nous enseignons</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Comprendre la psychologie pour mieux communiquer</li>
                      <li>• Créer de la valeur réelle et la communiquer clairement</li>
                      <li>• Faciliter la prise de décision de vos clients</li>
                      <li>• Construire des relations durables basées sur la confiance</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">✗ Ce que nous refusons</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Les fausses urgences et la pression artificielle</li>
                      <li>• Les promesses irréalistes et le sensationnalisme</li>
                      <li>• Les techniques de manipulation émotionnelle</li>
                      <li>• Tout ce qui ne sert pas l&apos;intérêt du client</li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-600 pt-4 border-t border-gray-200">
                  En savoir plus sur{' '}
                  <Link href="/ethique" className="text-pedagogy-green-600 font-medium hover:underline">
                    notre approche éthique
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Prix */}
      <section className="section-spacing" id="prix">
        <div className="container-width">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center space-y-8 p-12">
              <div className="space-y-4">
                <h2 className="text-3xl">Accès à vie pour un paiement unique</h2>
                <p className="text-lg text-gray-600">
                  Aucun abonnement, aucun frais caché. Un seul paiement pour un accès illimité.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-6xl font-bold text-pedagogy-blue-600">85 €</div>
                <p className="text-gray-500">Paiement unique • Accès à vie</p>
              </div>

              <div className="space-y-3 text-left bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-center mb-4">Inclus dans la formation :</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>7 modules complets avec 45+ leçons détaillées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>Exercices pratiques et modèles prêts à l&apos;emploi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>Études de cas réelles et analysées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>Système de notes et suivi de progression</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>Mises à jour gratuites à vie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500">✓</span>
                    <span>Accès au programme d&apos;affiliation</span>
                  </li>
                </ul>
              </div>

              <CheckoutButton />

              <p className="text-sm text-gray-500">
                Paiement sécurisé par Stripe • Garantie satisfait ou remboursé 30 jours
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2>Questions fréquentes</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <h4 className="font-semibold text-lg mb-3">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-spacing bg-gradient-to-b from-pedagogy-blue-50 to-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl">Prêt à maîtriser l&apos;art de convaincre ?</h2>
            <p className="text-xl text-gray-600">
              Rejoignez la formation dès maintenant et apprenez à vendre avec intégrité
            </p>
            <Button variant="action" size="lg" asChild>
              <Link href="#prix">Accéder à la formation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Données des modules (pour démo)
const modules = [
  {
    title: 'Fondations : Comprendre la psychologie de la persuasion',
    description: 'Les bases de la psychologie cognitive, les mécanismes de décision et les principes fondamentaux de l\'influence.',
    lessons: 6,
    duration: '2h30',
  },
  {
    title: 'Les biais cognitifs et leur utilisation éthique',
    description: 'Découvrez les 20 biais cognitifs les plus puissants et apprenez à les utiliser sans manipulation.',
    lessons: 8,
    duration: '3h',
  },
  {
    title: 'L\'art du storytelling et de la communication',
    description: 'Structurer vos messages, raconter des histoires impactantes et adapter votre communication.',
    lessons: 7,
    duration: '2h45',
  },
  {
    title: 'Créer de la valeur et la communiquer',
    description: 'Identifier la vraie valeur de votre offre et la présenter de manière convaincante.',
    lessons: 6,
    duration: '2h30',
  },
  {
    title: 'Le processus de vente éthique',
    description: 'Construire un tunnel de vente qui convertit sans forcer ni manipuler.',
    lessons: 7,
    duration: '3h15',
  },
  {
    title: 'Objections, négociation et closing',
    description: 'Gérer les objections avec élégance et conclure des ventes dans le respect mutuel.',
    lessons: 6,
    duration: '2h30',
  },
  {
    title: 'Marketing de contenu et croissance long terme',
    description: 'Créer une stratégie de contenu qui attire, éduque et convertit naturellement.',
    lessons: 7,
    duration: '3h',
  },
]

const faqs = [
  {
    question: 'Combien de temps ai-je accès à la formation ?',
    answer: 'Vous avez un accès illimité à vie. Une fois la formation achetée, vous pourrez y accéder quand vous voulez, aussi longtemps que vous le souhaitez, sans aucune limite de temps.',
  },
  {
    question: 'Y a-t-il des vidéos dans la formation ?',
    answer: 'Non, cette formation est 100% texte. Nous avons fait ce choix délibéré pour vous permettre d\'apprendre à votre rythme, de facilement retrouver l\'information et de prendre des notes efficacement.',
  },
  {
    question: 'Dois-je suivre les modules dans l\'ordre ?',
    answer: 'Non, vous avez une liberté totale. Nous proposons un parcours recommandé pour une progression optimale, mais vous pouvez explorer n\'importe quel module à tout moment selon vos besoins.',
  },
  {
    question: 'Cette formation va-t-elle m\'apprendre à manipuler ?',
    answer: 'Non, absolument pas. Nous faisons une distinction claire entre influence et manipulation. Cette formation vous apprend à communiquer efficacement et à faciliter la prise de décision, tout en respectant l\'intérêt de vos clients.',
  },
  {
    question: 'Puis-je obtenir un remboursement si la formation ne me convient pas ?',
    answer: 'Oui, vous bénéficiez d\'une garantie satisfait ou remboursé de 30 jours. Si la formation ne répond pas à vos attentes, contactez-nous pour un remboursement intégral, sans question.',
  },
  {
    question: 'Comment fonctionne le programme d\'affiliation ?',
    answer: 'Une fois client, vous aurez accès au programme d\'affiliation. Vous recevrez un lien unique et toucherez une commission sur chaque vente générée. Tous les détails sont disponibles dans l\'espace membre.',
  },
]
