/**
 * Harmandaoğlu kurumsal katalog — tek kaynak (PDF + web görüntüleyici).
 * Gerçek proje fotoğrafları geldiğinde `image.src` alanlarını güncelleyin;
 * placeholder: true olanlar stok / geçici görsellerdir.
 */

import { materials, office, processSteps, services } from "@/lib/data";

export const catalogMeta = {
  title: "Harmandaoğlu · Hizmetler ve Süreç",
  subtitle: "Antalya · Anahtar teslim · Villa restorasyonu · Mekân mimarisi",
  edition: "2026 · Birinci baskı",
  version: "1.0.0",
  locale: "tr-TR",
  pdfFilename: "harmandaoglu-katalog-2026.pdf",
} as const;

/** Statik dosyalar `public/media/katalog/` — `/katalog` sayfa rotasını engellememesi için */
export const catalogAssetBase = "/media/katalog" as const;
export const catalogPdfHref =
  `${catalogAssetBase}/${catalogMeta.pdfFilename}` as const;

export type CatalogSpreadLayout =
  | "cover"
  | "brand-gate"
  | "editorial"
  | "scope-combined"
  | "materials-process"
  | "regions-assurance"
  | "projects-mosaic"
  | "closing";

export type CatalogImage = {
  src?: string;
  alt: string;
  caption?: string;
  /** Gerçek şantiye / teslim fotoğrafı ile değiştirilecek */
  placeholder?: boolean;
};

export type CatalogSpread = {
  id: string;
  layout: CatalogSpreadLayout;
  label?: string;
  headline: string;
  subhead?: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: CatalogImage;
  /** layout-specific */
  items?: readonly {
    title: string;
    copy: string;
    meta?: string;
    image?: CatalogImage;
  }[];
  processItems?: readonly {
    title: string;
    copy: string;
    meta?: string;
  }[];
};

