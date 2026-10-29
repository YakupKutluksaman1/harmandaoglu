import type { MetadataRoute } from "next";
import { seo } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harmandaoğlu A.Ş",
    short_name: "Harmandaoğlu",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B131F",
    theme_color: "#0B131F",
    lang: "tr",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
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
