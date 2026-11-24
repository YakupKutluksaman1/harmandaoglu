import type { ReactNode } from "react";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";

/** Katalog: site ile aynı aileler; PDF’de gövde Manrope 300, başlık Cormorant. */
const catalogSerif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--catalog-serif",
  display: "swap",
});

const catalogSans = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--catalog-sans",
  display: "swap",
});

const catalogMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--catalog-mono",
  display: "swap",
});

export default function CatalogPdfLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${catalogSerif.variable} ${catalogSans.variable} ${catalogMono.variable} catalog-pdf-root min-h-screen`}
    >
      {children}
    </div>
  );
}