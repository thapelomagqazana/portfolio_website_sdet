import { z } from "zod";

export const missionRequestSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  requestType: z.enum([
    "consulting",
    "quality-engineering",
    "test-automation",
    "release-engineering",
    "software-development",
    "architecture-review",
    "speaking",
    "other",
  ]),
  priority: z.enum(["low", "normal", "high"]),
  subject: z.string().trim().min(1, "Subject is required.").max(180),
  message: z.string().trim().min(30, "Mission brief must be at least 30 characters.").max(5000),
  website: z.string().trim().max(0).optional().default(""),
});

export type MissionRequestPayload = z.infer<typeof missionRequestSchema>;