export const catalogSpreads: CatalogSpread[] = [
  {
    id: "gate",
    layout: "brand-gate",
    headline: office.name,
    image: {
      src: `${catalogAssetBase}/katalog-kapak.jpg`,
      alt: "Antalya sahil hattı villa restorasyonu — kapak",
      caption: "Referans görsel · 2026 katalog",
    },
  },
  {
    id: "manifesto",
    layout: "scope-combined",
    label: "01 · Kimlik",
    headline: "Yapıdan yaşama, tek elden.",
    subhead: "Quiet luxury · ölçülü lüks, kalıcı malzeme, net süreç.",
    items: [
      {
        meta: "Yaklaşım",
        title: "Tek muhatap",
        copy: "Konut ve villa ölçeğinde taahhüt, tadilat ve restorasyon; keşiften anahtar teslimine kadar tek çizgi.",
      },
      {
        meta: "Keşif",
        title: "Yapının gerçeği",
        copy: "Taşıyıcı sistem, nem, güneş ve kullanım alışkanlığı — önce okunur, sonra tasarım kurulur.",
      },
      {
        meta: "Birleşim",
        title: "Malzeme ve detay",
        copy: "Malzeme dili, aydınlatma ve ustalık aynı çizgide; gösterişten çok tutarlılık.",
      },
      {
        meta: "Hedef",
        title: "Kalıcı mekân",
        copy: "Yıllarca yaşanacak, bakımı kolay ve değerini koruyan iç-dış mekânlar.",
      },
    ],
    bullets: [
      "Antalya ve çevresi · villa ölçeği",
      "Taahhüt disiplinli tadilat",
      "Anahtar teslim koordinasyon",
      "Numune ve malzeme onayı",
      "Yazılı iş programı",
      "Teslim sonrası destek",
    ],
    paragraphs: [
      "Kimlik, her projede aynı ölçülerle sürdürülür; sözle değil, saha ve teslim ile doğrulanır.",
    ],
    image: {
      src: `${catalogAssetBase}/katalog-atolye.jpg`,
      alt: "Ustalık detayı — pirinç ve ahşap",
      caption: "Malzeme · detay işçiliği",
    },
  },
  {
    id: "scope",
    layout: "scope-combined",
    label: "02 · Kapsam",
    headline: "Hizmetler ve iş kapsamı",
    subhead: "Dört ana hat · yazılı program · tek muhatap.",
    items: services.map((s) => ({
      title: s.title,
      copy: s.copy,
      meta: s.meta,
    })),
    bullets: [
      "Komple villa ve rezidans restorasyonu",
      "Anahtar teslim iç ve dış mekân",
      "Mutfak · banyo · spa",
      "Cephe · çatı · havuz koordinasyonu",
      "İç mimari ve özel mobilya",
      "Taahhüt disiplinli tadilat",
    ],
    paragraphs: [
      "Kapsam proje bazında yazılı iş programına bağlanır; şeffaf ilerleme tercih edilir.",
    ],
    image: {
      src: `${catalogAssetBase}/katalog-kapsam.jpg`,
      alt: "Villa yenileme sahası",
      caption: "Taahhüt · uygulama",
    },
  },
  {
    id: "materials-process",
    layout: "materials-process",
    label: "03 · Malzeme · Süreç",
    headline: "Malzeme paleti ve çalışma adımları",
    subhead: "Numune onayı · yazılı bütçe · fotoğraflı ilerleme",
    items: materials.map((m) => ({
      title: m.title,
      copy: m.copy,
      meta: m.origin,
    })),
    processItems: processSteps.map((step) => ({
      title: step.title,
      copy: step.copy,
      meta: step.duration,
    })),
    paragraphs: [
      "Malzeme örnekleri referans paletidir; her projede yerinde onay ile kesinleşir.",
    ],
    image: {
      src: `${catalogAssetBase}/katalog-malzeme.jpg`,
      alt: "Malzeme numunesi ve doku",
      caption: "Numune · yerinde onay",
    },
  },
  {
    id: "regions-assurance",
    layout: "regions-assurance",
    label: "04 · Bölge",
    headline: "Antalya sahası ve çalışma prensipleri",
    subhead: "Lara · Belek · Konyaaltı öncelikli",
    bullets: [
      "Lara · Kundu · Konyaaltı · Muratpaşa",
      "Belek · Kemer · Kaş / Kalkan",
      "Mülk: villa, penthouse, rezidans, ticari",
      "Tek muhatap · yazılı bütçe",
      "Fotoğraflı ilerleme · malzeme onayı",
      "Teslim sonrası ilk ay destek",
    ],
    paragraphs: ["KVKK: harmandaoglu.com.tr/kvkk"],
    image: {
      src: `${catalogAssetBase}/katalog-antalya.jpg`,
      alt: "Antalya sahil hattı",
      caption: "Lara · Belek · Konyaaltı",
    },
  },
  {
    id: "closing",
    layout: "closing",
    label: "05 · İletişim",
    headline: "Özel proje brifingi",
    subhead: "Önce / sonra hikâyesi · tek muhatap · ~1 dk",
    paragraphs: [
      "Dönüşüm, güvenin en net anlatımıdır — sitemizde kaydırıcı ile de okunur.",
      office.name,
      `${office.owner} · ${office.role}`,
      office.phoneDisplay,
      office.email,
      office.instagramHandle,
      office.website,
      office.hours,
    ],
    bullets: [
      "harmandaoglu.com.tr → Özel Proje → WhatsApp’ta hazır mesaj",
      "Yerinde keşif: Lara, Belek, Konyaaltı öncelikli",
    ],
    image: {
      src: `${catalogAssetBase}/katalog-donusum-wide.jpg`,
      alt: "Önce ve sonra — mekân dönüşümü",
      caption: "Ham yapıdan yaşam alanına",
    },
  },
];

/** Basım / PDF için önerilen format (mm) */
export const catalogPrintSpec = {
  spread: "A4 yatay çift sayfa (297×210) veya 16:9 dijital ekran",
  bleed: "3 mm",
  colors: "Obsidyen zemin #0a0a0b · Şampanya #C5A059 · Fildişi metin #E8E4DC",
  type: "Cormorant Garamond başlık · IBM Plex Mono meta",
  photoSlots: catalogSpreads.filter(
    (s) => s.image || s.layout === "projects-mosaic",
  ).length,
} as const;