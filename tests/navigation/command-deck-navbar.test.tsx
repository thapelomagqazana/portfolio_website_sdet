import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { CommandDeckNavbar } from "../../src/components/layout/command-deck-navbar";
import { ScrollNarrativeProvider } from "../../src/components/motion/scroll-narrative-provider";
import { navigationItems } from "../../src/data/navigation";

afterEach(() => {
  cleanup();
});

function renderNavbar() {
  return render(
    <ScrollNarrativeProvider>
      <CommandDeckNavbar />
    </ScrollNarrativeProvider>
  );
}

describe("CommandDeckNavbar", () => {
  it("renders the brand name and role", () => {
    renderNavbar();

    expect(screen.getByText("Thapelo Magqazana")).toBeInTheDocument();
    expect(screen.getByText("SDET • Quality Engineering")).toBeInTheDocument();
  });

  it("renders all centralized navigation links", () => {
    renderNavbar();

    for (const item of navigationItems) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links[0]).toHaveAttribute("href", item.href);
    }
  });

  it("renders narrative status indicator", () => {
    renderNavbar();

    expect(screen.getAllByTestId("narrative-status")[0]).toBeInTheDocument();
  });

  it("renders contact CTA", () => {
    renderNavbar();

    expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "#contact");
  });

  it("has sticky navbar styling", () => {
    renderNavbar();

    expect(screen.getByTestId("command-deck-navbar")).toHaveClass("sticky");
    expect(screen.getByTestId("command-deck-navbar")).toHaveClass("top-0");
    expect(screen.getByTestId("command-deck-navbar")).toHaveClass("z-50");
  });

  it("opens mobile menu", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const button = screen.getByRole("button", { name: "Toggle navigation menu" });

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("closes mobile menu when a mobile link is clicked", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const button = screen.getByRole("button", { name: "Toggle navigation menu" });

    await user.click(button);
    await user.click(screen.getAllByRole("link", { name: "Mission" }).at(-1)!);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
