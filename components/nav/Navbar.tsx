"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { navLinks, office } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

function MagneticNavLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.3 });
  const [hovered, setHovered] = useState(false);

  const onMove = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      style={{ x: sx, y: sy }}
      className="relative shrink-0 font-mono text-[10px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-ivory"
    >
      {label}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-champagne"
        initial={false}
        animate={{ width: hovered ? "100%" : "0%", opacity: hovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
    </motion.a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(
      new CustomEvent("harmandaoglu:menu", { detail: { open } }),
    );
    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(
        new CustomEvent("harmandaoglu:menu", { detail: { open: false } }),
      );
    };
  }, [open]);

  const menuLinks = navLinks.filter((link) => link.href !== "#iletisim");

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top)] transition-[background,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-[rgba(227,218,201,0.1)] bg-[#08090A]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10">
        <a href="#hero" className="relative z-[70] flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center border border-[rgba(227,218,201,0.35)] font-serif text-[13px] text-champagne">
            H
          </span>
          <span className="font-serif text-[1.2rem] tracking-[-0.02em] text-ivory md:text-lg">
            Harmandaoğlu
          </span>
        </a>

        <p className="meta pointer-events-none absolute top-1/2 left-1/2 hidden max-w-[40vw] -translate-x-1/2 -translate-y-1/2 truncate text-center text-muted xl:block">
          Antalya · {office.coords} · Akdeniz
        </p>

        <div className="relative z-[70] flex items-center gap-5 xl:gap-9">
          <nav className="hidden items-center gap-7 lg:flex">
            {menuLinks.map((link) => (
              <MagneticNavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="#iletisim" variant="outline">
              Özel Proje
            </MagneticButton>
          </div>

          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            <span
              className={`absolute h-px w-5 bg-champagne transition duration-300 ${
                open ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-champagne transition duration-300 ${
                open ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-canvas lg:hidden"
          >
            <div className="flex h-14 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
              <span className="font-serif text-[1.05rem] text-ivory">Menü</span>
              <button
                type="button"
                className="relative grid h-11 w-11 place-items-center"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
              >
                <span className="absolute h-px w-5 rotate-45 bg-champagne" />
                <span className="absolute h-px w-5 -rotate-45 bg-champagne" />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              <p className="meta mb-8 text-muted">
                Antalya · {office.coords}
              </p>

              <nav className="flex flex-1 flex-col justify-center">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.05,
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-[rgba(227,218,201,0.1)] py-4 font-serif text-[clamp(2rem,9vw,2.6rem)] leading-none tracking-[-0.035em] text-ivory"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-10 space-y-3 border-t border-[rgba(227,218,201,0.12)] pt-6">
                <p className="meta text-muted">{office.owner}</p>
                <a
                  href={office.telHref}
                  className="block font-serif text-xl tracking-[-0.02em] text-ivory"
                >
                  {office.phoneDisplay}
                </a>
                <a
                  href={office.emailHref}
                  className="block text-sm text-muted"
                >
                  {office.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
