import { describe, expect, it } from "vitest";
import {
  getImagePriority,
  imageHasValidDimensions,
  isCriticalSection,
  isDeferredSection,
  performanceBudget,
} from "@/lib/performance";

describe("performance utilities", () => {
  it("defines strict performance budgets", () => {
    expect(performanceBudget.initialJsKbGzip).toBeLessThanOrEqual(170);
    expect(performanceBudget.lcpMs).toBeLessThanOrEqual(2500);
    expect(performanceBudget.inpMs).toBeLessThanOrEqual(200);
    expect(performanceBudget.cls).toBeLessThanOrEqual(0.1);
  });

  it("detects critical sections", () => {
    expect(isCriticalSection("hero")).toBe(true);
    expect(isCriticalSection("mission")).toBe(true);
    expect(isCriticalSection("projects")).toBe(false);
  });

  it("detects deferred sections", () => {
    expect(isDeferredSection("skills")).toBe(true);
    expect(isDeferredSection("footer")).toBe(true);
    expect(isDeferredSection("hero")).toBe(false);
  });

  it("returns eager image priority for critical sections", () => {
    expect(getImagePriority("hero")).toEqual({
      priority: true,
      loading: "eager",
    });
  });

  it("returns lazy image priority for deferred sections", () => {
    expect(getImagePriority("projects")).toEqual({
      priority: false,
      loading: "lazy",
    });
  });

  it("validates image dimensions", () => {
    expect(imageHasValidDimensions(1200, 630)).toBe(true);
    expect(imageHasValidDimensions(0, 630)).toBe(false);
    expect(imageHasValidDimensions(1200, -1)).toBe(false);
  });
});
