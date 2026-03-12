import Link from "next/link";
import { NotesClient } from "./NotesClient";

export const metadata = {
  title: "Mes notes | Comprendre pour Vendre",
  description: "Toutes vos notes de cours.",
};

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-8">
          <Link href="/formation" className="hover:text-white transition-colors">Formation</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-gray-600">Mes notes</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span className="text-sm font-medium text-gray-400">Notes personnelles</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mes notes</h1>
          <p className="text-gray-400">Toutes vos notes de cours, organisées par module.</p>
        </div>

        <NotesClient />

      </div>
    </div>
  );
}
