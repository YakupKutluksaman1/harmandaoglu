"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { catalogMeta, catalogPdfHref } from "@/lib/catalog";

export function CatalogDownloadActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <MagneticButton
        href={catalogPdfHref}
        download={catalogMeta.pdfFilename}
        variant="solid"
        className="w-full sm:w-auto"
      >
        PDF indir (hazır dosya)
      </MagneticButton>
      <MagneticButton
        href={catalogPdfHref}
        variant="outline"
        external
        className="w-full sm:w-auto"
      >
        PDF’i tarayıcıda aç
      </MagneticButton>
      <a
        href="/"
        className="meta inline-flex min-h-12 w-full items-center justify-center text-muted transition-colors hover:text-champagne sm:w-auto sm:justify-start"
      >
        Ana sayfa →
      </a>
    </div>
  );
}