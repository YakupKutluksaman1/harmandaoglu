import { ImageResponse } from "next/og";
import { Monogram, brandFonts } from "@/lib/brand-image";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram size={size.width} />, {
    ...size,
    fonts: await brandFonts(),
  });
}
