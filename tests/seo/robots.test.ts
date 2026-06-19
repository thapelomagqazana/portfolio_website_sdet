import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { siteSeo } from "@/data/seo";

describe("robots", () => {
  it("allows crawlers", () => {
    const result = robots();

    expect(result.rules).toEqual({
      userAgent: "*",
      allow: "/",
    });
  });

  it("defines sitemap", () => {
    const result = robots();

    expect(result.sitemap).toBe(`${siteSeo.url}/sitemap.xml`);
  });

  it("defines host", () => {
    const result = robots();

    expect(result.host).toBe(siteSeo.url);
  });
});
