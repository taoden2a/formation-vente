"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div className={cn("relative min-h-screen bg-[#0a0a0f]", className)}>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Couche 1 — lueurs oranges lentes */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(234,88,12,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(194,65,12,0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(154,52,18,0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Couche 2 — lueurs amber très lentes */}
        <motion.div
          animate={{
            backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(251,146,60,0.3) 0%, transparent 40%), radial-gradient(ellipse at 30% 70%, rgba(234,88,12,0.2) 0%, transparent 40%)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Vignette centrale pour garder le texte lisible */}
        {showRadialGradient && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(9,9,11,0.7) 100%)",
            }}
          />
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Version fixed — couvre l'écran entier en arrière-plan.
 * Utiliser dans le layout global pour un fond aurora sur toutes les pages.
 */
export function AuroraFixed() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden
    >
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 15% 55%, rgba(234,88,12,0.5) 0%, transparent 45%), radial-gradient(ellipse at 85% 20%, rgba(194,65,12,0.35) 0%, transparent 45%), radial-gradient(ellipse at 55% 85%, rgba(154,52,18,0.25) 0%, transparent 45%)",
          backgroundSize: "200% 200%",
        }}
      />
      <motion.div
        animate={{
          backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-12"
        style={{
          background:
            "radial-gradient(ellipse at 70% 35%, rgba(251,146,60,0.3) 0%, transparent 38%), radial-gradient(ellipse at 25% 65%, rgba(234,88,12,0.2) 0%, transparent 38%)",
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
}
