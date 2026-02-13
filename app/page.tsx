import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              Comprendre pour Vendre
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              Maîtriser la compétence qui conditionne tous les revenus.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apprends à comprendre comment une décision se forme réellement pour savoir vendre, à l&apos;oral comme à l&apos;écrit, dans n&apos;importe quel contexte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="action" size="lg" asChild>
                <Link href="#prix">Accéder à la formation</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/programme">Découvrir le programme</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROBLÈME */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
              La plupart des gens essaient de vendre sans comprendre.
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Ils apprennent des scripts. Répètent des formules. Appliquent des techniques sorties de leur contexte.
              </p>
              <p>
                Le résultat : des conversations forcées, des prospects qui fuient, et une impression persistante de ne pas être à sa place quand il s&apos;agit de &quot;vendre&quot;.
              </p>
              <p>
                Le problème n&apos;est pas le manque de motivation ou de travail. C&apos;est l&apos;absence de compréhension des mécanismes réels qui gouvernent les décisions humaines.
              </p>
              <p>
                Sans cette compréhension, chaque interaction commerciale devient un coup de dés. Avec elle, la vente devient une compétence maîtrisable, reproductible, et alignée avec tes valeurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION THÈSE CENTRALE */}
      <section className="section-spacing bg-gray-50">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
              Sans compétence de vente, aucun projet ne tient.
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Un produit excellent ne se vend pas tout seul. Une idée brillante reste une idée si personne ne l&apos;achète. Un talent reconnu ne génère rien s&apos;il n&apos;est pas communiqué.
              </p>
              <p>
                La vente n&apos;est pas une option réservée aux commerciaux. C&apos;est la compétence fondamentale de quiconque veut transformer une valeur en revenu.
              </p>
              <p>
                Que tu sois entrepreneur, freelance, salarié en reconversion ou étudiant avec un projet : ta capacité à convaincre détermine ta capacité à exister économiquement.
              </p>
              <p className="font-medium text-gray-900">
                Cette formation t&apos;enseigne cette compétence. Pas avec des raccourcis ou des promesses irréalistes. Avec une méthode structurée, basée sur la compréhension du cerveau humain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION MÉTHODE */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
              Une approche basée sur la compréhension humaine, pas sur des scripts.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">✗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Ce que cette formation n&apos;enseigne pas
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">—</span>
                    <span>Des scripts à réciter sans comprendre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">—</span>
                    <span>Des techniques de pression ou de manipulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">—</span>
                    <span>Des promesses de résultats instantanés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">—</span>
                    <span>Des méthodes qui fonctionnent &quot;pour tout le monde&quot;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">—</span>
                    <span>Du marketing agressif déguisé en formation</span>
                  </li>
                </ul>
              </Card>

              <Card className="space-y-4 border-pedagogy-green-200 bg-pedagogy-green-50/30">
                <div className="w-12 h-12 rounded-xl bg-pedagogy-green-100 flex items-center justify-center">
                  <span className="text-2xl text-pedagogy-green-600">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Ce qu&apos;elle enseigne réellement
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500 mt-1">→</span>
                    <span>Comment le cerveau prend réellement ses décisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500 mt-1">→</span>
                    <span>Les biais cognitifs et leur utilisation éthique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500 mt-1">→</span>
                    <span>Comment structurer un message qui résonne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500 mt-1">→</span>
                    <span>L&apos;art de créer de la valeur perçue authentique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pedagogy-green-500 mt-1">→</span>
                    <span>Un processus de vente aligné avec tes valeurs</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION POUR QUI */}
      <section className="section-spacing bg-gray-50">
        <div className="container-width">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Pour qui est cette formation ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                La compétence de vente est universelle. Elle s&apos;applique à tout contexte où tu dois convaincre pour générer un revenu.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((audience, index) => (
                <Card key={index} className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-pedagogy-blue-100 flex items-center justify-center">
                    <span className="text-2xl">{audience.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600">
                    {audience.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION STRUCTURE DE LA FORMATION */}
      <section className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                8 modules pour maîtriser la vente
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Une progression logique, du fondement théorique à l&apos;application pratique.
              </p>
            </div>

            <div className="grid gap-4">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pedagogy-blue-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {module.title}
                    </h3>
                    <p className="text-gray-600">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/programme">Voir le programme détaillé</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION RÉSULTATS */}
      <section className="section-spacing bg-gray-50">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
              À la fin, tu sauras :
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl"
                >
                  <span className="text-pedagogy-green-500 text-xl mt-0.5">✓</span>
                  <span className="text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="prix" className="section-spacing bg-white">
        <div className="container-width">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center space-y-8 p-8 md:p-12 border-2 border-pedagogy-blue-100">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Comprendre pour Vendre
                </h2>
                <p className="text-lg text-gray-600">
                  Accès immédiat à l&apos;ensemble de la formation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-5xl font-bold text-gray-900">75€</div>
                <p className="text-gray-500">Paiement unique • Accès à vie</p>
              </div>

              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>8 modules complets</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>50+ leçons structurées</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>Exercices pratiques</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>Modèles et templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>Études de cas réelles</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pedagogy-green-500">✓</span>
                  <span>Mises à jour incluses</span>
                </li>
              </ul>

              <CheckoutButton />

              <p className="text-sm text-gray-500">
                Paiement sécurisé par Stripe. Satisfait ou remboursé sous 14 jours.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

const audiences = [
  {
    icon: "📊",
    title: "Commercial",
    description: "Tu veux augmenter tes résultats en comprenant vraiment ce qui motive tes clients, au-delà des techniques de surface.",
  },
  {
    icon: "🎓",
    title: "Étudiant",
    description: "Tu lances un projet et tu dois apprendre à convaincre des clients, des investisseurs ou des partenaires.",
  },
  {
    icon: "🚀",
    title: "Entrepreneur",
    description: "Tu veux structurer ton discours commercial et convertir plus naturellement, sans avoir l'impression de forcer.",
  },
  {
    icon: "💻",
    title: "Freelance",
    description: "Tu dois vendre tes services mais tu ne sais pas comment présenter ta valeur ni justifier tes tarifs.",
  },
  {
    icon: "🔧",
    title: "Indépendant",
    description: "Tu as l'expertise technique mais il te manque la compétence commerciale pour développer ton activité.",
  },
];

const modules = [
  {
    title: "Fondations : Comprendre la psychologie de la décision",
    description: "Les bases essentielles sur le fonctionnement du cerveau humain face à une décision.",
  },
  {
    title: "Les biais cognitifs et leur utilisation éthique",
    description: "Identifier et utiliser les biais de manière responsable pour faciliter la prise de décision.",
  },
  {
    title: "L'art du storytelling persuasif",
    description: "Structurer des histoires qui captivent, résonnent et conduisent naturellement à l'action.",
  },
  {
    title: "Créer et communiquer de la valeur",
    description: "Identifier la vraie valeur de ton offre et la présenter de manière convaincante.",
  },
  {
    title: "Le processus de vente éthique",
    description: "Construire un parcours de vente qui convertit sans manipulation ni pression.",
  },
  {
    title: "Objections, négociation et closing",
    description: "Gérer les objections avec élégance et conclure des ventes dans le respect mutuel.",
  },
  {
    title: "Communication écrite et orale",
    description: "Adapter ton message selon le canal : email, appel, présentation, page de vente.",
  },
  {
    title: "Croissance et amélioration continue",
    description: "Mesurer tes résultats, identifier les points de friction et optimiser ton approche.",
  },
];

const outcomes = [
  "Comprendre comment une décision d'achat se forme réellement",
  "Identifier les motivations profondes de tes prospects",
  "Structurer un message qui résonne et convainc",
  "Présenter ton offre sans avoir l'impression de forcer",
  "Répondre aux objections avec assurance et empathie",
  "Construire un processus de vente aligné avec tes valeurs",
  "Négocier en créant de la valeur pour les deux parties",
  "Convertir plus naturellement, avec moins de friction",
];
