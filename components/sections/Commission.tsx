"use client";

import { useMemo, useState } from "react";
import { Mail, Phone } from "lucide-react";
import {
  office,
  propertyTypes,
  styleOptions,
  whatsappUrl,
} from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-champagne"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Commission() {
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState<(typeof propertyTypes)[number]>(
    propertyTypes[0],
  );
  const [footprint, setFootprint] = useState(320);
  const [style, setStyle] = useState<(typeof styleOptions)[number]>(
    styleOptions[0],
  );

  const briefMessage = useMemo(
    () =>
      [
        "Merhaba, HARMANDAOĞLU A.Ş sitesinden özel proje talebi.",
        `Mülk tipi: ${property}`,
        `Tahmini alan: ${footprint}+ m²`,
        `Mimari dil: ${style}`,
        "Keşif ve bilgi rica ederim.",
      ].join("\n"),
    [property, footprint, style],
  );

  return (
    <section
      id="iletisim"
      className="section-frame pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-8 max-w-xl md:mb-10">
          <p className="meta mb-3 text-champagne md:mb-4">05 — Özel Proje</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Özel brifing.
          </h2>
          <p className="mt-4 text-[14px] leading-[1.65] text-muted md:text-[15px] md:leading-7">
            Dört adımda projenizi tanımlayın; özet doğrudan Onur Kutluksaman’a
            WhatsApp ile gitsin.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="order-2 space-y-1 lg:order-1 lg:col-span-4">
            <p className="font-serif text-xl tracking-[-0.02em] text-ivory">
              {office.owner}
            </p>
            <p className="meta pb-4 text-muted">{office.role}</p>
            <a
              href={office.telHref}
              className="flex min-h-12 items-center gap-3 text-[15px] text-ivory/90"
            >
              <Phone className="h-4 w-4 text-champagne" strokeWidth={1.25} />
              {office.phoneDisplay}
            </a>
            <a
              href={office.emailHref}
              className="flex min-h-12 items-center gap-3 break-all text-[15px] text-ivory/90"
            >
              <Mail className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.25} />
              {office.email}
            </a>
            <a
              href={office.instagramHref}
              target="_blank"
              rel="me noreferrer"
              className="flex min-h-12 items-center gap-3 text-[15px] text-ivory/90"
            >
              <InstagramIcon />
              {office.instagramHandle}
            </a>
          </div>

          <div
            data-reveal
            className="order-1 border border-[rgba(227,218,201,0.12)] bg-surface/80 p-5 sm:p-7 lg:order-2 lg:col-span-8 lg:p-8"
          >
            <div className="mb-7 flex items-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-px flex-1 bg-[rgba(227,218,201,0.14)]">
                  <div
                    className={`h-px bg-champagne transition-all duration-500 ${
                      i <= step ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
            <p className="meta mb-5 text-champagne">Adım 0{step + 1} / 04</p>

            {step === 0 && (
              <div>
                <h3 className="font-serif text-[1.55rem] tracking-[-0.03em] text-ivory">
                  Mülk tipi
                </h3>
                <div className="mt-5 space-y-2.5">
                  {propertyTypes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProperty(item)}
                      className={`flex min-h-[3.4rem] w-full items-center justify-between px-4 text-left transition-colors ${
                        property === item
                          ? "bg-champagne/10 text-ivory"
                          : "bg-transparent text-muted"
                      } border border-[rgba(227,218,201,0.12)]`}
                    >
                      <span className="font-serif text-[1.05rem]">{item}</span>
                      <span className="meta">
                        {property === item ? "Seçili" : "Seç"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-serif text-[1.55rem] tracking-[-0.03em] text-ivory">
                  Tahmini alan
                </h3>
                <p className="mt-8 font-serif text-[clamp(3rem,14vw,4.5rem)] leading-none tracking-[-0.04em] text-champagne tabular-nums">
                  {footprint}
                  <span className="ml-2 align-middle text-[0.28em] tracking-[0.2em] text-muted uppercase">
                    m²
                  </span>
                </p>
                <input
                  type="range"
                  min={150}
                  max={1200}
                  step={10}
                  value={footprint}
                  onChange={(e) => setFootprint(Number(e.target.value))}
                  className="mt-8 h-12 w-full"
                  aria-label="Tahmini metrekare"
                />
                <div className="meta mt-1 flex justify-between text-muted">
                  <span>150</span>
                  <span>1200+</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif text-[1.55rem] tracking-[-0.03em] text-ivory">
                  Mimari dil
                </h3>
                <div className="mt-5 space-y-2.5">
                  {styleOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStyle(item)}
                      className={`flex min-h-[3.4rem] w-full items-center justify-between px-4 text-left transition-colors ${
                        style === item
                          ? "bg-champagne/10 text-ivory"
                          : "text-muted"
                      } border border-[rgba(227,218,201,0.12)]`}
                    >
                      <span className="font-serif text-[1.05rem]">{item}</span>
                      <span className="meta">
                        {style === item ? "Seçili" : "Seç"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-serif text-[1.55rem] tracking-[-0.03em] text-ivory">
                  Yönetici hattı
                </h3>
                <dl className="mt-5 space-y-4 border border-[rgba(227,218,201,0.12)] p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="meta text-champagne">Mülk</dt>
                    <dd className="text-right text-ivory">{property}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="meta text-champagne">Alan</dt>
                    <dd className="text-ivory">{footprint}+ m²</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="meta text-champagne">Dil</dt>
                    <dd className="text-right text-ivory">{style}</dd>
                  </div>
                </dl>
                <div className="mt-7">
                  <MagneticButton
                    href={whatsappUrl(briefMessage)}
                    external
                    className="w-full"
                  >
                    WhatsApp ile ilet
                  </MagneticButton>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-[rgba(227,218,201,0.12)] pt-5">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="flex min-h-12 min-w-24 items-center justify-center meta text-muted disabled:opacity-25"
              >
                Geri
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="flex min-h-12 min-w-28 items-center justify-center bg-champagne font-mono text-[9px] tracking-[0.2em] text-canvas uppercase"
                >
                  İleri
                </button>
              )}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
