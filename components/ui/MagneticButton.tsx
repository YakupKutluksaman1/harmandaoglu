"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  external?: boolean;
  rel?: string;
};

const variants = {
  solid:
    "bg-champagne text-canvas hover:bg-ivory border border-champagne/80 shadow-[0_0_0_1px_rgba(227,218,201,0.08)]",
  outline:
    "border border-[rgba(227,218,201,0.28)] text-ivory bg-transparent hover:border-champagne/70 hover:shadow-[0_0_32px_-12px_rgba(197,160,89,0.45)]",
  ghost: "border border-transparent text-ivory hover:text-champagne",
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  external = false,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const onMove = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-500 sm:min-h-[3rem] sm:px-8 sm:text-[11px] sm:tracking-[0.24em] ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={classes}
        {...(external
          ? { target: "_blank", rel: rel ?? "noreferrer" }
          : rel
            ? { rel }
            : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
