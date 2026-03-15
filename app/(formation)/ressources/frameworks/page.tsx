import Link from "next/link";

export const metadata = {
  title: "Frameworks de persuasion | Comprendre pour Vendre",
  description: "Structures d'argumentation éprouvées pour persuader efficacement.",
};

export default function FrameworksPage() {
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
          <span className="text-gray-600">Frameworks de persuasion</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span className="text-sm font-medium text-gray-400">Ressources exclusives</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Frameworks de persuasion</h1>
          <p className="text-gray-400">Structures d&apos;argumentation éprouvées pour persuader efficacement.</p>
        </div>

        {/* Coming soon */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Bientôt disponible</h2>
          <p className="text-gray-400 max-w-sm mx-auto mb-8">
            Les frameworks de persuasion arrivent bientôt. En attendant, retrouve tout le contenu de la formation.
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
