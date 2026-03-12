import Link from "next/link";

export const metadata = {
  title: "Checklists de vente | Comprendre pour Vendre",
  description: "Listes de vérification pratiques pour chaque étape de la vente.",
};

export default function ChecklistsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-8">
          <Link href="/formation" className="hover:text-white transition-colors">Formation</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <Link href="/membre" className="hover:text-white transition-colors">Ressources</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-gray-600">Checklists de vente</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="text-sm font-medium text-gray-400">Ressources exclusives</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Checklists de vente</h1>
          <p className="text-gray-400">Listes de vérification pratiques pour chaque étape de la vente.</p>
        </div>

        {/* Coming soon */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Bientôt disponible</h2>
          <p className="text-gray-400 max-w-sm mx-auto mb-8">
            Les checklists de vente arrivent bientôt. En attendant, retrouve tout le contenu de la formation.
          </p>
          <Link
            href="/formation"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors font-medium"
          >
            ← Retour à la formation
          </Link>
        </div>

      </div>
    </div>
  );
}
