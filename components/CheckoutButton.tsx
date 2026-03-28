"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AFFILIATE_LS_KEY } from "@/components/AffiliateTracker";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      // Lire le code affilié depuis localStorage (backup si cookie expiré/absent)
      const affiliateCode = localStorage.getItem(AFFILIATE_LS_KEY) ?? undefined;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode }),
      });

      if (res.status === 401) {
        window.location.href = "/inscription?next=checkout";
        return;
      }

      if (!res.ok) {
        setError("Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Impossible de lancer le paiement. Veuillez réessayer.");
      }
    } catch {
      setError("Connexion impossible. Vérifiez votre connexion internet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-2">
      <Button
        variant="action"
        size="lg"
        fullWidth
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Redirection…" : "Commencer maintenant"}
      </Button>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
