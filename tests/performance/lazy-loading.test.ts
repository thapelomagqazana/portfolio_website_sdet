import { describe, expect, it } from "vitest";
import { deferredSectionIds, criticalSectionIds } from "@/lib/performance";

describe("lazy loading strategy", () => {
  it("keeps hero and mission critical", () => {
    expect(criticalSectionIds).toContain("hero");
    expect(criticalSectionIds).toContain("mission");
  });

  it("defers expensive below-the-fold sections", () => {
    expect(deferredSectionIds).toContain("skills");
    expect(deferredSectionIds).toContain("brikbyteos");
    expect(deferredSectionIds).toContain("engineering-intelligence");
    expect(deferredSectionIds).toContain("contact");
    expect(deferredSectionIds).toContain("footer");
  });
});
