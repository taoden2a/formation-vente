import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";

// Icons (server-rendered, pas de client nécessaire)
function MailIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ClockIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MessageCircleIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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

export default function ContactPage() {
  // Lecture côté serveur — jamais exposé dans le bundle client
  const adminEmail = process.env.ADMIN_EMAIL ?? "";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-10 md:py-16 lg:py-24">

            {/* Hero */}
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 sm:mb-6">
                  <MessageCircleIcon size={18} className="text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Support</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Contactez-nous
                </h1>
                <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
                  Une question, un problème technique ou une suggestion ? Notre équipe est là pour vous aider.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6 lg:gap-12">

              {/* Form — client component */}
              <ScrollReveal delay={0.1} className="lg:col-span-3">
                <ContactForm />
              </ScrollReveal>

              {/* Sidebar — server-rendered */}
              <ScrollReveal delay={0.2} className="lg:col-span-2 space-y-6">

                {/* Support rapide */}
                <div className="contact-info-card p-4 sm:p-6 rounded-2xl space-y-5 sm:space-y-6">
                  <h3 className="text-lg font-semibold text-white">Support rapide</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <ClockIcon size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Délai de réponse</h4>
                        <p className="text-sm text-gray-400">24 à 48 heures ouvrées</p>
                      </div>
                    </div>

                    {adminEmail && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <MailIcon size={18} className="text-orange-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Email direct</h4>
                          <p className="text-sm text-gray-400">{adminEmail}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="contact-info-card p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <HelpCircleIcon size={18} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Consultez notre FAQ</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Vous trouverez peut-être la réponse à votre question dans notre centre d&apos;aide.
                      </p>
                      <Link href="/faq" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Voir les questions fréquentes →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="contact-info-card p-4 sm:p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-white mb-3">Horaires du support</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lundi - Vendredi</span>
                      <span className="text-white">9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Samedi - Dimanche</span>
                      <span className="text-gray-500">Fermé</span>
                    </div>
                  </div>
                </div>

              </ScrollReveal>
            </div>
          </div>
      </BackgroundAnimated>
    </div>
  );
}
