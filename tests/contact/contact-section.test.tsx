import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactSection } from "@/sections/contact-section";
import { communicationTerminal } from "@/data/contact";

afterEach(() => cleanup());

describe("ContactSection", () => {
  it("renders contact section with correct id", () => {
    render(<ContactSection />);

    expect(screen.getByTestId("contact-section")).toHaveAttribute("id", "contact");
  });

  it("uses aria-labelledby", () => {
    render(<ContactSection />);

    expect(screen.getByTestId("contact-section")).toHaveAttribute(
      "aria-labelledby",
      "contact-heading"
    );
  });

  it("renders heading", () => {
    render(<ContactSection />);

    expect(
      screen.getByRole("heading", {
        name: communicationTerminal.heading,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("renders communication terminal", () => {
    render(<ContactSection />);

    expect(screen.getByTestId("communication-terminal")).toBeInTheDocument();
  });

  it("contains responsive layout classes", () => {
    render(<ContactSection />);

    expect(
      screen.getByTestId("contact-section").querySelector(".lg\\:grid-cols-\\[0\\.9fr_1\\.1fr\\]")
    ).toBeTruthy();
  });
});
