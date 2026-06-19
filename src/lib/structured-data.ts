import { siteSeo } from "@/data/seo";

export type JsonLd = Record<string, unknown>;

export function buildPersonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteSeo.author,
    jobTitle: "Software Development Engineer in Test",
    url: siteSeo.url,
    image: new URL(siteSeo.previewImage, siteSeo.url).toString(),
    address: {
      "@type": "PostalAddress",
      addressCountry: siteSeo.region,
    },
    sameAs: [
      "https://github.com/BrikByte-Studios",
      "https://www.linkedin.com/in/thapelo-magqazana",
    ],
    knowsAbout: [
      "Quality Engineering",
      "Test Automation",
      "Release Engineering",
      "Release Confidence",
      "BrikByteOS",
      "Software Testing",
    ],
  };
}

export function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSeo.siteName,
    url: siteSeo.url,
    inLanguage: siteSeo.language,
    author: {
      "@type": "Person",
      name: siteSeo.author,
      url: siteSeo.url,
    },
  };
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSeo.publisher,
    url: siteSeo.url,
    founder: {
      "@type": "Person",
      name: siteSeo.author,
    },
  };
}

export function buildArticleJsonLd(input: {
  readonly headline: string;
  readonly description: string;
  readonly url: string;
  readonly publishedAt: string;
  readonly keywords: readonly string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: {
      "@type": "Person",
      name: siteSeo.author,
      url: siteSeo.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteSeo.publisher,
    },
    keywords: [...input.keywords],
  };
}

export function buildBreadcrumbJsonLd(
  items: readonly {
    readonly name: string;
    readonly path: string;
  }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteSeo.url).toString(),
    })),
  };
}
