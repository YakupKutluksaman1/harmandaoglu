"use client";

import { office } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(227,218,201,0.12)] px-5 pt-12 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:px-10 md:pt-24 md:pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          <div>
            <p className="font-serif text-[1.65rem] tracking-[-0.03em] text-champagne md:text-2xl">
              Harmandaoğlu A.Ş
            </p>
            <p className="mt-3 max-w-xs text-[14px] leading-[1.65] text-muted">
              Antalya’da anahtar teslim villa restorasyonu ve kişiye özel mekân
              mimarisi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[14px] text-muted md:gap-16">
            <div className="space-y-1">
              <p className="meta mb-3 text-champagne">İletişim</p>
              <p className="py-1.5 text-ivory">{office.owner}</p>
              <a href={office.telHref} className="block py-1.5 text-ivory">
                {office.phoneDisplay}
              </a>
              <a href={office.emailHref} className="block break-all py-1.5 text-ivory">
                {office.email}
              </a>
            </div>
            <div className="space-y-1">
              <p className="meta mb-3 text-champagne">Dolaşım</p>
              <a href="#malzeme" className="block py-1.5">
                Malzeme
              </a>
              <a href="#projeler" className="block py-1.5">
                Arşiv
              </a>
              <a href="#donusum" className="block py-1.5">
                Dönüşüm
              </a>
              <a href="#iletisim" className="block py-1.5">
                Özel Proje
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 w-full overflow-hidden font-serif text-[clamp(1.5rem,12vw,10rem)] leading-[0.88] tracking-[-0.04em] text-ivory/[0.045] uppercase select-none whitespace-nowrap md:mt-20">
          Harmandaoğlu
        </p>

        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-[rgba(227,218,201,0.12)] pt-5 meta text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Harmandaoğlu A.Ş</p>
          <p>Antalya</p>
        </div>
      </div>
    </footer>
  );
}
