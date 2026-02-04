import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-width py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">L&apos;Art de Convaincre</h3>
            <p className="text-sm text-gray-600">
              Formation complète pour apprendre à vendre et convaincre de manière éthique.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Formation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programme" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Programme détaillé
                </Link>
              </li>
              <li>
                <Link href="/ethique" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Notre approche éthique
                </Link>
              </li>
              <li>
                <Link href="/affiliation" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Programme d&apos;affiliation
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Questions fréquentes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-600 hover:text-pedagogy-blue-600">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-gray-600 hover:text-pedagogy-blue-600">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            © {currentYear} L&apos;Art de Convaincre. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
