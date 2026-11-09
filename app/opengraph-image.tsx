import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, brandFonts } from "@/lib/brand-image";
import { office } from "@/lib/data";

export const alt =
  "Harmandaoğlu — Antalya’da villa restorasyonu ve kişiye özel mekân mimarisi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heroPromise = readFile(join(process.cwd(), "public/hero-renovasyon.jpg"));

export default async function OpengraphImage() {
  const hero = await heroPromise;
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: brand.canvas,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(8,9,10,0.92) 0%, rgba(8,9,10,0.72) 45%, rgba(8,9,10,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(180deg, rgba(8,9,10,0) 50%, rgba(8,9,10,0.75) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(227,218,201,0.45)",
                fontFamily: "Cormorant",
                fontSize: 26,
                color: brand.champagne,
              }}
            >
              H
            </div>
            <div
              style={{
                fontFamily: "Plex Mono",
                fontSize: 16,
                letterSpacing: 4,
                color: brand.muted,
              }}
            >
              A.Ş · EST. ANTALYA
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Cormorant",
                fontSize: 132,
                lineHeight: 1,
                letterSpacing: -5,
                color: brand.champagne,
              }}
            >
              Harmandaoğlu
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 22,
              }}
            >
              <div style={{ width: 44, height: 1, background: brand.champagne }} />
              <div
                style={{
                  fontFamily: "Plex Mono",
                  fontSize: 17,
                  letterSpacing: 4,
                  color: "rgba(245,244,240,0.78)",
                }}
              >
                {`VİLLA RESTORASYONU · MİMARİ · ${office.coords}`}
              </div>
            </div>
            <div
              style={{
                marginTop: 34,
                maxWidth: 620,
                fontFamily: "Cormorant",
                fontSize: 40,
                lineHeight: 1.15,
                letterSpacing: -1,
                color: brand.ivory,
              }}
            >
              Antalya’da yüksek mimari ve restorasyonun en saf hâli.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
