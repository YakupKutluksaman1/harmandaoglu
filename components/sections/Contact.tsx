"use client";

import type { ReactNode } from "react";
import { office } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="1.6" />
      <path d="M4.2 7.2 12 13.1l7.8-5.9" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactChannel({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "me noreferrer" } : {})}
      className="group flex items-center gap-4 py-4 transition-colors"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold/35 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/10">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] tracking-[0.24em] text-bronze uppercase">
          {label}
        </span>
        <span className="mt-1 block truncate text-[15px] text-ivory transition-colors duration-300 group-hover:text-gold md:text-sm">
          {value}
        </span>
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <section id="iletisim" className="section-frame">
      <SectionReveal className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div data-reveal className="lg:col-span-6">
          <p className="mb-3 text-[10px] tracking-[0.32em] text-gold uppercase md:text-[11px] md:tracking-[0.36em]">
            05 — Randevu
          </p>
          <h2 className="max-w-xl font-serif text-[2rem] leading-[1.12] text-ivory md:text-6xl">
            Antalya’da keşif randevusu.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-muted md:mt-6 md:text-sm">
            Tadilat, anahtar teslim veya villa restorasyonu için e-posta ya da
            Instagram üzerinden bize yazmanız yeter.
          </p>
        </div>
        <address data-reveal className="glass-panel not-italic p-6 md:p-8 lg:col-span-6">
          <div>
            <p className="font-serif text-xl text-gold md:text-2xl">{office.name}</p>
            <p className="mt-2 text-[15px] leading-7 text-muted md:text-sm">
              {office.line1}
              <br />
              {office.line2}
            </p>
          </div>
          <div className="mt-6">
            <p className="font-serif text-[1.35rem] leading-tight text-ivory">{office.owner}</p>
            <p className="mt-1 text-[10px] tracking-[0.24em] text-bronze uppercase">
              {office.role}
            </p>
          </div>
          <div className="mt-6 divide-y divide-gold/15 border-y border-gold/15">
            <ContactChannel
              href={office.emailHref}
              label="E-posta"
              value={office.email}
              icon={<MailIcon />}
            />
            <ContactChannel
              href={office.instagramHref}
              label="Instagram"
              value={office.instagramHandle}
              icon={<InstagramIcon />}
              external
            />
          </div>
          <p className="mt-6 text-[13px] leading-6 text-muted">{office.hours}</p>
        </address>
      </SectionReveal>
    </section>
  );
}
