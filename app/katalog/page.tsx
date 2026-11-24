import type { Metadata } from "next";
import Image from "next/image";
import { CatalogDownloadActions } from "@/components/catalog/CatalogDownloadActions";
import { Footer } from "@/components/sections/Footer";
import {
  catalogAssetBase,
  catalogMeta,
  catalogPdfHref,
  catalogSpreads,
} from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Harmandaoğlu A.Ş kurumsal katalog: kimlik, hizmetler, malzeme, süreç ve iletişim. PDF olarak indirin veya tarayıcıda açın.",
  alternates: { canonical: "/katalog" },
  openGraph: {
    title: "Harmandaoğlu · Katalog",
    description: catalogMeta.subtitle,
    url: `${siteUrl}/katalog`,
    images: [{ url: `${siteUrl}${catalogAssetBase}/katalog-kapak.jpg` }],
  },
};

export default function KatalogPage() {
  const pageCount = catalogSpreads.length;

  return (
    <main className="relative">
      <article className="section-frame">
        <div className="mx-auto max-w-[1440px] pt-[calc(2.5rem+env(safe-area-inset-top))] md:pt-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <div className="min-w-0">
              <p className="meta mb-3 text-champagne md:mb-4">Kurumsal · PDF</p>
              <h1 className="headline text-[clamp(1.9rem,7vw,3.25rem)] leading-[1.08] text-ivory">
                {catalogMeta.title}
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-muted md:text-[16px]">
                {catalogMeta.subtitle}
              </p>
              <p className="meta mt-4 text-muted">
                {catalogMeta.edition} · {pageCount} sayfa · A4 yatay
              </p>

              <div className="mt-8 md:mt-10">
                <CatalogDownloadActions />
              </div>

              <p className="mt-6 max-w-md text-[13px] leading-[1.6] text-muted">
                <span className="text-ivory/90">PDF indir</span> hazır,
                tasarlanmış dosyayı verir.{" "}
                <span className="text-champagne/90">/katalog/pdf</span> yalnızca
                geliştirici önizlemesidir; oradan yazdırmayın — düzen bozulur.
              </p>

              <p className="meta mt-4 break-all text-muted/80">{catalogPdfHref}</p>
            </div>

            <div className="relative min-h-[280px] overflow-hidden border border-[rgba(227,218,201,0.12)] bg-surface sm:min-h-[360px] lg:min-h-[420px]">
              <Image
                src={`${catalogAssetBase}/katalog-kapak.jpg`}
                alt="Harmandaoğlu katalog kapak önizlemesi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(8,9,10,0.85)_100%)]" />
              <p className="meta absolute right-4 bottom-4 left-4 text-champagne/90">
                Hizmetler · Süreç · İletişim
              </p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}