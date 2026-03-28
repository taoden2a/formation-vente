"use client";

import { useState } from "react";

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

function CheckCircleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ContactForm() {
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
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.subject) newErrors.subject = "Veuillez choisir un sujet";
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (isSubmitted) {
    return (
      <div className="contact-success-card p-5 sm:p-8 rounded-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400">
          <CheckCircleIcon size={32} />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-3">Message envoyé !</h2>
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-card p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nom complet</label>
        <input
          type="text" id="name" name="name"
          value={formData.name} onChange={handleChange}
          onFocus={() => setIsFocused("name")} onBlur={() => setIsFocused(null)}
          placeholder="Votre nom"
          className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 ${
            errors.name ? "border-red-500/50 focus:border-red-500"
            : isFocused === "name" ? "border-blue-500/50 ring-2 ring-blue-500/20"
            : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Adresse email</label>
        <input
          type="email" id="email" name="email"
          value={formData.email} onChange={handleChange}
          onFocus={() => setIsFocused("email")} onBlur={() => setIsFocused(null)}
          placeholder="votre@email.com"
          className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 ${
            errors.email ? "border-red-500/50 focus:border-red-500"
            : isFocused === "email" ? "border-blue-500/50 ring-2 ring-blue-500/20"
            : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Sujet</label>
        <select
          id="subject" name="subject"
          value={formData.subject} onChange={handleChange}
          onFocus={() => setIsFocused("subject")} onBlur={() => setIsFocused(null)}
          className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white transition-all duration-300 appearance-none cursor-pointer ${
            errors.subject ? "border-red-500/50 focus:border-red-500"
            : isFocused === "subject" ? "border-blue-500/50 ring-2 ring-blue-500/20"
            : "border-white/10 hover:border-white/20"
          } ${!formData.subject ? "text-gray-500" : ""}`}
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0f1420]">
              {option.label}
            </option>
          ))}
        </select>
        {errors.subject && <p className="text-sm text-red-400">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
        <textarea
          id="message" name="message"
          value={formData.message} onChange={handleChange}
          onFocus={() => setIsFocused("message")} onBlur={() => setIsFocused(null)}
          rows={5}
          placeholder="Décrivez votre question ou problème en détail..."
          className={`contact-input w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 transition-all duration-300 resize-none ${
            errors.message ? "border-red-500/50 focus:border-red-500"
            : isFocused === "message" ? "border-blue-500/50 ring-2 ring-blue-500/20"
            : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
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
  );
}
