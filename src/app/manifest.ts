import type { MetadataRoute } from "next";
import { siteSeo } from "@/data/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSeo.title,
    short_name: "Thapelo SDET",
    description: siteSeo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b14",
    theme_color: siteSeo.themeColor,
    lang: siteSeo.language,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
