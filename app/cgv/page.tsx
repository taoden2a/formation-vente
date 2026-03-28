"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
function ShieldIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

const sections = [
  { id: "objet", title: "Objet" },
  { id: "acces", title: "Accès à la formation" },
  { id: "prix", title: "Prix et paiement" },
  { id: "droit-retractation", title: "Droit de rétractation" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "donnees", title: "Données personnelles" },
  { id: "modification", title: "Modification des CGV" },
  { id: "litige", title: "Règlement des litiges" },
];

export default function CGVPage() {
  const [activeSection, setActiveSection] = useState("objet");

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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <ShieldIcon size={18} className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Conditions générales</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Conditions Générales de Vente
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto">
                  Les conditions qui régissent l&apos;achat et l&apos;utilisation de la formation &quot;Comprendre pour Vendre&quot;.
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
                            ? "bg-orange-500/10 text-orange-300 border-l-2 border-orange-500"
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
                    <section id="objet">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 1 — Objet</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre l&apos;éditeur du site comprendrepourvendre.com (ci-après « le Vendeur ») et toute personne effectuant un achat sur le site (ci-après « l&apos;Acheteur » ou « le Client »).
                        </p>
                        <p>
                          L&apos;objet des présentes CGV est de définir les droits et obligations des parties dans le cadre de la vente en ligne de la formation numérique « Comprendre pour Vendre ».
                        </p>
                        <p>
                          Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
                        </p>
                      </div>
                    </section>

                    <section id="acces">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 2 — Accès à la formation</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>2.1 Contenu :</strong> La formation « Comprendre pour Vendre » est une formation en ligne composée de 8 modules et 43 leçons, accompagnées de ressources téléchargeables (templates, exercices, fiches de synthèse).
                        </p>
                        <p>
                          <strong>2.2 Accès :</strong> L&apos;accès à la formation est accordé immédiatement après confirmation du paiement. Un email contenant les identifiants de connexion est envoyé à l&apos;adresse email fournie lors de la commande.
                        </p>
                        <p>
                          <strong>2.3 Durée :</strong> L&apos;accès à la formation est accordé à vie, sans limitation de durée. Le Client peut revenir sur le contenu autant de fois qu&apos;il le souhaite.
                        </p>
                        <p>
                          <strong>2.4 Mises à jour :</strong> Le Client bénéficie automatiquement et gratuitement de toutes les mises à jour futures du contenu de la formation.
                        </p>
                        <p>
                          <strong>2.5 Usage personnel :</strong> L&apos;accès à la formation est strictement personnel et nominatif. Il est interdit de partager ses identifiants de connexion ou de diffuser le contenu de la formation à des tiers.
                        </p>
                      </div>
                    </section>

                    <section id="prix">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 3 — Prix et paiement</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>3.1 Prix :</strong> Le prix de la formation est indiqué en euros TTC sur la page de vente. Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés au prix en vigueur au moment de la validation de la commande.
                        </p>
                        <p>
                          <strong>3.2 Modalités de paiement :</strong> Le paiement peut être effectué par carte bancaire (Visa, Mastercard, American Express) via la plateforme sécurisée Stripe.
                        </p>
                        <p>
                          <strong>3.3 Sécurité :</strong> Toutes les transactions sont sécurisées par chiffrement SSL. Le Vendeur n&apos;a jamais accès aux informations bancaires du Client.
                        </p>
                        <p>
                          <strong>3.4 Facturation :</strong> Une facture conforme est automatiquement générée et envoyée par email après chaque achat. Elle est également téléchargeable depuis l&apos;espace membre.
                        </p>
                      </div>
                    </section>

                    <section id="droit-retractation">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 4 — Droit de rétractation</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>4.1</strong> Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques dont l&apos;exécution a commencé avec l&apos;accord préalable du consommateur. En accédant à la formation après l&apos;achat, le Client reconnaît renoncer expressément à son droit de rétractation.
                        </p>
                        <p>
                          <strong>4.2 Réclamations :</strong> Toute réclamation concernant la formation doit être adressée via le formulaire de contact dans un délai de 7 jours suivant l&apos;achat, en exposant précisément les motifs de la demande. Le Vendeur se réserve le droit d&apos;examiner chaque demande au cas par cas et d&apos;y répondre dans un délai de 14 jours ouvrés.
                        </p>
                        <p>
                          <strong>4.3</strong> Le Vendeur ne procède à aucun remboursement automatique. Toute décision de remboursement est laissée à la seule appréciation du Vendeur après examen de la demande.
                        </p>
                      </div>
                    </section>

                    <section id="propriete">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 5 — Propriété intellectuelle</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>5.1 Droits d&apos;auteur :</strong> L&apos;ensemble du contenu de la formation (textes, vidéos, images, graphiques, etc.) est protégé par le droit d&apos;auteur et reste la propriété exclusive du Vendeur.
                        </p>
                        <p>
                          <strong>5.2 Licence d&apos;utilisation :</strong> L&apos;achat de la formation confère au Client un droit d&apos;usage personnel et non-exclusif. Il est interdit de reproduire, copier, modifier, distribuer ou revendre tout ou partie du contenu sans autorisation écrite préalable.
                        </p>
                        <p>
                          <strong>5.3 Sanctions :</strong> Toute violation de ces droits pourra entraîner la suspension immédiate de l&apos;accès à la formation et des poursuites judiciaires.
                        </p>
                      </div>
                    </section>

                    <section id="responsabilite">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 6 — Responsabilité</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>6.1 Obligation de moyens :</strong> Le Vendeur s&apos;engage à mettre en œuvre tous les moyens nécessaires pour assurer la qualité du contenu et la disponibilité de la plateforme.
                        </p>
                        <p>
                          <strong>6.2 Résultats :</strong> La formation vise à transmettre des connaissances et des méthodes. Les résultats obtenus dépendent de l&apos;implication et des efforts personnels du Client. Le Vendeur ne garantit pas de résultats spécifiques.
                        </p>
                        <p>
                          <strong>6.3 Interruptions :</strong> Le Vendeur ne saurait être tenu responsable des interruptions temporaires du service pour maintenance ou raisons techniques indépendantes de sa volonté.
                        </p>
                      </div>
                    </section>

                    <section id="donnees">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 7 — Données personnelles</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Les données personnelles collectées lors de l&apos;achat sont traitées conformément au Règlement Général sur la Protection des Données (RGPD) et à notre <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline">politique de confidentialité</Link>.
                        </p>
                        <p>
                          Ces données sont utilisées uniquement pour l&apos;exécution de la commande, l&apos;accès à la formation et la communication avec le Client. Elles ne sont jamais revendues à des tiers.
                        </p>
                      </div>
                    </section>

                    <section id="modification">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 8 — Modification des CGV</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande. Les modifications ultérieures n&apos;affectent pas les commandes déjà validées.
                        </p>
                      </div>
                    </section>

                    <section id="litige">
                      <h2 className="text-xl font-semibold text-white mb-4">Article 9 — Règlement des litiges</h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          <strong>9.1 Réclamation :</strong> Pour toute réclamation, le Client peut contacter le service client via le <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">formulaire de contact</Link>.
                        </p>
                        <p>
                          <strong>9.2 Médiation :</strong> En cas de litige non résolu à l&apos;amiable, le Client peut recourir gratuitement au service de médiation de la consommation conformément à l&apos;article L.612-1 du Code de la consommation.
                        </p>
                        <p>
                          <strong>9.3 Droit applicable :</strong> Les présentes CGV sont soumises au droit français. Tout litige sera de la compétence exclusive des tribunaux français.
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
                    Des questions sur nos conditions de vente ?
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
