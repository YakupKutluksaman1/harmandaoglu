import { ImageResponse } from "next/og";
import { Monogram, brandFonts } from "@/lib/brand-image";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<Monogram size={512} />, {
    width: 512,
    height: 512,
    fonts: await brandFonts(),
  });
}
