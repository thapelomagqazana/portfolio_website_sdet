import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExperienceSection } from "@/sections/experience-section";
import { experienceTimelineCopy } from "@/data/experience-timeline";

afterEach(() => {
  cleanup();
});

describe("ExperienceSection", () => {
  it("renders the experience section with correct id", () => {
    render(<ExperienceSection />);

    expect(screen.getByTestId("experience-section")).toHaveAttribute("id", "experience");
  });

  it("uses aria-labelledby", () => {
    render(<ExperienceSection />);

    expect(screen.getByTestId("experience-section")).toHaveAttribute(
      "aria-labelledby",
      "experience-heading"
    );
  });

  it("renders section heading", () => {
    render(<ExperienceSection />);

    expect(
      screen.getByRole("heading", {
        name: experienceTimelineCopy.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("renders mission narrative", () => {
    render(<ExperienceSection />);

    const narrative = screen.getByTestId("experience-narrative");

    expect(within(narrative).getByText(experienceTimelineCopy.narrativeTitle)).toBeInTheDocument();
    expect(within(narrative).getByText(experienceTimelineCopy.narrative)).toBeInTheDocument();
  });

  it("renders mission timeline", () => {
    render(<ExperienceSection />);

    expect(screen.getByTestId("mission-timeline")).toBeInTheDocument();
  });
});
