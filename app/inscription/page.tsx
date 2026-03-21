'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react'
import { GlassAuthCard } from '@/components/ui/GlassAuthCard'

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
    </svg>
  )
}

function InscriptionForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/#prix'
  const isCheckout = next === 'checkout'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailExists, setEmailExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<'register' | 'checkout'>('register')
  const [shake, setShake] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  async function triggerCheckout() {
    setLoadingStep('checkout')
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      setError('Impossible de lancer le paiement. Veuillez réessayer.')
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
    }
    setLoading(false)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      triggerShake()
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      triggerShake()
      return
    }

    setLoading(true)
    setLoadingStep('register')
    setEmailExists(false)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      let data: { error?: string; code?: string } = {}
      try { data = await res.json() } catch { /* réponse non-JSON */ }

      if (!res.ok) {
        if (res.status === 409 && data.code === 'EMAIL_EXISTS') {
          setEmailExists(true)
          setLoading(false)
          return
        }
        setError(data.error ?? 'Une erreur est survenue. Veuillez réessayer.')
        triggerShake()
        setLoading(false)
        return
      }

      const signInRes = await signIn('credentials', { email, password, redirect: false })

      if (!signInRes || signInRes.error) {
        window.location.href = `/connexion${isCheckout ? '?next=checkout' : ''}`
        return
      }

      if (isCheckout) {
        await triggerCheckout()
      } else {
        window.location.href = next
      }
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
      triggerShake()
      setLoading(false)
    }
  }

  const connexionHref = `/connexion?next=${encodeURIComponent(next)}`

  const submitLabel = loading
    ? loadingStep === 'checkout' ? 'Redirection vers le paiement...' : 'Création du compte...'
    : isCheckout ? 'Créer mon compte et payer' : 'Créer mon compte'

  return (
    <GlassAuthCard>
      {/* Logo */}
      <div className="text-center space-y-1 mb-5">
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
          Créer un compte
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xs"
        >
          {isCheckout
            ? 'Crée ton compte pour accéder immédiatement à la formation.'
            : 'Accédez à la formation en quelques secondes.'}
        </motion.p>
      </div>

      {/* Purchase context banner */}
      {isCheckout && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500/[0.07] border border-orange-500/20"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white leading-tight">Comprendre pour Vendre</p>
            <p className="text-xs text-white/40 mt-0.5">59€ · Accès à vie · Paiement sécurisé Stripe</p>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-3">

        {/* Email */}
        <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <div className="relative flex items-center overflow-hidden rounded-lg">
            <Mail className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput === 'email' ? 'text-orange-400' : 'text-white/40'}`} />
            <input
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              autoComplete="email"
              required
              className="w-full h-10 bg-white/5 border border-transparent focus:border-orange-500/40 text-white placeholder:text-white/30 text-sm pl-10 pr-3 rounded-lg outline-none transition-all duration-300 focus:bg-white/10"
            />
            {focusedInput === 'email' && (
              <motion.div layoutId="input-highlight-ins" className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            )}
          </div>
        </motion.div>

        {/* Password */}
        <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <div className="relative flex items-center overflow-hidden rounded-lg">
            <Lock className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput === 'password' ? 'text-orange-400' : 'text-white/40'}`} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="8 caractères minimum"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              autoComplete="new-password"
              required
              className="w-full h-10 bg-white/5 border border-transparent focus:border-orange-500/40 text-white placeholder:text-white/30 text-sm pl-10 pr-10 rounded-lg outline-none transition-all duration-300 focus:bg-white/10"
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1} className="absolute right-3 text-white/40 hover:text-white transition-colors duration-300">
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            {focusedInput === 'password' && (
              <motion.div layoutId="input-highlight-ins" className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            )}
          </div>
        </motion.div>

        {/* Confirm password */}
        <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <div className="relative flex items-center overflow-hidden rounded-lg">
            <Lock className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput === 'confirm' ? 'text-orange-400' : 'text-white/40'}`} />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedInput('confirm')}
              onBlur={() => setFocusedInput(null)}
              autoComplete="new-password"
              required
              className="w-full h-10 bg-white/5 border border-transparent focus:border-orange-500/40 text-white placeholder:text-white/30 text-sm pl-10 pr-10 rounded-lg outline-none transition-all duration-300 focus:bg-white/10"
            />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1} className="absolute right-3 text-white/40 hover:text-white transition-colors duration-300">
              {showConfirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            {focusedInput === 'confirm' && (
              <motion.div layoutId="input-highlight-ins" className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            )}
          </div>
        </motion.div>

        {/* Email already exists */}
        {emailExists && (
          <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 space-y-3">
            <p className="text-sm text-orange-300 leading-snug">
              Un compte existe déjà avec cette adresse email.
              {isCheckout ? ' Connecte-toi pour continuer ton achat.' : ' Connecte-toi pour accéder à ton espace.'}
            </p>
            <Link
              href={`/connexion?next=${encodeURIComponent(next)}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 transition-colors text-white font-medium text-sm"
            >
              Se connecter et continuer
            </Link>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 ${shake ? 'animate-shake' : ''}`}>
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
          className="w-full relative group/btn mt-2"
        >
          <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-70 transition-opacity duration-300" />
          <div className="relative overflow-hidden bg-orange-500 hover:bg-orange-400 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              style={{ opacity: loading ? 1 : 0, transition: 'opacity 0.3s ease' }}
            />
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-sm">{submitLabel}</span>
                </motion.div>
              ) : (
                <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-sm font-medium">
                  {submitLabel}
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Sign in link */}
        <motion.p
          className="text-center text-xs text-white/50 pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Déjà un compte ?{' '}
          <Link href={connexionHref} className="relative inline-block group/link">
            <span className="relative z-10 text-white group-hover/link:text-white/70 transition-colors duration-300 font-medium">
              Se connecter
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
          </Link>
        </motion.p>

      </form>
    </GlassAuthCard>
  )
}

export default function InscriptionPage() {
  return (
    <Suspense>
      <InscriptionForm />
    </Suspense>
  )
}
