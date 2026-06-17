import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProblemSolutionStory } from "@/components/brikbyteos/problem-solution-story";
import {
  brikByteOsStory,
  problemSignals,
  problemSolutionComparisons,
  solutionSignals,
} from "@/data/brikbyteos-story";

afterEach(() => {
  cleanup();
});

describe("ProblemSolutionStory", () => {
  it("renders the story heading", () => {
    render(<ProblemSolutionStory />);

    expect(
      screen.getByRole("heading", {
        name: brikByteOsStory.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("renders the problem title and summary", () => {
    render(<ProblemSolutionStory />);

    const problemPanel = screen.getByTestId("problem-panel");

    expect(
      within(problemPanel).getByRole("heading", {
        name: brikByteOsStory.problemTitle,
        level: 3,
      })
    ).toBeInTheDocument();

    expect(within(problemPanel).getByText(brikByteOsStory.problemSummary)).toBeInTheDocument();
  });

  it("renders the solution title and summary", () => {
    render(<ProblemSolutionStory />);

    const solutionPanel = screen.getByTestId("solution-panel");

    expect(
      within(solutionPanel).getByRole("heading", {
        name: brikByteOsStory.solutionTitle,
        level: 3,
      })
    ).toBeInTheDocument();

    expect(within(solutionPanel).getByText(brikByteOsStory.solutionSummary)).toBeInTheDocument();
  });

  it("renders all problem signals", () => {
    render(<ProblemSolutionStory />);

    const problemPanel = screen.getByTestId("problem-panel");

    for (const signal of problemSignals) {
      expect(within(problemPanel).getByText(signal.label)).toBeInTheDocument();
      expect(within(problemPanel).getByText(signal.description)).toBeInTheDocument();
    }
  });

  it("renders all solution signals", () => {
    render(<ProblemSolutionStory />);

    const solutionPanel = screen.getByTestId("solution-panel");

    for (const signal of solutionSignals) {
      expect(within(solutionPanel).getByText(signal.label)).toBeInTheDocument();
      expect(within(solutionPanel).getByText(signal.description)).toBeInTheDocument();
    }
  });

  it("renders all comparison items", () => {
    render(<ProblemSolutionStory />);

    const comparisonTable = screen.getByTestId("comparison-table");

    for (const item of problemSolutionComparisons) {
      expect(within(comparisonTable).getByText(item.problem)).toBeInTheDocument();
      expect(within(comparisonTable).getByText(item.solution)).toBeInTheDocument();
    }
  });

  it("renders one row per comparison item", () => {
    render(<ProblemSolutionStory />);

    expect(screen.getAllByTestId("comparison-row")).toHaveLength(problemSolutionComparisons.length);
  });

  it("renders the value proposition prominently", () => {
    render(<ProblemSolutionStory />);

    const callout = screen.getByTestId("value-proposition-callout");

    expect(within(callout).getByText(brikByteOsStory.valueProposition)).toBeInTheDocument();
  });

  it("contains responsive desktop and mobile comparison labels", () => {
    render(<ProblemSolutionStory />);

    const comparisonTable = screen.getByTestId("comparison-table");

    expect(within(comparisonTable).getByText("Without BrikByteOS")).toBeInTheDocument();
    expect(within(comparisonTable).getByText("With BrikByteOS")).toBeInTheDocument();

    expect(within(comparisonTable).getAllByText("Problem").length).toBeGreaterThan(0);
    expect(within(comparisonTable).getAllByText("Solution").length).toBeGreaterThan(0);
  });

  it("does not use empty story copy", () => {
    expect(brikByteOsStory.heading.trim()).not.toBe("");
    expect(brikByteOsStory.problemSummary.trim()).not.toBe("");
    expect(brikByteOsStory.solutionSummary.trim()).not.toBe("");
    expect(brikByteOsStory.valueProposition.trim()).not.toBe("");
  });
});
