'use client'

import { motion } from 'framer-motion'
import { CheckoutButton } from '@/components/CheckoutButton'
import { CheckIcon } from '@/components/ui/Icons'

const features = [
  '8 modules structurés',
  '43 leçons',
  'Exercices concrets',
  'Templates utilisables',
  'Mises à jour incluses',
  'Accès à vie',
]

/**
 * PricingCard — carte animée (SquishyCard pattern) affichée pour les utilisateurs sans accès.
 *
 * Animation hover :
 *   - La carte monte légèrement (scale 1.03)
 *   - Le prix s'agrandit (scale 1.06)
 *   - Les cercles SVG en fond se déforment (squish/stretch)
 */
export function PricingCard() {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 0.75, ease: 'backInOut' }}
      variants={{ hover: { scale: 1.03 } }}
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white cursor-default select-none"
    >
      {/* Animated background — orange circles that squish on hover */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-10 space-y-6 text-gray-900">

        {/* Badge + title */}
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold tracking-wide uppercase">
            Formation
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Comprendre pour Vendre</h3>
          <p className="text-sm text-gray-500">Accès immédiat · 8 modules · 43 leçons · Accès à vie</p>
        </div>

        {/* Price */}
        <div className="space-y-0.5">
          <div className="flex items-end gap-2 sm:gap-3">
            <span className="text-gray-400 line-through text-lg sm:text-xl">199€</span>
            <motion.span
              initial={{ scale: 0.95 }}
              variants={{ hover: { scale: 1.06 } }}
              transition={{ duration: 0.75, ease: 'backInOut' }}
              className="text-5xl sm:text-6xl font-black text-gray-900 leading-none origin-bottom-left"
            >
              59€
            </motion.span>
          </div>
          <p className="text-gray-500 text-sm">Paiement unique • Accès à vie</p>
          <p className="text-gray-400 text-xs italic">Moins cher qu&apos;un seul prospect perdu.</p>
        </div>

        {/* Features */}
        <ul className="space-y-2 text-sm text-gray-600">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon size={11} className="text-green-600" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Guarantee */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl py-2.5 px-3.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Satisfait ou remboursé 14 jours — sans questions</span>
        </div>

        {/* CTA */}
        <CheckoutButton />

        <p className="text-xs text-gray-400 text-center">Paiement sécurisé par Stripe.</p>
      </div>
    </motion.div>
  )
}

// ─── Animated SVG background ──────────────────────────────────────────────────

function AnimatedBackground() {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 480 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0 pointer-events-none"
      variants={{ hover: { scale: 1.35 } }}
      transition={{ duration: 0.75, ease: 'backInOut' }}
    >
      {/* Top circle — squishes on hover */}
      <motion.circle
        cx="240"
        cy="150"
        r="130"
        fill="rgba(249, 115, 22, 0.08)"
        variants={{ hover: { scaleY: 0.55, y: -28 } }}
        transition={{ duration: 0.75, ease: 'backInOut', delay: 0.08 }}
      />
      {/* Bottom ellipse — stretches on hover */}
      <motion.ellipse
        cx="240"
        cy="370"
        rx="130"
        ry="55"
        fill="rgba(249, 115, 22, 0.06)"
        variants={{ hover: { scaleY: 2.4, y: -28 } }}
        transition={{ duration: 0.75, ease: 'backInOut', delay: 0.08 }}
      />
    </motion.svg>
  )
}
