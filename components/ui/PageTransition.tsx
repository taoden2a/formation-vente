"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start with hidden state
    setIsVisible(false);

    // Small delay to ensure the exit animation completes
    const showTimeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(showTimeout);
  }, [pathname, children]);

  return (
    <div
      className={`page-transition-wrapper ${isVisible ? "page-visible" : "page-hidden"} ${className}`}
    >
      {displayChildren}
    </div>
  );
}

// Hook for triggering page exit animation before navigation
export function usePageTransition() {
  const [isExiting, setIsExiting] = useState(false);

  const startExit = (callback: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      callback();
      setIsExiting(false);
    }, 300);
  };

  return { isExiting, startExit };
}
