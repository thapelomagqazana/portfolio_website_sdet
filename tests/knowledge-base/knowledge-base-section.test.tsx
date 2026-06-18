import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EngineeringIntelligenceSection } from "@/sections/engineering-intelligence-section";
import { engineeringIntelligenceCopy } from "@/data/knowledge-base";

afterEach(() => cleanup());

describe("EngineeringIntelligenceSection", () => {
  it("renders the section", () => {
    render(<EngineeringIntelligenceSection />);

    expect(screen.getByTestId("engineering-intelligence-section")).toHaveAttribute(
      "id",
      "engineering-intelligence"
    );

    expect(
      screen.getByRole("heading", {
        name: engineeringIntelligenceCopy.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("renders featured article", () => {
    render(<EngineeringIntelligenceSection />);

    expect(screen.getByTestId("featured-article")).toBeInTheDocument();
  });

  it("renders article cards", () => {
    render(<EngineeringIntelligenceSection />);

    expect(screen.getByTestId("article-grid")).toBeInTheDocument();
  });

  it("search filters articles", async () => {
    const user = userEvent.setup();

    render(<EngineeringIntelligenceSection />);

    await user.type(screen.getByTestId("article-search-input"), "playwright");

    expect(screen.getByText(/Playwright Best Practices/i)).toBeInTheDocument();
  });
});
