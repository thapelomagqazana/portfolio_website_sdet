import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { MissionTimeline } from "@/components/experience/mission-timeline";
import { experienceTimelineEvents } from "@/data/experience-timeline";

afterEach(() => {
  cleanup();
});

describe("MissionTimeline", () => {
  it("renders the mission timeline", () => {
    render(<MissionTimeline />);

    expect(screen.getByTestId("mission-timeline")).toBeInTheDocument();
    expect(screen.getByTestId("mission-timeline-list")).toBeInTheDocument();
  });

  it("renders all timeline events", () => {
    render(<MissionTimeline />);

    for (const event of experienceTimelineEvents) {
      expect(screen.getByTestId(`mission-event-${event.id}`)).toBeInTheDocument();
      expect(screen.getAllByText(event.title).length).toBeGreaterThan(0);
    }
  });

  it("highlights the current mission by default", () => {
    render(<MissionTimeline />);

    const panel = screen.getByTestId("active-mission-panel");

    expect(within(panel).getByText(/BrikByteOS/i)).toBeInTheDocument();
  });

  it("renders evidence tags", () => {
    render(<MissionTimeline />);

    expect(screen.getAllByText("Release Confidence").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Systems Integration").length).toBeGreaterThan(0);
  });

  it("focus updates active milestone", async () => {
    const user = userEvent.setup();

    render(<MissionTimeline />);

    const event = experienceTimelineEvents[0];
    const button = screen.getByTestId(`mission-event-${event.id}`);

    await user.tab();

    button.focus();

    expect(screen.getByTestId("active-mission-panel")).toHaveTextContent(event.title);
  });

  it("hover updates active milestone", () => {
    render(<MissionTimeline />);

    const event = experienceTimelineEvents[0];
    fireEvent.mouseEnter(screen.getByTestId(`mission-event-${event.id}`));

    expect(screen.getByTestId("active-mission-panel")).toHaveTextContent(event.title);
  });

  it("click locks selected milestone", async () => {
    const user = userEvent.setup();

    render(<MissionTimeline />);

    const event = experienceTimelineEvents[1];

    await user.click(screen.getByTestId(`mission-event-${event.id}`));

    expect(screen.getByTestId("active-mission-panel")).toHaveTextContent(event.title);
    expect(screen.getByTestId(`mission-event-${event.id}`)).toHaveAttribute("aria-pressed", "true");
  });

  it("Escape clears locked milestone and returns to current mission", async () => {
    const user = userEvent.setup();

    render(<MissionTimeline />);

    await user.click(screen.getByTestId("mission-event-wethinkcode"));
    expect(screen.getByTestId("active-mission-panel")).toHaveTextContent("WeThinkCode");

    await user.keyboard("{Escape}");

    expect(screen.getByTestId("active-mission-panel")).toHaveTextContent("BrikByteOS");
  });

  it("handles empty events safely", () => {
    render(<MissionTimeline events={[]} />);

    expect(screen.getByTestId("mission-timeline-empty")).toBeInTheDocument();
    expect(screen.getByText("No mission timeline events configured.")).toBeInTheDocument();
  });
});
