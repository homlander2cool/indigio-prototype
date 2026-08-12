"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/forms/Field";
import { email as validateEmail, required, validateFields } from "@/lib/validation";

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values | "form", string>>;

const RULES: Record<keyof Values, Parameters<typeof validateFields>[1][keyof Values]> = {
  name: [required("Name")],
  email: [validateEmail],
  subject: [required("Subject")],
  message: [required("Message")],
};

const SUBJECTS = [
  "General enquiry",
  "Investing with Indigio",
  "Existing client support",
  "Partnerships",
  "Careers",
  "Media",
];

const initial: Values = { name: "", email: "", subject: "", message: "" };

/**
 * Contact form backed by POST /api/contact, which persists enquiries to the
 * database. Validates on the client for UX; the API re-validates server-side.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field: keyof Values) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateFields(values, RULES);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        setErrors({ form: body?.message ?? "Could not send your message. Please try again." });
        return;
      }
      setSent(true);
    } catch {
      setErrors({ form: "Could not reach the server. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-panel border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-600">
          ✓
        </span>
        <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-ink">Message received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-muted">
          Thank you — a member of our team will be in touch shortly. For urgent
          matters, please email{" "}
          <a href="mailto:hello@indigio.club" className="link-quiet">
            hello@indigio.club
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel-solid space-y-5 p-5 sm:p-8">
      <div>
        <p className="eyebrow">Write to us</p>
        <h2 className="heading-md mt-2 text-ink">Let&apos;s start the conversation</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Tell us about your goals and we will route you to the right team.
        </p>
      </div>

      {errors.form && (
        <div role="alert" className="rounded-field border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errors.form}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="Jordan Blake"
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="you@example.com"
        />
      </div>

      <SelectField
        label="Subject"
        name="subject"
        required
        value={values.subject}
        onChange={update("subject")}
        error={errors.subject}
        options={SUBJECTS.map((subject) => ({ value: subject, label: subject }))}
      />

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message <span className="ml-1 text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) => update("message")(event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`field resize-y ${errors.message ? "field-invalid" : ""}`}
          placeholder="How can we help with your portfolio, or an enquiry about one of our projects?"
        />
        {errors.message && (
          <p id="contact-message-error" className="field-error">
            <span aria-hidden="true">⚠</span>
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <button type="submit" disabled={submitting} className="gold-button w-full shrink-0 !py-4 text-base">
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}