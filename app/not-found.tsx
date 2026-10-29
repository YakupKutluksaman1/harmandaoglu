import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.36em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-serif text-4xl text-ivory md:text-6xl">
        Sayfa bulunamadı.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
        Aradığınız adres Harmandaoğlu A.Ş sitesinde yok. Ana sayfadan hizmetlere
        ve keşif randevusuna dönebilirsiniz.
      </p>
      <a
        href="/"
        className="mt-10 inline-flex h-12 items-center justify-center bg-gold px-8 text-[10px] tracking-[0.24em] text-canvas uppercase"
      >
        Ana sayfa
      </a>
    </main>
  );
}
