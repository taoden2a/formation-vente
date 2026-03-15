"use client";

import { useRef } from "react";
import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { CognitiveOrbs } from "@/components/ui/CognitiveOrbs";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import {
  BrainIcon,
  TargetIcon,
  BlueprintIcon,
  VoiceIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { TestimonialsScroll } from "@/components/sections/TestimonialsScroll";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="bg-[#0a0a0f] text-white">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* BLOC 1 — HERO IMMERSIF V8 */}
      <section className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layer */}
        <BackgroundAnimated variant="hero-v8" className="absolute inset-0">
          <span />
        </BackgroundAnimated>

        {/* Cognitive Orbs V8 - Strategic animated orbs (positioned at section level) */}
        <CognitiveOrbs titleRef={titleRef} className="z-[5]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.12} blur duration={0.9}>
              <h1
                ref={titleRef}
                className="hero-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-glow"
              >
                La compétence qui transforme une idée en{" "}
                <span className="hero-gradient-text">revenus</span>.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3} duration={0.8}>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
                Apprends la psychologie réelle de l&apos;achat pour vendre plus sans manipuler et sans scripts artificiels.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.48} duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-6">
                <Link
                  href="#prix"
                  className="btn-premium inline-flex items-center justify-center rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white w-full sm:w-auto"
                >
                  Accéder à la formation
                </Link>
                <Link
                  href="/programme"
                  className="btn-premium-secondary inline-flex items-center justify-center rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-gray-200 w-full sm:w-auto"
                >
                  Voir la formation
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BLOC 2 — LE CHOC */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <ScrollReveal>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl text-gray-400">Tu peux avoir :</p>
                <ul className="text-lg sm:text-xl md:text-2xl text-gray-300 space-y-2 font-medium">
                  <li>• un bon produit</li>
                  <li>• une expertise réelle</li>
                  <li>• une idée brillante</li>
                </ul>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 pt-2">
                  Et pourtant ne presque rien vendre.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-2">
                <p className="text-base text-gray-500">Pourquoi ?</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 text-glow-orange">
                  Parce que la vente n&apos;est pas une technique.
                  <span className="block mt-1 text-white">C&apos;est une compréhension.</span>
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {shockCards.map((card, index) => (
                <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                  <div className="glass-card-hover rounded-2xl p-5 md:p-8 h-full">
                    <p className="text-lg text-gray-300 font-medium">{card}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* BLOC 3 — LA SOLUTION */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 py-4 sm:py-8 md:py-16">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Ce que tu vas réellement apprendre
                <span className="block mt-1 sm:mt-2 text-gray-400">dans cette formation</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pillars.map((pillar, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="scale">
                  <div className="glass-card-hover rounded-2xl p-5 sm:p-6 h-full space-y-3 sm:space-y-4">
                    <div className="icon-glow w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* BLOC 4 — LES 9 MODULES */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                8 modules pour maîtriser la vente
              </h2>
            </ScrollReveal>

            <div className="relative">
              {/* Animated timeline line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 timeline-line-v6 hidden md:block" />

              <div className="space-y-3 sm:space-y-4">
                {modules.map((module, index) => (
                  <ScrollReveal key={index} delay={index * 0.07} direction="left" distance={25} duration={0.7}>
                    <div className="module-card-v6 flex items-center gap-3 sm:gap-6 p-4 sm:p-5 rounded-2xl relative group">
                      <div className="module-number-v6 flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center z-10">
                        <span className="text-base sm:text-xl font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                          {module.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 group-hover:text-gray-400 transition-colors duration-300 leading-snug">
                          {module.transformation}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal delay={0.5}>
              <div className="text-center">
                <Link
                  href="/programme"
                  className="btn-premium-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-gray-300"
                >
                  Voir la formation
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </BackgroundAnimated>

      {/* BLOC 5 — TÉMOIGNAGES */}
      <TestimonialsScroll />

      {/* BLOC 6 — POUR QUI */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Cette formation est faite pour toi si :
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {forWhoCards.map((card, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="scale">
                  <div className="glass-card-hover rounded-2xl p-4 sm:p-6 h-full flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-400">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed">{card}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* BLOC 7 — CTA FINAL */}
      <BackgroundAnimated variant="darker" className="section-spacing" id="prix">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-10">
            <ScrollReveal duration={0.9}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                La compétence que personne ne t&apos;enseigne,
                <span className="block mt-1 text-gray-400">mais dont tout dépend.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="scale" duration={0.9}>
              <div className="cta-card-v6 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-gray-900 space-y-5 sm:space-y-8">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Comprendre pour Vendre
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Accès immédiat à l&apos;ensemble de la formation.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-end gap-2 sm:gap-3 justify-center">
                    <span className="text-gray-400 line-through text-lg sm:text-xl">199€</span>
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">59€</span>
                  </div>
                  <p className="text-gray-500 text-sm">Paiement unique • Accès à vie</p>
                  <p className="text-gray-400 text-xs pt-0.5 sm:pt-1 italic">Moins cher qu&apos;un seul prospect perdu.</p>
                </div>

                <ul className="text-left space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-600 max-w-full sm:max-w-sm mx-auto">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckIcon size={12} className="text-green-600" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <CheckoutButton />

                <p className="text-xs text-gray-500">
                  Paiement sécurisé par Stripe. Satisfait ou remboursé sous 14 jours.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </BackgroundAnimated>
    </div>
  );
}

const shockCards = [
  "Un bon produit ne suffit pas.",
  "Une idée brillante ne suffit pas.",
  "Une expertise ne suffit pas.",
];

const pillars = [
  {
    icon: <BrainIcon size={28} className="text-blue-400" />,
    text: "Comprendre comment le cerveau décide",
  },
  {
    icon: <TargetIcon size={28} className="text-blue-400" />,
    text: "Identifier les leviers émotionnels réels",
  },
  {
    icon: <BlueprintIcon size={28} className="text-blue-400" />,
    text: "Structurer une offre claire",
  },
  {
    icon: <VoiceIcon size={28} className="text-blue-400" />,
    text: "Vendre à l'oral et à l'écrit",
  },
];

const modules = [
  {
    title: "Comment le cerveau prend une décision d'achat",
    transformation: "Comprendre les mécanismes invisibles de toute décision.",
  },
  {
    title: "Les biais cognitifs vraiment utiles en vente",
    transformation: "Maîtriser les mécanismes mentaux de la persuasion.",
  },
  {
    title: "Comprendre profondément son client",
    transformation: "Identifier les vrais moteurs d'achat.",
  },
  {
    title: "Construire une offre qui donne envie d'acheter",
    transformation: "Transformer ta valeur en proposition irrésistible.",
  },
  {
    title: "Parler pour vendre",
    transformation: "Maîtriser l'art de la persuasion orale.",
  },
  {
    title: "Écrire pour vendre",
    transformation: "Rédiger des messages qui convertissent.",
  },
  {
    title: "Marketing digital et acquisition",
    transformation: "Attirer les bons clients avec les bons canaux.",
  },
  {
    title: "Mise en pratique finale",
    transformation: "Appliquer l'ensemble sur ton projet concret.",
  },
];

const features = [
  "8 modules structurés",
  "43 leçons",
  "Exercices concrets",
  "Templates utilisables",
  "Mises à jour incluses",
];

const forWhoCards = [
  "Tu as un bon produit mais les ventes stagnent",
  "Tu veux comprendre pourquoi les gens achètent vraiment",
  "Tu ne veux pas manipuler tes clients — juste mieux les servir",
  "Tu veux transformer ta valeur en revenus concrets",
];
