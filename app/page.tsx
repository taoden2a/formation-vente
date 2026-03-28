"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CognitiveOrbs } from "@/components/ui/CognitiveOrbs";
import {
  BrainIcon,
  TargetIcon,
  BlueprintIcon,
  VoiceIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { TestimonialsScroll } from "@/components/sections/TestimonialsScroll";
import { PricingCard } from "@/components/pricing/PricingCard";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ─── Countdown helpers ────────────────────────────────────────────────────────

const COUNTDOWN_KEY = "cpv_promo_end";
const RENEWAL_HOURS = 48;

function useCountdown() {
  const [target, setTarget] = useState<Date | null>(null);
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Lire ou créer la date de fin persistée en localStorage
  useEffect(() => {
    const stored = localStorage.getItem(COUNTDOWN_KEY);
    let end: Date;
    if (stored) {
      end = new Date(stored);
      // Si expiré, repartir pour 48h
      if (end.getTime() <= Date.now()) {
        end = new Date(Date.now() + RENEWAL_HOURS * 3_600_000);
        localStorage.setItem(COUNTDOWN_KEY, end.toISOString());
      }
    } else {
      end = new Date(Date.now() + RENEWAL_HOURS * 3_600_000);
      localStorage.setItem(COUNTDOWN_KEY, end.toISOString());
    }
    setTarget(end);
  }, []);

  useEffect(() => {
    if (!target) return;
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        // Renouveler automatiquement à 0
        const next = new Date(Date.now() + RENEWAL_HOURS * 3_600_000);
        localStorage.setItem(COUNTDOWN_KEY, next.toISOString());
        setTarget(next);
        return;
      }
      setLeft({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function Home() {
  const countdown = useCountdown();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // ── Typewriter ──────────────────────────────────────────────────────────────
  const [typeText, setTypeText] = useState("");
  const typeState = useRef({ phrase: 0, char: 0, deleting: false });

  useEffect(() => {
    const phrases = typePhrases;
    let id: ReturnType<typeof setTimeout>;

    function tick() {
      const s = typeState.current;
      const cur = phrases[s.phrase];
      if (!s.deleting) {
        if (s.char < cur.length) {
          s.char++;
          setTypeText(cur.slice(0, s.char));
          id = setTimeout(tick, 65);
        } else {
          id = setTimeout(() => { s.deleting = true; tick(); }, 2000);
        }
      } else {
        if (s.char > 0) {
          s.char--;
          setTypeText(cur.slice(0, s.char));
          id = setTimeout(tick, 32);
        } else {
          s.deleting = false;
          s.phrase = (s.phrase + 1) % phrases.length;
          id = setTimeout(tick, 400);
        }
      }
    }

    id = setTimeout(tick, 900);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sticky CTA ──────────────────────────────────────────────────────────────
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const handle = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="bg-[#0a0a0f] text-white">
      <ScrollProgress />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundAnimated variant="hero-v8" className="absolute inset-0">
          <span />
        </BackgroundAnimated>
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
                Apprends la psychologie réelle de l&apos;achat pour vendre plus
                sans manipuler et sans scripts artificiels.
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

            {/* Stats */}
            <ScrollReveal delay={0.64} duration={0.8}>
              <div className="flex justify-center items-center gap-6 sm:gap-12 pt-4 sm:pt-8">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">8</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">modules</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">43</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">leçons</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-orange-400 tabular-nums">4,8/5</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">satisfaction</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PROBLÈME + TYPEWRITER ─────────────────────────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <ScrollReveal>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl text-gray-400">Tu peux avoir :</p>
                <ul className="text-lg sm:text-xl md:text-2xl text-gray-300 space-y-2 font-medium list-none">
                  <li>• un bon produit</li>
                  <li>• une expertise réelle</li>
                  <li>• une idée brillante</li>
                </ul>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 pt-2">
                  Et pourtant ne presque rien vendre.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-2">
                <p className="text-base text-gray-500">La vraie cause ?</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold min-h-[2.5rem] sm:min-h-[3rem]">
                  <span className="text-orange-400">
                    {typeText}
                    <span className="inline-block w-0.5 h-6 sm:h-7 bg-orange-400 ml-0.5 align-middle animate-pulse" />
                  </span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 text-glow-orange">
                Parce que la vente n&apos;est pas une technique.
                <span className="block mt-1 text-white">C&apos;est une compréhension.</span>
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {shockCards.map((card, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                  <div className="glass-card-hover rounded-2xl p-5 md:p-8 h-full">
                    <p className="text-lg text-gray-300 font-medium">{card}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── PILLIERS ─────────────────────────────────────────────────────────── */}
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
              {pillars.map((pillar, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                  <div className="group glass-card-hover rounded-2xl p-5 sm:p-6 h-full space-y-3 sm:space-y-4 cursor-default transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08]">
                    <div className="icon-glow w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {pillar.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── TÉMOIGNAGES (avant modules) ──────────────────────────────────────── */}
      <TestimonialsScroll />

      {/* ── FORMATEUR ────────────────────────────────────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Créé par quelqu&apos;un qui est passé par là
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="glass-card-hover rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
                {/* Avatar — TODO: remplacer par <Image src="/photo-formateur.jpg" alt="Tao" width={128} height={128} className="rounded-2xl object-cover" /> */}
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-4xl font-black text-orange-400 select-none">
                  T
                </div>
                <div className="text-center sm:text-left space-y-4">
                  {/* TODO: remplacer par ton prénom et titre réels */}
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white">Tao</p>
                    <p className="text-orange-400 text-sm font-medium mt-0.5">Étudiant &amp; Entrepreneur</p>
                  </div>
                  {/* TODO: remplacer par ta vraie bio (2-3 lignes de crédibilité) */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Entrepreneur depuis mes premières années d&apos;études dans un BUT de vente, j&apos;ai construit cette formation pour transmettre ce que j&apos;aurais voulu apprendre plus tôt : la psychologie réelle derrière chaque décision d&apos;achat, ce qui m&apos;aurait évité mes premières erreurs.
                  </p>
                  {/* TODO: remplacer par ta vraie citation sur la vente */}
                  <blockquote className="border-l-2 border-orange-500/40 pl-4 text-gray-400 italic text-sm sm:text-base">
                    &ldquo;La vente n&apos;est pas un talent. C&apos;est une compétence de compréhension que tout le monde peut acquérir.&rdquo;
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── BENTO GRID — Transformation avant/après ──────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-5xl mx-auto space-y-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Ce que tu vas vraiment apprendre
              </h2>
            </ScrollReveal>
            <BentoGrid />
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── 8 MODULES ────────────────────────────────────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                8 modules pour maîtriser la vente
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-7 top-0 bottom-0 w-0.5 timeline-line-v6 hidden md:block" />
              <div className="space-y-3 sm:space-y-4">
                {modules.map((mod, i) => (
                  <ScrollReveal key={i} delay={i * 0.07} direction="left" distance={25} duration={0.7}>
                    <div className="module-card-v6 flex items-center gap-3 sm:gap-6 p-4 sm:p-5 rounded-2xl relative group">
                      <div className="module-number-v6 flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center z-10">
                        <span className="text-base sm:text-xl font-bold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                          {mod.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 group-hover:text-gray-400 transition-colors duration-300 leading-snug">
                          {mod.transformation}
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
                  Voir le programme complet
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── POUR QUI ─────────────────────────────────────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Cette formation est faite pour toi si&nbsp;:
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {forWhoCards.map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.12} direction="left" distance={20}>
                  <div className="glass-card-hover rounded-2xl p-4 sm:p-6 h-full flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mt-0.5">
                      <CheckIcon size={14} className="text-orange-400" />
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed">{card}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── PRICING + COUNTDOWN ──────────────────────────────────────────────── */}
      <BackgroundAnimated variant="darker" className="section-spacing" id="prix">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-10">
            <ScrollReveal duration={0.9}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                La compétence que personne ne t&apos;enseigne,
                <span className="block mt-1 text-gray-400">mais dont tout dépend.</span>
              </h2>
            </ScrollReveal>

            {/* Countdown */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-2">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {[
                    { val: countdown.d, label: "jours" },
                    { val: countdown.h, label: "heures" },
                    { val: countdown.m, label: "min" },
                    { val: countdown.s, label: "sec" },
                  ].map(({ val, label }, i) => (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-orange-400 tabular-nums">
                          {String(val).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">Prix de lancement — peut augmenter à tout moment</p>
              </div>
            </ScrollReveal>

            {/* Places restantes */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-1.5 max-w-xs mx-auto">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Places au tarif lancement</span>
                  <span className="font-semibold text-orange-400">11 restantes</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                    style={{ width: "78%" }}
                  />
                </div>
                <p className="text-xs text-gray-600 text-center">39 / 50 places déjà prises</p>
                <p className="text-xs text-gray-700 text-center">Formation disponible depuis mars 2026 — Tarif lancement limité</p>
              </div>
            </ScrollReveal>

            {/* PricingCard animée */}
            <ScrollReveal delay={0.2} direction="scale" duration={0.9}>
              <PricingCard />
            </ScrollReveal>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <BackgroundAnimated variant="dark" className="section-spacing">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
                Questions fréquentes
              </h2>
            </ScrollReveal>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <AccordionItem
                    value={String(i)}
                    className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/8 hover:border-white/15 transition-colors duration-200"
                  >
                    <AccordionTrigger className="p-4 sm:p-5 py-0 font-medium text-sm sm:text-base text-white hover:no-underline gap-4 [&>svg]:text-gray-400 [&>svg]:flex-shrink-0">
                      <span className="leading-snug text-left">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-5 sm:pb-5">
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </BackgroundAnimated>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────────── */}
      <section className="section-spacing border-t border-white/5">
        <div className="container-width text-center space-y-4 sm:space-y-6">
          <ScrollReveal>
            <p className="text-gray-600 text-sm tracking-wide uppercase font-medium">Encore là ?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              La formation t&apos;attend.
            </h2>
            <p className="text-gray-400 mt-2 text-base">Une seule décision. 59€. À vie.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Link
              href="#prix"
              className="btn-premium inline-flex items-center justify-center rounded-xl px-8 py-4 text-base sm:text-lg font-semibold text-white mt-2"
            >
              Accéder à la formation
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-xs text-gray-700 pt-2">
              © {new Date().getFullYear()} Comprendre pour Vendre. Tous droits réservés.{" "}
              <Link href="/cgv" className="hover:text-gray-500 transition-colors">CGV</Link>
              {" · "}
              <Link href="/mentions-legales" className="hover:text-gray-500 transition-colors">Mentions légales</Link>
              {" · "}
              <Link href="/confidentialite" className="hover:text-gray-500 transition-colors">Confidentialité</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────────── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link
          href="#prix"
          className="btn-premium flex items-center justify-center rounded-xl px-6 py-4 text-base font-semibold text-white w-full"
        >
          Accéder à la formation
        </Link>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const typePhrases = [
  "tu n'as pas les bons mots",
  "tu ne sais pas pourquoi ils disent non",
  "tu parles sans vraiment comprendre ton client",
  "tes arguments ne résonnent pas",
  "tu perds des ventes évitables",
];

const shockCards = [
  "Un bon produit ne suffit pas.",
  "Une idée brillante ne suffit pas.",
  "Une expertise ne suffit pas.",
];

const pillars = [
  {
    icon: <BrainIcon size={28} className="text-blue-400" />,
    title: "Psychologie d'achat",
    desc: "Comprends les mécanismes invisibles qui font décider ton client — avant même qu'il le sache.",
  },
  {
    icon: <TargetIcon size={28} className="text-blue-400" />,
    title: "Leviers émotionnels",
    desc: "Identifie et active les vrais moteurs de décision : peur, désir, appartenance.",
  },
  {
    icon: <BlueprintIcon size={28} className="text-blue-400" />,
    title: "Offre irrésistible",
    desc: "Structure une proposition que le client veut dire oui — pas juste comprendre.",
  },
  {
    icon: <VoiceIcon size={28} className="text-blue-400" />,
    title: "Vendre à l'oral et à l'écrit",
    desc: "Maîtrise la persuasion dans tes pitchs, emails, pages de vente et appels.",
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

const forWhoCards = [
  "Tu as un bon produit mais les ventes stagnent",
  "Tu veux comprendre pourquoi les gens achètent vraiment",
  "Tu ne veux pas manipuler tes clients — juste mieux les servir",
  "Tu veux transformer ta valeur en revenus concrets",
  "Tu es entrepreneur, freelance ou créateur de contenu",
  "Tu veux une méthode durable, pas des scripts artificiels",
];

const faqs = [
  {
    q: "C'est quoi exactement la formation ?",
    a: "8 modules sur la psychologie de la vente, les biais cognitifs, la construction d'offres, la communication persuasive et le marketing digital. 43 leçons, des exercices pratiques, et des templates réutilisables. Accès à vie, depuis n'importe quel appareil.",
  },
  {
    q: "Je ne suis pas commercial — est-ce fait pour moi ?",
    a: "Oui. La formation s'adresse à tout porteur de projet qui doit vendre : entrepreneur, freelance, créateur de contenu, consultant. Aucune expérience en vente n'est requise — on repart de zéro avec la psychologie réelle.",
  },
  {
    q: "Est-ce que ça fonctionne pour les services digitaux ?",
    a: "Absolument. La formation couvre la vente à l'écrit (emails, pages de vente, posts réseaux) et à l'oral (appels, pitchs), avec des exemples concrets adaptés aux services digitaux et au freelancing.",
  },
  {
    q: "Combien de temps faut-il pour terminer la formation ?",
    a: "À raison de 30 à 45 minutes par jour, tu peux compléter la formation en 2 à 3 semaines. Chaque leçon est courte, dense, et directement applicable sur ton projet.",
  },
  {
    q: "Y a-t-il une garantie de remboursement ?",
    a: "Oui. Satisfait ou remboursé sous 14 jours, sans aucune question posée. Si la formation ne te convient pas pour quelque raison que ce soit, on te rembourse immédiatement.",
  },
  {
    q: "Le prix va-t-il augmenter ?",
    a: "Oui. 59€ est le tarif de lancement. Le prix définitif sera de 199€. Plus tu attends, plus tu paies — et les places au tarif lancement sont limitées.",
  },
];
