"use client";

import { useEffect, useState } from "react";

const items: { href: string; label: string; primary?: boolean }[] = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#projeler", label: "İşler" },
  { href: "#iletisim", label: "Randevu", primary: true },
];

export function MobileDock() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let onContact = false;
    let onField = false;

    const sync = () => {
      setHidden(onContact || onField);
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      onField = Boolean(target?.matches("input, textarea, select"));
      sync();
    };

    const onFocusOut = () => {
      onField = false;
      sync();
    };

    const contact = document.getElementById("iletisim");
    const observer = contact
      ? new IntersectionObserver(
          ([entry]) => {
            onContact = entry.isIntersecting && entry.intersectionRatio >= 0.22;
            sync();
          },
          { threshold: [0.15, 0.22, 0.4] },
        )
      : null;
    if (contact) observer?.observe(contact);

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <nav
      aria-label="Hızlı dolaşım"
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.7rem,env(safe-area-inset-bottom))] transition-all duration-300 lg:hidden ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-1 rounded-full border border-gold/25 bg-[#0B131F]/88 px-2 py-2 shadow-[0_-12px_48px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={
              item.primary
                ? "flex h-11 flex-1 items-center justify-center rounded-full bg-gold px-3 text-[10px] tracking-[0.22em] text-canvas uppercase"
                : "flex h-11 flex-1 items-center justify-center rounded-full text-[10px] tracking-[0.2em] text-ivory/80 uppercase"
            }
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
