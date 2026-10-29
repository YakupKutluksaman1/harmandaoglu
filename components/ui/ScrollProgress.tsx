"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-[env(safe-area-inset-top)] right-0 left-0 z-[70] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}
