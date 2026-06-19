import type { MetadataRoute } from "next";
import { seoRoutes, siteSeo } from "@/data/seo";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = seoRoutes.map((route) => ({
    url: new URL(route.path, siteSeo.url).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleRoutes = getAllArticles().map((article) => ({
    url: new URL(`/engineering/${article.slug}`, siteSeo.url).toString(),
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
