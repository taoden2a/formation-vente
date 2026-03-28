import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { FooterV2 } from '@/components/layout/FooterV2'
import { AuthStatus } from '@/components/layout/AuthStatus'
import { AffiliateTracker } from '@/components/AffiliateTracker'
import { Providers } from '@/components/Providers'
import { PageTransition } from '@/components/ui/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Comprendre pour Vendre - Formation en vente",
  description: 'Apprenez à vendre et convaincre, basé sur la psychologie, les biais cognitifs et le marketing digital.',
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar authSlot={<AuthStatus />} />
            <Suspense fallback={null}>
              <AffiliateTracker />
            </Suspense>
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <FooterV2 />
          </div>
        </Providers>
      </body>
    </html>
  )
}
