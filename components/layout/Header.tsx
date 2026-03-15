'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ReactNode, useState, useEffect, useRef } from 'react'

interface ProgressData {
  progressPercent: number
}

const nav = [
  { label: 'Accueil', href: '/', exact: true },
  { label: 'Formation', href: '/formation' },
  { label: 'Exercices', href: '/exercices' },
  { label: 'Affiliation', href: '/affiliation' },
]

export function Header({ authSlot }: { authSlot?: ReactNode }) {
  const pathname = usePathname()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Refs for zero-rerender scroll handling
  const headerRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Progress bar visible only on /formation routes
  const showProgress = pathname?.startsWith('/formation') ?? false

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileOpen) return
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Scroll handler — rAF throttled, direct DOM class toggle, ZERO React re-renders
  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        headerRef.current?.classList.toggle('header-scrolled', window.scrollY >= 10)
      })
    }
    // Set initial state without rAF (synchronous on mount)
    if (window.scrollY >= 10) headerRef.current?.classList.add('header-scrolled')
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!showProgress) {
      setProgress(null)
      return
    }
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

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname?.startsWith(href) ?? false
  }

  return (
    <>
      {/* Spacer prevents content from going under the fixed header */}
      <div className="h-16" />

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-[background-color,border-color] duration-300 bg-transparent border-b border-transparent"
      >
        <div className="container-width h-full">
          <div className="h-full flex items-center justify-between">

            {/* Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-white font-semibold text-sm tracking-tight hover:text-white/80 transition-colors whitespace-nowrap"
              >
                Comprendre pour Vendre
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {nav.map(({ label, href, exact }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-sm transition-colors',
                      isActive(href, exact)
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Progress bar — /formation* only, desktop */}
            {showProgress && progress && (
              <div className="hidden lg:flex items-center gap-3 flex-1 max-w-xs mx-8">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-[transform] duration-500"
                    style={{
                      width: '100%',
                      transformOrigin: 'left',
                      transform: `scaleX(${progress.progressPercent / 100})`,
                    }}
                  />
                </div>
                <span className="text-xs text-orange-400 font-semibold flex-shrink-0">
                  {progress.progressPercent}%
                </span>
              </div>
            )}

            {/* Right — auth slot + mobile hamburger */}
            <div className="flex items-center gap-3">
              {showProgress && progress && (
                <span className="lg:hidden text-xs font-semibold text-orange-400">
                  {progress.progressPercent}%
                </span>
              )}
              {authSlot}

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-white/10 hover:bg-white/[0.15] active:bg-white/20 border border-white/20 transition-colors"
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileOpen}
              >
                <span
                  className={clsx(
                    'block w-4.5 h-0.5 bg-white rounded-full transition-transform duration-300',
                    mobileOpen && 'translate-y-[5px] rotate-45'
                  )}
                  style={{ width: '18px', marginBottom: mobileOpen ? '0' : '4px' }}
                />
                <span
                  className={clsx(
                    'block h-0.5 bg-white rounded-full transition-opacity duration-300',
                    mobileOpen ? 'opacity-0' : 'opacity-100'
                  )}
                  style={{ width: '18px', marginBottom: '4px' }}
                />
                <span
                  className={clsx(
                    'block h-0.5 bg-white rounded-full transition-transform duration-300',
                    mobileOpen && '-translate-y-[9px] -rotate-45'
                  )}
                  style={{ width: '18px' }}
                />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          ref={mobileMenuRef}
          className={clsx(
            'md:hidden absolute left-0 right-0 top-16 z-50',
            'bg-[#0a0a0f] border-b border-white/10',
            'transition-[opacity,transform] duration-300',
            mobileOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
        >
          <nav className="container-width py-4 flex flex-col gap-1">
            {nav.map(({ label, href, exact }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'px-4 py-3.5 rounded-xl text-sm font-medium transition-colors',
                  isActive(href, exact)
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {label}
              </Link>
            ))}

            {/* Auth slot in mobile menu */}
            <div className="mt-2 pt-4 border-t border-white/10 px-4">
              {authSlot}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
