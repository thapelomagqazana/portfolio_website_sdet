import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "../../src/components/navigation/command-palette";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("CommandPalette", () => {
  it("renders trigger", () => {
    render(<CommandPalette />);

    expect(screen.getByRole("button", { name: /Search command deck/i })).toBeInTheDocument();
  });

  it("opens with trigger button", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.click(screen.getByRole("button", { name: /Search command deck/i }));

    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
  });

  it("opens with slash shortcut", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");

    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: "Command palette" })).not.toBeInTheDocument();
  });

  it("filters commands", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.type(screen.getByRole("combobox"), "github");

    expect(screen.getByText("Open GitHub")).toBeInTheDocument();
    expect(screen.queryByText("Open LinkedIn")).not.toBeInTheDocument();
  });

  it("shows empty state for unknown search", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.type(screen.getByRole("combobox"), "zzzzzz");

    expect(screen.getByText("No command found.")).toBeInTheDocument();
  });

  it("moves active option with arrow keys", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.keyboard("{ArrowDown}");

    const listbox = screen.getByRole("listbox");
    const options = within(listbox).getAllByRole("option");

    expect(options[1]).toHaveAttribute("aria-selected", "true");
  });

  it("runs navigate command with Enter", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.type(screen.getByRole("combobox"), "contact");
    await user.keyboard("{Enter}");

    expect(window.location.hash).toBe("#contact");
  });

  it("runs command by mouse click", async () => {
    const user = userEvent.setup();

    render(<CommandPalette />);

    await user.keyboard("/");
    await user.click(screen.getByRole("option", { name: /Go to Contact/i }));

    expect(window.location.hash).toBe("#contact");
  });

  it("does not open with slash while typing inside input", async () => {
    const user = userEvent.setup();

    render(
      <>
        <input aria-label="External input" />
        <CommandPalette />
      </>
    );

    await user.click(screen.getByLabelText("External input"));
    await user.keyboard("/");

    expect(screen.queryByRole("dialog", { name: "Command palette" })).not.toBeInTheDocument();
  });
});
