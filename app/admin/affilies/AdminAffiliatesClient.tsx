"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AffiliateSaleRow {
  id: string;
  buyerUserId: string | null;
  amountEur: string;
  commissionEur: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
  stripeSessionId: string;
}

interface AffiliateRow {
  id: string;
  code: string;
  email: string;
  name: string | null;
  isActive: boolean;
  clicks: number;
  totalSales: number;
  pendingAmountEur: string;
  paidAmountEur: string;
  paymentMethod: string | null;
  paymentDetails: string | null;
  isSuspect: boolean;
  createdAt: string;
  sales: AffiliateSaleRow[];
}

// ─── Badge statut ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    paid: "bg-green-500/15 text-green-400 border-green-500/20",
    refunded: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  const labels: Record<string, string> = {
    pending: "En attente",
    paid: "Payé",
    refunded: "Remboursé",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] ?? "bg-white/10 text-gray-400 border-white/10"}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Ligne affilié ────────────────────────────────────────────────────────────

function AffiliateCard({ affiliate, onPaid }: { affiliate: AffiliateRow; onPaid: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    if (!confirm(`Marquer toutes les commissions en attente de ${affiliate.email} comme payées ?`)) return;
    setPaying(true);
    try {
      const res = await fetch("/api/admin/affiliates/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateId: affiliate.id }),
      });
      if (res.ok) {
        onPaid(affiliate.id);
      }
    } finally {
      setPaying(false);
    }
  };

  const hasPending = parseFloat(affiliate.pendingAmountEur) > 0;

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-medium text-sm">{affiliate.email}</span>
            {affiliate.isSuspect && (
              <span className="px-2 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">
                Suspect
              </span>
            )}
            {!affiliate.isActive && (
              <span className="px-2 py-0.5 bg-gray-500/15 text-gray-400 border border-gray-500/20 rounded-full text-xs font-medium">
                Inactif
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Code : <span className="text-gray-300 font-mono">{affiliate.code}</span>
            {" · "}{affiliate.clicks} clic{affiliate.clicks !== 1 ? "s" : ""}
            {" · "}{affiliate.totalSales} vente{affiliate.totalSales !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-orange-400 font-semibold text-sm">{affiliate.pendingAmountEur} € <span className="text-xs font-normal text-orange-400/60">en attente</span></p>
            <p className="text-green-400 text-xs">{affiliate.paidAmountEur} € versé</p>
          </div>
          {hasPending && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePay(); }}
              disabled={paying}
              className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-all disabled:opacity-50"
            >
              {paying ? "..." : "Marquer payé"}
            </button>
          )}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""} flex-shrink-0`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Détail ventes */}
      {open && (
        <div className="border-t border-white/10 px-5 py-4 space-y-5">

          {/* Coordonnées de paiement */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Coordonnées de paiement</p>
            {affiliate.paymentMethod && affiliate.paymentDetails ? (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="text-xs text-gray-400 font-medium">
                  {affiliate.paymentMethod === "paypal" ? "PayPal" : "IBAN"}
                </span>
                <span className="text-sm text-white font-mono flex-1">{affiliate.paymentDetails}</span>
              </div>
            ) : (
              <span className="inline-flex px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs rounded-lg font-medium">
                À compléter
              </span>
            )}
          </div>

          {affiliate.sales.length === 0 ? (
            <p className="text-sm text-gray-600 italic">Aucune vente générée.</p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Ventes</p>
              {affiliate.sales.map((sale) => (
                <div key={sale.id} className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 border-b border-white/5 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">
                      Acheteur : <span className="text-gray-300">{sale.buyerUserId ?? "—"}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Session : <span className="font-mono">{sale.stripeSessionId.slice(0, 24)}…</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400">{sale.amountEur} €</span>
                    <span className="text-xs text-orange-400 font-medium">+{sale.commissionEur} €</span>
                    <StatusBadge status={sale.status} />
                    <span className="text-xs text-gray-600">
                      {new Date(sale.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export function AdminAffiliatesClient() {
  const [affiliates, setAffiliates] = useState<AffiliateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAffiliates = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/affiliates");
      if (!res.ok) {
        setError("Erreur lors du chargement.");
        return;
      }
      setAffiliates(await res.json());
    } catch {
      setError("Connexion impossible.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAffiliates();
  }, [loadAffiliates]);

  const handlePaid = useCallback((affiliateId: string) => {
    setAffiliates((prev) =>
      prev.map((aff) =>
        aff.id !== affiliateId
          ? aff
          : {
              ...aff,
              pendingAmountEur: "0.00",
              paidAmountEur: (
                parseFloat(aff.paidAmountEur) + parseFloat(aff.pendingAmountEur)
              ).toFixed(2),
              sales: aff.sales.map((s) =>
                s.status === "pending" ? { ...s, status: "paid" } : s
              ),
            }
      )
    );
  }, []);

  // Totaux globaux
  const totalPending = affiliates
    .reduce((sum, a) => sum + parseFloat(a.pendingAmountEur), 0)
    .toFixed(2);
  const totalPaid = affiliates
    .reduce((sum, a) => sum + parseFloat(a.paidAmountEur), 0)
    .toFixed(2);
  const suspects = affiliates.filter((a) => a.isSuspect).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Gestion des affiliés</h1>
          <p className="text-sm text-gray-400">Vue admin — accès restreint</p>
        </div>

        {/* Résumé global */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Affiliés</p>
            <p className="text-2xl font-bold text-white">{affiliates.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Total ventes</p>
            <p className="text-2xl font-bold text-white">
              {affiliates.reduce((s, a) => s + a.totalSales, 0)}
            </p>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-400/70 mb-1">À verser</p>
            <p className="text-2xl font-bold text-orange-400">{totalPending} €</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 text-center">
            <p className="text-xs text-green-400/70 mb-1">Déjà versé</p>
            <p className="text-2xl font-bold text-green-400">{totalPaid} €</p>
          </div>
        </div>

        {suspects > 0 && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
            {suspects} affilié{suspects > 1 ? "s" : ""} suspect{suspects > 1 ? "s" : ""} (+ 100 clics, 0 ventes) — vérifier manuellement.
          </div>
        )}

        {/* Liste */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse h-20" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : affiliates.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun affilié pour l&apos;instant.</p>
        ) : (
          <div className="space-y-4">
            {affiliates.map((aff) => (
              <AffiliateCard key={aff.id} affiliate={aff} onPaid={handlePaid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
