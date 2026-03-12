"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
function LockIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const sections = [
  { id: "collecte", title: "Données collectées" },
  { id: "utilisation", title: "Utilisation des données" },
  { id: "cookies", title: "Cookies" },
  { id: "partage", title: "Partage des données" },
  { id: "securite", title: "Sécurité" },
  { id: "conservation", title: "Conservation" },
  { id: "droits", title: "Vos droits" },
  { id: "contact", title: "Nous contacter" },
];

export default function ConfidentialitePage() {
  const [activeSection, setActiveSection] = useState("collecte");

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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <LockIcon size={18} className="text-green-400" />
                  <span className="text-sm font-medium text-green-300">Protection des données</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Politique de confidentialité
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto">
                  Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.
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
                            ? "bg-green-500/10 text-green-300 border-l-2 border-green-500"
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
                    <section id="collecte">
                      <h2 className="text-xl font-semibold text-white mb-4">1. Données collectées</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Nous collectons les données personnelles suivantes dans le cadre de notre activité :
                        </p>
                        <p><strong>Lors de l&apos;achat :</strong></p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                          <li>Nom et prénom</li>
                          <li>Adresse email</li>
                          <li>Adresse postale (si nécessaire pour la facturation)</li>
                          <li>Informations de paiement (traitées de manière sécurisée par Stripe)</li>
                        </ul>
                        <p><strong>Lors de l&apos;utilisation du site :</strong></p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                          <li>Adresse IP</li>
                          <li>Type de navigateur et appareil</li>
                          <li>Pages visitées et durée des sessions</li>
                          <li>Données de progression dans la formation (stockées localement)</li>
                        </ul>
                        <p><strong>Lors de communications :</strong></p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                          <li>Contenu des messages envoyés via le formulaire de contact</li>
                          <li>Historique des échanges avec le support</li>
                        </ul>
                      </div>
                    </section>

                    <section id="utilisation">
                      <h2 className="text-xl font-semibold text-white mb-4">2. Utilisation des données</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Vos données personnelles sont utilisées pour :</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                          <li><strong>Exécution de la commande :</strong> traitement du paiement, création de votre compte, envoi des identifiants d&apos;accès</li>
                          <li><strong>Accès à la formation :</strong> authentification et personnalisation de votre espace membre</li>
                          <li><strong>Support client :</strong> réponse à vos questions et résolution de problèmes techniques</li>
                          <li><strong>Communication :</strong> envoi d&apos;informations importantes concernant votre compte ou la formation (mises à jour, maintenance)</li>
                          <li><strong>Newsletter :</strong> envoi de conseils et actualités (uniquement si vous y avez consenti)</li>
                          <li><strong>Amélioration du service :</strong> analyse anonyme des usages pour améliorer l&apos;expérience utilisateur</li>
                        </ul>
                        <p>
                          Nous ne vendons jamais vos données personnelles à des tiers.
                        </p>
                      </div>
                    </section>

                    <section id="cookies">
                      <h2 className="text-xl font-semibold text-white mb-4">3. Cookies</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Notre site utilise différents types de cookies :</p>
                        <p><strong>Cookies essentiels :</strong></p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                          <li>Authentification et maintien de session</li>
                          <li>Sauvegarde de vos préférences</li>
                          <li>Progression dans la formation (localStorage)</li>
                        </ul>
                        <p><strong>Cookies analytiques :</strong></p>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                          <li>Mesure d&apos;audience anonyme pour améliorer le site</li>
                          <li>Ces cookies ne collectent pas de données permettant de vous identifier personnellement</li>
                        </ul>
                        <p><strong>Gestion des cookies :</strong></p>
                        <p>
                          Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter le fonctionnement du site.
                        </p>
                      </div>
                    </section>

                    <section id="partage">
                      <h2 className="text-xl font-semibold text-white mb-4">4. Partage des données</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Vos données peuvent être partagées avec :</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                          <li><strong>Stripe :</strong> pour le traitement sécurisé des paiements</li>
                          <li><strong>Vercel :</strong> notre hébergeur (données techniques uniquement)</li>
                          <li><strong>Service d&apos;emailing :</strong> pour l&apos;envoi des emails transactionnels et newsletters</li>
                        </ul>
                        <p>
                          Ces prestataires sont soumis à des obligations de confidentialité et n&apos;utilisent vos données que pour les services que nous leur avons confiés.
                        </p>
                        <p>
                          <strong>Transferts hors UE :</strong> Certains prestataires sont situés aux États-Unis. Les transferts sont encadrés par des clauses contractuelles types approuvées par la Commission européenne.
                        </p>
                      </div>
                    </section>

                    <section id="securite">
                      <h2 className="text-xl font-semibold text-white mb-4">5. Sécurité des données</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Nous mettons en œuvre des mesures de sécurité appropriées :</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                          <li>Chiffrement SSL/TLS pour toutes les communications</li>
                          <li>Mots de passe hashés avec des algorithmes sécurisés</li>
                          <li>Paiements traités par Stripe (certifié PCI-DSS)</li>
                          <li>Accès restreint aux données personnelles</li>
                          <li>Sauvegardes régulières et sécurisées</li>
                        </ul>
                        <p>
                          Malgré ces précautions, aucune transmission sur Internet n&apos;est totalement sécurisée. Nous vous encourageons à utiliser un mot de passe fort et unique.
                        </p>
                      </div>
                    </section>

                    <section id="conservation">
                      <h2 className="text-xl font-semibold text-white mb-4">6. Conservation des données</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Vos données sont conservées selon les durées suivantes :</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                          <li><strong>Données de compte :</strong> pendant la durée de votre accès à la formation + 3 ans après la dernière connexion</li>
                          <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
                          <li><strong>Données de contact (formulaire) :</strong> 3 ans après le dernier contact</li>
                          <li><strong>Cookies analytiques :</strong> 13 mois maximum</li>
                        </ul>
                        <p>
                          Vous pouvez demander la suppression anticipée de vos données (voir section &quot;Vos droits&quot;).
                        </p>
                      </div>
                    </section>

                    <section id="droits">
                      <h2 className="text-xl font-semibold text-white mb-4">7. Vos droits</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                          <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
                          <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                          <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                          <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                          <li><strong>Droit à la limitation :</strong> demander la suspension du traitement</li>
                        </ul>
                        <p>
                          Pour exercer ces droits, contactez-nous via le <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">formulaire de contact</Link> ou par email à : rgpd@comprendrepourvendre.com
                        </p>
                        <p>
                          Vous pouvez également déposer une réclamation auprès de la CNIL (cnil.fr).
                        </p>
                      </div>
                    </section>

                    <section id="contact">
                      <h2 className="text-xl font-semibold text-white mb-4">8. Nous contacter</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>Pour toute question concernant cette politique de confidentialité :</p>
                        <ul className="list-none space-y-2 pl-4">
                          <li><strong>Email :</strong> rgpd@comprendrepourvendre.com</li>
                          <li><strong>Formulaire :</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">Page contact</Link></li>
                        </ul>
                        <p>
                          Nous nous engageons à répondre à vos demandes dans un délai de 30 jours.
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
                    Des questions sur la protection de vos données ?
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
                      className="text-sm text-green-400 hover:text-green-300 transition-colors"
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
