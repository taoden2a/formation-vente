import Link from 'next/link'

export function FooterV2() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-v2 relative">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />

      {/* Gradient separator line */}
      <div className="footer-separator absolute top-0 left-0 right-0 h-px" />

      <div className="relative z-10 container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="footer-brand-title font-semibold flex items-center gap-2">
              Comprendre pour Vendre
              <span className="footer-orange-dot" />
            </h3>
            <p className="footer-text text-sm leading-relaxed">
              Formation complète pour apprendre à vendre et convaincre de manière éthique.
            </p>
          </div>

          {/* Formation column */}
          <div className="space-y-4">
            <h4 className="footer-column-title font-semibold">Formation</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/formation" className="footer-link">
                  La formation
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="footer-link">
                  Les exercices
                </Link>
              </li>
              <li>
                <Link href="/affiliation" className="footer-link">
                  Programme d&apos;affiliation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div className="space-y-4">
            <h4 className="footer-column-title font-semibold">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="footer-link">
                  Questions fréquentes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="space-y-4">
            <h4 className="footer-column-title font-semibold">Légal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/mentions-legales" className="footer-link">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="footer-link">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="footer-link">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 footer-bottom-separator">
          <p className="footer-copyright text-sm text-center">
            © {currentYear} Comprendre pour Vendre. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
