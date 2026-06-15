import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HeroSection } from "../../src/sections/hero-section";
import { heroContent, heroDashboardStatus, heroMetrics } from "../../src/data/hero";

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

  it("renders dashboard metrics", () => {
    render(<HeroSection />);

    for (const metric of heroMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.detail)).toBeInTheDocument();
    }
  });

  it("renders approved quality gate verdict", () => {
    render(<HeroSection />);

    expect(screen.getByText(heroDashboardStatus.label)).toBeInTheDocument();
    expect(screen.getByText(heroDashboardStatus.verdict)).toBeInTheDocument();
    expect(screen.getByText(heroDashboardStatus.detail)).toBeInTheDocument();
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
});
