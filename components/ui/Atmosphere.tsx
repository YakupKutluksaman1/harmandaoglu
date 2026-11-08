"use client";

import { useEffect, useState } from "react";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";

export function Atmosphere() {
  const coarse = useCoarsePointer();
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (coarse) return;
    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [coarse]);

  return (
    <>
      <div className="grain" aria-hidden />
      {!coarse && (
        <div
          className="cursor-glow"
          aria-hidden
          style={{
            left: pos.x,
            top: pos.y,
            opacity: visible ? 1 : 0,
          }}
        />
      )}
    </>
  );
}
