import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact delivery. Configure one of:
 *  - CONTACT_WEBHOOK_URL  → receives the JSON payload (Make, Zapier, Slack workflow, CRM…)
 *  - RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL) → sent as an email via Resend
 * Without either, development logs the request; production answers 503 so nothing is silently lost.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => String(i.path[0]));
    // Bots tripping the honeypot or the time trap get a quiet success.
    if (fields.includes("website") || fields.includes("elapsed")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 422 });
  }

  const d = parsed.data;
  const payload = {
    name: d.name,
    company: d.company,
    contact: d.contact,
    service: d.service,
    message: d.message,
    lang: d.lang,
    receivedAt: new Date().toISOString(),
  };

  try {
    if (process.env.CONTACT_WEBHOOK_URL) {
      const r = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return NextResponse.json({ ok: true });
    }

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "SEET Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: d.contact.includes("@") ? d.contact : undefined,
          subject: `New project request — ${d.name}${d.company ? ` (${d.company})` : ""}`,
          text: Object.entries(payload)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] (no delivery configured)", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  } catch (e) {
    console.error("[contact] delivery failed", e);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
