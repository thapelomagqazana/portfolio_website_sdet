import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FooterNavigation } from "@/components/footer/footer-navigation";
import { footerExternalLinks, footerNavigationLinks } from "@/data/footer";

afterEach(() => cleanup());

describe("FooterNavigation", () => {
  it("renders footer navigation", () => {
    render(<FooterNavigation />);

    expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
  });

  it("renders internal links", () => {
    render(<FooterNavigation />);

    for (const link of footerNavigationLinks) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
  });

  it("renders external links with safe attributes", () => {
    render(<FooterNavigation />);

    for (const link of footerExternalLinks.filter((item) => item.external)) {
      const element = screen.getByRole("link", { name: new RegExp(link.label, "i") });

      expect(element).toHaveAttribute("target", "_blank");
      expect(element).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
