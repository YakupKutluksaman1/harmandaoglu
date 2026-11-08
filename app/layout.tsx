import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { seo, siteUrl } from "@/lib/site";
import "./globals.css";

const editorial = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: "%s | Harmandaoğlu A.Ş",
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: "Harmandaoğlu A.Ş",
  authors: [{ name: "Onur Kutluksaman" }],
  creator: "Harmandaoğlu A.Ş",
  publisher: "Harmandaoğlu A.Ş",
  category: "home improvement",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  other: {
    "geo.region": "TR-07",
    "geo.placename": "Antalya",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Harmandaoğlu A.Ş",
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/hero-renovasyon.jpg",
        width: 1920,
        height: 1080,
        alt: "Harmandaoğlu A.Ş — Antalya tadilat ve anahtar teslim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/hero-renovasyon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Harmandaoğlu",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08090A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${editorial.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ivory">
        <JsonLd />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
