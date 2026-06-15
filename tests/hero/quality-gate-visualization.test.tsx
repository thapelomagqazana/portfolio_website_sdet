import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  getSignalPosition,
  QualityGateVisualization,
} from "../../src/components/hero/quality-gate-visualization";
import { qualityGateSignals, qualityGateStatus } from "../../src/data/quality-gate";

afterEach(() => {
  cleanup();
});

describe("getSignalPosition", () => {
  it("returns centered fallback for invalid total", () => {
    expect(getSignalPosition(0, 0)).toEqual({ x: 50, y: 50 });
  });

  it("returns deterministic signal positions", () => {
    expect(getSignalPosition(0, 4)).toEqual({ x: 50, y: 8 });
  });
});

describe("QualityGateVisualization", () => {
  it("renders quality gate label", () => {
    render(<QualityGateVisualization />);

    expect(screen.getByText(qualityGateStatus.label)).toBeInTheDocument();
  });

  it("renders approved verdict", () => {
    render(<QualityGateVisualization />);

    expect(screen.getByText(qualityGateStatus.verdict)).toBeInTheDocument();
  });

  it("renders confidence value", () => {
    render(<QualityGateVisualization />);

    expect(screen.getByText(qualityGateStatus.confidence)).toBeInTheDocument();
  });

  it("renders detail text", () => {
    render(<QualityGateVisualization />);

    expect(screen.getByText(qualityGateStatus.detail)).toBeInTheDocument();
  });

  it("renders signal labels", () => {
    render(<QualityGateVisualization />);

    for (const signal of qualityGateSignals) {
      expect(screen.getAllByText(signal).length).toBeGreaterThan(0);
    }
  });

  it("has accessible label", () => {
    render(<QualityGateVisualization />);

    expect(
      screen.getByLabelText(
        `${qualityGateStatus.label}: ${qualityGateStatus.verdict}, ${qualityGateStatus.confidence}, ${qualityGateStatus.detail}`
      )
    ).toBeInTheDocument();
  });

  it("renders stable shell", () => {
    render(<QualityGateVisualization />);

    expect(screen.getByTestId("quality-gate-visualization")).toBeInTheDocument();
  });
});
