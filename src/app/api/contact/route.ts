import { after, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const maxDuration = 15;

const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xzedyqwk";
const resendEndpoint = process.env.RESEND_API_ENDPOINT ?? "https://api.resend.com/emails";
const resendFrom = "SEET <noreply@seet.agency>";

type ContactPayload = {
  requestId: string;
  name: string;
  company: string;
  contact: string;
  service: string;
  package: string;
  message: string;
  lang: "ar" | "en";
  receivedAt: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function clientEmail(payload: ContactPayload) {
  const ar = payload.lang === "ar";
  const title = ar ? "وصلتنا رسالتك" : "We received your message";
  const intro = ar
    ? `أهلًا ${payload.name}، شكرًا لتواصلك مع SEET. وصلنا طلبك بنجاح، وراح نراجع التفاصيل ونتواصل معك قريبًا.`
    : `Hi ${payload.name}, thanks for contacting SEET. We received your request and will review the details and get back to you soon.`;
  const summary = ar ? "ملخص طلبك" : "Your request";
  const serviceLabel = ar ? "الخدمة" : "Service";
  const packageLabel = ar ? "الباقة" : "Package";
  const messageLabel = ar ? "الرسالة" : "Message";
  const fallback = ar ? "غير محددة" : "Not specified";

  return {
    subject: ar ? "وصلتنا رسالتك | SEET" : "We received your message | SEET",
    text: [
      title,
      "",
      intro,
      "",
      `${serviceLabel}: ${payload.service || fallback}`,
      ...(payload.package ? [`${packageLabel}: ${payload.package}`] : []),
      `${messageLabel}: ${payload.message}`,
      "",
      "SEET Marketing Agency",
    ].join("\n"),
    html: `<!doctype html>
<html lang="${payload.lang}" dir="${ar ? "rtl" : "ltr"}">
  <body style="margin:0;background:#f2f2f5;color:#100f0d;font-family:Arial,sans-serif;line-height:1.7">
    <div style="max-width:640px;margin:0 auto;padding:32px 18px">
      <div style="background:#2b2a68;color:#fff;border-radius:22px 22px 0 0;padding:32px">
        <p style="margin:0 0 10px;color:#b9b6f2;font-size:12px;font-weight:700;letter-spacing:.08em">SEET MARKETING AGENCY</p>
        <h1 style="margin:0;font-size:32px;line-height:1.2">${title}</h1>
      </div>
      <div style="background:#fff;border:1px solid #dedee7;border-top:0;border-radius:0 0 22px 22px;padding:32px">
        <p style="margin:0 0 26px;font-size:17px">${escapeHtml(intro)}</p>
        <h2 style="margin:0 0 12px;color:#2b2a68;font-size:18px">${summary}</h2>
        <div style="border-top:2px solid #100f0d">
          <p style="margin:0;padding:12px 0;border-bottom:1px solid #dedee7"><strong>${serviceLabel}:</strong> ${escapeHtml(payload.service || fallback)}</p>
          ${payload.package ? `<p style="margin:0;padding:12px 0;border-bottom:1px solid #dedee7"><strong>${packageLabel}:</strong> ${escapeHtml(payload.package)}</p>` : ""}
          <p style="margin:0;padding:12px 0;border-bottom:1px solid #dedee7;white-space:pre-wrap"><strong>${messageLabel}:</strong><br>${escapeHtml(payload.message)}</p>
        </div>
        <p style="margin:28px 0 0;color:#666;font-size:13px">SEET Marketing Agency · Beni Suef, Egypt</p>
      </div>
    </div>
  </body>
</html>`,
  };
}

function companyEmail(payload: ContactPayload) {
  const values = [
    ["Name", payload.name],
    ["Company", payload.company || "—"],
    ["Contact", payload.contact],
    ["Service", payload.service || "—"],
    ["Package", payload.package || "—"],
    ["Language", payload.lang],
    ["Received", payload.receivedAt],
  ];

  return {
    subject: `New project request — ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
    text: [...values.map(([label, value]) => `${label}: ${value}`), `Message: ${payload.message}`].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f2f2f5;color:#100f0d;font-family:Arial,sans-serif;line-height:1.6">
    <div style="max-width:680px;margin:0 auto;padding:32px 18px">
      <div style="background:#2b2a68;color:#fff;border-radius:22px 22px 0 0;padding:30px">
        <p style="margin:0 0 8px;color:#b9b6f2;font-size:12px;font-weight:700;letter-spacing:.08em">NEW WEBSITE REQUEST</p>
        <h1 style="margin:0;font-size:30px">${escapeHtml(payload.name)}</h1>
      </div>
      <div style="background:#fff;border:1px solid #dedee7;border-top:0;border-radius:0 0 22px 22px;padding:30px">
        <table role="presentation" style="width:100%;border-collapse:collapse">
          ${values.map(([label, value]) => `<tr><th style="width:120px;padding:11px 8px;text-align:left;vertical-align:top;border-bottom:1px solid #dedee7;color:#2b2a68">${label}</th><td style="padding:11px 8px;border-bottom:1px solid #dedee7">${escapeHtml(value)}</td></tr>`).join("")}
        </table>
        <h2 style="margin:26px 0 10px;color:#2b2a68;font-size:18px">Message</h2>
        <div style="padding:16px;background:#f2f2f5;border-radius:12px;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
      </div>
    </div>
  </body>
</html>`,
  };
}

async function sendResendEmail(args: {
  to: string;
  subject: string;
  text: string;
  html: string;
  idempotencyKey: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true, reason: "missing_api_key" } as const;

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": args.idempotencyKey,
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [args.to],
      subject: args.subject,
      text: args.text,
      html: args.html,
      reply_to: args.replyTo,
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 300)}`);
  }
  return { skipped: false } as const;
}

async function sendNotifications(payload: ContactPayload) {
  const companyAddress = process.env.CONTACT_TO_EMAIL?.trim();
  const tasks: Promise<unknown>[] = [];

  if (isEmail(payload.contact)) {
    tasks.push(
      sendResendEmail({
        to: payload.contact,
        ...clientEmail(payload),
        idempotencyKey: `contact/${payload.requestId}/client`,
      }),
    );
  }

  if (companyAddress) {
    tasks.push(
      sendResendEmail({
        to: companyAddress,
        ...companyEmail(payload),
        idempotencyKey: `contact/${payload.requestId}/company`,
        replyTo: isEmail(payload.contact) ? payload.contact : undefined,
      }),
    );
  }

  if (!tasks.length) {
    console.info("[contact] Resend notifications skipped: no eligible recipients configured");
    return;
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const reason =
        result.reason instanceof Error ? result.reason.message : String(result.reason);

      console.warn(
        `[contact] Resend notification ${index + 1} failed: ${reason}`,
      );
    }
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => String(issue.path[0]));
    // Bots tripping the honeypot or time trap receive a quiet success.
    if (fields.includes("website") || fields.includes("elapsed")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 422 });
  }

  const data = parsed.data;
  const payload: ContactPayload = {
    requestId: crypto.randomUUID(),
    name: data.name,
    company: data.company,
    contact: data.contact,
    service: data.service,
    package: data.package,
    message: data.message,
    lang: data.lang,
    receivedAt: new Date().toISOString(),
  };

  try {
    const formspree = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        company: payload.company,
        contact: payload.contact,
        service: payload.service,
        package: payload.package,
        message: payload.message,
        language: payload.lang,
        consent: "yes",
        requestId: payload.requestId,
        receivedAt: payload.receivedAt,
        _subject: `New SEET project request — ${payload.name}`,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!formspree.ok) throw new Error(`Formspree ${formspree.status}`);

    // Email is best-effort and runs after the success response. Formspree remains
    // the source of truth, so missing credentials, quota limits or Resend outages
    // never turn a successfully received enquiry into an error for the visitor.
    after(() => sendNotifications(payload));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Formspree delivery failed", error);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
