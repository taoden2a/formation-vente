"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  shimmer?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  shimmer = true,
  disabled,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden transition-colors duration-200",
        variant === "primary" &&
          "bg-orange-500 hover:bg-orange-400 text-white font-medium",
        variant === "secondary" &&
          "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20",
        variant === "outline" &&
          "border border-white/20 hover:border-white/40 text-white/80 hover:text-white",
        variant === "ghost" &&
          "text-white/60 hover:text-white hover:bg-white/5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...(props as object)}
    >
      {/* Shimmer effect au hover */}
      {shimmer && !disabled && (
        <motion.span
          className="absolute inset-0 bg-white/10 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          aria-hidden
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
