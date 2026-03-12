"use client";

import { useEffect, useState } from "react";

interface ScrollProgressProps {
  className?: string;
  height?: number;
}

export function ScrollProgress({ className = "", height = 2 }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0 ? "0 0 10px rgba(59, 130, 246, 0.5)" : "none",
        }}
      />
    </div>
  );
}
