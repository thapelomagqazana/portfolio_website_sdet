import { describe, expect, it } from "vitest";
import { coreSeoKeywords, siteSeo } from "@/data/seo";
import {
  buildArticleMetadata,
  buildCanonicalUrl,
  buildOpenGraph,
  buildPageMetadata,
  buildTwitterCard,
} from "@/lib/seo";

describe("SEO metadata builders", () => {
  it("builds canonical URLs", () => {
    expect(buildCanonicalUrl("/projects")).toBe(`${siteSeo.url}/projects`);
    expect(buildCanonicalUrl("projects")).toBe(`${siteSeo.url}/projects`);
  });

  it("builds page metadata", () => {
    const metadata = buildPageMetadata({
      title: "Projects",
      description: "Engineering projects.",
      path: "/projects",
    });

    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBe("Engineering projects.");
    expect(metadata.alternates?.canonical).toBe(`${siteSeo.url}/projects`);
  });

  it("builds OpenGraph metadata", () => {
    const openGraph = buildOpenGraph({ title: "Test", description: "Description", path: "/" });

    expect(openGraph?.title).toBe("Test");
    expect(openGraph?.siteName).toBe(siteSeo.siteName);
  });

  it("builds article metadata", () => {
    const metadata = buildArticleMetadata({
      title: "Release Confidence",
      description: "Article description",
      path: "/engineering/release-confidence",
      publishedTime: "2026-06-18",
      keywords: ["Release Confidence"],
    });

    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
  });

  it("keeps core keywords available", () => {
    expect(coreSeoKeywords).toContain("Software Development Engineer in Test");
    expect(coreSeoKeywords.length).toBeGreaterThan(5);
  });
});
