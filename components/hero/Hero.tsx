"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const coarse = useCoarsePointer();
  const mx = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 24, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[580px] overflow-hidden"
      onMouseMove={(e) => {
        if (coarse) return;
        mx.set((e.clientX / window.innerWidth - 0.5) * 8);
      }}
      onMouseLeave={() => mx.set(0)}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: coarse ? 0 : px, y: imageY }}
      >
        <Image
          src="/hero-renovasyon.jpg"
          alt="Harmandaoğlu A.Ş — Antalya’da anahtar teslim tadilat ve iç mekân yenileme"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-[center_42%]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,19,31,0.28)_0%,rgba(11,19,31,0.06)_34%,rgba(11,19,31,0.72)_100%)] md:bg-[linear-gradient(90deg,rgba(11,19,31,0.58)_0%,rgba(11,19,31,0.18)_52%,rgba(11,19,31,0.04)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,19,31,0.12)_0%,transparent_40%,rgba(11,19,31,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-3 border border-gold/20 md:inset-6" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-8 md:justify-center md:px-14 md:pb-0">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] tracking-[0.38em] text-gold uppercase sm:mb-6 sm:text-[11px] sm:tracking-[0.42em]">
            Harmandaoğlu A.Ş · Antalya
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[2.2rem] leading-[1.12] text-ivory md:hidden"
          >
            Antalya'da
            <br />
            taahhüt ve tadilatın
            <br />
            zarif hâli.
          </motion.h1>
          <div className="hidden md:block">
            <SplitText
              as="p"
              text="ANTALYA'DA TAAHHÜT VE TADİLATIN ZARİF HÂLİ"
              className="font-serif text-6xl leading-[1.08] text-ivory lg:text-[4.4rem]"
              delay={0.2}
            />
          </div>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-muted sm:mt-7 sm:text-sm md:text-base">
            Taahhüt ve tadilat, anahtar teslim, banyo & mutfak yenileme, villa
            restorasyonu ve özel dekorasyon.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <MagneticButton href="#projeler" className="w-full sm:w-auto">
              Seçilmiş İşler
            </MagneticButton>
            <MagneticButton
              href="#iletisim"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Ofisle Tanışın
            </MagneticButton>
          </div>

          <div className="mt-8 flex items-start justify-between gap-4 border-t border-gold/20 pt-5 text-[9px] tracking-[0.22em] text-bronze uppercase md:hidden">
            <div>
              <p className="text-gold">Konum</p>
              <p className="mt-1 text-ivory/80">Antalya</p>
            </div>
            <div>
              <p className="text-gold">Hizmet</p>
              <p className="mt-1 text-ivory/80">Tadilat · Teslim</p>
            </div>
            <div>
              <p className="text-gold">Şirket</p>
              <p className="mt-1 text-ivory/80">A.Ş</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-8 bottom-8 z-10 hidden items-end gap-10 text-[10px] tracking-[0.28em] text-bronze uppercase md:right-14 md:bottom-10 md:flex">
        <div>
          <p className="text-gold">Konum</p>
          <p className="mt-1 text-ivory/80">Antalya</p>
        </div>
        <div>
          <p className="text-gold">Hizmet</p>
          <p className="mt-1 text-ivory/80">Tadilat · Anahtar Teslim</p>
        </div>
        <div>
          <p className="text-gold">Şirket</p>
          <p className="mt-1 text-ivory/80">Harmandaoğlu A.Ş</p>
        </div>
      </div>
    </section>
  );
}
