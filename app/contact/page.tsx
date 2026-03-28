"use client";

import { useState } from "react";
import Link from "next/link";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
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

function CheckCircleIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
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

const subjectOptions = [
  { value: "", label: "Choisir un sujet..." },
  { value: "question-formation", label: "Question sur la formation" },
  { value: "probleme-technique", label: "Problème technique" },
  { value: "paiement", label: "Question sur le paiement" },
  { value: "reclamation", label: "Réclamation" },
  { value: "affiliation", label: "Programme d'affiliation" },
  { value: "partenariat", label: "Proposition de partenariat" },
  { value: "autre", label: "Autre" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.subject) {
      newErrors.subject = "Veuillez choisir un sujet";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Le message doit contenir au moins 20 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Erreur lors de l'envoi. Veuillez réessayer.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
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
              {/* Form */}
              <ScrollReveal delay={0.1} className="lg:col-span-3">
                {isSubmitted ? (
                  <div className="contact-success-card p-5 sm:p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon size={32} className="text-green-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Message envoyé !
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Merci pour votre message. Nous vous répondrons dans les plus brefs délais, généralement sous 24 à 48 heures.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-card p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("name")}
                        onBlur={() => setIsFocused(null)}
                        className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 ${
                          errors.name
                            ? "border-red-500/50 focus:border-red-500"
                            : isFocused === "name"
                            ? "border-blue-500/50 ring-2 ring-blue-500/20"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("email")}
                        onBlur={() => setIsFocused(null)}
                        className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500"
                            : isFocused === "email"
                            ? "border-blue-500/50 ring-2 ring-blue-500/20"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("subject")}
                        onBlur={() => setIsFocused(null)}
                        className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white transition-all duration-300 appearance-none cursor-pointer ${
                          errors.subject
                            ? "border-red-500/50 focus:border-red-500"
                            : isFocused === "subject"
                            ? "border-blue-500/50 ring-2 ring-blue-500/20"
                            : "border-white/10 hover:border-white/20"
                        } ${!formData.subject ? "text-gray-500" : ""}`}
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-[#0f1420]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="text-sm text-red-400">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setIsFocused("message")}
                        onBlur={() => setIsFocused(null)}
                        rows={5}
                        className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                          errors.message
                            ? "border-red-500/50 focus:border-red-500"
                            : isFocused === "message"
                            ? "border-blue-500/50 ring-2 ring-blue-500/20"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        placeholder="Décrivez votre question ou problème en détail..."
                      />
                      {errors.message && (
                        <p className="text-sm text-red-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit error */}
                    {submitError && (
                      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 flex-shrink-0 mt-0.5">
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-sm text-red-400">{submitError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="contact-submit-btn w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer le message"
                      )}
                    </button>
                  </form>
                )}
              </ScrollReveal>

              {/* Sidebar */}
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

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <MailIcon size={18} className="text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Email direct</h4>
                        <p className="text-sm text-gray-400">deneutao@gmail.com</p>
                      </div>
                    </div>
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
                      <Link
                        href="/faq"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
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
      </PageTransition>
    </div>
  );
}
