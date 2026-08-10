/**
 * Framework-free validators.
 *
 * Each returns an error message or `undefined`. Keeping them pure and outside
 * the components means the same rules can run again server-side once the real
 * backend lands — client validation is UX, never a security boundary.
 */

export type Validator = (value: string) => string | undefined;

/** Deliberately permissive: overly clever email regexes reject valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const required =
  (label = "This field"): Validator =>
  (value) =>
    value.trim().length === 0 ? `${label} is required.` : undefined;

export const email: Validator = (value) => {
  if (value.trim().length === 0) return "Email address is required.";
  return EMAIL_RE.test(value.trim()) ? undefined : "Enter a valid email address.";
};

export const minLength =
  (length: number, label = "This field"): Validator =>
  (value) =>
    value.length < length ? `${label} must be at least ${length} characters.` : undefined;

export const pattern =
  (re: RegExp, message: string): Validator =>
  (value) =>
    value.trim().length === 0 || re.test(value.trim()) ? undefined : message;

/** Rejects future dates and anyone under 18 — a real KYC gate. */
export const adultDate: Validator = (value) => {
  if (!value) return "Date of birth is required.";

  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) return "Enter a valid date.";

  const now = new Date();
  if (dob > now) return "Date of birth cannot be in the future.";

  let age = now.getFullYear() - dob.getFullYear();
  const monthDelta = now.getMonth() - dob.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < dob.getDate())) {
    age -= 1;
  }

  if (age < 18) return "You must be 18 or older to open an account.";
  if (age > 120) return "Enter a valid date of birth.";
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
