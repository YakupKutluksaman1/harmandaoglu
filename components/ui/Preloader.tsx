"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex flex-col items-center gap-6">
            <p className="text-[10px] tracking-[0.55em] text-bronze uppercase">Antalya</p>
            <h2 className="px-5 text-center font-serif text-[1.55rem] tracking-[0.12em] text-ivory uppercase sm:text-6xl sm:tracking-[0.18em]">
              Harmandaoğlu
            </h2>
            <div className="h-px w-40 bg-gold" />
            <p className="font-serif text-sm tracking-[0.48em] text-gold uppercase">A.Ş</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
