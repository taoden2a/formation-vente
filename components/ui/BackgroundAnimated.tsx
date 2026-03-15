"use client";

interface BackgroundAnimatedProps {
  variant?: "hero" | "hero-v7" | "hero-v8" | "dark" | "darker";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function BackgroundAnimated({
  variant = "hero",
  children,
  className = "",
  id,
}: BackgroundAnimatedProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "hero":
        return "bg-gradient-hero";
      case "hero-v7":
        return "bg-gradient-hero";
      case "hero-v8":
        return "bg-gradient-hero";
      case "dark":
        return "bg-gradient-dark";
      case "darker":
        return "bg-gradient-darker";
      default:
        return "bg-gradient-hero";
    }
  };

  const isV7 = variant === "hero-v7";
  const isV8 = variant === "hero-v8";
  const isHero = variant === "hero" || isV7 || isV8;

  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background — hero only, static for dark/darker */}
      <div
        className={`absolute inset-0 ${getVariantClasses()}${isHero ? " animate-gradient-slow" : ""}`}
      />

      {/* V7 cinematic animated layer */}
      {isV7 && (
        <div className="absolute inset-0 bg-hero-animated-v7" />
      )}

      {/* V8 cognitive motion base layer */}
      {isV8 && (
        <div className="absolute inset-0 bg-hero-animated-v8" />
      )}

      {/* Radial gradient overlays for depth */}
      <div className="absolute inset-0 bg-radial-glow opacity-30" />

      {/* Secondary radial for organic feel */}
      <div className="absolute inset-0 bg-radial-accent opacity-20 animate-pulse-slow" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
