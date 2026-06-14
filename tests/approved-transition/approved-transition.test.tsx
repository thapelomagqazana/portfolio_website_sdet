import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApprovedTransition } from "../../src/sections/approved-transition";

afterEach(() => {
  cleanup();
});

describe("ApprovedTransition", () => {
  it("renders approved transition shell", () => {
    render(<ApprovedTransition />);

    expect(screen.getByLabelText("Approved release transition")).toBeInTheDocument();
    expect(screen.getByText("● QUALITY GATE RESULT")).toBeInTheDocument();
  });

  it("allows user to skip by clicking skip", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<ApprovedTransition onComplete={onComplete} />);

    const transition = screen.getByLabelText("Approved release transition");
    await user.click(within(transition).getByRole("button", { name: "SKIP" }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("allows user to skip using Escape", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<ApprovedTransition onComplete={onComplete} />);

    await user.keyboard("{Escape}");

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
