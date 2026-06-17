import { describe, expect, it } from "vitest";
import {
  filterProjectCaseFiles,
  getProjectCaseFileById,
  getProjectCategoryLabel,
  getSafeProjectHref,
  isProjectCategoryFilter,
  projectCaseFiles,
  projectCategories,
} from "@/data/projects";

describe("projects data", () => {
  it("defines project categories", () => {
    expect(projectCategories.length).toBeGreaterThan(0);
    expect(projectCategories[0]).toEqual({ id: "all", label: "All Evidence" });
  });

  it("defines meaningful project case files", () => {
    expect(projectCaseFiles.length).toBeGreaterThan(0);

    for (const project of projectCaseFiles) {
      expect(project.id.trim()).not.toBe("");
      expect(project.title.trim()).not.toBe("");
      expect(project.summary.trim()).not.toBe("");
      expect(project.problem.trim()).not.toBe("");
      expect(project.solution.trim()).not.toBe("");
      expect(project.evidence.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.qualitySignals.length).toBeGreaterThan(0);
    }
  });

  it("filters project case files by category", () => {
    expect(filterProjectCaseFiles(projectCaseFiles, "all")).toHaveLength(projectCaseFiles.length);

    const backendProjects = filterProjectCaseFiles(projectCaseFiles, "backend");

    expect(backendProjects.length).toBeGreaterThan(0);
    expect(backendProjects.every((project) => project.category === "backend")).toBe(true);
  });

  it("resolves category labels safely", () => {
    expect(getProjectCategoryLabel("backend")).toBe("Backend");
    expect(getProjectCategoryLabel("unknown")).toBe("Unknown");
  });

  it("validates category filters", () => {
    expect(isProjectCategoryFilter("all")).toBe(true);
    expect(isProjectCategoryFilter("backend")).toBe(true);
    expect(isProjectCategoryFilter("unknown")).toBe(false);
  });

  it("allows only safe project hrefs", () => {
    expect(getSafeProjectHref("#projects")).toBe("#projects");
    expect(getSafeProjectHref("https://example.com")).toBe("https://example.com");
    expect(getSafeProjectHref("http://example.com")).toBe("http://example.com");
    expect(getSafeProjectHref("javascript:alert(1)")).toBeUndefined();
    expect(getSafeProjectHref("not-a-valid-url")).toBeUndefined();
    expect(getSafeProjectHref(undefined)).toBeUndefined();
  });
});
