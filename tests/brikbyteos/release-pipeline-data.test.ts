import { describe, expect, it } from "vitest";
import {
  clampPipelineCoordinate,
  getPipelineStatusLabel,
  getReleasePipelineStageById,
  releasePipelineStages,
} from "../../src/data/release-pipeline";

describe("release pipeline data", () => {
  it("defines seven pipeline stages", () => {
    expect(releasePipelineStages).toHaveLength(7);
  });

  it("resolves stages by id", () => {
    expect(getReleasePipelineStageById("source")?.label).toBe("Source");
  });

  it("falls back safely for unknown stages", () => {
    expect(getReleasePipelineStageById("unknown")).toBeUndefined();
  });

  it("clamps invalid coordinates safely", () => {
    expect(clampPipelineCoordinate(Number.NaN)).toBe(50);
    expect(clampPipelineCoordinate(-10)).toBe(0);
    expect(clampPipelineCoordinate(120)).toBe(100);
  });

  it("resolves status labels safely", () => {
    expect(getPipelineStatusLabel("passed")).toBe("PASS");
    expect(getPipelineStatusLabel("running")).toBe("RUNNING");
    expect(getPipelineStatusLabel("warning")).toBe("WARNING");
    expect(getPipelineStatusLabel("unknown")).toBe("IDLE");
  });
});
