"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Icons
function SearchIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronDownIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function HelpCircleIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

// FAQ Categories
const categories = [
  { id: "all", label: "Tout" },
  { id: "formation", label: "Formation" },
  { id: "acces", label: "Accès" },
  { id: "paiement", label: "Paiement" },
  { id: "affiliation", label: "Affiliation" },
  { id: "technique", label: "Technique" },
];

// FAQ Data
const faqData = [
  {
    category: "formation",
    question: "Combien de temps dure la formation complète ?",
    answer: "La formation comprend 8 modules et 43 leçons structurées. Vous pouvez la suivre à votre rythme, mais comptez environ 15 à 20 heures pour parcourir l'intégralité du contenu. La plupart des élèves terminent en 4 à 6 semaines en y consacrant 30 minutes par jour.",
  },
  {
    category: "formation",
    question: "La formation est-elle adaptée aux débutants ?",
    answer: "Absolument. La formation part des fondamentaux de la psychologie de la vente et progresse vers des concepts plus avancés. Que vous n'ayez jamais vendu de votre vie ou que vous ayez déjà de l'expérience, vous trouverez du contenu adapté à votre niveau.",
  },
  {
    category: "formation",
    question: "Y a-t-il des exercices pratiques ?",
    answer: "Oui, chaque module inclut des exercices pratiques et des mises en situation. Vous avez également accès à des templates et modèles prêts à l'emploi que vous pouvez adapter à votre activité.",
  },
  {
    category: "acces",
    question: "L'accès à la formation est-il limité dans le temps ?",
    answer: "Non, vous bénéficiez d'un accès à vie. Une fois inscrit, vous pouvez revenir sur le contenu autant de fois que vous le souhaitez, sans limite de durée. Cela inclut également les mises à jour futures du programme.",
  },
  {
    category: "acces",
    question: "Puis-je accéder à la formation sur mobile ?",
    answer: "Oui, la plateforme est entièrement responsive et optimisée pour tous les appareils : ordinateur, tablette et smartphone. Vous pouvez apprendre où que vous soyez.",
  },
  {
    category: "acces",
    question: "Comment accéder à la formation après l'achat ?",
    answer: "Immédiatement après votre paiement, vous recevez un email avec vos identifiants de connexion. Vous pouvez alors vous connecter à votre espace membre et commencer à suivre les leçons.",
  },
  {
    category: "paiement",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via Stripe, ainsi que PayPal. Le paiement est 100% sécurisé et chiffré.",
  },
  {
    category: "paiement",
    question: "Y a-t-il une garantie de remboursement ?",
    answer: "Oui, nous offrons une garantie satisfait ou remboursé de 14 jours. Si la formation ne correspond pas à vos attentes dans les 14 jours suivant votre achat, vous pouvez demander un remboursement complet sans justification.",
  },
  {
    category: "affiliation",
    question: "Comment fonctionne le programme d'affiliation ?",
    answer: "En tant que client, vous recevez un lien d'affiliation unique. Pour chaque vente générée via votre lien, vous touchez 25% de commission. Les paiements sont effectués mensuellement, dès votre première vente — il n'y a pas de seuil minimum.",
  },
  {
    category: "affiliation",
    question: "Dois-je être client pour devenir affilié ?",
    answer: "Oui, le programme d'affiliation est exclusivement réservé aux clients. Nous voulons que nos affiliés connaissent réellement le contenu qu'ils recommandent et puissent en parler avec authenticité.",
  },
  {
    category: "technique",
    question: "J'ai perdu mes identifiants, comment les récupérer ?",
    answer: "Rendez-vous sur la page de connexion et cliquez sur \"Mot de passe oublié\". Vous recevrez un email pour réinitialiser votre mot de passe. Si le problème persiste, contactez notre support.",
  },
  {
    category: "technique",
    question: "Les vidéos ne se chargent pas, que faire ?",
    answer: "Vérifiez d'abord votre connexion internet. Essayez de vider le cache de votre navigateur ou d'utiliser un autre navigateur. Si le problème persiste, contactez notre équipe technique via le formulaire de contact.",
  },
  {
    category: "technique",
    question: "Puis-je télécharger les leçons ?",
    answer: "Les vidéos ne sont pas téléchargeables pour des raisons de propriété intellectuelle. En revanche, tous les templates, exercices et ressources PDF sont téléchargeables depuis votre espace membre.",
  },
  {
    category: "formation",
    question: "La formation est-elle mise à jour ?",
    answer: "Oui, nous mettons régulièrement à jour le contenu pour intégrer les dernières évolutions en matière de vente et de psychologie. En tant que membre, vous bénéficiez automatiquement de toutes les mises à jour.",
  },
  {
    category: "paiement",
    question: "La facture est-elle fournie ?",
    answer: "Oui, une facture conforme est automatiquement générée après votre achat et envoyée par email. Vous pouvez également la télécharger depuis votre espace membre à tout moment.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-16 md:py-24">
            {/* Hero */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <HelpCircleIcon size={18} className="text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Centre d&apos;aide</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Questions fréquentes
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto">
                  Trouvez rapidement des réponses à vos questions sur la formation, l&apos;accès, le paiement et plus encore.
                </p>
              </div>
            </ScrollReveal>

            {/* Search bar */}
            <ScrollReveal delay={0.1}>
              <div className="max-w-2xl mx-auto mb-12">
                <div className="faq-search-container relative">
                  <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Rechercher une question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="faq-search-input w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Categories */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`faq-category-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <ScrollReveal>
                  <div className="text-center py-12">
                    <p className="text-gray-400">Aucun résultat trouvé pour votre recherche.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                </ScrollReveal>
              ) : (
                <Accordion type="multiple" className="space-y-3">
                  {filteredFaqs.map((faq, index) => (
                    <ScrollReveal key={index} delay={index * 0.03}>
                      <AccordionItem
                        value={String(index)}
                        className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/8 hover:border-white/15 transition-colors duration-200"
                      >
                        <AccordionTrigger className="p-4 sm:p-5 py-0 font-medium text-sm sm:text-base text-white hover:no-underline gap-4 [&>svg]:text-gray-400 [&>svg]:flex-shrink-0">
                          <span className="leading-snug text-left">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 sm:px-5 sm:pb-5">
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </ScrollReveal>
                  ))}
                </Accordion>
              )}
            </div>

            {/* CTA Contact */}
            <ScrollReveal delay={0.2}>
              <div className="max-w-2xl mx-auto mt-16 text-center">
                <div className="faq-cta-card p-8 rounded-2xl">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Vous ne trouvez pas la réponse ?
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Notre équipe est disponible pour répondre à toutes vos questions.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
