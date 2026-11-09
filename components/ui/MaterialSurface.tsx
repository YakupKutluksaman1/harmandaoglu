"use client";

import { useId } from "react";

type SurfaceId = "marble" | "glass" | "oak" | "brass";

function Marble({ uid }: { uid: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <filter id={`${uid}-cloud`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="4" />
          <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.57  0 0 0 0 0.52  0.6 0 0 0 -0.28" />
        </filter>
        <filter id={`${uid}-vein`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.007 0.018" numOctaves="6" seed="11" />
          <feColorMatrix values="0 0 0 0 0.36  0 0 0 0 0.33  0 0 0 0 0.29  -5 0 0 0 1.05" />
        </filter>
        <filter id={`${uid}-hair`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.04" numOctaves="4" seed="27" />
          <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.47  0 0 0 0 0.42  -9 0 0 0 1" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#ECE7DE" />
      <rect width="100%" height="100%" filter={`url(#${uid}-cloud)`} />
      <rect width="100%" height="100%" filter={`url(#${uid}-hair)`} opacity="0.55" />
      <rect width="100%" height="100%" filter={`url(#${uid}-vein)`} />
    </svg>
  );
}

function Oak({ uid }: { uid: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.0025 0.2" numOctaves="4" seed="3" />
          <feColorMatrix values="0 0 0 0 0.14  0 0 0 0 0.09  0 0 0 0 0.05  -4 0 0 0 1.1" />
        </filter>
        <filter id={`${uid}-fibre`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 0.75  0 0 0 0 0.6  0 0 0 0 0.45  0.7 0 0 0 -0.3" />
        </filter>
        <filter id={`${uid}-light`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.06" numOctaves="2" seed="9" result="n" />
          <feColorMatrix in="n" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.31  -1.4 0 0 0 0.85" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#5A4130" />
      <rect width="100%" height="100%" filter={`url(#${uid}-light)`} />
      <rect width="100%" height="100%" filter={`url(#${uid}-fibre)`} opacity="0.5" />
      <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} />
    </svg>
  );
}

function Brass({ uid }: { uid: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#7C5D2C" />
          <stop offset="0.32" stopColor="#D8BC80" />
          <stop offset="0.5" stopColor="#9E7C40" />
          <stop offset="0.72" stopColor="#E6CF98" />
          <stop offset="1" stopColor="#6E5226" />
        </linearGradient>
        <filter id={`${uid}-brush`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0015 0.9" numOctaves="2" seed="2" result="n" />
          <feColorMatrix in="n" values="0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0.55 0 0 0 -0.18" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${uid}-metal)`} />
      <rect
        width="100%"
        height="100%"
        filter={`url(#${uid}-brush)`}
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

function Glass() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#BFC9CC_0%,#6B7980_48%,#1E2528_100%)]">
      <div className="absolute top-[18%] left-[22%] h-[55%] w-[38%] rounded-full bg-[#E3DAC9]/60 blur-2xl" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0)_0px,rgba(255,255,255,0.32)_3px,rgba(255,255,255,0.06)_7px,rgba(0,0,0,0.3)_12px,rgba(255,255,255,0)_13px)]" />
    </div>
  );
}

export function MaterialSurface({
  id,
  active = false,
  className = "",
}: {
  id: SurfaceId;
  active?: boolean;
  className?: string;
}) {
  const uid = `ms${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {id === "marble" && <Marble uid={uid} />}
      {id === "oak" && <Oak uid={uid} />}
      {id === "brass" && <Brass uid={uid} />}
      {id === "glass" && <Glass />}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,9,10,0.38)_100%)]" />
      <span key={String(active)} className="surface-sheen" data-on={active} />
    </div>
  );
}
