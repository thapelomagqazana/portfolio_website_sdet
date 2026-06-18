import { describe, expect, it } from "vitest";
import {
  isMissionPriority,
  isMissionRequestType,
  sanitizeInput,
  sanitizeTextarea,
  validateEmail,
  validateMessageLength,
  validateMissionRequest,
} from "@/lib/mission-request";
import type { MissionRequest } from "@/types/mission-request";

const validRequest: MissionRequest = {
  fullName: "Thapelo Magqazana",
  company: "BrikByte Studios",
  email: "test@example.com",
  requestType: "quality-engineering",
  priority: "normal",
  subject: "Quality engineering support",
  message: "I need help improving release confidence across my engineering workflow.",
};

describe("mission request validation", () => {
  it("passes valid input", () => {
    expect(validateMissionRequest(validRequest).valid).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = validateMissionRequest({
      ...validRequest,
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.subject).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it("validates email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("bad-email")).toBe(false);
  });

  it("validates message length", () => {
    expect(validateMessageLength("short")).toBe("too-short");
    expect(validateMessageLength("a".repeat(5001))).toBe("too-long");
    expect(validateMessageLength("a".repeat(30))).toBe("valid");
  });

  it("sanitizes dangerous input", () => {
    expect(sanitizeInput("<script>alert(1)</script>")).toContain("&lt;script&gt;");
    expect(sanitizeTextarea("<b>Hello</b>")).toContain("&lt;b&gt;");
  });

  it("validates supported enums", () => {
    expect(isMissionRequestType("quality-engineering")).toBe(true);
    expect(isMissionRequestType("invalid")).toBe(false);

    expect(isMissionPriority("normal")).toBe(true);
    expect(isMissionPriority("urgent")).toBe(false);
  });
});
