import type { MetadataRoute } from "next";
import { GALLERY_ITEMS } from "@/lib/gallery-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.shadowreveal.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const galleryRoutes: MetadataRoute.Sitemap = GALLERY_ITEMS.map((item) => ({
    url: `${BASE_URL}/gallery/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...galleryRoutes];
}
