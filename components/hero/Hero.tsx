"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { office } from "@/lib/data";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div className="absolute inset-0 scale-105" style={{ y: imageY }}>
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

      {/* Mobil: alttan yükselen okunabilirlik; masaüstü: sol vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.5)_0%,rgba(8,9,10,0.15)_28%,rgba(8,9,10,0.55)_62%,rgba(8,9,10,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(8,9,10,0.7)_0%,transparent_55%)] md:block" />

      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-[calc(5.75rem+env(safe-area-inset-top))] pb-[calc(1.75rem+env(safe-area-inset-bottom))] sm:px-8 md:justify-end md:px-10 md:pb-16 lg:pb-20"
      >
        <div className="mt-auto flex max-w-[34rem] flex-col">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 font-serif text-[clamp(2.35rem,10vw,3.4rem)] leading-none tracking-[-0.035em] text-champagne md:mb-5 md:text-[2.75rem]"
          >
            Harmandaoğlu
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="meta mb-5 text-muted md:mb-7"
          >
            A.Ş · Antalya · {office.coords}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(1.85rem,7.4vw,4.4rem)] leading-[1.1] tracking-[-0.035em] text-ivory"
          >
            <span className="block">Antalya’da yüksek</span>
            <span className="block">mimari ve restorasyonun</span>
            <span className="block">en saf hâli.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[28rem] text-[14px] leading-[1.65] text-[#A8A6A1] md:mt-7 md:text-[15px] md:leading-7"
          >
            Lara, Belek ve Konyaaltı’nda anahtar teslim villa restorasyonu ve
            kişiye özel mekân mimarisi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10"
          >
            <a
              href="#projeler"
              className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-champagne uppercase md:hidden"
            >
              Seçilmiş işler
              <span className="h-px w-8 bg-champagne/70 transition-all duration-500 group-hover:w-12" />
            </a>
            <div className="hidden md:block">
              <MagneticButton href="#iletisim" variant="outline">
                Özel Proje
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 hidden border-t border-[rgba(227,218,201,0.12)] pt-6 md:mt-14 md:grid md:max-w-3xl md:grid-cols-3 md:gap-8 lg:mt-16">
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
        </div>
      </motion.div>
    </section>
  );
}
