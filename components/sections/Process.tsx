import { assurances, processSteps, services } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { BriefCue } from "@/components/ui/BriefCue";

export function Process() {
  return (
    <section id="surec" className="section-frame">
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div data-reveal className="mb-9 max-w-xl md:mb-14">
          <p className="meta mb-3 text-champagne md:mb-4">04 — Süreç</p>
          <h2 className="headline text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
            Keşiften teslime, tek ekip.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted md:text-[16px] md:leading-7">
            Villa restorasyonundan anahtar teslim tadilata kadar her işi aynı
            ekip, aynı disiplinle yürütür.
          </p>
        </div>

        <div data-reveal>
          <p className="meta mb-4 text-champagne/80">Kapsam</p>
          <ul className="grid border-t border-[rgba(227,218,201,0.12)] md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li
                key={service.id}
                className="border-b border-[rgba(227,218,201,0.12)] py-4 md:px-5 md:py-6 md:odd:pl-0 lg:border-r lg:last:border-r-0 lg:first:pl-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="meta text-champagne/70">{service.id}</span>
                  <h3 className="font-serif text-[1.3rem] leading-tight tracking-[-0.02em] text-ivory md:text-[1.45rem]">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-1.5 pl-[calc(1.1rem+0.75rem)] text-[15px] leading-[1.55] text-muted md:mt-2.5 md:pl-0 md:text-[16px]">
                  {service.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="mt-12 md:mt-20">
          <p className="meta mb-6 text-champagne/80 md:mb-8">Nasıl çalışıyoruz</p>
          <ol className="relative ml-1.5 border-l border-[rgba(227,218,201,0.16)] md:ml-0 md:grid md:grid-cols-4 md:gap-8 md:border-t md:border-l-0">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative pb-9 pl-7 last:pb-0 md:pt-8 md:pb-0 md:pl-0">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[5px] h-[9px] w-[9px] rounded-full border border-champagne bg-canvas md:-top-[5px] md:left-0"
                />
                <p className="meta text-champagne">
                  0{i + 1} · {step.duration}
                </p>
                <h3 className="mt-2 font-serif text-[1.6rem] leading-tight tracking-[-0.03em] text-ivory md:text-[1.9rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-muted md:text-[16px] md:leading-7">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <ul
          data-reveal
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[rgba(227,218,201,0.12)] pt-6 md:mt-14"
        >
          {assurances.map((item) => (
            <li key={item} className="meta flex items-center gap-2.5 text-ivory/80">
              <span aria-hidden className="h-px w-4 bg-champagne" />
              {item}
            </li>
          ))}
        </ul>

        <BriefCue eyebrow="İlk adım: keşif" line="Projenizi bir dakikada tanımlayın." />
      </SectionReveal>
    </section>
  );
}
