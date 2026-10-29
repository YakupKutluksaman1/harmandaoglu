import { office, services, whatsappUrl } from "@/lib/data";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://harmandaoglu.com.tr"
).replace(/\/$/, "");

export const seo = {
  title: "Harmandaoğlu A.Ş | Antalya Tadilat, Anahtar Teslim ve Villa Restorasyonu",
  description:
    "Harmandaoğlu A.Ş, Antalya’da taahhüt ve tadilat, anahtar teslim proje, banyo & mutfak yenileme, villa restorasyonu ve özel dekorasyon hizmeti verir. Keşif için WhatsApp üzerinden ulaşın.",
  keywords: [
    "Harmandaoğlu A.Ş",
    "Onur Kutluksaman",
    "Antalya tadilat",
    "Antalya anahtar teslim",
    "Antalya banyo yenileme",
    "Antalya mutfak yenileme",
    "Antalya villa restorasyonu",
    "Antalya iç dekorasyon",
    "Lara tadilat",
    "Konyaaltı tadilat",
  ],
};

const phone = office.telHref.replace("tel:", "");

export function businessJsonLd() {
  const orgId = `${siteUrl}/#isletme`;
  const personId = `${siteUrl}/#onur-kutluksaman`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": orgId,
        name: office.name,
        legalName: office.name,
        url: siteUrl,
        image: `${siteUrl}/hero-renovasyon.jpg`,
        logo: `${siteUrl}/hero-renovasyon.jpg`,
        description: seo.description,
        telephone: phone,
        email: office.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antalya",
          addressRegion: "Antalya",
          addressCountry: "TR",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Antalya" },
          { "@type": "Place", name: "Lara" },
          { "@type": "Place", name: "Konyaaltı" },
          { "@type": "Place", name: "Muratpaşa" },
          { "@type": "Place", name: "Belek" },
        ],
        founder: { "@id": personId },
        employee: { "@id": personId },
        sameAs: [office.instagramHref],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        priceRange: "$$",
        knowsAbout: services.map((service) => service.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Hizmetler",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.copy,
              areaServed: "Antalya",
              provider: { "@id": orgId },
            },
            position: index + 1,
          })),
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: phone,
          email: office.email,
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: ["Turkish"],
        },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "WhatsApp ile keşif talebi",
          target: whatsappUrl(),
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Onur Kutluksaman",
        jobTitle: office.role,
        worksFor: { "@id": orgId },
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antalya",
          addressCountry: "TR",
        },
        sameAs: [office.instagramHref],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: office.name,
        inLanguage: "tr-TR",
        description: seo.description,
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function buildLlmsTxt() {
  return `# Harmandaoğlu A.Ş

> Antalya merkezli taahhüt, tadilat ve anahtar teslim yenileme firması.

- Unvan: ${office.name}
- Konum: Antalya, Türkiye
- Yönetim Kurulu Başkanı: Onur Kutluksaman
- Telefon / WhatsApp: ${office.phoneDisplay}
- E-posta: ${office.email}
- Instagram: ${office.instagramHref}
- Web sitesi: ${office.website}
- Çalışma saatleri: Pazartesi–Cumartesi, 09:00–18:00

## Hizmetler

${services
  .map((service, index) => `${index + 1}. ${service.title} — ${service.copy}`)
  .join("\n")}

Hizmet verilen başlıca bölgeler: Antalya, Lara, Konyaaltı, Muratpaşa, Belek.

İletişim tercihi WhatsApp üzerinden ücretsiz keşif ve bilgi talebidir.

## Kısa özet

Harmandaoğlu A.Ş, Antalya’da konut ve villa tadilatı, anahtar teslim proje, banyo ve mutfak yenileme ile özel dekorasyon işleri yapan bir inşaat ve yenileme şirketidir. Firma sahibi Onur Kutluksaman’dır.
`;
}
