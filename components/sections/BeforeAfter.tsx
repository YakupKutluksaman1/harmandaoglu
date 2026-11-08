"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";

const BEFORE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90";
const AFTER =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90";

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
          <p className="meta mb-3 text-champagne md:mb-4">04 — Dönüşüm</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Yapıdan yaşama.
          </h2>
          <p className="mt-4 text-[14px] leading-[1.65] text-muted md:text-[15px] md:leading-7">
            Kaydırarak ham yapı ile tamamlanmış mekânı aynı karede okuyun.
          </p>
        </div>

        <div
          ref={frame}
          data-reveal
          className="relative -mx-5 aspect-[3/4] touch-none overflow-hidden border-y border-[rgba(227,218,201,0.12)] select-none sm:mx-0 sm:aspect-[16/10] sm:border"
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
            alt="Sonra"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <Image
              src={BEFORE}
              alt="Önce"
              fill
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </div>

          <div className="pointer-events-none absolute top-5 left-5 meta text-ivory/90">
            Önce
          </div>
          <div className="pointer-events-none absolute top-5 right-5 meta text-champagne">
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
            className="pointer-events-none absolute top-0 z-10 flex h-full w-12 -translate-x-1/2 flex-col items-center"
            style={{ left: `${value}%` }}
            role="slider"
            aria-valuenow={Math.round(value)}
            aria-valuemin={10}
            aria-valuemax={90}
            aria-label="Önce sonra"
          >
            <span className="h-full w-px bg-champagne" />
            <span className="absolute top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-champagne bg-canvas/95 text-champagne shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              ↔
            </span>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
