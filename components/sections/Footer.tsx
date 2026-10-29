"use client";

import { office } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 px-5 pt-14 pb-8 md:px-10 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-10">
          <div>
            <p className="font-serif text-xl tracking-[0.18em] text-gold uppercase md:text-2xl md:tracking-[0.2em]">
              Harmandaoğlu A.Ş
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-7 text-muted md:text-sm">
              Antalya’da taahhüt, tadilat, anahtar teslim projeler, banyo &
              mutfak yenileme ve villa restorasyonu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-[15px] text-muted md:gap-12 md:text-sm">
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.28em] text-gold uppercase">İletişim</p>
              <p className="text-ivory">{office.owner}</p>
              <a href={office.emailHref} className="block text-ivory hover:text-gold">
                {office.email}
              </a>
              <a
                href={office.instagramHref}
                target="_blank"
                rel="me noreferrer"
                className="block text-ivory hover:text-gold"
              >
                {office.instagramHandle}
              </a>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Dolaşım</p>
              <a href="#hizmetler" className="block py-0.5 hover:text-gold">
                Hizmetler
              </a>
              <a href="#projeler" className="block py-0.5 hover:text-gold">
                Projeler
              </a>
              <a href="#iletisim" className="block py-0.5 hover:text-gold">
                İletişim
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 overflow-hidden font-serif text-[17vw] leading-[0.8] tracking-tight text-ivory/[0.06] uppercase select-none md:mt-16 md:text-[11vw]">
          Harmandaoğlu
        </p>

        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-gold/10 pt-5 text-[10px] tracking-[0.16em] text-muted uppercase md:mt-6 md:flex-row md:gap-3 md:pt-6 md:text-[11px] md:tracking-[0.18em]">
          <p>© {new Date().getFullYear()} Harmandaoğlu A.Ş</p>
          <p>Antalya · Taahhüt & Tadilat</p>
        </div>
      </div>
    </footer>
  );
}
