"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { materials } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Materials() {
  const [active, setActive] = useState(0);
  const material = materials[active];
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <section id="malzeme" className="section-frame">
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-8 max-w-xl md:mb-12">
          <p className="meta mb-3 text-champagne md:mb-4">02 — Malzeme</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Malzeme ve ustalık arşivi.
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-[1.65] text-muted md:mt-5 md:text-[15px] md:leading-7">
            Seçilmiş taş, cam, ahşap ve metal. Her yüzey Antalya ışığına göre
            ayarlanır.
          </p>
        </div>

        {/* Mobil: yatay swatch şeridi */}
        <div data-reveal className="lg:hidden">
          <div
            ref={scroller}
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {materials.map((item, index) => {
              const selected = active === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`snap-start shrink-0 overflow-hidden border transition-colors ${
                    selected
                      ? "border-champagne/50"
                      : "border-[rgba(227,218,201,0.12)]"
                  }`}
                >
                  <div
                    className="h-28 w-[42vw] max-w-[11.5rem] min-w-[9.5rem]"
                    style={{
                      background: `linear-gradient(145deg, ${item.tone} 0%, #0D0E11 80%)`,
                    }}
                  />
                  <div className="bg-surface px-3 py-3 text-left">
                    <p className="meta text-champagne/70">0{index + 1}</p>
                    <p className="mt-1 font-serif text-[1.05rem] leading-tight tracking-[-0.02em] text-ivory">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 border-t border-[rgba(227,218,201,0.12)] pt-6"
            >
              <p className="meta text-champagne">{material.origin}</p>
              <h3 className="mt-2 font-serif text-[1.75rem] leading-[1.12] tracking-[-0.03em] text-ivory">
                {material.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted">
                {material.copy}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {material.use.map((item) => (
                  <li key={item} className="meta text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Masaüstü: liste + panel */}
        <div
          data-reveal
          className="hidden gap-14 border-t border-[rgba(227,218,201,0.12)] pt-8 lg:grid lg:grid-cols-12"
        >
          <div className="flex flex-col lg:col-span-5">
            {materials.map((item, index) => {
              const selected = active === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex min-h-16 items-center justify-between gap-4 border-b border-[rgba(227,218,201,0.12)] py-5 text-left transition-colors ${
                    selected ? "text-ivory" : "text-muted hover:text-ivory/80"
                  }`}
                >
                  <span className="font-serif text-[1.85rem] tracking-[-0.03em]">
                    {item.title}
                  </span>
                  <span className="meta shrink-0 text-champagne/70">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="panel relative min-h-[420px] overflow-hidden p-8 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col"
              >
                <div
                  className="relative mb-8 h-52 w-full overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${material.tone} 0%, #0D0E11 78%)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)'/%3E%3C/svg%3E\")",
                    }}
                  />
                </div>
                <p className="meta text-champagne">{material.origin}</p>
                <h3 className="mt-3 font-serif text-[2.4rem] tracking-[-0.03em] text-ivory">
                  {material.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
                  {material.copy}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
                  {material.use.map((item) => (
                    <li key={item} className="meta text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
