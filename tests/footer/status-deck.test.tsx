import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StatusDeck } from "@/components/footer/status-deck";
import { footerMetadata } from "@/data/footer";

afterEach(() => cleanup());

describe("StatusDeck", () => {
  it("renders status deck", () => {
    render(<StatusDeck />);

    expect(screen.getByTestId("status-deck")).toBeInTheDocument();
    expect(screen.getByText("Engineering operations console.")).toBeInTheDocument();
  });

  it("renders system status", () => {
    render(<StatusDeck />);

    expect(screen.getByTestId("status-card-system")).toBeInTheDocument();
  });

  it("renders mission status", () => {
    render(<StatusDeck />);

    expect(screen.getByTestId("status-card-mission")).toBeInTheDocument();
    expect(screen.getByText("Building Release Confidence Infrastructure")).toBeInTheDocument();
  });

  it("renders release status", () => {
    render(<StatusDeck />);

    expect(screen.getByTestId("status-card-release")).toBeInTheDocument();
  });

  it("renders build metadata", () => {
    render(<StatusDeck />);

    expect(screen.getByTestId("build-information")).toBeInTheDocument();
    expect(screen.getByText(footerMetadata.product)).toBeInTheDocument();
    expect(screen.getByText(footerMetadata.buildEnvironment)).toBeInTheDocument();
  });

  it("renders live heartbeat text", () => {
    render(<StatusDeck />);

    expect(screen.getByText("Live")).toBeInTheDocument();
  });
});
