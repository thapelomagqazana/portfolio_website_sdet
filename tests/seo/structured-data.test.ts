import { describe, expect, it } from "vitest";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structured-data";

describe("structured data", () => {
  it("builds person schema", () => {
    const schema = buildPersonJsonLd();

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Thapelo Magqazana");
  });

  it("builds website schema", () => {
    const schema = buildWebsiteJsonLd();

    expect(schema["@type"]).toBe("WebSite");
  });

  it("builds organization schema", () => {
    const schema = buildOrganizationJsonLd();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("BrikByte Studios");
  });

  it("builds article schema", () => {
    const schema = buildArticleJsonLd({
      headline: "Release Confidence",
      description: "Article description.",
      url: "https://thapelomagqazana.com/engineering/release-confidence",
      publishedAt: "2026-06-18",
      keywords: ["Release Confidence"],
    });

    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe("Release Confidence");
  });

  it("builds breadcrumb schema", () => {
    const schema = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "BrikByteOS", path: "/#brikbyteos" },
    ]);

    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(Array.isArray(schema.itemListElement)).toBe(true);
  });
});
