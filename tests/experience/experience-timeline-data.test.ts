import { describe, expect, it } from "vitest";
import {
  experienceEventIsComplete,
  experienceTimelineEvents,
  getCurrentExperienceEvent,
  getExperienceCategoryLabel,
  getExperienceEventById,
  getExperienceStatusLabel,
} from "@/data/experience-timeline";

describe("experience timeline data", () => {
  it("defines meaningful timeline events", () => {
    expect(experienceTimelineEvents.length).toBeGreaterThan(0);

    for (const event of experienceTimelineEvents) {
      expect(experienceEventIsComplete(event)).toBe(true);
    }
  });

  it("has one current mission event", () => {
    expect(experienceTimelineEvents.filter((event) => event.status === "current")).toHaveLength(1);
  });

  it("resolves current event safely", () => {
    expect(getCurrentExperienceEvent()?.status).toBe("current");
    expect(getCurrentExperienceEvent([])).toBeUndefined();
  });

  it("resolves known and unknown events safely", () => {
    expect(getExperienceEventById("brikbyteos")?.title).toContain("BrikByteOS");
    expect(getExperienceEventById("missing")).toBeUndefined();
  });

  it("returns safe category labels", () => {
    expect(getExperienceCategoryLabel("education")).toBe("Education");
    expect(getExperienceCategoryLabel("missing")).toBe("Unknown");
  });

  it("returns safe status labels", () => {
    expect(getExperienceStatusLabel("current")).toBe("Current Mission");
    expect(getExperienceStatusLabel("missing")).toBe("Unknown");
  });
});
