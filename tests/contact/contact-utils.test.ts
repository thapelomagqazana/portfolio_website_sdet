import { describe, expect, it } from "vitest";
import { contactProfile, terminalCommands } from "@/data/contact";
import {
  contactActionIsRenderable,
  formatContactProfile,
  getAvailabilityDescription,
  getAvailabilityLabel,
  getResponseTime,
  getSafeContactHref,
  parseTerminalCommand,
} from "@/lib/contact";

describe("contact utilities", () => {
  it("resolves availability labels safely", () => {
    expect(getAvailabilityLabel("available")).toBe("Available");
    expect(getAvailabilityLabel("unknown")).toBe("Unknown");
  });

  it("resolves availability descriptions safely", () => {
    expect(getAvailabilityDescription("available")).toContain("Open");
    expect(getAvailabilityDescription("unknown")).toContain("unavailable");
  });

  it("resolves response time safely", () => {
    expect(getResponseTime("available")).toBe("Within 24 hours");
    expect(getResponseTime("unknown")).toBe("To be confirmed");
  });

  it("parses terminal commands", () => {
    expect(parseTerminalCommand("connect --email")?.id).toBe("email");
    expect(parseTerminalCommand("email")?.id).toBe("email");
    expect(parseTerminalCommand("missing")).toBeUndefined();
  });

  it("formats profile lines", () => {
    expect(formatContactProfile(contactProfile)).toEqual(
      expect.arrayContaining([expect.stringContaining("Thapelo Magqazana")])
    );
  });

  it("allows safe hrefs only", () => {
    expect(getSafeContactHref("mailto:test@example.com")).toBe("mailto:test@example.com");
    expect(getSafeContactHref("https://example.com")).toBe("https://example.com");
    expect(getSafeContactHref("/resume.pdf")).toBe("/resume.pdf");
    expect(getSafeContactHref("javascript:alert(1)")).toBeUndefined();
  });

  it("validates renderable actions", () => {
    expect(terminalCommands.every(contactActionIsRenderable)).toBe(true);

    expect(
      contactActionIsRenderable({
        id: "",
        label: "Bad",
        command: "bad",
        href: "javascript:alert(1)",
      })
    ).toBe(false);
  });
});
