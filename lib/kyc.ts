import {
  adultDate,
  email,
  enValidationMessages,
  minLength,
  pattern,
  required,
  validateFields,
  type ValidationMessages,
  type Validator,
} from "@/lib/validation";

/**
 * KYC onboarding model and submission seam.
 *
 * The wizard UI reads its steps, options, and rules from here, so adding a
 * field or a step is a data change rather than a JSX change — and the same
 * rules can be re-run server-side when the backend lands.
 */

export type KycValues = {
  // Step 1 — identity
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  referredByCode: string;
  // Step 2 — address
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  // Step 3 — documents & funding
  documentType: string;
  documentNumber: string;
  documentFileName: string;
  sourceOfFunds: string;
  investorType: string;
};

export type KycField = keyof KycValues;

export const initialKycValues: KycValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  referredByCode: "",
  addressLine1: "",
  city: "",
  postalCode: "",
  country: "",
  documentType: "",
  documentNumber: "",
  documentFileName: "",
  sourceOfFunds: "",
  investorType: "",
};

export type KycStep = {
  id: string;
  title: string;
  /** Short label for the stepper rail. */
  shortTitle: string;
  description: string;
  fields: KycField[];
};

export const kycSteps: KycStep[] = [
  {
    id: "identity",
    title: "Identity verification",
    shortTitle: "Identity",
    description: "Your legal name and date of birth, exactly as they appear on your ID.",
    fields: ["firstName", "lastName", "email", "phone", "dateOfBirth", "nationality", "referredByCode"],
  },
  {
    id: "address",
    title: "Address proof",
    shortTitle: "Address",
    description: "Your current residential address. PO boxes cannot be accepted.",
    fields: ["addressLine1", "city", "postalCode", "country"],
  },
  {
    id: "funding",
    title: "Documents & source of funds",
    shortTitle: "Documents",
    description: "Upload a government ID and declare how your investment is funded.",
    fields: [
      "documentType",
      "documentNumber",
      "documentFileName",
      "sourceOfFunds",
      "investorType",
    ],
  },
  {
    id: "review",
    title: "Review & approval",
    shortTitle: "Review",
    description: "Confirm your details and acknowledge the risk disclosures.",
    fields: [],
  },
];

/** Human-readable labels, reused by the fields and the review summary. */
export const kycFieldLabels: Record<KycField, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  phone: "Phone number",
  dateOfBirth: "Date of birth",
  nationality: "Nationality",
  referredByCode: "Referral code",
  addressLine1: "Residential address",
  city: "City",
  postalCode: "Postal code",
  country: "Country of residence",
  documentType: "Document type",
  documentNumber: "Document number",
  documentFileName: "Identity document",
  sourceOfFunds: "Source of funds",
  investorType: "Investor classification",
};

export const documentTypeOptions = [
  { value: "passport", label: "Passport" },
  { value: "drivers-license", label: "Driver's licence" },
  { value: "national-id", label: "National ID card" },
];

export const sourceOfFundsOptions = [
  { value: "employment", label: "Employment income" },
  { value: "business", label: "Business ownership or sale" },
  { value: "investments", label: "Investment portfolio" },
  { value: "inheritance", label: "Inheritance or gift" },
  { value: "pension", label: "Pension or retirement savings" },
  { value: "other", label: "Other" },
];

export const investorTypeOptions = [
  { value: "retail", label: "Retail investor" },
  { value: "accredited", label: "Accredited investor" },
  { value: "professional", label: "Professional / institutional" },
];

export const countryOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Nigeria",
  "Germany",
  "France",
  "United Arab Emirates",
  "Singapore",
  "Australia",
  "South Africa",
].map((name) => ({ value: name, label: name }));

