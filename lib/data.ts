export const navLinks = [
  { href: "/#projeler", label: "Arşiv" },
  { href: "/#donusum", label: "Dönüşüm" },
  { href: "/#surec", label: "Süreç" },
  { href: "/#malzeme", label: "Malzeme" },
  { href: "/#iletisim", label: "Özel Proje" },
] as const;

export const materials = [
  {
    id: "marble",
    title: "Calacatta Borghini",
    origin: "Carrara, İtalya",
    copy: "Doğal damarlı beyaz mermer. Islak hacim, şömine çevresi ve özel tezgâh uygulamalarında seçilir.",
    use: ["Mutfak tezgâhı", "Hamam & spa", "Şömine"],
    tone: "#E8E2D8",
  },
  {
    id: "glass",
    title: "Oluklu Cam",
    origin: "Avrupa üretimi",
    copy: "Dikey oluklu cam; ışığı yumuşatır, mahremiyet verir. Bölücü ve dolap kapaklarında kullanılır.",
    use: ["İç bölücü", "Dolap yüzeyi", "Duş"],
    tone: "#C9D0D4",
  },
  {
    id: "oak",
    title: "Dumanlanmış Meşe",
    origin: "Orta Avrupa",
    copy: "Dumanlanmış meşe; sıcak, mat ve uzun ömürlü zemin / panel dili.",
    use: ["Zemin", "Duvar paneli", "Mobilya"],
    tone: "#5C4636",
  },
  {
    id: "brass",
    title: "Fırçalı Pirinç",
    origin: "Atölye işi",
    copy: "Fırçalı pirinç detay; kapı kolları, aydınlatma ve ince metal işçiliği.",
    use: ["Aydınlatma", "Kulplar", "Çerçeve"],
    tone: "#C5A059",
  },
] as const;

export const projects = [
  {
    title: "Lara Sahil Villası",
    location: "Lara, Antalya",
    area: "420 m²",
    year: "2025",
    type: "Villa Restorasyonu",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90",
    layout: "featured",
  },
  {
    title: "Konyaaltı Minimalist Rezidans",
    location: "Konyaaltı, Antalya",
    area: "280 m²",
    year: "2025",
    type: "Anahtar Teslim",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
    layout: "tall",
  },
  {
    title: "Belek Ufuk Malikânesi",
    location: "Belek, Antalya",
    area: "650 m²",
    year: "2025",
    type: "Villa Restorasyonu",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
    layout: "wide",
  },
] as const;

export const office = {
  name: "Harmandaoğlu A.Ş",
  owner: "Onur KUTLUKSAMAN",
  role: "Yönetim Kurulu Başkanı",
  line1: "Antalya",
  line2: "Anahtar teslim villa · Restorasyon · Mekân mimarisi",
  phone: "5324036446",
  phoneDisplay: "+90 532 403 64 46",
  telHref: "tel:+905324036446",
  whatsappHref: "https://wa.me/905324036446",
  instagramHref: "https://www.instagram.com/harmandaogluas/",
  instagramHandle: "@harmandaogluas",
  email: "info@harmandaoglu.com.tr",
  emailHref: "mailto:info@harmandaoglu.com.tr",
  website: "https://harmandaoglu.com.tr",
  hours: "Pazartesi — Cumartesi · 09:00–18:00",
  coords: "36.8969° N, 30.7133° E",
};

export function whatsappUrl(text?: string) {
  const message =
    text ??
    "Merhaba, HARMANDAOĞLU A.Ş resmi internet sitesi üzerinden ulaşıyorum. Özel proje / keşif için bilgi almak istiyorum.";
  return `${office.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const propertyTypes = [
  { label: "Müstakil Villa", note: "Bahçeli, tek aile" },
  { label: "Rezidans / Daire", note: "Site içi, yüksek kat" },
  { label: "Penthouse", note: "Teras ve çatı katı" },
  { label: "Ticari Mekân", note: "Butik otel, ofis, mağaza" },
] as const;

export const scopeOptions = [
  "Komple restorasyon",
  "Anahtar teslim",
  "İç mimari & dekorasyon",
  "Mutfak",
  "Banyo & spa",
  "Cephe & çatı",
  "Havuz & peyzaj",
  "Aydınlatma",
] as const;

export const regionOptions = [
  "Lara",
  "Konyaaltı",
  "Belek",
  "Kundu",
  "Kemer",
  "Kaş / Kalkan",
  "Antalya dışı",
] as const;

export const styleOptions = [
  "Akdeniz Minimalizmi",
  "Neoklasik",
  "Sıcak Çağdaş",
  "Sizin önerinize açığım",
] as const;

export const timelineOptions = [
  "Hemen",
  "1–3 ay içinde",
  "3–6 ay içinde",
  "Planlama aşamasında",
] as const;

export const budgetOptions = [
  "Görüşmede konuşalım",
  "5–10 M ₺",
  "10–25 M ₺",
  "25 M ₺ +",
] as const;

export const processSteps = [
  {
    title: "Keşif",
    duration: "1. hafta",
    copy: "Yerinde inceleme, ölçüm ve ihtiyaç analizi. Yapının mevcut durumunu birlikte okuruz.",
  },
  {
    title: "Proje",
    duration: "2–4 hafta",
    copy: "Mimari çizimler, malzeme seçkisi, kalem kalem bütçe ve yazılı iş takvimi.",
  },
  {
    title: "Uygulama",
    duration: "Takvime göre",
    copy: "Tek ekip, tek muhatap. Her aşamada fotoğraflı ilerleme paylaşımı.",
  },
  {
    title: "Teslim",
    duration: "Anahtar teslim",
    copy: "Son kontroller, temizlik ve anahtar teslimi; teslim sonrası destek.",
  },
] as const;

export const assurances = [
  "Tek muhatap",
  "Yazılı bütçe ve takvim",
  "Fotoğraflı ilerleme",
] as const;

export const services = [
  {
    id: "01",
    title: "Taahhüt & Tadilat",
    copy: "Mevcut yapının güvenli, düzenli ve uzun ömürlü yenilenmesi.",
    meta: "Taahhüt · Tadilat",
    focus: ["Keşif", "Uygulama", "Teslim"],
  },
  {
    id: "02",
    title: "Anahtar Teslim",
    copy: "Planlama, uygulama ve son detaya kadar tek elden yönetim.",
    meta: "Anahtar Teslim",
    focus: ["Planlama", "Yönetim", "Teslim"],
  },
  {
    id: "03",
    title: "Villa Restorasyonu",
    copy: "Villaların strüktürel yenilenmesi ve kişiye özel mekân mimarisi.",
    meta: "Villa · Restorasyon",
    focus: ["Strüktür", "İç mekân", "Dekorasyon"],
  },
  {
    id: "04",
    title: "Banyo & Mutfak",
    copy: "Islak hacimlerin tesisat, malzeme ve aydınlatma ile baştan kurgulanması.",
    meta: "Banyo · Mutfak",
    focus: ["Tesisat", "Malzeme", "Aydınlatma"],
  },
] as const;
