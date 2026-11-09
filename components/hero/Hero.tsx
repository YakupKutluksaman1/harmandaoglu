"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { office } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND = "Harmandaoğlu";

function usePreloaderDone() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ((window as Window & { __hdReady?: boolean }).__hdReady) {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    const fallback = window.setTimeout(onReady, 6500);
    window.addEventListener("harmandaoglu:ready", onReady);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("harmandaoglu:ready", onReady);
    };
  }, []);

  return ready;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderDone();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const rise = (delay: number, y = 14) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={{ scale: 1.14 }}
        animate={{ scale: ready ? 1.05 : 1.14 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image
          src="/hero-renovasyon.jpg"
          alt="Harmandaoğlu A.Ş — Antalya’da anahtar teslim villa restorasyonu"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-[center_38%]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.55)_0%,rgba(8,9,10,0.1)_24%,rgba(8,9,10,0.58)_50%,rgba(8,9,10,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_55%_at_0%_72%,rgba(8,9,10,0.6),transparent_70%)] md:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(8,9,10,0.7)_0%,transparent_55%)] md:block" />

      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-[calc(5.75rem+env(safe-area-inset-top))] pb-[calc(1.75rem+env(safe-area-inset-bottom))] sm:px-8 md:justify-end md:px-10 md:pb-16 lg:pb-20"
      >
        <div className="mt-auto flex max-w-[34rem] flex-col lg:max-w-[48rem]">
          <p
            aria-label={BRAND}
            className="mb-2 flex text-champagne [text-shadow:0_2px_30px_rgba(8,9,10,0.5)] overflow-hidden pb-[0.16em] font-serif text-[clamp(2.6rem,11.5vw,3.6rem)] leading-[1.02] tracking-[-0.04em] md:mb-5 md:text-[3rem]"
          >
            {BRAND.split("").map((char, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: ready ? "0%" : "110%" }}
                transition={{ duration: 1, delay: 0.04 * i, ease: EASE }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          <motion.div
            {...rise(0.35, 8)}
            className="mb-6 flex items-center gap-3 md:mb-8"
          >
            <motion.span
              className="h-px w-7 origin-left bg-champagne/80"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ready ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            />
            <p className="meta text-ivory/75 [text-shadow:0_1px_12px_rgba(8,9,10,0.9)]">
              A.Ş · Antalya · {office.coords}
            </p>
          </motion.div>

          <h1 className="font-serif text-[clamp(1.85rem,7.4vw,4.4rem)] leading-[1.1] tracking-[-0.035em] text-ivory [text-shadow:0_2px_24px_rgba(8,9,10,0.45)]">
            {["Antalya’da yüksek", "mimari ve restorasyonun", "en saf hâli."].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: ready ? "0%" : "105%" }}
                    transition={{ duration: 1.05, delay: 0.42 + i * 0.09, ease: EASE }}
                  >
                    {i === 2 ? (
                      <>
                        en saf <em className="text-champagne">hâli.</em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ),
            )}
          </h1>

          <motion.p
            {...rise(0.72)}
            className="mt-5 max-w-[calc(100%-3.75rem)] text-[15px] leading-[1.65] text-[#B3B1AB] sm:max-w-[28rem] md:mt-7 md:text-[16px] md:leading-7"
          >
            Lara, Belek ve Konyaaltı’nda villa restorasyonu, anahtar teslim
            tadilat ve kişiye özel mekân mimarisi.
          </motion.p>

          <motion.div {...rise(0.85, 10)} className="mt-8 md:mt-10">
            <div className="flex items-center gap-7 font-mono text-[11px] tracking-[0.28em] uppercase md:hidden">
              <a
                href="#iletisim"
                className="inline-flex min-h-11 items-center gap-3 text-champagne"
              >
                Özel Proje
                <span className="line-travel relative h-px w-10 overflow-hidden bg-champagne/35" />
              </a>
              <a
                href="#projeler"
                className="inline-flex min-h-11 items-center text-ivory/60"
              >
                Seçilmiş işler
              </a>
            </div>
            <div className="hidden md:block">
              <MagneticButton href="#iletisim" variant="outline">
                Özel Proje
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...rise(1, 10)}
          className="mt-10 hidden border-t border-[rgba(227,218,201,0.12)] pt-6 md:mt-14 md:grid md:max-w-3xl md:grid-cols-3 md:gap-8 lg:mt-16"
        >
          {[
            ["01", "Konum", "Antalya · Akdeniz"],
            ["02", "Uzmanlık", "Restorasyon · Anahtar Teslim"],
            ["03", "Taahhüt", "Keşiften teslime tek ekip"],
          ].map(([n, label, value]) => (
            <div key={n} className="min-w-0">
              <p className="meta text-champagne/80">
                {n} · {label}
              </p>
              <p className="mt-2 text-sm text-ivory/80">{value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
