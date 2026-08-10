import {
  adultDate,
  minLength,
  pattern,
  required,
  validateFields,
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
  dateOfBirth: string;
  nationality: string;
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
  dateOfBirth: "",
  nationality: "",
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
    fields: ["firstName", "lastName", "dateOfBirth", "nationality"],
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
  dateOfBirth: "Date of birth",
  nationality: "Nationality",
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

const rules: Partial<Record<KycField, Validator[]>> = {
  firstName: [
    required("First name"),
    minLength(2, "First name"),
    pattern(NAME_RE, "Use letters, spaces, hyphens or apostrophes only."),
  ],
  lastName: [
    required("Last name"),
    minLength(2, "Last name"),
    pattern(NAME_RE, "Use letters, spaces, hyphens or apostrophes only."),
  ],
  dateOfBirth: [adultDate],
  nationality: [required("Nationality")],
  addressLine1: [required("Address"), minLength(5, "Address")],
  city: [required("City"), minLength(2, "City")],
  postalCode: [required("Postal code"), minLength(3, "Postal code")],
  country: [required("Country of residence")],
  documentType: [required("Document type")],
  documentNumber: [
    required("Document number"),
    pattern(DOC_NUMBER_RE, "Use 5–20 letters, numbers or dashes."),
  ],
  documentFileName: [required("An identity document")],
  sourceOfFunds: [required("Source of funds")],
  investorType: [required("Investor classification")],
};

/** Validates only the fields belonging to `step`. */
export function validateKycStep(
  step: KycStep,
  values: KycValues,
): Partial<Record<KycField, string>> {
  const stepRules = Object.fromEntries(
    step.fields.filter((field) => rules[field]).map((field) => [field, rules[field]]),
  ) as Partial<Record<KycField, Validator[]>>;

  return validateFields(values, stepRules);
}

/** Validates everything — the guard before submission. */
export function validateAllKyc(values: KycValues): Partial<Record<KycField, string>> {
  return validateFields(values, rules);
}

export type KycSubmitResult =
  | { ok: true; referenceId: string }
  | { ok: false; message: string };

/**
 * Stand-in for `POST /api/kyc`. Replace the body with a fetch; the wizard only
 * awaits this signature.
 */
export async function submitKyc(values: KycValues): Promise<KycSubmitResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1100);
  });

  const errors = validateAllKyc(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Some details are incomplete. Please review your answers." };
  }

  // Deterministic pseudo-reference from the submitted values. A real backend
  // issues this; generating it here keeps the success screen honest-looking
  // without pretending to be a server.
  const seed = `${values.lastName}${values.documentNumber}`.toUpperCase();
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1_000_000;
  }

  return { ok: true, referenceId: `KYC-${String(hash).padStart(6, "0")}` };
}
