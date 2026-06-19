import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  MissionStatement,
  getNextPrincipleIndex,
} from "../../src/components/hero/mission-statement";
import { engineeringPrinciples, missionStatement } from "../../src/data/mission";

afterEach(() => {
  cleanup();
});

describe("mission data", () => {
  it("contains mission statement copy", () => {
    expect(missionStatement.eyebrow).toBe("Mission Statement");
    expect(missionStatement.headline.length).toBeGreaterThan(0);
    expect(missionStatement.body.length).toBeGreaterThan(0);
  });

  it("contains engineering principles", () => {
    expect(engineeringPrinciples.length).toBeGreaterThan(0);
  });
});

describe("getNextPrincipleIndex", () => {
  it("moves to the next principle", () => {
    expect(getNextPrincipleIndex(0, 5)).toBe(1);
  });

  it("loops back to zero", () => {
    expect(getNextPrincipleIndex(4, 5)).toBe(0);
  });

  it("handles invalid values safely", () => {
    expect(getNextPrincipleIndex(Number.NaN, 5)).toBe(0);
    expect(getNextPrincipleIndex(0, 0)).toBe(0);
    expect(getNextPrincipleIndex(0, Number.NaN)).toBe(0);
  });

  it("normalizes fractional values", () => {
    expect(getNextPrincipleIndex(1.8, 5)).toBe(2);
  });
});

describe("MissionStatement", () => {
  // it("renders mission eyebrow", () => {
  //   render(<MissionStatement />);

  //   expect(screen.getByText(missionStatement.eyebrow)).toBeInTheDocument();
  // });

  // it("renders mission headline", () => {
  //   render(<MissionStatement />);

  //   expect(
  //     screen.getByRole("heading", {
  //       level: 2,
  //       name: missionStatement.headline,
  //     })
  //   ).toBeInTheDocument();
  // });

  // it("renders mission body", () => {
  //   render(<MissionStatement />);

  //   expect(screen.getByText(missionStatement.body)).toBeInTheDocument();
  // });

  it("renders the first principle", () => {
    render(<MissionStatement />);

    expect(screen.getAllByText(engineeringPrinciples[0]).length).toBeGreaterThan(0);
  });

  it("renders all principles for assistive technology", () => {
    render(<MissionStatement />);

    for (const principle of engineeringPrinciples) {
      expect(screen.getAllByText(principle).length).toBeGreaterThan(0);
    }
  });

  it("renders mission module shell", () => {
    render(<MissionStatement />);

    expect(screen.getByTestId("mission-statement")).toBeInTheDocument();
  });
});
