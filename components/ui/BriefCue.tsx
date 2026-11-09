export function BriefCue({ eyebrow, line }: { eyebrow: string; line: string }) {
  return (
    <a
      href="/#iletisim"
      data-reveal
      className="group mt-8 flex items-center justify-between gap-5 border-y border-[rgba(227,218,201,0.12)] py-5 md:mt-10 md:py-6"
    >
      <div className="min-w-0">
        <p className="meta text-champagne/80">{eyebrow}</p>
        <p className="mt-2 font-serif text-[1.35rem] leading-[1.2] tracking-[-0.02em] text-ivory md:text-[1.9rem]">
          {line}
        </p>
        <p className="meta mt-2 text-muted">Özel Proje · ~1 dk</p>
      </div>
      <span className="cue-orb relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-champagne/50 text-champagne transition-colors duration-500 group-hover:bg-champagne group-hover:text-canvas md:h-14 md:w-14">
        <span className="cue-arrow" aria-hidden>
          →
        </span>
      </span>
    </a>
  );
}
