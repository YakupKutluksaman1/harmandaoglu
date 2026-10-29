"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const BEFORE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90";
const AFTER =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90";

export function BeforeAfter() {
  const frame = useRef<HTMLDivElement>(null);
  const percent = useMotionValue(52);
  const [value, setValue] = useState(52);
  const [hint, setHint] = useState(true);
  useMotionValueEvent(percent, "change", (v) => setValue(v));

  const setFromClientX = (clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    percent.set(Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section id="donusum" className="section-frame">
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-8 max-w-2xl md:mb-12">
          <p className="mb-3 text-[10px] tracking-[0.32em] text-gold uppercase md:text-[11px] md:tracking-[0.36em]">
            03 — Dönüşüm
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.12] text-ivory md:text-6xl">
            Tadilatın öncesi ve sonrası.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted md:mt-5 md:text-sm">
            Çizgiyi parmağınızla kaydırın. Eski mekân ile yenilenen yaşam alanını aynı
            karede görün.
          </p>
        </div>
        <div
          ref={frame}
          data-reveal
          className="glass-panel relative aspect-[4/5] overflow-hidden touch-none sm:aspect-[16/10]"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setHint(false);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
          }}
        >
          <Image src={AFTER} alt="Sonra" fill className="object-cover" sizes="100vw" quality={90} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <Image src={BEFORE} alt="Önce" fill className="object-cover" sizes="100vw" quality={90} />
          </div>
          <div className="pointer-events-none absolute top-4 left-4 border border-gold/40 bg-canvas/55 px-2.5 py-1 text-[9px] tracking-[0.24em] text-ivory uppercase md:top-6 md:left-6 md:px-3 md:text-[10px] md:tracking-[0.28em]">
            Önce
          </div>
          <div className="pointer-events-none absolute top-4 right-4 border border-gold/40 bg-canvas/55 px-2.5 py-1 text-[9px] tracking-[0.24em] text-gold uppercase md:top-6 md:right-6 md:px-3 md:text-[10px] md:tracking-[0.28em]">
            Sonra
          </div>
          {hint && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 border border-gold/30 bg-canvas/70 px-3 py-1.5 text-[9px] tracking-[0.22em] text-ivory uppercase backdrop-blur-sm md:hidden">
              Kaydırın
            </div>
          )}
          <motion.div
            drag="x"
            dragConstraints={frame}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => {
              setHint(false);
              setFromClientX(info.point.x);
            }}
            className="absolute top-0 z-10 flex h-full -translate-x-1/2 cursor-ew-resize flex-col items-center"
            style={{ left: `${value}%` }}
          >
            <span className="h-full w-px bg-gold" />
            <span className="absolute top-1/2 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full border border-gold bg-canvas/85 shadow-[0_0_0_8px_rgba(11,19,31,0.28)] md:h-14 md:w-14">
              <span className="font-serif text-xl text-gold">↔</span>
            </span>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}
