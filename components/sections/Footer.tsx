"use client";

import { navLinks, office } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(227,218,201,0.12)] px-5 pt-12 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:px-10 md:pt-24 md:pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          <div>
            <p className="font-serif text-[1.65rem] tracking-[-0.03em] text-champagne md:text-2xl">
              Harmandaoğlu A.Ş
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-[1.65] text-muted">
              Antalya’da anahtar teslim villa restorasyonu ve kişiye özel mekân
              mimarisi.
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-6 text-[15px] text-muted md:grid-cols-2 md:gap-16">
            <div className="min-w-0 space-y-1">
              <p className="meta mb-3 text-champagne">İletişim</p>
              <p className="py-1.5 text-ivory">{office.owner}</p>
              <a href={office.telHref} className="block py-1.5 text-ivory">
                {office.phoneDisplay}
              </a>
              <a
                href={office.emailHref}
                className="block truncate py-1.5 text-[14px] text-ivory sm:text-[15px]"
              >
                {office.email}
              </a>
            </div>
            <div className="space-y-1">
              <p className="meta mb-3 text-champagne">Dolaşım</p>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="block py-1.5">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-14 w-full bg-[linear-gradient(180deg,rgba(227,218,201,0.2)_0%,rgba(227,218,201,0.02)_85%)] bg-clip-text pb-[0.06em] text-center font-serif text-[10.4vw] leading-[0.9] tracking-[-0.045em] whitespace-nowrap text-transparent uppercase select-none md:mt-20 min-[1440px]:text-[9.4rem]"
        >
          Harmandaoğlu
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[rgba(227,218,201,0.12)] pt-5 meta text-muted">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p>© {new Date().getFullYear()} Harmandaoğlu A.Ş · Antalya</p>
            <a
              href="/kvkk"
              className="inline-flex min-h-9 items-center transition-colors hover:text-champagne"
            >
              KVKK Aydınlatma Metni
            </a>
          </div>
          <a
            href="#"
            className="group inline-flex min-h-11 items-center gap-2 text-champagne"
          >
            Başa dön
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
