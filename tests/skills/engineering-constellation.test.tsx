import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EngineeringConstellation } from "../../src/components/skills/engineering-constellation";
import { skillEdges, skillNodes } from "../../src/data/skills-matrix";

afterEach(() => {
  cleanup();
});

describe("EngineeringConstellation", () => {
  it("renders graph nodes", () => {
    render(<EngineeringConstellation />);

    for (const node of skillNodes) {
      expect(screen.getAllByText(node.label).length).toBeGreaterThan(0);
    }
  });

  it("all graph nodes have accessible button names", () => {
    render(<EngineeringConstellation />);

    for (const node of skillNodes) {
      expect(screen.getByRole("button", { name: `Select ${node.label}` })).toBeInTheDocument();
    }
  });

  it("renders mobile fallback cards", () => {
    render(<EngineeringConstellation />);

    expect(screen.getByTestId("skills-mobile-fallback")).toBeInTheDocument();
  });
});
