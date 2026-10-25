"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { gsap, reducedMotion } from "@/lib/gsap";
import { contactSchema, type ErrorKey } from "@/lib/contact-schema";
import type { Dictionary } from "@/dictionaries/ar";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";
const formspreeEndpoint = "https://formspree.io/f/xzedyqwk";

export function ContactForm({ lang, t, services }: { lang: Locale; t: Dictionary["form"]; services: { slug: string; title: string }[] }) {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const packagePreset = params.get("package") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const started = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const plane = useRef<SVGSVGElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const read = (f: HTMLFormElement) => {
    const fd = new FormData(f);
    return {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      service: String(fd.get("service") ?? ""),
      package: String(fd.get("package") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      lang,
      elapsed: Date.now() - started.current,
    };
  };

  const validate = (data: ReturnType<typeof read>) => {
    const r = contactSchema.safeParse({ ...data, elapsed: Math.max(data.elapsed, 2500), website: "" });
    if (r.success) return {};
    const out: Partial<Record<ErrorKey, boolean>> = {};
    for (const i of r.error.issues) {
      const k = String(i.path[0]) as ErrorKey;
      if (["name", "contact", "message", "consent"].includes(k)) out[k] = true;
    }
    return out;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = read(f);
    const errs = validate(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      f.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          contact: data.contact,
          service: data.service,
          package: data.package,
          message: data.message,
          language: data.lang,
          consent: data.consent ? "yes" : "no",
          _subject: `New SEET project request — ${data.name}`,
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  // Paper plane takes off when the request is sent.
  useEffect(() => {
    if (status !== "sent") return;
    done.current?.focus();
    if (reducedMotion() || !plane.current) return;
    const dir = lang === "ar" ? -1 : 1;
    gsap.fromTo(
      plane.current,
      { x: 0, y: 0, rotate: 0, opacity: 1 },
      { x: 520 * dir, y: -320, rotate: -18 * dir, opacity: 0, duration: 1.6, ease: "power2.in" },
    );
  }, [status, lang]);

  if (status === "sent") {
    return (
      <div ref={done} className={styles.done} tabIndex={-1} role="status">
        <svg ref={plane} className={styles.plane} viewBox="-30 -20 60 40" aria-hidden="true">
          <path d="M-26 -18 L30 0 L-26 18 L-14 0 Z" fill="var(--navy)" />
          <path d="M-14 0 L30 0" stroke="var(--white)" strokeWidth="2" />
        </svg>
        <h2 className="h2">{t.sentTitle}</h2>
        <p className="lead">{t.sentBody}</p>
        <Button
          variant="outline"
          onClick={() => {
            setStatus("idle");
            started.current = Date.now();
          }}
        >
          {t.again}
        </Button>
      </div>
    );
  }

  const err = (k: ErrorKey) =>
    errors[k] ? (
      <span id={`${k}-err`} className={styles.err}>
        {t.errors[k]}
      </span>
    ) : null;

  return (
    <form ref={form} className={styles.form} action={formspreeEndpoint} method="POST" onSubmit={submit} noValidate>
      <input type="hidden" name="package" value={packagePreset} />
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.lbl}>{t.name}</span>
          <input name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {err("name")}
        </label>
        <label className={styles.field}>
          <span className={styles.lbl}>
            {t.company} <em>({t.optional})</em>
          </span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.lbl}>{t.contact}</span>
          <input
            name="contact"
            autoComplete="email"
            inputMode="email"
            dir="auto"
            required
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "contact-err" : undefined}
          />
          {err("contact")}
        </label>
        <label className={styles.field}>
          <span className={styles.lbl}>{t.service}</span>
          <span className={styles.select}>
            <select name="service" defaultValue={services.some((s) => s.slug === preset) ? preset : ""}>
              <option value="">{t.serviceNone}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.lbl}>{t.message}</span>
        <textarea
          name="message"
          rows={6}
          required
          placeholder={t.messageHint}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {err("message")}
      </label>

      {/* honeypot: hidden from people, irresistible to bots */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={styles.check}>
        <input type="checkbox" name="consent" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
        <span className={styles.box} aria-hidden="true" />
        <span>{t.consent}</span>
      </label>
      {err("consent")}

      {status === "error" && (
        <p className={styles.server} role="alert">
          {t.errors.server}
        </p>
      )}

      <div>
        <Button type="submit" variant="navy" size="lg" disabled={status === "sending"} magnetic={false}>
          {status === "sending" ? t.sending : t.submit}
        </Button>
      </div>
    </form>
  );
}
