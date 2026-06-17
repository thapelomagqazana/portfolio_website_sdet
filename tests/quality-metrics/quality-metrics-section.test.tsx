import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  confidenceDashboardMetrics,
  qualityMetricsSectionCopy,
} from "../../src/data/quality-metrics";
import { QualityMetricsSection } from "../../src/sections/quality-metrics-section";

afterEach(() => {
  cleanup();
});

describe("QualityMetricsSection", () => {
  it("renders section with quality-metrics id", () => {
    render(<QualityMetricsSection />);

    expect(screen.getByTestId("quality-metrics-section")).toHaveAttribute("id", "quality-metrics");
  });

  it("renders section heading and description", () => {
    render(<QualityMetricsSection />);

    expect(screen.getByText(qualityMetricsSectionCopy.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: qualityMetricsSectionCopy.heading,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(qualityMetricsSectionCopy.description)).toBeInTheDocument();
  });

  it("renders all dashboard metric labels and descriptions", () => {
    render(<QualityMetricsSection />);

    for (const metric of confidenceDashboardMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(metric.description)).toBeInTheDocument();
    }
  });

  it("renders accessible progress bars", () => {
    render(<QualityMetricsSection />);

    for (const metric of confidenceDashboardMetrics) {
      expect(
        screen.getByRole("progressbar", {
          name: new RegExp(metric.label),
        })
      ).toBeInTheDocument();
    }
  });

  it("has responsive grid classes", () => {
    render(<QualityMetricsSection />);

    const grid = screen.getByTestId("quality-metrics-grid");

    expect(grid).toHaveClass("grid");
    expect(grid.className).toContain("sm:grid-cols-2");
    expect(grid.className).toContain("xl:grid-cols-4");
  });

  it("renders evidence narrative panel", () => {
    render(<QualityMetricsSection />);

    expect(screen.getByText(qualityMetricsSectionCopy.narrativeTitle)).toBeInTheDocument();
    expect(screen.getByText(qualityMetricsSectionCopy.narrative)).toBeInTheDocument();
  });
});
