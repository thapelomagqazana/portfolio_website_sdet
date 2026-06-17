import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectsSection } from "@/sections/projects-section";
import { projectsCopy } from "@/data/projects";

afterEach(() => {
  cleanup();
});

describe("ProjectsSection", () => {
  it("renders the projects section with the correct id", () => {
    render(<ProjectsSection />);

    expect(screen.getByTestId("projects-section")).toHaveAttribute("id", "projects");
  });

  it("renders the section heading", () => {
    render(<ProjectsSection />);

    expect(
      screen.getByRole("heading", {
        name: projectsCopy.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("uses aria-labelledby for accessibility", () => {
    render(<ProjectsSection />);

    expect(screen.getByTestId("projects-section")).toHaveAttribute(
      "aria-labelledby",
      "projects-heading"
    );
  });

  it("renders the evidence vault", () => {
    render(<ProjectsSection />);

    expect(screen.getByTestId("evidence-vault")).toBeInTheDocument();
  });
});
