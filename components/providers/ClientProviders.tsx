"use client";

import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Navbar } from "@/components/nav/Navbar";
import { WhatsAppFloat } from "@/components/nav/WhatsAppFloat";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Atmosphere />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <WhatsAppFloat />
      {children}
    </SmoothScroll>
  );
}
