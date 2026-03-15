"use client";

import { useEffect, useRef, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  blur: number;
  opacity: number;
  scale: number;
  phase: number;
}

interface CognitiveOrbsProps {
  titleRef?: React.RefObject<HTMLElement>;
  className?: string;
}

// V8.2 Premium Configuration
const ORB_CONFIGS = [
  { color: "79, 150, 255", size: 240, blur: 28, opacity: 0.40 },   // Electric blue
  { color: "255, 140, 50", size: 200, blur: 25, opacity: 0.38 },   // Warm orange
  { color: "140, 160, 200", size: 220, blur: 30, opacity: 0.32 },  // Blue-tinted gray
  { color: "100, 170, 255", size: 280, blur: 32, opacity: 0.35 },  // Lighter blue
  { color: "255, 120, 80", size: 260, blur: 28, opacity: 0.33 },   // Bright orange
];

// Animation parameters
const VELOCITY_BASE = 1.2;
const VELOCITY_MAX = 3.0;
const DAMPING = 0.985;
const OSCILLATION_AMPLITUDE = 0.15;
const OSCILLATION_SPEED = 0.02;

// Title attraction
const TITLE_INFLUENCE_DISTANCE = 600;
const TITLE_FORCE = 0.0025;
const TITLE_SLOWDOWN_DISTANCE = 150;

// Mouse interaction
const MOUSE_INFLUENCE_DISTANCE = 250;
const MOUSE_REPULSION_STRENGTH = 2.5;
const MOUSE_ACCELERATION_BOOST = 1.3;

// Bounce
const BOUNCE_FACTOR = 0.7;
const BOUNCE_SCALE = 0.92;

