"use client";

import { useMemo, useState } from "react";
import {
  initialMissionRequest,
  missionPriorityOptions,
  missionRequestContent,
  missionRequestLimits,
  missionRequestTypeOptions,
} from "@/data/mission-request";
import { validateMissionRequest } from "@/lib/mission-request";
import type {
  MissionRequest,
  MissionRequestErrors,
  MissionRequestField,
  MissionSubmissionState,
} from "@/types/mission-request";
import { submitMissionRequestAction } from "@/app/actions/submit-mission-request";

/**
 * Engineering mission request form.
 *
 * This component is intentionally client-only for interactive validation.
 * Submission is simulated for now, but the shape is ready for Next.js Server
 * Actions, webhooks, Resend, CRM integration, rate limiting, and reCAPTCHA.
 */
export function MissionRequestForm() {
  const [form, setForm] = useState<MissionRequest>(initialMissionRequest);
  const [errors, setErrors] = useState<MissionRequestErrors>({});
  const [submissionState, setSubmissionState] = useState<MissionSubmissionState>("idle");

  const messageCount = form.message.length;
  const messageNearLimit = messageCount >= missionRequestLimits.messageMax * 0.9;
  const isSubmitting = submissionState === "submitting";

  const submitLabel = useMemo(() => {
    if (submissionState === "submitting") return missionRequestContent.submittingLabel;
    if (submissionState === "success") return "Mission Sent";
    return missionRequestContent.submitLabel;
  }, [submissionState]);

  function updateField<Field extends MissionRequestField>(
    field: Field,
    value: MissionRequest[Field]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submissionState !== "idle") setSubmissionState("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateMissionRequest(form);
    setErrors(validation.errors);

    if (!validation.valid) {
      setSubmissionState("error");
      return;
    }

    setSubmissionState("submitting");

    try {
      const result = await submitMissionRequestAction({
        ...validation.sanitized,
        website: "",
      });

      if (!result.ok) {
        setSubmissionState("error");
        return;
      }
      setForm(initialMissionRequest);
      setErrors({});
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  if (submissionState === "success") {
    return <MissionRequestSuccess onReset={() => setSubmissionState("idle")} />;
  }

  return (
    <section
      id="mission-request"
      aria-labelledby="mission-request-heading"
      className="border-accent-blue/20 mt-10 rounded-3xl border bg-white/[0.04] p-5 backdrop-blur-xl"
      data-testid="mission-request-form-section"
    >
      <div className="max-w-3xl">
        <p className="text-accent-blue font-mono text-xs tracking-[0.3em] uppercase">
          {missionRequestContent.eyebrow}
        </p>

        <h3
          id="mission-request-heading"
          className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight"
        >
          {missionRequestContent.heading}
        </h3>

        <p className="text-text-secondary mt-4 text-sm leading-7">
          {missionRequestContent.description}
        </p>
      </div>

      {submissionState === "error" ? (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
          data-testid="mission-request-error"
        >
          <p className="font-bold">{missionRequestContent.errorTitle}</p>
          <p className="mt-1">{missionRequestContent.errorMessage}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5">
        {/* Honeypot field: real users will not see or fill this. Bots often will. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            id="fullName"
            label="Full Name"
            required
            value={form.fullName}
            error={errors.fullName}
            maxLength={missionRequestLimits.fullNameMax}
            onChange={(value) => updateField("fullName", value)}
          />

          <FormField
            id="company"
            label="Company"
            value={form.company}
            error={errors.company}
            maxLength={missionRequestLimits.companyMax}
            onChange={(value) => updateField("company", value)}
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            required
            value={form.email}
            error={errors.email}
            maxLength={missionRequestLimits.emailMax}
            onChange={(value) => updateField("email", value)}
          />

          <FormSelect
            id="requestType"
            label="Request Type"
            required
            value={form.requestType}
            error={errors.requestType}
            options={missionRequestTypeOptions}
            onChange={(value) => updateField("requestType", value as MissionRequest["requestType"])}
          />

          <FormSelect
            id="priority"
            label="Priority"
            required
            value={form.priority}
            error={errors.priority}
            options={missionPriorityOptions}
            onChange={(value) => updateField("priority", value as MissionRequest["priority"])}
          />

          <FormField
            id="subject"
            label="Subject"
            required
            value={form.subject}
            error={errors.subject}
            maxLength={missionRequestLimits.subjectMax}
            onChange={(value) => updateField("subject", value)}
          />
        </div>

        <FormTextarea
          id="message"
          label="Mission Brief"
          required
          value={form.message}
          error={errors.message}
          minLength={missionRequestLimits.messageMin}
          maxLength={missionRequestLimits.messageMax}
          onChange={(value) => updateField("message", value)}
          count={messageCount}
          nearLimit={messageNearLimit}
        />

        <p className="bg-background-deep/50 text-text-muted rounded-2xl border border-white/10 p-4 text-xs leading-6">
          {missionRequestContent.privacyNotice}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-accent-green/40 bg-accent-green/10 text-accent-green hover:border-accent-blue/40 hover:text-accent-blue focus-visible:ring-accent-blue/70 inline-flex w-full items-center justify-center rounded-full border px-5 py-3 font-mono text-sm font-semibold tracking-[0.16em] uppercase transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          data-testid="mission-request-submit"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}

type FormFieldProps = {
  readonly id: MissionRequestField;
  readonly label: string;
  readonly value: string;
  readonly error?: string;
  readonly type?: "text" | "email";
  readonly required?: boolean;
  readonly maxLength?: number;
  readonly onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  value,
  error,
  type = "text",
  required = false,
  maxLength,
  onChange,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
        {label}
        {required ? <span className="text-accent-green"> *</span> : null}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="bg-background-deep/60 text-text-primary placeholder:text-text-muted focus:border-accent-blue/50 focus:ring-accent-blue/20 mt-2 w-full rounded-2xl border border-white/10 px-4 py-3 transition outline-none focus:ring-2"
      />

      <ValidationMessage id={errorId} message={error} />
    </div>
  );
}

type SelectOption = {
  readonly id: string;
  readonly label: string;
};

type FormSelectProps = {
  readonly id: MissionRequestField;
  readonly label: string;
  readonly value: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly options: readonly SelectOption[];
  readonly onChange: (value: string) => void;
};

function FormSelect({
  id,
  label,
  value,
  error,
  required = false,
  options,
  onChange,
}: FormSelectProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
        {label}
        {required ? <span className="text-accent-green"> *</span> : null}
      </label>

      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="bg-background-deep/60 text-text-primary focus:border-accent-blue/50 focus:ring-accent-blue/20 mt-2 w-full rounded-2xl border border-white/10 px-4 py-3 transition outline-none focus:ring-2"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      <ValidationMessage id={errorId} message={error} />
    </div>
  );
}

type FormTextareaProps = {
  readonly id: MissionRequestField;
  readonly label: string;
  readonly value: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly minLength: number;
  readonly maxLength: number;
  readonly count: number;
  readonly nearLimit: boolean;
  readonly onChange: (value: string) => void;
};

function FormTextarea({
  id,
  label,
  value,
  error,
  required = false,
  minLength,
  maxLength,
  count,
  nearLimit,
  onChange,
}: FormTextareaProps) {
  const errorId = `${id}-error`;
  const counterId = `${id}-counter`;

  return (
    <div>
      <label htmlFor={id} className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
        {label}
        {required ? <span className="text-accent-green"> *</span> : null}
      </label>

      <textarea
        id={id}
        name={id}
        value={value}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={8}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${errorId} ${counterId}` : counterId}
        onChange={(event) => onChange(event.target.value)}
        className="bg-background-deep/60 text-text-primary placeholder:text-text-muted focus:border-accent-blue/50 focus:ring-accent-blue/20 mt-2 w-full resize-y rounded-2xl border border-white/10 px-4 py-3 transition outline-none focus:ring-2"
      />

      <div className="mt-2 flex items-center justify-between gap-4">
        <ValidationMessage id={errorId} message={error} />

        <p
          id={counterId}
          className={[
            "ml-auto font-mono text-xs",
            nearLimit ? "text-amber-300" : "text-text-muted",
          ].join(" ")}
          data-testid="mission-message-counter"
        >
          {count} / {maxLength}
        </p>
      </div>
    </div>
  );
}

function ValidationMessage({ id, message }: { readonly id: string; readonly message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-xs text-red-300" data-testid={`${id}`}>
      {message}
    </p>
  );
}

function MissionRequestSuccess({ onReset }: { readonly onReset: () => void }) {
  return (
    <section
      id="mission-request"
      aria-labelledby="mission-request-success-heading"
      className="border-accent-green/30 bg-accent-green/10 mt-10 rounded-3xl border p-6 backdrop-blur-xl"
      data-testid="mission-request-success"
    >
      <p className="text-accent-green text-4xl" aria-hidden="true">
        ✓
      </p>

      <h3
        id="mission-request-success-heading"
        className="font-display text-text-primary mt-4 text-3xl font-black"
      >
        {missionRequestContent.successTitle}
      </h3>

      <p className="text-text-secondary mt-3 text-sm leading-7">
        {missionRequestContent.successMessage}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="border-accent-green/40 bg-accent-green/10 text-accent-green hover:border-accent-blue/40 hover:text-accent-blue focus-visible:ring-accent-blue/70 mt-6 rounded-full border px-5 py-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase transition focus:outline-none focus-visible:ring-2"
      >
        Submit another mission
      </button>
    </section>
  );
}
