import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionCard } from "../../src/components/motion/motion-card";
import { MotionSection } from "../../src/components/motion/motion-section";

describe("MotionSection", () => {
  it("renders section content", () => {
    render(
      <MotionSection id="mission">
        <h1>Mission Profile</h1>
      </MotionSection>
    );

    expect(screen.getByRole("heading", { name: "Mission Profile" })).toBeInTheDocument();
  });

  it("supports custom class names", () => {
    const { container } = render(
      <MotionSection className="custom-section">
        <p>Content</p>
      </MotionSection>
    );

    expect(container.querySelector(".custom-section")).toBeInTheDocument();
  });
});

describe("MotionCard", () => {
  it("renders card content", () => {
    render(
      <MotionCard>
        <p>Quality Confidence</p>
      </MotionCard>
    );

    expect(screen.getByText("Quality Confidence")).toBeInTheDocument();
  });

  it("supports custom class names", () => {
    const { container } = render(
      <MotionCard className="glass-panel">
        <p>Card</p>
      </MotionCard>
    );

    expect(container.querySelector(".glass-panel")).toBeInTheDocument();
  });
});