/** Only letters, spaces, hyphens and apostrophes — names, not free text. */
const NAME_RE = /^[\p{L}][\p{L}\s'’-]*$/u;
/** Alphanumeric with optional dashes, 5–20 chars. */
const DOC_NUMBER_RE = /^[A-Za-z0-9-]{5,20}$/;
const REFERRAL_CODE_RE = /^IND-[A-Z0-9]{8}$/;
const PHONE_RE = /^\+?[0-9()\s.-]{7,25}$/;

/**
 * Builds the validation rules for a given locale. Labels and messages come
 * from the caller so German visitors get German prompts; components memoize
 * the result, and the English default stays available for the API routes.
 */
export function buildKycRules(
  labels: Record<KycField, string>,
  messages: ValidationMessages,
): Partial<Record<KycField, Validator[]>> {
  const namePatternMessage = (field: KycField) =>
    field === "firstName" || field === "lastName"
      ? messages.patternName
      : messages.patternDoc;

  const rules: Partial<Record<KycField, Validator[]>> = {
    firstName: [
      required(labels.firstName, messages),
      minLength(2, labels.firstName, messages),
      pattern(NAME_RE, namePatternMessage("firstName")),
    ],
    lastName: [
      required(labels.lastName, messages),
      minLength(2, labels.lastName, messages),
      pattern(NAME_RE, namePatternMessage("lastName")),
    ],
    email: [email(messages)],
    phone: [
      required(labels.phone, messages),
      pattern(PHONE_RE, "Enter a valid phone number."),
    ],
    dateOfBirth: [adultDate(messages)],
    nationality: [required(labels.nationality, messages)],
    referredByCode: [pattern(REFERRAL_CODE_RE, messages.patternReferral)],
    addressLine1: [required(labels.addressLine1, messages), minLength(5, labels.addressLine1, messages)],
    city: [required(labels.city, messages), minLength(2, labels.city, messages)],
    postalCode: [required(labels.postalCode, messages), minLength(3, labels.postalCode, messages)],
    country: [required(labels.country, messages)],
    documentType: [required(labels.documentType, messages)],
    documentNumber: [
      required(labels.documentNumber, messages),
      pattern(DOC_NUMBER_RE, namePatternMessage("documentNumber")),
    ],
    documentFileName: [required(labels.documentFileName, messages)],
    sourceOfFunds: [required(labels.sourceOfFunds, messages)],
    investorType: [required(labels.investorType, messages)],
  };
  return rules;
}

const defaultKycRules = buildKycRules(kycFieldLabels, enValidationMessages);

/** Validates only the fields belonging to `step`. */
export function validateKycStep(
  step: KycStep,
  values: KycValues,
  rules: Partial<Record<KycField, Validator[]>> = defaultKycRules,
): Partial<Record<KycField, string>> {
  const stepRules = Object.fromEntries(
    step.fields.filter((field) => rules[field]).map((field) => [field, rules[field]]),
  ) as Partial<Record<KycField, Validator[]>>;

  return validateFields(values, stepRules);
}

/** Validates everything — the guard before submission. */
export function validateAllKyc(
  values: KycValues,
  rules: Partial<Record<KycField, Validator[]>> = defaultKycRules,
): Partial<Record<KycField, string>> {
  return validateFields(values, rules);
}

export type KycSubmitResult =
  | { ok: true; referenceId: string; referralCode?: string }
  | { ok: false; message: string };

/**
 * Deterministic pseudo-reference from the submitted values. Kept here so the
 * client fallback and the `/api/kyc` route issue the same format for a given
 * input. A real backend issues its own reference.
 */
export function makeReferenceId(
  values: Pick<KycValues, "lastName" | "documentNumber">,
): string {
  const seed = `${values.lastName}${values.documentNumber}`.toUpperCase();
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1_000_000;
  }

  return `KYC-${String(hash).padStart(6, "0")}`;
}

export function normalizeReferralCode(value: string): string {
  return value.trim().toUpperCase();
}

export function makeReferralCode(): string {
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `IND-${random}`;
}

/**
 * Persists the submission via `POST /api/kyc`, which writes to the database.
 *
 * If the API is unreachable — e.g. a static preview with no server — the flow
 * still completes with a locally generated reference, so the prototype never
 * dead-ends. The success screen keeps its prototype disclaimer either way.
 */
export async function submitKyc(values: KycValues): Promise<KycSubmitResult> {
  const errors = validateAllKyc(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Some details are incomplete. Please review your answers." };
  }

  try {
    const response = await fetch("/api/kyc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      return (await response.json()) as KycSubmitResult;
    }

    return { ok: false, message: "Submission failed. Please try again." };
  } catch {
    return { ok: true, referenceId: makeReferenceId(values) };
  }
}
