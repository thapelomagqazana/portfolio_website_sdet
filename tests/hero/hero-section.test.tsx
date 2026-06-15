import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { heroContent } from "../../src/data/hero";
import { missionStatement } from "../../src/data/mission";
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

  it("renders the hero subheadline", () => {
    render(<HeroSection />);

    expect(screen.getByText(heroContent.subheadline)).toBeInTheDocument();
  });

  it("renders role badges", () => {
    render(<HeroSection />);

    for (const badge of heroContent.badges) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
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
    expect(grid.className).toContain("lg:grid-cols");
  });

  it("uses the hero section id for navigation", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("hero-section")).toHaveAttribute("id", "hero");
  });

  it("renders mission statement module inside hero", () => {
    render(<HeroSection />);

    expect(screen.getByText(missionStatement.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(missionStatement.headline)).toBeInTheDocument();
  });

  it("renders release intelligence dashboard inside hero", () => {
    render(<HeroSection />);

    expect(screen.getByText(releaseIntelligenceSummary.eyebrow)).toBeInTheDocument();
  });

  it("renders release intelligence metrics", () => {
    render(<HeroSection />);

    for (const metric of releaseIntelligenceMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(metric.detail)).toBeInTheDocument();
    }
  });

  it("renders release intelligence summary", () => {
    render(<HeroSection />);

    expect(screen.getByText(releaseIntelligenceSummary.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(releaseIntelligenceSummary.postureValue)).toBeInTheDocument();
    expect(screen.getByText(releaseIntelligenceSummary.evidenceValue)).toBeInTheDocument();
    expect(screen.getByText(releaseIntelligenceSummary.verdictValue)).toBeInTheDocument();
  });
});
