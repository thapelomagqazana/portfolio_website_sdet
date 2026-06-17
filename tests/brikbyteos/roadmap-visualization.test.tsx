import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { RoadmapVisualization } from "@/components/brikbyteos/roadmap-visualization";
import { brikByteRoadmap, roadmapCopy } from "@/data/brikbyteos-roadmap";

afterEach(() => {
  cleanup();
});

describe("RoadmapVisualization", () => {
  it("renders the roadmap section", () => {
    render(<RoadmapVisualization />);

    expect(screen.getByTestId("roadmap-visualization")).toBeInTheDocument();
    expect(screen.getByTestId("roadmap-visualization")).toHaveAttribute("id", "roadmap");

    expect(
      screen.getByRole("heading", {
        name: roadmapCopy.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("renders the timeline", () => {
    render(<RoadmapVisualization />);

    expect(screen.getByTestId("roadmap-timeline")).toBeInTheDocument();
  });

  it("renders all phases", () => {
    render(<RoadmapVisualization />);

    for (const phase of brikByteRoadmap) {
      expect(screen.getByTestId(`roadmap-phase-${phase.id}`)).toBeInTheDocument();
      expect(screen.getAllByText(phase.title).length).toBeGreaterThan(0);
    }
  });

  it("renders the current phase label", () => {
    render(<RoadmapVisualization />);

    expect(screen.getByText("Current Focus")).toBeInTheDocument();
  });

  it("renders accessible progress bars", () => {
    render(<RoadmapVisualization />);

    const progressBars = screen.getAllByRole("progressbar");

    expect(progressBars).toHaveLength(brikByteRoadmap.length);

    for (const phase of brikByteRoadmap) {
      expect(
        screen.getByRole("progressbar", {
          name: `${phase.title} completion`,
        })
      ).toHaveAttribute("aria-valuenow", String(phase.completion));
    }
  });

  it("renders the roadmap narrative", () => {
    render(<RoadmapVisualization />);

    const narrative = screen.getByTestId("roadmap-narrative");

    expect(within(narrative).getByText(roadmapCopy.narrativeTitle)).toBeInTheDocument();
    expect(within(narrative).getByText(roadmapCopy.narrative)).toBeInTheDocument();
  });

  it("expands and collapses milestones by click", async () => {
    const user = userEvent.setup();

    render(<RoadmapVisualization />);

    const phase = brikByteRoadmap[0];
    const toggle = screen.getByTestId(`roadmap-toggle-${phase.id}`);

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId(`roadmap-milestones-${phase.id}`)).toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    // expect(screen.queryByTestId(`roadmap-milestones-${phase.id}`)).not.toBeInTheDocument();
  });

  it("supports keyboard Enter expansion", async () => {
    const user = userEvent.setup();

    render(<RoadmapVisualization />);

    const phase = brikByteRoadmap[0];
    const toggle = screen.getByTestId(`roadmap-toggle-${phase.id}`);

    toggle.focus();
    await user.keyboard("{Enter}");

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("supports keyboard Space expansion", async () => {
    const user = userEvent.setup();

    render(<RoadmapVisualization />);

    const phase = brikByteRoadmap[0];
    const toggle = screen.getByTestId(`roadmap-toggle-${phase.id}`);

    toggle.focus();
    await user.keyboard(" ");

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("handles empty roadmap safely", () => {
    render(<RoadmapVisualization phases={[]} />);

    expect(screen.getByText("No roadmap phases configured.")).toBeInTheDocument();
  });

  it("handles phases without milestones", async () => {
    const user = userEvent.setup();

    render(
      <RoadmapVisualization
        phases={[
          {
            id: "empty-phase",
            title: "Empty Phase",
            version: "v9.9",
            status: "planned",
            completion: 0,
            summary: "A phase without milestones.",
            milestones: [],
          },
        ]}
      />
    );

    await user.click(screen.getByTestId("roadmap-toggle-empty-phase"));

    expect(screen.getByText("No milestones configured for this phase.")).toBeInTheDocument();
  });

  it("falls back safely for invalid status", () => {
    render(
      <RoadmapVisualization
        phases={[
          {
            id: "invalid-phase",
            title: "Invalid Phase",
            version: "v0.0",
            status: "unknown" as never,
            completion: 50,
            summary: "A phase with invalid status.",
            milestones: [],
          },
        ]}
      />
    );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
