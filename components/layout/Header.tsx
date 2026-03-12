'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ReactNode, useState, useEffect } from 'react'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [progress, setProgress] = useState<ProgressData | null>(null)

  // Progress bar visible only on /formation routes
  const showProgress = pathname?.startsWith('/formation') ?? false

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          isScrolled
            ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-width h-full">
          <div className="h-full flex items-center justify-between">

            {/* Logo + Nav */}
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
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-orange-400 font-semibold flex-shrink-0">
                  {progress.progressPercent}%
                </span>
              </div>
            )}

            {/* Right */}
            <div className="flex items-center gap-3">
              {showProgress && progress && (
                <span className="lg:hidden text-xs font-semibold text-orange-400">
                  {progress.progressPercent}%
                </span>
              )}
              {authSlot}
            </div>

          </div>
        </div>
      </header>
    </>
  )
}
