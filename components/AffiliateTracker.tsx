"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// 1 an en secondes — le cookie ne doit pas expirer rapidement
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;
const SESSION_KEY = "cpv_affiliate_tracked";
export const AFFILIATE_LS_KEY = "affiliate_ref";

export function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;

    // Éviter de tracker plusieurs fois dans la même session
    const alreadyTracked = sessionStorage.getItem(SESSION_KEY);
    if (alreadyTracked === ref) return;

    // localStorage : ne expire jamais (backup si cookie vidé)
    localStorage.setItem(AFFILIATE_LS_KEY, ref);

    // Cookie : 1 an, Secure, SameSite=Lax
    document.cookie = `affiliate_ref=${encodeURIComponent(ref)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax; Secure`;

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
