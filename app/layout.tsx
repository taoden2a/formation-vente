import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthStatus } from '@/components/layout/AuthStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "L'Art de Convaincre - Formation en vente éthique",
  description: 'Apprenez à vendre et convaincre sans manipulation, basé sur la psychologie, les biais cognitifs et le marketing éthique.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header authSlot={<AuthStatus />} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
