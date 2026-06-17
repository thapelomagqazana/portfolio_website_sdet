import { describe, expect, it } from "vitest";
import {
  brikByteRoadmap,
  clampRoadmapCompletion,
  getCurrentRoadmapPhase,
  getRoadmapPhaseById,
  getRoadmapStatusLabel,
} from "@/data/brikbyteos-roadmap";

describe("brikbyteos roadmap data", () => {
  it("defines meaningful roadmap phases", () => {
    expect(brikByteRoadmap.length).toBeGreaterThan(0);

    for (const phase of brikByteRoadmap) {
      expect(phase.id.trim()).not.toBe("");
      expect(phase.title.trim()).not.toBe("");
      expect(phase.version.trim()).not.toBe("");
      expect(phase.summary.trim()).not.toBe("");
      expect(phase.completion).toBeGreaterThanOrEqual(0);
      expect(phase.completion).toBeLessThanOrEqual(100);
    }
  });

  it("has one current phase", () => {
    expect(brikByteRoadmap.filter((phase) => phase.status === "current")).toHaveLength(1);
  });

  it("clamps completion safely", () => {
    expect(clampRoadmapCompletion(-10)).toBe(0);
    expect(clampRoadmapCompletion(50)).toBe(50);
    expect(clampRoadmapCompletion(120)).toBe(100);
    expect(clampRoadmapCompletion(Number.NaN)).toBe(0);
  });

  it("resolves status labels safely", () => {
    expect(getRoadmapStatusLabel("completed")).toBe("Completed");
    expect(getRoadmapStatusLabel("current")).toBe("Current Focus");
    expect(getRoadmapStatusLabel("planned")).toBe("Planned");
    expect(getRoadmapStatusLabel("invalid")).toBe("Unknown");
  });

  it("resolves current phase and phase by id safely", () => {
    expect(getCurrentRoadmapPhase()?.status).toBe("current");
    expect(getRoadmapPhaseById("phase-1")?.title).toBe("Release Confidence MVP");
    expect(getRoadmapPhaseById("missing")).toBeUndefined();
  });
});
