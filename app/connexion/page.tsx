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

function ConnexionForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/formation'
  const isCheckout = next === 'checkout'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<'login' | 'checkout'>('login')
  const [shake, setShake] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

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
    setLoading(true)
    setLoadingStep('login')

    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl: isCheckout ? '/' : next,
      })

      if (!res || res.error) {
        setLoading(false)
        setError('Email ou mot de passe incorrect.')
        setShake(true)
        setTimeout(() => setShake(false), 400)
        return
      }

      if (isCheckout) {
        await triggerCheckout()
      } else {
        window.location.href = res.url ?? next
      }
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
      setShake(true)
      setTimeout(() => setShake(false), 400)
      setLoading(false)
    }
  }

  const inscriptionHref = `/inscription?next=${encodeURIComponent(next)}`

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
          Connexion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xs"
        >
          {isCheckout
            ? 'Connecte-toi pour accéder directement au paiement.'
            : 'Accédez à votre espace de formation.'}
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
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
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
              <motion.div
                layoutId="input-highlight"
                className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="relative flex items-center overflow-hidden rounded-lg">
            <Lock className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput === 'password' ? 'text-orange-400' : 'text-white/40'}`} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              autoComplete="current-password"
              required
              className="w-full h-10 bg-white/5 border border-transparent focus:border-orange-500/40 text-white placeholder:text-white/30 text-sm pl-10 pr-10 rounded-lg outline-none transition-all duration-300 focus:bg-white/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="absolute right-3 text-white/40 hover:text-white transition-colors duration-300"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            {focusedInput === 'password' && (
              <motion.div
                layoutId="input-highlight"
                className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        </motion.div>

        {/* Remember me + forgot password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((v) => !v)}
                className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
              />
              {rememberMe && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </div>
            <span className="text-xs text-white/60">Se souvenir de moi</span>
          </label>

          <Link
            href="/mot-de-passe-oublie"
            className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200"
          >
            Mot de passe oublié ?
          </Link>
        </div>

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
            {/* Loading shimmer */}
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
                  <span className="text-sm">{loadingStep === 'checkout' ? 'Redirection vers le paiement...' : 'Connexion...'}</span>
                </motion.div>
              ) : (
                <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-sm font-medium">
                  {isCheckout ? 'Se connecter et payer' : 'Se connecter'}
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Sign up link */}
        <motion.p
          className="text-center text-xs text-white/50 pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pas encore membre ?{' '}
          <Link href={inscriptionHref} className="relative inline-block group/link">
            <span className="relative z-10 text-white group-hover/link:text-white/70 transition-colors duration-300 font-medium">
              Créer un compte
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/link:w-full transition-all duration-300" />
          </Link>
        </motion.p>

      </form>
    </GlassAuthCard>
  )
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  )
}
