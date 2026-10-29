"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, office, whatsappUrl } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled || open
          ? "border-b border-gold/15 bg-[#0B131F]/82 shadow-[0_12px_50px_-28px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[78px] md:px-10">
        <a href="#hero" className="group flex items-center gap-2.5 md:gap-3">
          <span className="grid h-8 w-8 place-items-center border border-gold/60 font-serif text-sm text-gold md:h-9 md:w-9">
            H
          </span>
          <span className="font-serif text-[14px] tracking-[0.14em] text-gold uppercase md:text-lg md:tracking-[0.18em]">
            Harmandaoğlu
            <span className="hidden tracking-[0.12em] text-gold/70 sm:inline"> A.Ş</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.28em] text-muted uppercase transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton href="#iletisim" variant="outline">
            Randevu Talep Et
          </MagneticButton>
        </div>

        <button
          type="button"
          className="relative z-[60] h-12 w-12 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          <span
            className={`absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-gold transition duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-gold transition duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col bg-[#0B131F] px-5 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline justify-between border-b border-gold/15 py-5"
                >
                  <span className="font-serif text-[2.15rem] leading-none text-ivory">
                    {link.label}
                  </span>
                  <span className="text-[10px] tracking-[0.28em] text-gold">0{i + 1}</span>
                </motion.a>
              ))}
              <motion.a
                href="#iletisim"
                onClick={() => setOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="mt-8 flex h-14 items-center justify-center bg-gold text-[11px] tracking-[0.28em] text-canvas uppercase"
              >
                Randevu Talep Et
              </motion.a>
            </div>
            <div className="flex items-end justify-between gap-4 pt-8 text-[10px] tracking-[0.2em] text-muted uppercase">
              <a href={office.telHref} className="text-ivory">
                {office.phoneDisplay}
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="text-right text-gold">
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
