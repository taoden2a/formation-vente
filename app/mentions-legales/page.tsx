"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
function FileTextIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

const sections = [
  { id: "editeur", title: "Éditeur du site" },
  { id: "hebergement", title: "Hébergement" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "responsabilite", title: "Limitation de responsabilité" },
  { id: "liens", title: "Liens hypertextes" },
  { id: "cookies", title: "Cookies" },
  { id: "droit", title: "Droit applicable" },
];

export default function MentionsLegalesPage() {
  const [activeSection, setActiveSection] = useState("editeur");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-16 md:py-24">
            {/* Hero */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <FileTextIcon size={18} className="text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Informations légales</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Mentions légales
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto">
                  Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto flex gap-12">
              {/* Table of contents - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="legal-toc-sticky sticky top-24">
                  <h3 className="text-sm font-semibold text-white mb-4">Sommaire</h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`legal-toc-item block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-blue-500/10 text-blue-300 border-l-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <ScrollReveal delay={0.1} className="flex-1">
                <article className="legal-content-card p-8 md:p-10 rounded-2xl">
                  <div className="legal-content space-y-12">
                    <section id="editeur">
                      <h2 className="text-xl font-semibold text-white mb-4">1. Éditeur du site</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Le site <strong>comprendrepourvendre.com</strong> est édité par :
                        </p>
                        <ul className="list-none space-y-2 pl-4">
                          <li><strong>Raison sociale :</strong> [À compléter]</li>
                          <li><strong>Forme juridique :</strong> [À compléter]</li>
                          <li><strong>Adresse du siège social :</strong> [À compléter]</li>
                          <li><strong>Téléphone :</strong> [À compléter]</li>
                          <li><strong>Email :</strong> contact@comprendrepourvendre.com</li>
                          <li><strong>Directeur de la publication :</strong> [À compléter]</li>
                        </ul>
                      </div>
                    </section>

                    <section id="hebergement">
                      <h2 className="text-xl font-semibold text-white mb-4">2. Hébergement</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Ce site est hébergé par :</p>
                        <ul className="list-none space-y-2 pl-4">
                          <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                          <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                          <li><strong>Site web :</strong> vercel.com</li>
                        </ul>
                      </div>
                    </section>

                    <section id="propriete">
                      <h2 className="text-xl font-semibold text-white mb-4">3. Propriété intellectuelle</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, graphismes, logo, icônes, sons, logiciels, etc.) sont la propriété exclusive de l&apos;éditeur ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.
                        </p>
                        <p>
                          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;éditeur.
                        </p>
                        <p>
                          Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                        </p>
                      </div>
                    </section>

                    <section id="responsabilite">
                      <h2 className="text-xl font-semibold text-white mb-4">4. Limitation de responsabilité</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          L&apos;éditeur s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut garantir que les informations soient complètes, précises, exactes, exhaustives et dépourvues de toute erreur.
                        </p>
                        <p>
                          L&apos;éditeur décline toute responsabilité pour tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification des informations mises à la disposition sur le site.
                        </p>
                        <p>
                          L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects qui pourraient résulter de l&apos;accès ou de l&apos;utilisation du site et/ou des informations qu&apos;il contient.
                        </p>
                      </div>
                    </section>

                    <section id="liens">
                      <h2 className="text-xl font-semibold text-white mb-4">5. Liens hypertextes</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Le site peut contenir des liens hypertextes vers d&apos;autres sites internet. L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux éventuels collectes de données personnelles effectuées par ces sites.
                        </p>
                        <p>
                          La mise en place d&apos;un lien hypertexte vers ce site nécessite une autorisation préalable de l&apos;éditeur. Pour toute demande, veuillez nous contacter via le formulaire de contact.
                        </p>
                      </div>
                    </section>

                    <section id="cookies">
                      <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et à des fins de mesure d&apos;audience. Pour en savoir plus sur notre utilisation des cookies et vos droits, veuillez consulter notre <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline">politique de confidentialité</Link>.
                        </p>
                      </div>
                    </section>

                    <section id="droit">
                      <h2 className="text-xl font-semibold text-white mb-4">7. Droit applicable</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                        </p>
                        <p>
                          Pour toute question relative aux présentes mentions légales ou pour toute réclamation, vous pouvez nous contacter via notre <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">formulaire de contact</Link>.
                        </p>
                      </div>
                    </section>

                    {/* Last update */}
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-sm text-gray-500">
                        Dernière mise à jour : Février 2026
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.2}>
              <div className="max-w-2xl mx-auto mt-16 text-center">
                <div className="legal-cta-card p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    Des questions sur nos mentions légales ?
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/faq"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Voir la FAQ
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
