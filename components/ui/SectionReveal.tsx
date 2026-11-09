"use client";

import { useEffect, useRef } from "react";

export function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node, i) => {
      node.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
    });
    scope.dataset.armed = "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scope.dataset.shown = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(scope);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-scope ${className}`}>
      {children}
    </div>
  );
}
