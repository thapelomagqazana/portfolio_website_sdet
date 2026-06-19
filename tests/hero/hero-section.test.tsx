import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { heroContent } from "../../src/data/hero";
import {
  releaseIntelligenceMetrics,
  releaseIntelligenceSummary,
} from "../../src/data/release-intelligence";
import { HeroSection } from "../../src/sections/hero-section";

afterEach(() => {
  cleanup();
});

describe("HeroSection", () => {
  it("renders the hero heading", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: heroContent.headline,
      })
    ).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<HeroSection />);

    expect(screen.getByRole("link", { name: heroContent.primaryCta.label })).toHaveAttribute(
      "href",
      heroContent.primaryCta.href
    );

    expect(screen.getByRole("link", { name: heroContent.secondaryCta.label })).toHaveAttribute(
      "href",
      heroContent.secondaryCta.href
    );
  });

  it("has responsive layout classes", () => {
    render(<HeroSection />);

    const grid = screen.getByTestId("hero-responsive-grid");

    expect(grid).toHaveClass("grid");
    expect(grid.className).toContain("xl:grid-cols");
  });

  it("uses the hero section id for navigation", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("hero-section")).toHaveAttribute("id", "hero");
  });
});
