import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteSeo } from "@/data/seo";

describe("sitemap", () => {
  it("generates sitemap entries", () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]?.url).toContain(siteSeo.url);
  });

  it("includes homepage", () => {
    const entries = sitemap();

    expect(entries.some((entry) => entry.url === `${siteSeo.url}/`)).toBe(true);
  });

  it("includes engineering articles", () => {
    const entries = sitemap();

    expect(entries.some((entry) => entry.url.includes("/engineering/release-confidence"))).toBe(
      true
    );
  });
});
