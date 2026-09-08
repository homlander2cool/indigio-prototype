"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PasswordField, TextField } from "@/components/forms/Field";
import { signIn } from "@/lib/auth";
import { email as validateEmail, required, validateFields } from "@/lib/validation";
import { createValidationMessages } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

type Values = { email: string; password: string };
type Errors = Partial<Record<keyof Values | "form", string>>;

export default function LoginForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [values, setValues] = useState<Values>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [remember, setRemember] = useState(true);

  // Rules are re-derived per locale so error text follows the switcher.
  const rules = useMemo(() => {
    const m = createValidationMessages(t);
    return {
      email: [validateEmail(m)],
      password: [required(t("loginForm.passwordLabel"), m)],
    };
  }, [t]);

  const localizeAuthError = (
    result: { ok: false; message: string; field?: "email" | "password" },
  ): Errors =>
    result.field === "email"
      ? { email: t("loginForm.errorInvalidCredentials") }
      : result.field === "password"
        ? { password: t("loginForm.errorPasswordLength", { length: 8 }) }
        : { form: t("loginForm.errorUnexpected") };

  const update = (field: keyof Values) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear the field's error as soon as the user starts correcting it —
    // leaving stale errors on screen while typing reads as broken.
    setErrors((previous) => ({ ...previous, [field]: undefined, form: undefined }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateFields(values, rules);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const result = await signIn(values.email, values.password);

      if (!result.ok) {
        setErrors(localizeAuthError(result));
        return;
      }

      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const destination =
        result.isAdmin
          ? "/admin"
          : requestedPath && requestedPath.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/dashboard";
      router.push(destination);
    } catch {
      setErrors({ form: t("loginForm.errorUnexpected") });
    } finally {
      // Runs even on the success path, so the button resets if navigation is
      // interrupted or the user returns via the back button.
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Form-level failures are announced without stealing focus. */}
      {errors.form && (
        <div
          role="alert"
          className="rounded-field border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {errors.form}
        </div>
      )}

      <TextField
        label={t("loginForm.emailLabel")}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={update("email")}
        error={errors.email}
        placeholder={t("loginForm.emailPlaceholder")}
      />

      <PasswordField
        label={t("loginForm.passwordLabel")}
        name="password"
        autoComplete="current-password"
        required
        value={values.password}
        onChange={update("password")}
        error={errors.password}
        hint={t("loginForm.passwordHint")}
        placeholder="••••••••"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-ink-muted">
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="checkbox"
          />
          {t("loginForm.rememberMe")}
        </label>
        <Link href="/kyc" className="link-quiet">
          {t("loginForm.needKyc")}
        </Link>
      </div>

      <button type="submit" disabled={submitting} className="gold-button shine w-full py-4 text-base">
        {submitting ? (
          <>
            {/* aria-hidden so the label below is the only thing announced. */}
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
            />
            {t("loginForm.signingIn")}
          </>
        ) : (
          t("loginForm.signInSecurely")
        )}
      </button>

      {/* Politely announces state changes for assistive tech. */}
      <p aria-live="polite" className="sr-only">
        {submitting ? t("loginForm.ariaSigningIn") : ""}
      </p>
    </form>
  );
}
