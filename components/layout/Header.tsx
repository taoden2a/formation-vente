'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

export function Header({ authSlot }: { authSlot?: ReactNode }) {
  const pathname = usePathname()
  const isMembreArea = pathname?.startsWith('/membre')

  const publicNav = [
    { label: 'Accueil', href: '/' },
    { label: 'Programme', href: '/programme' },
    { label: 'Éthique', href: '/ethique' },
    { label: 'Affiliation', href: '/affiliation' },
  ]

  const membreNav = [
    { label: 'Formation', href: '/membre' },
    { label: 'Exercices', href: '/membre/exercices' },
    { label: 'Modèles', href: '/membre/modeles' },
    { label: 'Études de cas', href: '/membre/etudes-de-cas' },
    { label: 'Bibliographie', href: '/membre/bibliographie' },
  ]

  const navigation = isMembreArea ? membreNav : publicNav

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-width">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="font-bold text-xl text-pedagogy-blue-600">
                L&apos;Art de Convaincre
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-pedagogy-blue-600',
                    pathname === item.href
                      ? 'text-pedagogy-blue-600'
                      : 'text-gray-600'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isMembreArea && (
              <Link
                href="/membre/compte"
                className="text-sm font-medium text-gray-600 hover:text-pedagogy-blue-600"
              >
                Mon compte
              </Link>
            )}
            {authSlot}
          </div>
        </div>
      </div>
    </header>
  )
}
