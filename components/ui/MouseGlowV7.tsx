"use client";

import { useEffect, useRef, useCallback } from "react";

interface MouseGlowV7Props {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
  lerpFactor?: number;
}

export function MouseGlowV7({
  className = "",
  size = 600,
  opacity = 0.04,
  color = "59, 130, 246",
  lerpFactor = 0.08,
}: MouseGlowV7Props) {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);
  const animationFrame = useRef<number>(0);
  const isMobile = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Linear interpolation for smooth movement
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  // Animation loop using requestAnimationFrame
  const animate = useCallback(() => {
    if (!glowRef.current || isMobile.current || prefersReducedMotion.current) return;

    // Smoothly interpolate to target position
    currentPosition.current.x = lerp(
      currentPosition.current.x,
      targetPosition.current.x,
      lerpFactor
    );
    currentPosition.current.y = lerp(
      currentPosition.current.y,
      targetPosition.current.y,
      lerpFactor
    );

    // Apply transform using translate3d for GPU acceleration
    glowRef.current.style.transform = `translate3d(${
      currentPosition.current.x - size / 2
    }px, ${currentPosition.current.y - size / 2}px, 0)`;

    animationFrame.current = requestAnimationFrame(animate);
  }, [lerp, lerpFactor, size]);

  useEffect(() => {
    // Check for mobile device
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia("(max-width: 768px)").matches;

    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Don't run on mobile or if reduced motion is preferred
    if (isMobile.current || prefersReducedMotion.current) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current && glowRef.current) {
        isVisible.current = true;
        glowRef.current.style.opacity = "1";
        // Initialize current position to prevent jump
        currentPosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        isVisible.current = false;
        glowRef.current.style.opacity = "0";
      }
    };

    // Start animation loop
    animationFrame.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [animate]);

  // Don't render on mobile
  if (typeof window !== "undefined" && isMobile.current) {
    return null;
  }

  return (
    <div
      className={`mouse-glow-v7 pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
    >
      <div
        ref={glowRef}
        className="absolute will-change-transform"
        style={{
          width: size,
          height: size,
          opacity: 0,
          background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, rgba(${color}, ${opacity * 0.5}) 30%, transparent 70%)`,
          transition: "opacity 0.5s ease-out",
        }}
      />
    </div>
  );
}
