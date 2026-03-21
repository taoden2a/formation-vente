'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ReactNode, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  exact?: boolean
}

interface ProgressData {
  progressPercent: number
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { label: 'Accueil', href: '/', exact: true },
  { label: 'Formation', href: '/formation' },
  { label: 'Exercices', href: '/exercices' },
  { label: 'Affiliation', href: '/affiliation' },
]

const HIDDEN_PATHS = ['/connexion', '/inscription', '/deconnexion', '/mot-de-passe-oublie', '/reinitialisation-mdp']

// ─── SlideTabs ────────────────────────────────────────────────────────────────

interface SlideTabsProps {
  items: NavItem[]
  pathname: string | null
}

function SlideTabs({ items, pathname }: SlideTabsProps) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const tabRefs = useRef<(HTMLLIElement | null)[]>([])

  const activeIndex = items.findIndex(({ href, exact }) =>
    exact ? pathname === href : (pathname?.startsWith(href) ?? false)
  )

  useEffect(() => {
    const el = tabRefs.current[activeIndex]
    if (!el) return
    setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 })
  }, [activeIndex])

  const resetToActive = () => {
    const el = tabRefs.current[activeIndex]
    if (!el) return
    setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 })
  }

  const moveTo = (i: number) => {
    const el = tabRefs.current[i]
    if (!el) return
    setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 })
  }

  return (
    <ul onMouseLeave={resetToActive} className="relative hidden md:flex items-center rounded-full p-1">
      {items.map((item, i) => (
        <li
          key={item.href}
          ref={(el) => { tabRefs.current[i] = el }}
          onMouseEnter={() => moveTo(i)}
          className="relative z-10"
        >
          <Link
            href={item.href}
            className={clsx(
              'block px-4 py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap',
              activeIndex === i ? 'text-white' : 'text-gray-400 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <motion.li
        animate={{ left: position.left, width: position.width, opacity: position.opacity }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 bottom-1 z-0 rounded-full bg-white/[0.12] pointer-events-none"
      />
    </ul>
  )
}

// ─── Hamburger ─────────────────────────────────────────────────────────────────

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/[0.15] active:bg-white/20 border border-white/20 transition-colors"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
    >
      <span className={clsx('block h-0.5 bg-white rounded-full transition-transform duration-300', open && 'translate-y-[5px] rotate-45')} style={{ width: '16px', marginBottom: open ? '0' : '4px' }} />
      <span className={clsx('block h-0.5 bg-white rounded-full transition-opacity duration-300', open ? 'opacity-0' : 'opacity-100')} style={{ width: '16px', marginBottom: '4px' }} />
      <span className={clsx('block h-0.5 bg-white rounded-full transition-transform duration-300', open && '-translate-y-[9px] -rotate-45')} style={{ width: '16px' }} />
    </button>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({ authSlot }: { authSlot?: ReactNode }) {
  const pathname = usePathname()

  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const showProgress = pathname?.startsWith('/formation') ?? false
  const isLanding = pathname === '/'
  const isHidden = HIDDEN_PATHS.some((p) => pathname?.startsWith(p))

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const handle = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMobileOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Formation progress from localStorage
  useEffect(() => {
    if (!showProgress) { setProgress(null); return }
    const load = () => {
      try {
        const stored = localStorage.getItem('cpv_progress')
        if (stored) setProgress(JSON.parse(stored))
      } catch { /* ignore */ }
    }
    load()
    const onStorage = (e: StorageEvent) => { if (e.key === 'cpv_progress') load() }
    const onUpdate = () => load()
    window.addEventListener('storage', onStorage)
    window.addEventListener('cpv-progress-update', onUpdate)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cpv-progress-update', onUpdate)
    }
  }, [showProgress])

  if (isHidden) return null

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : (pathname?.startsWith(href) ?? false)

  return (
    <>
      {/* Spacer on non-landing pages so content starts below the pill */}
      {!isLanding && <div className="h-16 bg-[#0a0a0f]" />}

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        {/* ── Desktop: floating pill ─────────────────────────────────────────── */}
        <div className="hidden md:flex justify-center pt-4 pointer-events-auto">
          <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.12] shadow-lg">

            {/* Logo */}
            <Link
              href="/"
              className="px-3 py-1 text-white font-semibold text-sm tracking-tight hover:text-white/80 transition-colors whitespace-nowrap mr-1"
            >
              CpV
            </Link>

            {/* SlideTabs */}
            <SlideTabs items={navItems} pathname={pathname} />

            {/* Progress badge — /formation* only */}
            {showProgress && progress && (
              <span className="ml-2 text-xs font-semibold text-orange-400 tabular-nums">
                {progress.progressPercent}%
              </span>
            )}

            <div className="w-px h-5 bg-white/15 mx-1" />

            {/* CTA — landing only */}
            {isLanding && (
              <Link
                href="#prix"
                className="btn-premium inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold text-white whitespace-nowrap"
              >
                Accéder à la formation
              </Link>
            )}

            {/* Auth slot */}
            {authSlot && <div className="ml-1">{authSlot}</div>}
          </div>
        </div>

        {/* ── Mobile: full-width bar ─────────────────────────────────────────── */}
        <div className="md:hidden h-14 flex items-center justify-between px-4 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-white/10 pointer-events-auto">
          <Link href="/" className="text-white font-semibold text-sm tracking-tight">
            Comprendre pour Vendre
          </Link>
          <div className="flex items-center gap-2">
            {showProgress && progress && (
              <span className="text-xs font-semibold text-orange-400">{progress.progressPercent}%</span>
            )}
            {authSlot}
            <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </div>

        {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
        <div
          className={clsx(
            'md:hidden absolute left-0 right-0 top-14 z-50 pointer-events-auto',
            'bg-[#0a0a0f] border-b border-white/10',
            'transition-[opacity,transform] duration-300',
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
        >
          <nav className="container-width py-4 flex flex-col gap-1">
            {navItems.map(({ label, href, exact }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'px-4 py-3.5 rounded-xl text-sm font-medium transition-colors',
                  isActive(href, exact) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {label}
              </Link>
            ))}
            {isLanding && (
              <Link
                href="#prix"
                onClick={() => setMobileOpen(false)}
                className="mt-2 btn-premium flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white"
              >
                Accéder à la formation
              </Link>
            )}
            <div className="mt-2 pt-4 border-t border-white/10 px-4">{authSlot}</div>
          </nav>
        </div>
      </header>
    </>
  )
}
