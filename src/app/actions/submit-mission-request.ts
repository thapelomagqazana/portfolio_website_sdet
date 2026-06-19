"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { missionRequestSchema } from "@/lib/mission-request-schema";
import { rateLimit } from "@/lib/rate-limit";

export type MissionRequestActionState =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function submitMissionRequestAction(
  payload: unknown
): Promise<MissionRequestActionState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`mission-request:${ip}`);

  if (!limit.allowed) {
    return {
      ok: false,
      message: "Too many mission requests. Please wait a moment and try again.",
    };
  }

  const parsed = missionRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const request = parsed.data;

  if (request.website) {
    return {
      ok: true,
      message: "Mission received.",
    };
  }

  const resend = getResendClient();

  if (!resend) {
    return {
      ok: false,
      message: "Email service is not configured.",
    };
  }

  await resend.emails.send({
    from: process.env.MISSION_REQUEST_FROM_EMAIL ?? "onboarding@resend.dev",
    to: process.env.MISSION_REQUEST_TO_EMAIL ?? "tapsmcgzee8@gmail.com",
    replyTo: request.email,
    subject: `Mission Request: ${request.subject}`,
    text: formatMissionRequestEmail(request),
  });

  return {
    ok: true,
    message: "Mission received. I will respond as soon as possible.",
  };
}

function formatMissionRequestEmail(request: {
  fullName: string;
  company: string;
  email: string;
  requestType: string;
  priority: string;
  subject: string;
  message: string;
}) {
  return `
New Mission Request

Name: ${request.fullName}
Company: ${request.company || "Not provided"}
Email: ${request.email}
Request Type: ${request.requestType}
Priority: ${request.priority}
Subject: ${request.subject}

Mission Brief:
${request.message}
`.trim();
}

function getResendClient(): Resend | undefined {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) return undefined;

  return new Resend(apiKey);
}
