import { describe, expect, it, vi } from "vitest";
import { getLighthouseRating, reportWebVital } from "@/lib/web-vitals";

describe("web vitals", () => {
  it("rates LCP correctly", () => {
    expect(getLighthouseRating("LCP", 2400)).toBe("good");
    expect(getLighthouseRating("LCP", 3000)).toBe("needs-improvement");
    expect(getLighthouseRating("LCP", 4500)).toBe("poor");
  });

  it("rates INP correctly", () => {
    expect(getLighthouseRating("INP", 150)).toBe("good");
    expect(getLighthouseRating("INP", 350)).toBe("needs-improvement");
    expect(getLighthouseRating("INP", 700)).toBe("poor");
  });

  it("rates CLS correctly", () => {
    expect(getLighthouseRating("CLS", 0.05)).toBe("good");
    expect(getLighthouseRating("CLS", 0.2)).toBe("needs-improvement");
    expect(getLighthouseRating("CLS", 0.3)).toBe("poor");
  });

  it("reports valid metrics", () => {
    const reporter = vi.fn();

    reportWebVital(
      {
        id: "metric-1",
        name: "LCP",
        value: 1200,
      },
      reporter
    );

    expect(reporter).toHaveBeenCalledOnce();
  });

  it("ignores invalid metrics", () => {
    const reporter = vi.fn();

    reportWebVital(
      {
        id: "",
        name: "LCP",
        value: Number.NaN,
      },
      reporter
    );

    expect(reporter).not.toHaveBeenCalled();
  });
});
