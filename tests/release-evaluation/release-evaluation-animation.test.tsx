import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReleaseEvaluationAnimation } from "../../src/sections/release-evaluation-animation";

afterEach(() => {
  cleanup();
});

describe("ReleaseEvaluationAnimation", () => {
  it("renders the release evaluation shell", () => {
    render(<ReleaseEvaluationAnimation />);

    expect(screen.getByLabelText("Release evaluation animation")).toBeInTheDocument();
    expect(screen.getByText("Evaluating Production Readiness")).toBeInTheDocument();
  });

  it("renders all required phases", () => {
    render(<ReleaseEvaluationAnimation />);

    expect(screen.getByText("TEST EXECUTION")).toBeInTheDocument();
    expect(screen.getByText("SECURITY SCAN")).toBeInTheDocument();
    expect(screen.getByText("PERFORMANCE BUDGET")).toBeInTheDocument();
    expect(screen.getByText("EVIDENCE NORMALIZATION")).toBeInTheDocument();
    expect(screen.getByText("QUALITY GATE")).toBeInTheDocument();
  });

  it("allows user to skip by clicking skip", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<ReleaseEvaluationAnimation onComplete={onComplete} />);

    const animation = screen.getByLabelText("Release evaluation animation");
    await user.click(within(animation).getByRole("button", { name: "SKIP" }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("allows user to skip using Escape", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<ReleaseEvaluationAnimation onComplete={onComplete} />);

    await user.keyboard("{Escape}");

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
