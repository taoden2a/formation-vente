'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ArrowLeft } from 'lucide-react'
import { GlassAuthCard } from '@/components/ui/GlassAuthCard'

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
    </svg>
  )
}

export default function DeconnexionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await signOut({ callbackUrl: '/' })
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
          Se déconnecter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-sm"
        >
          Es-tu sûr de vouloir te déconnecter ?
        </motion.p>
      </div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring' }}
        className="flex justify-center mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <LogOut className="w-7 h-7 text-white/50" />
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3"
      >
        {/* Se déconnecter */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          disabled={loading}
          className="w-full relative group/btn"
        >
          <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-70 transition-opacity duration-300" />
          <div className="relative overflow-hidden bg-orange-500 hover:bg-orange-400 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-sm">Déconnexion...</span>
                </motion.div>
              ) : (
                <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium">
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Annuler */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/membre')}
          disabled={loading}
          className="w-full relative group/cancel"
        >
          <div className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Annuler</span>
          </div>
        </motion.button>
      </motion.div>
    </GlassAuthCard>
  )
}
