/**
 * Shared Mission Request form types.
 */

export type MissionRequestType =
  | "consulting"
  | "quality-engineering"
  | "test-automation"
  | "release-engineering"
  | "software-development"
  | "architecture-review"
  | "speaking"
  | "other";

export type MissionPriority = "low" | "normal" | "high";

export type MissionRequest = {
  readonly fullName: string;
  readonly company: string;
  readonly email: string;
  readonly requestType: MissionRequestType;
  readonly priority: MissionPriority;
  readonly subject: string;
  readonly message: string;
};

export type MissionRequestField = keyof MissionRequest;

export type MissionRequestErrors = Partial<Record<MissionRequestField, string>>;

export type MissionSubmissionState = "idle" | "submitting" | "success" | "error";

export type MissionRequestValidationResult = {
  readonly valid: boolean;
  readonly errors: MissionRequestErrors;
  readonly sanitized: MissionRequest;
};
