import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OpeningIntro } from "../../src/sections/opening-intro";

afterEach(() => {
  cleanup();
});

describe("OpeningIntro", () => {
  it("renders the intro shell", () => {
    render(<OpeningIntro />);

    const intro = screen.getByLabelText("Opening portfolio initialization sequence");

    expect(intro).toBeInTheDocument();
    expect(within(intro).getByRole("button", { name: "SKIP" })).toBeInTheDocument();
  });

  it("allows user to skip intro by clicking skip", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<OpeningIntro onComplete={onComplete} />);

    const intro = screen.getByLabelText("Opening portfolio initialization sequence");

    await user.click(within(intro).getByRole("button", { name: "SKIP" }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("allows user to skip intro using Escape", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<OpeningIntro onComplete={onComplete} />);

    await user.keyboard("{Escape}");

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
