import { describe, expect, it } from "vitest";
import {
  filterResearchReports,
  filterResearchReportsByCategory,
  getResearchReportCategoryLabel,
  getResearchReportDifficultyLabel,
  getResearchReportStatusLabel,
  researchReportCategories,
  researchReportHasValidMetadata,
  researchReports,
  searchResearchReports,
} from "@/data/research-archive";

describe("research archive data", () => {
  it("defines research report categories", () => {
    expect(researchReportCategories.length).toBeGreaterThan(0);
    expect(researchReportCategories[0]).toEqual({
      id: "all",
      label: "All Reports",
    });
  });

  it("defines valid research reports", () => {
    expect(researchReports.length).toBeGreaterThan(0);

    for (const report of researchReports) {
      expect(researchReportHasValidMetadata(report)).toBe(true);
    }
  });

  it("filters by category", () => {
    const brikbyteosReports = filterResearchReportsByCategory(researchReports, "brikbyteos");

    expect(brikbyteosReports.length).toBeGreaterThan(0);
    expect(brikbyteosReports.every((report) => report.category === "brikbyteos")).toBe(true);
  });

  it("returns all reports for all category", () => {
    expect(filterResearchReportsByCategory(researchReports, "all")).toHaveLength(
      researchReports.length
    );
  });

  it("search matches title", () => {
    expect(searchResearchReports(researchReports, "Release Confidence")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "release-confidence-infrastructure",
        }),
      ])
    );
  });

  it("search matches tags", () => {
    expect(searchResearchReports(researchReports, "playwright")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "playwright-reliability",
        }),
      ])
    );
  });

  it("search is case-insensitive", () => {
    expect(searchResearchReports(researchReports, "BRIKBYTEOS").length).toBeGreaterThan(0);
  });

  it("whitespace-only query returns current reports", () => {
    expect(searchResearchReports(researchReports, "   ")).toHaveLength(researchReports.length);
  });

  it("unknown query returns empty list", () => {
    expect(searchResearchReports(researchReports, "zzzz-no-match")).toHaveLength(0);
  });

  it("resolves labels safely", () => {
    expect(getResearchReportCategoryLabel("architecture")).toBe("Architecture");
    expect(getResearchReportCategoryLabel("unknown")).toBe("Unknown");

    expect(getResearchReportStatusLabel("published")).toBe("Published");
    expect(getResearchReportStatusLabel("unknown")).toBe("Unknown");

    expect(getResearchReportDifficultyLabel("advanced")).toBe("Advanced");
    expect(getResearchReportDifficultyLabel("unknown")).toBe("Unknown");
  });
});