export function CognitiveOrbs({ titleRef, className = "" }: CognitiveOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs to actual DOM elements — direct mutation, zero React re-renders
  const orbDivRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbsRef = useRef<Orb[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const lastMouseInteraction = useRef(0);
  const animationFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  // Cached values — avoids getBoundingClientRect() in the hot animation loop
  const containerSize = useRef({ width: 0, height: 0 });
  const titleCenter = useRef({ x: 0, y: 0 });

  const [isEnabled, setIsEnabled] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Check for mobile and reduced motion (run first to skip init on mobile)
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isMobile || prefersReducedMotion) {
      setIsEnabled(false);
    }
  }, []);

  // Initialize orbs — runs once, no animation-loop BoundingClientRect
  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    containerSize.current = { width, height };

    // Compute title center relative to container once (static — both scroll together)
    if (titleRef?.current) {
      const titleRect = titleRef.current.getBoundingClientRect();
      titleCenter.current = {
        x: titleRect.left - rect.left + titleRect.width / 2,
        y: titleRect.top - rect.top + titleRect.height / 2,
      };
    } else {
      titleCenter.current = { x: width / 2, y: height / 2 };
    }

    const initialOrbs: Orb[] = ORB_CONFIGS.map((config, index) => ({
      id: index,
      x: Math.random() * (width - config.size),
      y: Math.random() * (height - config.size),
      vx: (Math.random() - 0.5) * VELOCITY_BASE * 2,
      vy: (Math.random() - 0.5) * VELOCITY_BASE * 2,
      size: config.size,
      color: config.color,
      blur: config.blur,
      opacity: config.opacity,
      scale: 1,
      phase: Math.random() * Math.PI * 2,
    }));

    orbsRef.current = initialOrbs;

    // Set initial positions directly on DOM — no state update needed
    initialOrbs.forEach((orb, i) => {
      const el = orbDivRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(${orb.x}px, ${orb.y}px, 0) scale(1)`;
      }
    });

    setInitialized(true);
  }, [isEnabled, titleRef]);

  // Animation loop — direct DOM manipulation, ZERO forceUpdate / React re-renders
  // IntersectionObserver pauses the loop when the component is off-screen
  useEffect(() => {
    if (!isEnabled || !initialized) return;

    const animate = () => {
      if (!isRunningRef.current) return;

      const { width, height } = containerSize.current;
      const tc = titleCenter.current;
      const now = Date.now();

      const mouseBoost =
        now - lastMouseInteraction.current < 500 ? MOUSE_ACCELERATION_BOOST : 1.0;

      orbsRef.current = orbsRef.current.map((orb, i) => {
        let { x, y, vx, vy, size, scale, phase } = orb;

        // Sinusoidal oscillation
        phase += OSCILLATION_SPEED;
        vx += Math.sin(phase) * OSCILLATION_AMPLITUDE;
        vy += Math.cos(phase * 1.3) * OSCILLATION_AMPLITUDE;

        // Base movement
        x += vx * mouseBoost;
        y += vy * mouseBoost;

        // Title attraction (uses cached titleCenter — no BoundingClientRect)
        const dx = tc.x - (x + size / 2);
        const dy = tc.y - (y + size / 2);
        const distanceToTitle = Math.sqrt(dx * dx + dy * dy);

        if (distanceToTitle < TITLE_INFLUENCE_DISTANCE && distanceToTitle > 0) {
          let force = TITLE_FORCE * (1 - distanceToTitle / TITLE_INFLUENCE_DISTANCE);
          if (distanceToTitle < TITLE_SLOWDOWN_DISTANCE) {
            force *= 0.5;
            vx *= 0.98;
            vy *= 0.98;
          }
          vx += (dx / distanceToTitle) * force;
          vy += (dy / distanceToTitle) * force;
        }

        // Mouse repulsion
        const mdx = mousePos.current.x - (x + size / 2);
        const mdy = mousePos.current.y - (y + size / 2);
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDistance < MOUSE_INFLUENCE_DISTANCE && mouseDistance > 0) {
          const repulsionStrength =
            MOUSE_REPULSION_STRENGTH *
            Math.pow(1 - mouseDistance / MOUSE_INFLUENCE_DISTANCE, 2);
          x -= (mdx / mouseDistance) * repulsionStrength;
          y -= (mdy / mouseDistance) * repulsionStrength;
          vx -= (mdx / mouseDistance) * repulsionStrength * 0.3;
          vy -= (mdy / mouseDistance) * repulsionStrength * 0.3;
          lastMouseInteraction.current = now;
        }

        // Edge collision
        let newScale = scale;
        if (x <= 0) { x = 0; vx = Math.abs(vx) * BOUNCE_FACTOR; newScale = BOUNCE_SCALE; }
        if (x >= width - size) { x = width - size; vx = -Math.abs(vx) * BOUNCE_FACTOR; newScale = BOUNCE_SCALE; }
        if (y <= 0) { y = 0; vy = Math.abs(vy) * BOUNCE_FACTOR; newScale = BOUNCE_SCALE; }
        if (y >= height - size) { y = height - size; vy = -Math.abs(vy) * BOUNCE_FACTOR; newScale = BOUNCE_SCALE; }

        newScale = newScale + (1 - newScale) * 0.08;

        vx *= DAMPING;
        vy *= DAMPING;
        vx += (Math.random() - 0.5) * 0.05;
        vy += (Math.random() - 0.5) * 0.05;
        vx = Math.max(-VELOCITY_MAX, Math.min(VELOCITY_MAX, vx));
        vy = Math.max(-VELOCITY_MAX, Math.min(VELOCITY_MAX, vy));

        // ★ Direct DOM update — bypasses React entirely ★
        const el = orbDivRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${newScale})`;
        }

        return { ...orb, x, y, vx, vy, scale: newScale, phase };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
    };

    // IntersectionObserver — pause loop when off-screen, resume when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Start immediately if already visible
    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
    };
  }, [isEnabled, initialized]);

  // Mouse tracking — containerRect cached to avoid hot-path BoundingClientRect
  useEffect(() => {
    if (!isEnabled) return;

    let cachedRect: DOMRect | null = null;

    const updateCachedRect = () => {
      if (containerRef.current) cachedRect = containerRef.current.getBoundingClientRect();
    };

    updateCachedRect();
    window.addEventListener("resize", updateCachedRect, { passive: true });
    window.addEventListener("scroll", updateCachedRect, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) return;
      mousePos.current = {
        x: e.clientX - cachedRect.left,
        y: e.clientY - cachedRect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateCachedRect);
      window.removeEventListener("scroll", updateCachedRect);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled]);

  // Handle resize — update cached dimensions and reinit physics
  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      containerSize.current = { width, height };

      if (titleRef?.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        titleCenter.current = {
          x: titleRect.left - rect.left + titleRect.width / 2,
          y: titleRect.top - rect.top + titleRect.height / 2,
        };
      } else {
        titleCenter.current = { x: width / 2, y: height / 2 };
      }

      orbsRef.current = ORB_CONFIGS.map((config, index) => ({
        id: index,
        x: Math.random() * (width - config.size),
        y: Math.random() * (height - config.size),
        vx: (Math.random() - 0.5) * VELOCITY_BASE * 2,
        vy: (Math.random() - 0.5) * VELOCITY_BASE * 2,
        size: config.size,
        color: config.color,
        blur: config.blur,
        opacity: config.opacity,
        scale: 1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isEnabled, titleRef]);

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      className={`cognitive-orbs-container absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {ORB_CONFIGS.map((config, i) => (
        <div
          key={i}
          ref={(el) => { orbDivRefs.current[i] = el; }}
          className="cognitive-orb absolute"
          style={{
            width: config.size,
            height: config.size,
            // Start off-screen — animation loop will position after init
            transform: "translate3d(-9999px, 0, 0)",
            background: `radial-gradient(circle, rgba(${config.color}, ${config.opacity}) 0%, rgba(${config.color}, ${config.opacity * 0.4}) 35%, rgba(${config.color}, ${config.opacity * 0.1}) 60%, transparent 75%)`,
            filter: `blur(${config.blur}px)`,
            borderRadius: "50%",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
}
