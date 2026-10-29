"use client";

import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { MobileDock } from "@/components/nav/MobileDock";
import { WhatsAppFloat } from "@/components/nav/WhatsAppFloat";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <MobileDock />
      <WhatsAppFloat />
      {children}
    </SmoothScroll>
  );
}
