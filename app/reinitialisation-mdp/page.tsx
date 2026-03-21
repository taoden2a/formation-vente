'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, EyeOff, Eye, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { GlassAuthCard } from '@/components/ui/GlassAuthCard'

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
    </svg>
  )
}

type TokenState = 'checking' | 'valid' | 'invalid'

function ReinitialisationForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [tokenState, setTokenState] = useState<TokenState>('checking')
  const [tokenError, setTokenError] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)

  // Vérifier le token au chargement
  useEffect(() => {
    if (!token) {
      setTokenState('invalid')
      setTokenError('Aucun token de réinitialisation trouvé.')
      return
    }

    fetch(`/api/auth/reset-password/verify?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setTokenState('valid')
        } else {
          setTokenState('invalid')
          setTokenError(data.reason ?? 'Ce lien est expiré ou invalide.')
        }
      })
      .catch(() => {
        setTokenState('invalid')
        setTokenError('Erreur de vérification. Réessaie plus tard.')
      })
  }, [token])

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
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

    try {
      const res = await fetch('/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.')
        triggerShake()
        setLoading(false)
        return
      }

      setSuccess(true)
      // Rediriger vers /connexion après 2.5s
      setTimeout(() => { window.location.href = '/connexion' }, 2500)
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
      triggerShake()
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
          Nouveau mot de passe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xs"
        >
          Choisis un nouveau mot de passe sécurisé.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Vérification en cours ─────────────────────── */}
        {tokenState === 'checking' && (
          <motion.div
            key="checking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-6"
          >
            <Spinner />
            <p className="text-white/50 text-sm">Vérification du lien...</p>
          </motion.div>
        )}

        {/* ── Token invalide / expiré ───────────────────── */}
        {tokenState === 'invalid' && (
          <motion.div
            key="invalid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Lien invalide</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">{tokenError}</p>
            </div>
            <Link
              href="/mot-de-passe-oublie"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
              Refaire une demande
            </Link>
            <Link
              href="/connexion"
              className="flex items-center justify-center gap-2 w-full py-2 text-white/50 hover:text-white text-xs transition-colors duration-300"
            >
              <ArrowLeft className="w-3 h-3" />
              Retour à la connexion
            </Link>
          </motion.div>
        )}

        {/* ── Succès ───────────────────────────────────── */}
        {success && (
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
              <p className="text-white font-medium text-sm">Mot de passe mis à jour !</p>
              <p className="text-white/50 text-xs mt-1">Redirection vers la connexion...</p>
            </div>
          </motion.div>
        )}

        {/* ── Formulaire ───────────────────────────────── */}
        {tokenState === 'valid' && !success && (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {/* Nouveau mot de passe */}
            <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <div className="relative flex items-center overflow-hidden rounded-lg">
                <Lock className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${focusedInput === 'password' ? 'text-orange-400' : 'text-white/40'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nouveau mot de passe (8 min.)"
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
                  <motion.div layoutId="input-highlight-reinit" className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                )}
              </div>
            </motion.div>

            {/* Confirmer */}
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
                  <motion.div layoutId="input-highlight-reinit" className="absolute inset-0 bg-orange-500/5 -z-10 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                )}
              </div>
            </motion.div>

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
              className="w-full relative group/btn mt-1"
            >
              <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-70 transition-opacity duration-300" />
              <div className="relative overflow-hidden bg-orange-500 hover:bg-orange-400 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Spinner />
                      <span className="text-sm">Réinitialisation...</span>
                    </motion.div>
                  ) : (
                    <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-sm font-medium">
                      Réinitialiser mon mot de passe
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            <motion.p
              className="text-center text-xs text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/connexion" className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors duration-300">
                <ArrowLeft className="w-3 h-3" />
                Retour à la connexion
              </Link>
            </motion.p>
          </motion.form>
        )}

      </AnimatePresence>
    </GlassAuthCard>
  )
}

export default function ReinitialisationMdpPage() {
  return (
    <Suspense>
      <ReinitialisationForm />
    </Suspense>
  )
}
