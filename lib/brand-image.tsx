import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const brand = {
  canvas: "#08090A",
  champagne: "#E3DAC9",
  ivory: "#F5F4F0",
  muted: "#8E8D8A",
};

const fontsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/IBMPlexMono-Regular.ttf")),
]);

export async function brandFonts() {
  const [serif, mono] = await fontsPromise;
  return [
    { name: "Cormorant", data: serif, weight: 500 as const, style: "normal" as const },
    { name: "Plex Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

export function Monogram({ size }: { size: number }) {
  const inset = Math.round(size * 0.14);
  const stroke = Math.max(1, Math.round(size / 110));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.canvas,
        backgroundImage:
          "radial-gradient(circle at 50% 42%, rgba(197,160,89,0.16), rgba(8,9,10,0) 70%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          border: `${stroke}px solid rgba(227,218,201,0.5)`,
        }}
      />
      <div
        style={{
          display: "flex",
          fontFamily: "Cormorant",
          fontSize: Math.round(size * 0.5),
          lineHeight: 1,
          color: brand.champagne,
          marginTop: Math.round(size * -0.04),
        }}
      >
        H
      </div>
    </div>
  );
}
