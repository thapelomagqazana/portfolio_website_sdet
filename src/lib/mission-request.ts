import {
  missionPriorityOptions,
  missionRequestLimits,
  missionRequestTypeOptions,
  missionRequestValidationMessages,
} from "@/data/mission-request";
import type {
  MissionPriority,
  MissionRequest,
  MissionRequestErrors,
  MissionRequestType,
  MissionRequestValidationResult,
} from "@/types/mission-request";

/**
 * Trims whitespace, collapses repeated spaces, and escapes unsafe HTML characters.
 */
export function sanitizeInput(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Preserves paragraph breaks for long text while still escaping HTML.
 */
export function sanitizeTextarea(value: string): string {
  return value
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Basic email validation suitable for contact intake.
 */
export function validateEmail(email: string): boolean {
  const normalized = email.trim();
  if (!normalized || normalized.length > missionRequestLimits.emailMax) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

/**
 * Validates message length after trimming.
 */
export function validateMessageLength(message: string): "valid" | "too-short" | "too-long" {
  const length = message.trim().length;

  if (length < missionRequestLimits.messageMin) return "too-short";
  if (length > missionRequestLimits.messageMax) return "too-long";

  return "valid";
}

/**
 * Checks whether a request type is supported.
 */
export function isMissionRequestType(value: string): value is MissionRequestType {
  return missionRequestTypeOptions.some((option) => option.id === value);
}

/**
 * Checks whether a priority is supported.
 */
export function isMissionPriority(value: string): value is MissionPriority {
  return missionPriorityOptions.some((option) => option.id === value);
}

/**
 * Sanitizes a mission request while enforcing safe maximum lengths.
 */
export function sanitizeMissionRequest(request: MissionRequest): MissionRequest {
  return {
    fullName: sanitizeInput(request.fullName).slice(0, missionRequestLimits.fullNameMax),
    company: sanitizeInput(request.company).slice(0, missionRequestLimits.companyMax),
    email: sanitizeInput(request.email).slice(0, missionRequestLimits.emailMax),
    requestType: request.requestType,
    priority: request.priority,
    subject: sanitizeInput(request.subject).slice(0, missionRequestLimits.subjectMax),
    message: sanitizeTextarea(request.message).slice(0, missionRequestLimits.messageMax),
  };
}

/**
 * Central reusable validation engine.
 */
export function validateMissionRequest(request: MissionRequest): MissionRequestValidationResult {
  const sanitized = sanitizeMissionRequest(request);
  const errors: MissionRequestErrors = {};

  if (!sanitized.fullName) {
    errors.fullName = missionRequestValidationMessages.fullNameRequired;
  }

  if (!sanitized.email) {
    errors.email = missionRequestValidationMessages.emailRequired;
  } else if (!validateEmail(sanitized.email)) {
    errors.email = missionRequestValidationMessages.emailInvalid;
  }

  if (!isMissionRequestType(sanitized.requestType)) {
    errors.requestType = missionRequestValidationMessages.requestTypeInvalid;
  }

  if (!isMissionPriority(sanitized.priority)) {
    errors.priority = missionRequestValidationMessages.priorityInvalid;
  }

  if (!sanitized.subject) {
    errors.subject = missionRequestValidationMessages.subjectRequired;
  }

  if (!sanitized.message) {
    errors.message = missionRequestValidationMessages.messageRequired;
  } else {
    const messageValidation = validateMessageLength(sanitized.message);

    if (messageValidation === "too-short") {
      errors.message = missionRequestValidationMessages.messageTooShort;
    }

    if (messageValidation === "too-long") {
      errors.message = missionRequestValidationMessages.messageTooLong;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

/**
 * Formats the request for future email, webhook, CRM, or Server Action integration.
 */
export function formatMissionRequest(request: MissionRequest): string {
  const sanitized = sanitizeMissionRequest(request);

  return [
    `Mission Request: ${sanitized.subject}`,
    "",
    `Name: ${sanitized.fullName}`,
    `Company: ${sanitized.company || "Not provided"}`,
    `Email: ${sanitized.email}`,
    `Request Type: ${sanitized.requestType}`,
    `Priority: ${sanitized.priority}`,
    "",
    "Mission Brief:",
    sanitized.message,
  ].join("\n");
}
