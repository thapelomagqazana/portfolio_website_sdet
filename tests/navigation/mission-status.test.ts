import { describe, expect, it } from "vitest";
import {
  defaultMissionStatus,
  getMissionStatusBySectionId,
  missionStatuses,
} from "../../src/data/mission-status";

describe("mission status data", () => {
  it("contains statuses", () => {
    expect(missionStatuses.length).toBeGreaterThan(0);
  });

  it("returns known section status", () => {
    expect(getMissionStatusBySectionId("contact")).toEqual({
      sectionId: "contact",
      label: "Approved",
      detail: "Ready For Contact",
    });
  });

  it("falls back for unknown section", () => {
    expect(getMissionStatusBySectionId("unknown")).toBe(defaultMissionStatus);
  });

  it("falls back for empty section", () => {
    expect(getMissionStatusBySectionId("")).toBe(defaultMissionStatus);
    expect(getMissionStatusBySectionId("   ")).toBe(defaultMissionStatus);
  });
});
