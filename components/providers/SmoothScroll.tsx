"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Mobilde yerel kaydırma daha akıcı; Lenis sadece masaüstünde
    if (coarse) {
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const lenis = new Lenis({
      duration: 0.72,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
