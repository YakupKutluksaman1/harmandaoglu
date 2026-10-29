"use client";

export default function Error({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.36em] text-gold uppercase">Hata</p>
      <h1 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">
        Sayfa yüklenemedi.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
        Kısa süreli bir sorun oluştu. Yeniden deneyin veya WhatsApp üzerinden
        bize yazın.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-10 inline-flex h-12 items-center justify-center bg-gold px-8 text-[10px] tracking-[0.24em] text-canvas uppercase"
      >
        Yeniden dene
      </button>
    </main>
  );
}
