"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const timer = window.setTimeout(() => setVisible(false), coarse ? 900 : 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-4 px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="meta text-muted"
            >
              Antalya
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center font-serif text-[clamp(2rem,8vw,4.2rem)] tracking-[-0.035em] text-ivory"
            >
              Harmandaoğlu
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-16 origin-center bg-champagne/70"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
