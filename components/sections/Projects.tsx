"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";

type Project = (typeof projects)[number];

function TiltCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const coarse = useCoarsePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 18 });

  return (
    <motion.button
      type="button"
      ref={ref}
      data-reveal
      onClick={onOpen}
      style={coarse ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        if (coarse) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`group relative overflow-hidden text-left max-md:-mx-5 max-md:w-[calc(100%+2.5rem)] ${
        featured ? "max-md:aspect-[4/5]" : "max-md:aspect-[16/10]"
      } ${project.span}`}
    >
      <div className="absolute inset-0 bg-surface" />
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(min-width: 1280px) 60vw, 100vw"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B131F] via-[#0B131F]/28 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="text-[10px] tracking-[0.3em] text-gold uppercase">{project.type}</p>
        <h3 className="mt-2 font-serif text-[1.85rem] leading-tight text-ivory md:text-4xl">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.16em] text-muted uppercase md:mt-4 md:gap-x-6 md:text-[11px] md:tracking-[0.18em]">
          <span>{project.location}</span>
          <span className="text-gold">{project.area}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <span className="pointer-events-none absolute top-5 right-5 border border-gold/40 bg-canvas/55 px-2.5 py-1 text-[9px] tracking-[0.22em] text-gold uppercase opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
        İncele
      </span>
    </motion.button>
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
      aria-labelledby="project-viewer-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0B131F]/92 p-0 md:items-center md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[92dvh] w-full max-w-5xl flex-col overflow-hidden border border-gold/20 bg-canvas md:h-auto md:max-h-[88vh] md:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center border border-gold/40 bg-canvas/80 text-gold"
        >
          ×
        </button>
        <div className="relative min-h-[42%] flex-1 md:min-h-[560px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 55vw, 100vw"
            quality={90}
          />
        </div>
        <div className="flex w-full flex-col justify-end px-6 py-7 md:w-[42%] md:px-10 md:py-12">
          <p className="text-[10px] tracking-[0.3em] text-gold uppercase">{project.type}</p>
          <h3
            id="project-viewer-title"
            className="mt-3 font-serif text-[1.85rem] leading-tight text-ivory md:text-4xl"
          >
            {project.title}
          </h3>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.18em] text-muted uppercase">
            <span>{project.location}</span>
            <span className="text-gold">{project.area}</span>
            <span>{project.year}</span>
          </div>
          <p className="mt-6 text-[15px] leading-7 text-muted md:text-sm">
            {project.type} işi — {project.location}. Keşif ve anahtar teslim süreçleri için ofisle
            yazışın.
          </p>
          <div className="mt-8">
            <MagneticButton href="#iletisim" onClick={onClose} className="w-full sm:w-auto">
              Randevu Talep Et
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
          className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end md:gap-6"
        >
          <div>
            <p className="mb-3 text-[10px] tracking-[0.32em] text-gold uppercase md:text-[11px] md:tracking-[0.36em]">
              04 — Portföy
            </p>
            <h2 className="font-serif text-[2rem] leading-[1.12] text-ivory md:text-6xl">
              Antalya’dan seçilmiş işler.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-muted md:text-sm">
            Villa restorasyonu, anahtar teslim ve ıslak hacim yenilemelerinden örnekler.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
          {projects.map((project, index) => (
            <TiltCard
              key={project.title}
              project={project}
              featured={index === 0}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>
      </SectionReveal>
      <AnimatePresence>
        {active && <ProjectViewer project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
