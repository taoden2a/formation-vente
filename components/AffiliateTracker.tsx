"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_DAYS = 30;
const SESSION_KEY = "cpv_affiliate_tracked";

export function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;

    // Éviter de tracker plusieurs fois dans la même session
    const alreadyTracked = sessionStorage.getItem(SESSION_KEY);
    if (alreadyTracked === ref) return;

    // Stocker le cookie côté client (fallback — le checkout le lit aussi)
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_DAYS);
    document.cookie = `affiliate_ref=${encodeURIComponent(ref)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    // Enregistrer le clic en base (fire-and-forget)
    fetch("/api/affiliation/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: ref }),
    }).catch(() => {
      // Silencieux : le tracking de clic n'est pas bloquant
    });

    sessionStorage.setItem(SESSION_KEY, ref);
  }, [searchParams]);

  return null;
}
