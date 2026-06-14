import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ActiveMissionStatus } from "../../src/components/layout/active-mission-status";

afterEach(() => {
  cleanup();
});

describe("ActiveMissionStatus", () => {
  it("renders default mission status", () => {
    render(<ActiveMissionStatus sectionIds={["hero"]} />);

    expect(screen.getByLabelText("Active mission status")).toBeInTheDocument();
    expect(screen.getByText("● Initializing")).toBeInTheDocument();
    expect(screen.getByText("Command Center Online")).toBeInTheDocument();
  });

  it("handles empty section ids safely", () => {
    render(<ActiveMissionStatus sectionIds={[]} />);

    expect(screen.getByText("● Initializing")).toBeInTheDocument();
  });
});
