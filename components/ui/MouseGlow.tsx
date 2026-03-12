"use client";

import { useEffect, useState } from "react";

interface MouseGlowProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export function MouseGlow({
  className = "",
  size = 400,
  opacity = 0.08,
  color = "59, 130, 246",
}: MouseGlowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ${className}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute rounded-full transition-transform duration-200 ease-out"
        style={{
          width: size,
          height: size,
          left: position.x - size / 2,
          top: position.y - size / 2,
          background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 70%)`,
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
  );
}
