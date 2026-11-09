"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
const BEFORE = "/donusum-once.jpg";
const AFTER = "/donusum-sonra.jpg";

export function BeforeAfter() {
  const frame = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(52);
  const [hint, setHint] = useState(true);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setValue(Math.min(90, Math.max(10, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <section id="donusum" className="section-frame">
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-7 max-w-xl md:mb-12">
          <p className="meta mb-3 text-champagne md:mb-4">03 — Dönüşüm</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Yapıdan yaşama.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted md:text-[16px] md:leading-7">
            Kaydırarak ham yapı ile tamamlanmış mekânı aynı karede okuyun.
          </p>
        </div>

        <div
          ref={frame}
          data-reveal
          className="relative -mx-5 aspect-square touch-none overflow-hidden border-y border-[rgba(227,218,201,0.12)] select-none sm:mx-auto sm:aspect-[4/3] sm:max-w-[1100px] sm:border"
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            dragging.current = true;
            setHint(false);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            setFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          <Image
            src={AFTER}
            alt="Restorasyon sonrası: kemerli deniz manzaralı villa salonu"
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <Image
              src={BEFORE}
              alt="Restorasyon öncesi: aynı salonun kaba inşaat hâli"
              fill
              className="object-cover object-[center_30%]"
              sizes="100vw"
              quality={90}
            />
          </div>

          <div className="pointer-events-none absolute top-4 left-4 border border-[rgba(227,218,201,0.18)] bg-canvas/55 px-3 py-1.5 meta text-ivory backdrop-blur-md">
            Önce
          </div>
          <div className="pointer-events-none absolute top-4 right-4 border border-champagne/30 bg-canvas/55 px-3 py-1.5 meta text-champagne backdrop-blur-md">
            Sonra
          </div>

          {hint && (
            <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center md:hidden">
              <span className="border border-[rgba(227,218,201,0.2)] bg-canvas/70 px-4 py-2 meta text-ivory backdrop-blur-md">
                Kaydırın
              </span>
            </div>
          )}

          <div
            className="group/handle absolute top-0 z-10 flex h-full w-12 -translate-x-1/2 flex-col items-center outline-none"
            style={{ left: `${value}%` }}
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(value)}
            aria-valuemin={10}
            aria-valuemax={90}
            aria-valuetext={`Yüzde ${Math.round(value)} önce`}
            aria-label="Önce sonra karşılaştırması"
            onKeyDown={(e) => {
              const next: Record<string, number> = {
                ArrowLeft: value - 5,
                ArrowRight: value + 5,
                Home: 10,
                End: 90,
              };
              if (!(e.key in next)) return;
              e.preventDefault();
              setHint(false);
              setValue(Math.min(90, Math.max(10, next[e.key])));
            }}
          >
            <span className="h-full w-px bg-champagne" />
            <span className="absolute top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-champagne/70 bg-canvas/80 text-champagne shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md group-focus-visible/handle:ring-2 group-focus-visible/handle:ring-champagne/70">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </span>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
