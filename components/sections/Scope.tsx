"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { office, services } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Scope() {
  const [open, setOpen] = useState(0);

  return (
    <section id="hizmetler" className="section-frame relative">
      <SectionReveal className="relative mx-auto max-w-[1440px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-20">
        <div
          data-reveal
          className="mb-10 lg:sticky lg:top-28 lg:col-span-5 lg:mb-0"
        >
          <p className="mb-3 text-[10px] tracking-[0.32em] text-gold uppercase md:text-[11px] md:tracking-[0.36em]">
            02 — Hizmet Listesi
          </p>
          <h2 className="max-w-md font-serif text-[2rem] leading-[1.12] text-ivory md:text-6xl">
            Taahhüt ve tadilat çözümleri.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted md:mt-6 md:text-sm">
            Antalya’da anahtar teslim projeler, banyo & mutfak yenileme, villa
            restorasyonu ve özel dekorasyon. Güncel işler Instagram’da.
          </p>
          <div className="mt-7">
            <MagneticButton
              href={office.instagramHref}
              variant="outline"
              external
              rel="me noreferrer"
            >
              Instagram
            </MagneticButton>
          </div>
        </div>

        <div data-reveal className="relative lg:col-span-7">
          <div
            aria-hidden
            className="absolute top-5 bottom-5 left-[15px] w-px bg-gold/20 md:left-[19px]"
          />

          {services.map((service, index) => {
            const active = open === index;

            return (
              <article
                key={service.id}
                className="relative border-b border-gold/15 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-expanded={active}
                  className="flex w-full items-start gap-4 py-5 text-left md:gap-5 md:py-6"
                >
                  <span
                    className={`relative z-10 mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-serif text-[11px] transition-colors duration-300 md:h-10 md:w-10 md:text-sm ${
                      active
                        ? "border-gold bg-gold text-canvas"
                        : "border-gold/40 bg-canvas text-gold"
                    }`}
                  >
                    {service.id}
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span
                      className={`block font-serif text-[1.45rem] leading-tight transition-colors duration-300 md:text-[2rem] ${
                        active ? "text-ivory" : "text-ivory/72"
                      }`}
                    >
                      {service.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 font-serif text-xl text-gold transition-transform duration-300 ${
                      active ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-12 md:pb-7 md:pl-[3.75rem]">
                        <p className="max-w-md text-[15px] leading-7 text-muted md:text-sm">
                          {service.copy}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.focus.map((item) => (
                            <span
                              key={item}
                              className="border border-gold/30 px-2.5 py-1 text-[10px] tracking-[0.16em] text-gold uppercase"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
