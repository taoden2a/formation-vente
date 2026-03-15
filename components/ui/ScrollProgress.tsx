"use client";

import { useEffect, useRef } from "react";

interface ScrollProgressProps {
  className?: string;
  height?: number;
}

export function ScrollProgress({ className = "", height = 2 }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  // Direct DOM update — no setState, no React re-render on scroll
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      // scaleX on compositor thread — no layout recalculation
      bar.style.transform = `scaleX(${ratio})`;
      bar.style.boxShadow = ratio > 0 ? "0 0 10px rgba(59, 130, 246, 0.5)" : "none";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height }}
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-blue-500 via-orange-500 to-green-500"
        style={{
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.1s ease-out",
          willChange: "transform",
        }}
      />
    </div>
  );
}
