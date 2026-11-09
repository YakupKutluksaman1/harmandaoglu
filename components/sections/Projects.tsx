"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BriefCue } from "@/components/ui/BriefCue";

type Project = (typeof projects)[number];

const layouts = {
  featured: "min-h-[72vw] sm:min-h-[420px] lg:col-span-8 lg:min-h-[620px]",
  tall: "min-h-[68vw] sm:min-h-[380px] lg:col-span-4 lg:min-h-[620px]",
  wide: "min-h-[62vw] sm:min-h-[340px] lg:col-span-12 lg:min-h-[420px]",
} as const;

function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group absolute inset-0 overflow-hidden text-left"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        sizes="(min-width: 1024px) 70vw, 100vw"
        quality={90}
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-[#08090A]/10" />
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-4 font-serif text-[22vw] leading-none tracking-[-0.06em] text-ivory/[0.05] select-none lg:top-[18%] lg:right-8 lg:text-[5.5vw]"
      >
        {project.area.replace(" m²", "")}
      </p>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="meta text-champagne">{project.type}</p>
          <p className="meta text-muted lg:hidden">0{index + 1}</p>
        </div>
        <h3 className="mt-2.5 max-w-[16ch] font-serif text-[clamp(1.55rem,6.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-ivory sm:mt-3">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px]">
          <span>{project.location}</span>
          <span className="text-champagne">{project.area}</span>
        </div>
      </div>
    </button>
  );
}

function ProjectViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#08090A]/94 md:items-center md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "40%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden border border-[rgba(227,218,201,0.12)] bg-canvas md:h-auto md:max-h-[88vh] md:flex-row md:translate-y-0"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-[max(0.85rem,env(safe-area-inset-top))] right-4 z-10 grid h-11 w-11 place-items-center border border-[rgba(227,218,201,0.28)] bg-canvas/80 text-champagne backdrop-blur-sm"
        >
          ×
        </button>
        <div className="relative h-[42dvh] shrink-0 md:min-h-[560px] md:flex-1">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 55vw, 100vw"
            quality={90}
          />
        </div>
        <div className="flex w-full flex-1 flex-col justify-end overflow-y-auto px-5 py-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-7 md:w-[40%] md:px-10 md:py-12">
          <p className="meta text-champagne">{project.type}</p>
          <h3 className="mt-3 font-serif text-[1.7rem] leading-[1.12] tracking-[-0.03em] text-ivory md:text-4xl">
            {project.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px]">
            <span>{project.location}</span>
            <span className="text-champagne">{project.area}</span>
            <span>{project.year}</span>
          </div>
          <p className="mt-5 text-[15px] leading-[1.65] text-muted md:mt-6 md:text-[16px] md:leading-7">
            {project.location} — {project.area}. Benzer bir proje için bir
            dakikalık özel brifingi doldurun; doğrudan Onur Kutluksaman’a
            iletilsin.
          </p>
          <div className="mt-7">
            <MagneticButton
              href="#iletisim"
              onClick={onClose}
              className="w-full md:w-auto"
            >
              Özel Proje
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projeler" className="section-frame">
      <SectionReveal className="mx-auto max-w-[1440px]">
        <div
          data-reveal
          className="mb-7 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-5"
        >
          <div>
            <p className="meta mb-3 text-champagne md:mb-4">02 — Arşiv</p>
            <h2 className="headline max-w-xl text-[clamp(1.9rem,7vw,4.2rem)] leading-[1.1] text-ivory">
              Seçilmiş işler.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.65] text-muted md:text-[16px] md:leading-7">
            Lara, Konyaaltı ve Belek’ten anahtar teslim villa ve restorasyon
            örnekleri.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-reveal
              className={`relative max-md:-mx-5 max-md:w-[calc(100%+2.5rem)] ${layouts[project.layout]}`}
            >
              <ProjectCard
                project={project}
                index={index}
                onOpen={() => setActive(project)}
              />
            </div>
          ))}
        </div>

        <BriefCue
          eyebrow="Sıradaki proje"
          line="Mekânınızı bir dakikada anlatın."
        />
      </SectionReveal>
      <AnimatePresence>
        {active && (
          <ProjectViewer project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
