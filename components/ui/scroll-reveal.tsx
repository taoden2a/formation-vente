"use client";

import { CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.6,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation();

  const initialTransform =
    direction === "up"
      ? `translate3d(0, ${distance}px, 0)`
      : direction === "down"
      ? `translate3d(0, -${distance}px, 0)`
      : direction === "left"
      ? `translate3d(${distance}px, 0, 0)`
      : direction === "right"
      ? `translate3d(-${distance}px, 0, 0)`
      : "translate3d(0, 0, 0)";

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    backfaceVisibility: "hidden",
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
