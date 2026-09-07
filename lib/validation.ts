/**
 * Framework-free validators.
 *
 * Each returns an error message or `undefined`. Keeping them pure and outside
 * the components means the same rules can run again server-side once the real
 * backend lands — client validation is UX, never a security boundary.
 *
 * Messages are injected via a `ValidationMessages` object so the same rules
 * can speak English, German, or any future locale. `enValidationMessages` is
 * the default so API routes keep working without wiring anything up.
 */

export type Validator = (value: string) => string | undefined;

export type ValidationMessages = {
  required: (label: string) => string;
  minLength: (label: string, length: number) => string;
  emailRequired: string;
  emailInvalid: string;
  dobRequired: string;
  dobInvalid: string;
  dobFuture: string;
  dobUnderage: string;
  dobTooOld: string;
  patternName: string;
  patternDoc: string;
  patternReferral: string;
};

export const enValidationMessages: ValidationMessages = {
  required: (label) => `${label} is required.`,
  minLength: (label, length) => `${label} must be at least ${length} characters.`,
  emailRequired: "Email address is required.",
  emailInvalid: "Enter a valid email address.",
  dobRequired: "Date of birth is required.",
  dobInvalid: "Enter a valid date.",
  dobFuture: "Date of birth cannot be in the future.",
  dobUnderage: "You must be 18 or older to open an account.",
  dobTooOld: "Enter a valid date of birth.",
  patternName: "Use letters, spaces, hyphens or apostrophes only.",
  patternDoc: "Use 5–20 letters, numbers or dashes.",
  patternReferral: "Enter a valid referral code.",
};

/** Deliberately permissive: overly clever email regexes reject valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const required =
  (label = "This field", m: ValidationMessages = enValidationMessages): Validator =>
  (value) =>
    value.trim().length === 0 ? m.required(label) : undefined;

export const email =
  (m: ValidationMessages = enValidationMessages): Validator =>
  (value) => {
    if (value.trim().length === 0) return m.emailRequired;
    return EMAIL_RE.test(value.trim()) ? undefined : m.emailInvalid;
  };

export const minLength =
  (length: number, label = "This field", m: ValidationMessages = enValidationMessages): Validator =>
  (value) =>
    value.length < length ? m.minLength(label, length) : undefined;

export const pattern =
  (re: RegExp, message: string): Validator =>
  (value) =>
    value.trim().length === 0 || re.test(value.trim()) ? undefined : message;

/** Rejects future dates and anyone under 18 — a real KYC gate. */
export const adultDate =
  (m: ValidationMessages = enValidationMessages): Validator =>
  (value) => {
    if (!value) return m.dobRequired;

    const dob = new Date(value);
    if (Number.isNaN(dob.getTime())) return m.dobInvalid;

    const now = new Date();
    if (dob > now) return m.dobFuture;

    let age = now.getFullYear() - dob.getFullYear();
    const monthDelta = now.getMonth() - dob.getMonth();
    if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < dob.getDate())) {
      age -= 1;
    }

    if (age < 18) return m.dobUnderage;
    if (age > 120) return m.dobTooOld;
    return undefined;
  };

/** Runs validators in order and returns the first failure. */
export function firstError(value: string, validators: Validator[]): string | undefined {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return undefined;
}

/** Validates a record of values against a record of rules. */
export function validateFields<T extends Record<string, string>>(
  values: T,
  rules: Partial<Record<keyof T, Validator[]>>,
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key of Object.keys(rules) as (keyof T)[]) {
    const validators = rules[key];
    if (!validators) continue;

    const error = firstError(values[key] ?? "", validators);
    if (error) errors[key] = error;
  }

  return errors;
}