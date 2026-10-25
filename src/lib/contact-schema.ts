import { z } from "zod";

const email = z.string().email();
const phone = z.string().regex(/^\+?[\d\s\-()]{7,20}$/);

/** Shared by the form (client) and /api/contact (server). Messages are keys into dict.form.errors. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "name"),
  company: z.string().trim().max(160).optional().default(""),
  contact: z
    .string()
    .trim()
    .refine((v) => email.safeParse(v).success || phone.safeParse(v).success, "contact"),
  service: z.string().trim().max(60).optional().default(""),
  package: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10, "message").max(4000, "message"),
  consent: z.literal(true, { message: "consent" }),
  lang: z.enum(["ar", "en"]),
  // spam traps
  website: z.string().max(0).optional().default(""),
  elapsed: z.number().min(2500),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ErrorKey = "name" | "contact" | "message" | "consent";
