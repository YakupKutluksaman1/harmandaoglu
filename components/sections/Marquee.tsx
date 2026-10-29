"use client";

import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-surface/60 py-3.5 md:py-5">
      <div className="animate-marquee flex w-max gap-8 md:gap-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-serif text-base tracking-[0.24em] text-ivory/80 uppercase md:gap-10 md:text-xl md:tracking-[0.28em]"
          >
            {item}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
