import { describe, expect, it } from "vitest";
import { footerNavigationLinks } from "@/data/footer";
import {
  footerLinkIsRenderable,
  formatPortfolioVersion,
  getMissionStatusLabel,
  getReleaseStatusLabel,
  getStatusLabel,
  getSystemStatusLabel,
  isExternalFooterLink,
  statusCardIsRenderable,
} from "@/lib/footer";

describe("footer utilities", () => {
  it("formats portfolio versions", () => {
    expect(formatPortfolioVersion("2.0")).toBe("v2.0");
    expect(formatPortfolioVersion("v2.0")).toBe("v2.0");
    expect(formatPortfolioVersion("")).toBe("Version unavailable");
  });

  it("resolves status labels safely", () => {
    expect(getSystemStatusLabel("operational")).toBe("Operational");
    expect(getMissionStatusLabel("building")).toBe("Building");
    expect(getReleaseStatusLabel("approved")).toBe("Approved");
    expect(getStatusLabel("missing")).toBe("Unknown");
  });

  it("validates status cards", () => {
    expect(
      statusCardIsRenderable({
        id: "x",
        label: "Status",
        value: "Operational",
        status: "operational",
      })
    ).toBe(true);

    expect(
      statusCardIsRenderable({
        id: "",
        label: "",
        value: "",
        status: "operational",
      })
    ).toBe(false);
  });

  it("validates footer links", () => {
    expect(footerNavigationLinks.every(footerLinkIsRenderable)).toBe(true);
    expect(footerLinkIsRenderable({ id: "", label: "", href: "" })).toBe(false);
  });

  it("detects external links", () => {
    expect(
      isExternalFooterLink({
        id: "github",
        label: "GitHub",
        href: "https://github.com",
      })
    ).toBe(true);

    expect(
      isExternalFooterLink({
        id: "contact",
        label: "Contact",
        href: "#contact",
      })
    ).toBe(false);
  });
});
