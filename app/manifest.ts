import type { MetadataRoute } from "next";
import { seo } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harmandaoğlu A.Ş",
    short_name: "Harmandaoğlu",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#08090A",
    theme_color: "#08090A",
    lang: "tr",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
