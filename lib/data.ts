export const navLinks = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#donusum", label: "Dönüşüm" },
  { href: "#projeler", label: "Projeler" },
  { href: "#iletisim", label: "İletişim" },
] as const;

export const services = [
  {
    id: "01",
    title: "Taahhüt & Tadilat",
    copy: "Mevcut yapının güvenli, düzenli ve uzun ömürlü yenilenmesi. Keşiften teslime tek ekip, tek standart — Antalya’da taahhüt ve tadilat işleri.",
    meta: "Taahhüt · Tadilat",
    focus: ["Keşif", "Uygulama", "Teslim"],
  },
  {
    id: "02",
    title: "Anahtar Teslim",
    copy: "Planlama, uygulama ve son detaya kadar tek elden yönetim. Teslim günü yaşamaya hazır mekânlar.",
    meta: "Anahtar Teslim",
    focus: ["Planlama", "Yönetim", "Teslim"],
  },
  {
    id: "03",
    title: "Banyo & Mutfak",
    copy: "Islak hacimlerin sıhhi tesisat, seramik, tezgâh ve aydınlatma ile baştan kurgulanması. Kullanışlı, temiz ve kalıcı çözümler.",
    meta: "Banyo · Mutfak",
    focus: ["Tesisat", "Seramik", "Aydınlatma"],
  },
  {
    id: "04",
    title: "Villa & Dekorasyon",
    copy: "Villaların strüktürel yenilenmesi ve kişiye özel dekorasyon. Antalya’nın ışığına ve yaşam ritmine uygun iç mekânlar.",
    meta: "Villa · Dekorasyon",
    focus: ["Strüktür", "İç mekân", "Dekorasyon"],
  },
] as const;

export const projects = [
  {
    title: "Lara Villa Restorasyonu",
    location: "Lara, Antalya",
    area: "420 m²",
    year: "2025",
    type: "Villa Restorasyonu",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90",
    span: "lg:col-span-7 lg:row-span-2 min-h-[320px] lg:min-h-[640px]",
  },
  {
    title: "Konyaaltı Mutfak",
    location: "Konyaaltı, Antalya",
    area: "38 m²",
    year: "2025",
    type: "Mutfak Yenileme",
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2000&q=90",
    span: "lg:col-span-5 min-h-[280px] lg:min-h-[320px]",
  },
  {
    title: "Muratpaşa Banyo",
    location: "Muratpaşa, Antalya",
    area: "14 m²",
    year: "2024",
    type: "Banyo Yenileme",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=90",
    span: "lg:col-span-5 min-h-[280px] lg:min-h-[320px]",
  },
  {
    title: "Belek Anahtar Teslim",
    location: "Belek, Antalya",
    area: "280 m²",
    year: "2025",
    type: "Anahtar Teslim",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
    span: "lg:col-span-7 min-h-[300px] lg:min-h-[380px]",
  },
] as const;

export const office = {
  name: "Harmandaoğlu A.Ş",
  owner: "Onur KUTLUKSAMAN",
  role: "Yönetim Kurulu Başkanı",
  line1: "Antalya",
  line2: "Taahhüt · Tadilat · Anahtar Teslim",
  phone: "5324036446",
  phoneDisplay: "+90 532 403 64 46",
  telHref: "tel:+905324036446",
  whatsappHref: "https://wa.me/905324036446",
  instagramHref: "https://www.instagram.com/harmandaogluas/",
  instagramHandle: "@harmandaogluas",
  email: "info@harmandaoglu.com",
  emailHref: "mailto:info@harmandaoglu.com",
  website: "https://harmandaoglu.com.tr",
  hours: "Pazartesi — Cumartesi · 09:00–18:00",
};

export function whatsappUrl(text?: string) {
  const message =
    text ??
    "Merhaba, HARMANDAOĞLU A.Ş resmi internet sitesi üzerinden ulaşıyorum. Tadilat / anahtar teslim projem için ücretsiz keşif ve bilgi almak istiyorum.";
  return `${office.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const marqueeItems = [
  "TAAHHÜT",
  "TADİLAT",
  "ANAHTAR TESLİM",
  "BANYO",
  "MUTFAK",
  "VİLLA",
  "RESTORASYON",
  "DEKORASYON",
] as const;
