import type { Metadata } from "next";
import { coreSeoKeywords, siteSeo } from "@/data/seo";

export type SeoMetadataInput = {
  readonly title?: string;
  readonly description?: string;
  readonly path?: string;
  readonly image?: string;
  readonly keywords?: readonly string[];
  readonly type?: "website" | "article";
  readonly publishedTime?: string;
};

export function buildCanonicalUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteSeo.url).toString();
}

export function buildOpenGraph(input: SeoMetadataInput = {}): Metadata["openGraph"] {
  const title = input.title ?? siteSeo.title;
  const description = input.description ?? siteSeo.description;
  const image = input.image ?? siteSeo.previewImage;

  return {
    title,
    description,
    url: buildCanonicalUrl(input.path),
    siteName: siteSeo.siteName,
    locale: siteSeo.locale,
    type: input.type ?? "website",
    publishedTime: input.publishedTime,
    images: [
      {
        url: new URL(image, siteSeo.url).toString(),
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function buildTwitterCard(input: SeoMetadataInput = {}): Metadata["twitter"] {
  const title = input.title ?? siteSeo.title;
  const description = input.description ?? siteSeo.description;
  const image = input.image ?? siteSeo.previewImage;

  return {
    card: "summary_large_image",
    title,
    description,
    creator: siteSeo.twitterHandle,
    site: siteSeo.twitterHandle,
    images: [new URL(image, siteSeo.url).toString()],
  };
}

export function buildPageMetadata(input: SeoMetadataInput = {}): Metadata {
  const title = input.title ?? siteSeo.title;
  const description = input.description ?? siteSeo.description;
  const keywords = [...new Set([...(input.keywords ?? []), ...coreSeoKeywords])];

  return {
    metadataBase: new URL(siteSeo.url),
    title: {
      default: siteSeo.title,
      template: siteSeo.titleTemplate,
      absolute: title,
    },
    description,
    keywords,
    authors: [{ name: siteSeo.author, url: siteSeo.url }],
    creator: siteSeo.creator,
    publisher: siteSeo.publisher,
    alternates: {
      canonical: buildCanonicalUrl(input.path),
    },
    openGraph: buildOpenGraph(input),
    twitter: buildTwitterCard(input),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
  };
}

export function buildArticleMetadata(input: {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly publishedTime?: string;
  readonly keywords?: readonly string[];
  readonly image?: string;
}): Metadata {
  return buildPageMetadata({
    ...input,
    type: "article",
  });
}

export function buildProjectMetadata(input: {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly keywords?: readonly string[];
  readonly image?: string;
}): Metadata {
  return buildPageMetadata({
    ...input,
    keywords: ["Projects", "Engineering Portfolio", "Software Projects", ...(input.keywords ?? [])],
  });
}
