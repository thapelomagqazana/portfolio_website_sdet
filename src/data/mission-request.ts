import type { MissionPriority, MissionRequestType } from "@/types/mission-request";

/**
 * Centralized Mission Request copy, labels, limits, and select options.
 */

export const missionRequestContent = {
  eyebrow: "Mission Request",
  heading: "Start a new engineering mission.",
  description:
    "Share your engineering challenge and let's explore how quality, automation, and evidence-driven delivery can help.",
  submitLabel: "Submit Mission",
  submittingLabel: "Submitting mission...",
  successTitle: "Mission Received",
  successMessage:
    "Thank you. Your engineering mission has been received. I'll respond as soon as possible.",
  errorTitle: "Mission Transmission Failed",
  errorMessage:
    "Something went wrong while preparing the mission request. Please review the form and try again.",
  privacyNotice:
    "Your details are used only to respond to this mission request. Do not include passwords, secrets, API keys, or confidential production data.",
} as const;

export const missionRequestLimits = {
  fullNameMax: 120,
  companyMax: 160,
  emailMax: 254,
  subjectMax: 160,
  messageMin: 30,
  messageMax: 5000,
} as const;

export const missionRequestTypeOptions: readonly {
  readonly id: MissionRequestType;
  readonly label: string;
}[] = [
  { id: "quality-engineering", label: "Quality Engineering" },
  { id: "test-automation", label: "Test Automation" },
  { id: "release-engineering", label: "Release Engineering" },
  { id: "software-development", label: "Software Development" },
  { id: "architecture-review", label: "Architecture Review" },
  { id: "consulting", label: "Consulting" },
  { id: "speaking", label: "Speaking" },
  { id: "other", label: "Other" },
] as const;

export const missionPriorityOptions: readonly {
  readonly id: MissionPriority;
  readonly label: string;
}[] = [
  { id: "low", label: "Low" },
  { id: "normal", label: "Normal" },
  { id: "high", label: "High" },
] as const;

export const missionRequestValidationMessages = {
  fullNameRequired: "Full name is required.",
  emailRequired: "Email address is required.",
  emailInvalid: "Enter a valid email address.",
  subjectRequired: "Subject is required.",
  messageRequired: "Mission brief is required.",
  messageTooShort: `Mission brief must be at least ${missionRequestLimits.messageMin} characters.`,
  messageTooLong: `Mission brief must be ${missionRequestLimits.messageMax} characters or fewer.`,
  requestTypeInvalid: "Select a valid request type.",
  priorityInvalid: "Select a valid priority.",
} as const;

export const initialMissionRequest = {
  fullName: "",
  company: "",
  email: "",
  requestType: "quality-engineering",
  priority: "normal",
  subject: "",
  message: "",
} as const;
