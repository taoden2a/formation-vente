'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { GlassAuthCard } from '@/components/ui/GlassAuthCard'

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
    </svg>
  )
}

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Une erreur est survenue.')
        setLoading(false)
        return
      }

      setSent(true)
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassAuthCard>
      {/* Logo */}
      <div className="text-center space-y-1 mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mx-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-orange-500/10"
        >
          <span className="text-sm font-bold text-orange-400">CpV</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
        >
          Mot de passe oublié
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xs"
        >
          Saisis ton email pour recevoir un lien de réinitialisation.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          /* ── État succès ─────────────────────────────── */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            <div>
              <p className="text-white font-medium text-sm">Email envoyé !</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                Si un compte existe avec <span className="text-white/70">{email}</span>, tu
                recevras un lien de réinitialisation dans quelques minutes.
              </p>
            </div>

            <p className="text-white/40 text-xs">
              Vérifie aussi ton dossier spam.
            </p>

            <Link
              href="/connexion"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-300 mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </motion.div>
        ) : (
          /* ── Formulaire ──────────────────────────────── */
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Email */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="relative flex items-center overflow-hidden rounded-lg">
                <Mail className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput ? 'text-orange-400' : 'text-white/40'}`} />
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                  autoComplete="email"
                  required
                  className="w-full h-10 bg-white/5 border border-transparent focus:border-orange-500/40 text-white placeholder:text-white/30 text-sm pl-10 pr-3 rounded-lg outline-none transition-all duration-300 focus:bg-white/10"
                />
                {focusedInput && (
                  <motion.div
                    layoutId="input-highlight-mdp"
                    className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full relative group/btn"
            >
              <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-70 transition-opacity duration-300" />
              <div className="relative overflow-hidden bg-orange-500 hover:bg-orange-400 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Spinner />
                      <span className="text-sm">Envoi en cours...</span>
                    </motion.div>
                  ) : (
                    <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-sm font-medium">
                      Envoyer le lien
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Retour connexion */}
            <motion.p
              className="text-center text-xs text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/connexion" className="relative inline-flex items-center gap-1 group/link">
                <ArrowLeft className="w-3 h-3 text-white/50 group-hover/link:text-white transition-colors duration-300" />
                <span className="relative z-10 text-white/60 group-hover/link:text-white transition-colors duration-300">
                  Retour à la connexion
                </span>
              </Link>
            </motion.p>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassAuthCard>
  )
}
