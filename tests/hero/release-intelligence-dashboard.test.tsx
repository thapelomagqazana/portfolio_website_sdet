import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  AnimatedMetricValue,
  ReleaseIntelligenceDashboard,
} from "../../src/components/hero/release-intelligence-dashboard";
import {
  clampMetricValue,
  releaseIntelligenceMetrics,
  releaseIntelligenceSummary,
} from "../../src/data/release-intelligence";

afterEach(() => {
  cleanup();
});

describe("release intelligence data", () => {
  it("contains metrics", () => {
    expect(releaseIntelligenceMetrics.length).toBeGreaterThan(0);
  });

  it("clamps metric values safely", () => {
    expect(clampMetricValue(97)).toBe(97);
    expect(clampMetricValue(140)).toBe(100);
    expect(clampMetricValue(-10)).toBe(0);
    expect(clampMetricValue(Number.NaN)).toBe(0);
  });
});

describe("AnimatedMetricValue", () => {
  it("renders metric suffix", () => {
    render(<AnimatedMetricValue value={97} suffix="%" />);

    expect(screen.getByText(/%/)).toBeInTheDocument();
  });
});

describe("ReleaseIntelligenceDashboard", () => {
  it("renders dashboard title", () => {
    render(<ReleaseIntelligenceDashboard />);

    expect(screen.getByText(releaseIntelligenceSummary.eyebrow)).toBeInTheDocument();
  });

  it("renders all metric labels and details", () => {
    render(<ReleaseIntelligenceDashboard />);

    for (const metric of releaseIntelligenceMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(metric.detail)).toBeInTheDocument();
    }
  });

  it("renders release readiness summary", () => {
    render(<ReleaseIntelligenceDashboard />);

    expect(screen.getByText(releaseIntelligenceSummary.postureValue)).toBeInTheDocument();
    expect(screen.getByText(releaseIntelligenceSummary.evidenceValue)).toBeInTheDocument();
    expect(screen.getByText(releaseIntelligenceSummary.verdictValue)).toBeInTheDocument();
  });

  it("renders accessible progress bars", () => {
    render(<ReleaseIntelligenceDashboard />);

    for (const metric of releaseIntelligenceMetrics) {
      expect(
        screen.getByRole("progressbar", {
          name: `${metric.label}: ${clampMetricValue(metric.value)}${metric.suffix}`,
        })
      ).toBeInTheDocument();
    }
  });

  it("renders dashboard shell", () => {
    render(<ReleaseIntelligenceDashboard />);

    expect(screen.getByTestId("release-intelligence-dashboard")).toBeInTheDocument();
  });
});
