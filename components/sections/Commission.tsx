"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import {
  budgetOptions,
  office,
  propertyTypes,
  regionOptions,
  scopeOptions,
  styleOptions,
  timelineOptions,
  whatsappUrl,
} from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { label: "Mülk", title: "Projeniz hangi yapıda?" },
  { label: "Kapsam", title: "Neleri yeniliyoruz?" },
  { label: "Konum", title: "Nerede ve ne ölçekte?" },
  { label: "Dil & takvim", title: "Tavır ve zamanlama." },
  { label: "Özet", title: "Brifinginiz hazır." },
] as const;

const LAST = STEPS.length - 1;

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

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 border px-3.5 text-[14px] transition-[color,background,border-color] duration-300 ${
        selected
          ? "border-champagne/60 bg-champagne/10 text-ivory"
          : "border-[rgba(227,218,201,0.14)] text-muted active:bg-champagne/5"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          selected ? "bg-champagne" : "bg-[rgba(227,218,201,0.2)]"
        }`}
      />
      {children}
    </button>
  );
}

function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="meta text-champagne/80">{label}</p>
        {hint && <p className="meta text-muted/70">{hint}</p>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function renderWhatsAppLine(line: string, i: number) {
  if (!line) return <br key={i} />;
  const bold = /^\*(.+)\*$/.exec(line);
  return (
    <p key={i} className={bold ? "font-semibold text-ivory" : undefined}>
      {bold ? bold[1] : line}
    </p>
  );
}

export function Commission() {
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState<string | null>(null);
  const [scopes, setScopes] = useState<string[]>([]);
  const [region, setRegion] = useState<string | null>(null);
  const [area, setArea] = useState(320);
  const [areaTouched, setAreaTouched] = useState(false);
  const [style, setStyle] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [ref, setRef] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const rnd = Math.floor(100 + Math.random() * 900);
    setRef(`HD-${dd}${mm}-${rnd}`);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 64) window.scrollBy({ top: top - 80, behavior: "smooth" });
  }, [step]);

  const go = (next: number) => setStep(Math.max(0, Math.min(LAST, next)));

  const toggleScope = (item: string) =>
    setScopes((list) =>
      list.includes(item) ? list.filter((s) => s !== item) : [...list, item],
    );

  const summary = useMemo(
    () =>
      [
        { step: 0, label: "Mülk", value: property },
        { step: 2, label: "Konum", value: region },
        { step: 2, label: "Alan", value: areaTouched ? `~${area} m²` : null },
        { step: 1, label: "Kapsam", value: scopes.length ? scopes.join(", ") : null },
        { step: 3, label: "Mimari dil", value: style },
        { step: 3, label: "Başlangıç", value: timeline },
        { step: 3, label: "Yatırım", value: budget },
      ] as const,
    [property, region, area, areaTouched, scopes, style, timeline, budget],
  );

  const messageLines = useMemo(() => {
    const filled = summary.filter((row) => row.value);
    return [
      "Merhaba Onur Bey,",
      "harmandaoglu.com.tr üzerinden özel proje brifingimi iletiyorum.",
      "",
      `*Özel Brifing${ref ? ` · ${ref}` : ""}*`,
      ...(filled.length
        ? filled.map((row) => `• ${row.label}: ${row.value}`)
        : ["• Detayları görüşmede paylaşmak isterim."]),
      ...(note.trim() ? ["", `Not: ${note.trim()}`] : []),
      "",
      "Uygun olduğunuz bir zamanda keşif için dönüşünüzü rica ederim.",
      ...(name.trim() ? [name.trim()] : []),
    ];
  }, [summary, note, name, ref]);

  const href = whatsappUrl(messageLines.join("\n"));

  return (
    <section
      id="iletisim"
      className="section-frame pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-8 max-w-xl md:mb-10">
          <p className="meta mb-3 text-champagne md:mb-4">06 — Özel Proje</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Özel brifing.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted md:text-[16px] md:leading-7">
            Yaklaşık bir dakika, yalnızca dokunarak. Brifinginiz referans
            numarasıyla doğrudan Onur Kutluksaman’a WhatsApp’tan iletilir.
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
            <p className="meta pt-4 text-muted">{office.hours}</p>
          </div>

          <div
            ref={cardRef}
            data-reveal
            className="relative order-1 scroll-mt-24 border border-[rgba(227,218,201,0.12)] bg-surface/80 p-5 sm:p-7 lg:order-2 lg:col-span-8 lg:p-8"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-px border border-champagne/60 shadow-[0_0_48px_-10px_rgba(197,160,89,0.45)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.15] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2.4, delay: 0.5, times: [0, 0.35, 1], ease: "easeInOut" }}
            />
            <div className="mb-6 flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1}. adım: ${s.label}`}
                  className="flex h-6 flex-1 items-center"
                >
                  <span className="relative block h-px w-full bg-[rgba(227,218,201,0.14)]">
                    <span
                      className={`absolute inset-y-0 left-0 bg-champagne transition-all duration-500 ${
                        i <= step ? "w-full" : "w-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="meta text-champagne">
                0{step + 1} / 0{STEPS.length} · {STEPS[step].label}
              </p>
              {step < LAST && (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="meta inline-flex min-h-9 items-center gap-1.5 text-muted transition-colors hover:text-champagne"
                >
                  Hemen yaz <span aria-hidden>→</span>
                </a>
              )}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className="font-serif text-[1.6rem] leading-[1.15] tracking-[-0.03em] text-ivory md:text-[1.9rem]">
                  {STEPS[step].title}
                </h3>

                {step === 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {propertyTypes.map((item) => {
                      const selected = property === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            setProperty(item.label);
                            window.setTimeout(() => go(1), 280);
                          }}
                          className={`flex min-h-[5.5rem] flex-col justify-between border p-3.5 text-left transition-[background,border-color] duration-300 ${
                            selected
                              ? "border-champagne/60 bg-champagne/10"
                              : "border-[rgba(227,218,201,0.14)] active:bg-champagne/5"
                          }`}
                        >
                          <span
                            className={`font-serif text-[1.1rem] leading-tight ${
                              selected ? "text-ivory" : "text-ivory/80"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="mt-2 text-[12px] leading-snug text-muted">
                            {item.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-5">
                    <Group label="Kapsam" hint="Birden fazla seçilebilir">
                      {scopeOptions.map((item) => (
                        <Chip
                          key={item}
                          selected={scopes.includes(item)}
                          onClick={() => toggleScope(item)}
                        >
                          {item}
                        </Chip>
                      ))}
                    </Group>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-5 space-y-7">
                    <Group label="Bölge">
                      {regionOptions.map((item) => (
                        <Chip
                          key={item}
                          selected={region === item}
                          onClick={() => setRegion(region === item ? null : item)}
                        >
                          {item}
                        </Chip>
                      ))}
                    </Group>
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="meta text-champagne/80">Tahmini alan</p>
                        <p
                          className={`font-serif text-[2.4rem] leading-none tracking-[-0.04em] tabular-nums transition-colors ${
                            areaTouched ? "text-champagne" : "text-ivory/40"
                          }`}
                        >
                          {area}
                          <span className="ml-1.5 align-middle text-[0.32em] tracking-[0.2em] text-muted uppercase">
                            m²
                          </span>
                        </p>
                      </div>
                      <input
                        type="range"
                        min={80}
                        max={1500}
                        step={10}
                        value={area}
                        onChange={(e) => {
                          setArea(Number(e.target.value));
                          setAreaTouched(true);
                        }}
                        className="mt-3 h-12 w-full"
                        aria-label="Tahmini metrekare"
                      />
                      <div className="meta flex justify-between text-muted">
                        <span>80</span>
                        <span>1500+</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-5 space-y-7">
                    <Group label="Mimari dil">
                      {styleOptions.map((item) => (
                        <Chip
                          key={item}
                          selected={style === item}
                          onClick={() => setStyle(style === item ? null : item)}
                        >
                          {item}
                        </Chip>
                      ))}
                    </Group>
                    <Group label="Başlangıç">
                      {timelineOptions.map((item) => (
                        <Chip
                          key={item}
                          selected={timeline === item}
                          onClick={() => setTimeline(timeline === item ? null : item)}
                        >
                          {item}
                        </Chip>
                      ))}
                    </Group>
                    <Group label="Yatırım aralığı" hint="İsteğe bağlı">
                      {budgetOptions.map((item) => (
                        <Chip
                          key={item}
                          selected={budget === item}
                          onClick={() => setBudget(budget === item ? null : item)}
                        >
                          {item}
                        </Chip>
                      ))}
                    </Group>
                  </div>
                )}

                {step === LAST && (
                  <div className="mt-5">
                    <div className="divide-y divide-[rgba(227,218,201,0.1)] border-y border-[rgba(227,218,201,0.12)]">
                      {summary.map((row) => (
                        <button
                          key={row.label}
                          type="button"
                          onClick={() => go(row.step)}
                          className="group flex min-h-12 w-full items-center justify-between gap-4 py-2.5 text-left"
                        >
                          <span className="meta shrink-0 text-champagne/80">{row.label}</span>
                          <span
                            className={`text-right text-[14px] leading-snug ${
                              row.value ? "text-ivory" : "text-muted/60"
                            }`}
                          >
                            {row.value ?? "Görüşmede"}
                            <span className="ml-2 text-muted/60 transition-colors group-hover:text-champagne" aria-hidden>
                              ›
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4">
                      <label className="block">
                        <span className="meta text-muted">Adınız · isteğe bağlı</span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          enterKeyHint="done"
                          className="mt-1 block h-11 w-full border-b border-[rgba(227,218,201,0.18)] bg-transparent text-[16px] text-ivory outline-none transition-colors placeholder:text-muted/40 focus:border-champagne/60"
                          placeholder="Ad Soyad"
                        />
                      </label>
                      <label className="block">
                        <span className="meta text-muted">Kısa not · isteğe bağlı</span>
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          rows={2}
                          maxLength={400}
                          className="mt-1 block w-full resize-none border-b border-[rgba(227,218,201,0.18)] bg-transparent py-2 text-[16px] leading-snug text-ivory outline-none transition-colors placeholder:text-muted/40 focus:border-champagne/60"
                          placeholder="Örn. deniz tarafı salon ve iki banyo öncelikli"
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreview((v) => !v)}
                      aria-expanded={preview}
                      className="meta mt-6 inline-flex min-h-10 items-center gap-2 text-muted transition-colors hover:text-champagne"
                    >
                      {preview ? "Önizlemeyi gizle" : "Mesajı önizle"}
                      <span
                        aria-hidden
                        className={`inline-block transition-transform duration-300 ${preview ? "rotate-180" : ""}`}
                      >
                        ↓
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {preview && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 ml-auto max-w-[92%] rounded-[10px] rounded-tr-[2px] border border-[rgba(227,218,201,0.1)] bg-[#12201C] px-3.5 py-3 text-[13.5px] leading-[1.55] text-ivory/85">
                            {messageLines.map(renderWhatsAppLine)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6">
                      <MagneticButton href={href} external className="w-full">
                        WhatsApp ile ilet
                      </MagneticButton>
                      <p className="mt-3 text-center text-[12px] leading-snug text-muted/80">
                        WhatsApp mesajı hazır açılır; göndermeden önce
                        düzenleyebilirsiniz. Bilgileriniz sitede saklanmaz ·{" "}
                        <a href="/kvkk" className="underline underline-offset-2 hover:text-champagne">
                          KVKK
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step < LAST && (
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-[rgba(227,218,201,0.12)] pt-5">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => go(step - 1)}
                  className="flex min-h-12 min-w-20 items-center justify-center meta text-muted disabled:opacity-25"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={() => go(step + 1)}
                  className="flex min-h-12 min-w-32 items-center justify-center gap-2 bg-champagne px-5 font-mono text-[10px] tracking-[0.2em] text-canvas uppercase"
                >
                  {step === LAST - 1 ? "Özeti gör" : "İleri"}
                  <span aria-hidden>→</span>
                </button>
              </div>
            )}
            {step === LAST && (
              <div className="mt-6 flex justify-start border-t border-[rgba(227,218,201,0.12)] pt-4">
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="flex min-h-11 items-center meta text-muted"
                >
                  ← Geri
                </button>
              </div>
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
