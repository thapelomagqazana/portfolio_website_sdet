import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { skillsMatrixCopy } from "../../src/data/skills-matrix";
import { SkillsMatrixSection } from "../../src/sections/skills-matrix-section";

afterEach(() => {
  cleanup();
});

describe("SkillsMatrixSection", () => {
  it("renders section with skills id", () => {
    render(<SkillsMatrixSection />);

    expect(screen.getByTestId("skills-matrix-section")).toHaveAttribute("id", "skills");
  });

  it("renders section heading and description", () => {
    render(<SkillsMatrixSection />);

    expect(screen.getByText(skillsMatrixCopy.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: skillsMatrixCopy.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(skillsMatrixCopy.description)).toBeInTheDocument();
  });

  it("renders the engineering constellation", () => {
    render(<SkillsMatrixSection />);

    expect(screen.getByTestId("engineering-constellation-graph")).toBeInTheDocument();
  });
});
