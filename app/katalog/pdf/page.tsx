import type { Metadata } from "next";
import { CatalogSpreadPage } from "@/components/catalog/CatalogSpreadPage";
import { catalogMeta, catalogSpreads } from "@/lib/catalog";
import "./catalog-pdf.css";

export const metadata: Metadata = {
  title: "Katalog — PDF önizleme",
  robots: { index: false, follow: false },
};

export default async function CatalogPdfPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ export?: string }>;
}) {
  const total = catalogSpreads.length;
  const { export: exportMode } = await searchParams;
  const isExport = exportMode === "1";

  return (
    <main className={`catalog-doc ${isExport ? "catalog-doc--export" : "catalog-doc--preview"}`}>
      {!isExport ? (
        <p className="catalog-doc-banner">
          Geliştirici önizlemesi · {catalogMeta.edition}. Müşteri PDF’i için sitedeki{" "}
          <strong>PDF indir</strong> düğmesini kullanın; buradan yazdırmayın.
        </p>
      ) : null}
      {catalogSpreads.map((spread, index) => (
        <CatalogSpreadPage
          key={spread.id}
          spread={spread}
          page={index + 1}
          total={total}
        />
      ))}
    </main>
  );
}