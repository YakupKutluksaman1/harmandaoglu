"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { office } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND = "Harmandaoğlu";
const SESSION_KEY = "hd-intro";

function heroImageReady() {
  return new Promise<void>((resolve) => {
    const img = document.querySelector<HTMLImageElement>("#hero img");
    if (!img || img.complete) return resolve();
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });
}

export function Preloader() {
  return usePathname() === "/" ? <IntroScreen /> : null;
}

function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [quick, setQuick] = useState(false);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) =>
    String(Math.round(v)).padStart(3, "0"),
  );
  const barScale = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const minMs = reduced ? 500 : seen ? 1900 : coarse ? 2700 : 3000;
    setQuick(reduced);

    let cancelled = false;
    const crawl = animate(progress, 90, {
      duration: minMs / 1000,
      ease: [0.45, 0, 0.2, 1],
    });

    const loaded = Promise.all([
      heroImageReady(),
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => window.setTimeout(r, minMs)),
    ]);
    const cap = new Promise((r) => window.setTimeout(r, 4500));

    Promise.race([loaded, cap]).then(async () => {
      if (cancelled) return;
      crawl.stop();
      await animate(progress, 100, { duration: 0.6, ease: EASE });
      await new Promise((r) => window.setTimeout(r, 350));
      if (cancelled) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      (window as Window & { __hdReady?: boolean }).__hdReady = true;
      window.dispatchEvent(new Event("harmandaoglu:ready"));
    });

    return () => {
      cancelled = true;
      crawl.stop();
    };
  }, [progress]);

  const t = (delay: number) => (quick ? 0 : delay);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Harmandaoğlu yükleniyor"
          className="fixed inset-0 z-[100] overflow-hidden bg-canvas"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 1.3, ease: EASE },
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_48%,rgba(197,160,89,0.09),transparent_70%)]"
          />

          <motion.div
            className="relative flex h-full flex-col px-5 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:px-10 md:py-8"
            exit={{ opacity: 0, y: -28, transition: { duration: 0.8, ease: EASE } }}
          >
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: t(0.2) }}
            >
              <p className="meta text-muted">A.Ş · Est. Antalya</p>
              <p className="meta text-muted">Akdeniz</p>
            </motion.div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="mb-7 h-14 w-14 md:mb-9 md:h-16 md:w-16"
                aria-hidden
              >
                <motion.rect
                  x="0.75"
                  y="0.75"
                  width="62.5"
                  height="62.5"
                  fill="none"
                  stroke="#E3DAC9"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                  initial={{ pathLength: quick ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
                />
                <motion.text
                  x="32"
                  y="41"
                  textAnchor="middle"
                  fill="#E3DAC9"
                  fontSize="26"
                  style={{ fontFamily: "var(--font-editorial), Georgia, serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: t(0.9), ease: EASE }}
                >
                  H
                </motion.text>
              </svg>

              <h2
                aria-hidden
                className="flex overflow-hidden pb-[0.16em] font-serif text-[clamp(2.6rem,12vw,5.5rem)] leading-[1.02] tracking-[-0.04em] text-ivory"
              >
                {BRAND.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: quick ? "0%" : "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, delay: t(0.85 + i * 0.05), ease: EASE }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                className="meta mt-1 text-champagne/80"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.24em" }}
                transition={{ duration: 1.4, delay: t(1.6), ease: EASE }}
              >
                Mimari · Restorasyon
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: t(0.3) }}
            >
              <div className="mb-3 flex items-end justify-between">
                <p className="meta text-muted">{office.coords}</p>
                <motion.p className="font-mono text-[12px] tracking-[0.2em] text-champagne tabular-nums">
                  {counter}
                </motion.p>
              </div>
              <div className="h-px w-full bg-[rgba(227,218,201,0.12)]">
                <motion.div
                  className="h-px origin-left bg-champagne/80"
                  style={{ scaleX: barScale }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
