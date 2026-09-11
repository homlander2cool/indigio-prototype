"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SelectField, TextField } from "@/components/forms/Field";
import {
  buildKycRules,
  countryOptions,
  documentTypeOptions,
  initialKycValues,
  investorTypeOptions,
  kycFieldLabels,
  kycSteps,
  sourceOfFundsOptions,
  submitKyc,
  validateKycDocument,
  validateAllKyc,
  validateKycStep,
  type KycField,
  type KycValues,
} from "@/lib/kyc";
import { createValidationMessages } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

type StepErrors = Partial<Record<KycField, string>>;

/**
 * Multi-step KYC onboarding wizard.
 *
 * Steps, field options and validation rules all come from `lib/kyc.ts`, so the
 * form is a render of data rather than hand-maintained JSX. The review step and
 * the success screen are built into the same component so the whole onboarding
 * flow — 4 steps → review → reference number — happens in one route.
 *
 * All labels, options and validation messages are pulled from the locale
 * dictionaries, so the wizard speaks German the moment the switcher flips.
 */
export default function KycWizard() {
  const { t } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<KycValues>(initialKycValues);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Localized copies of the step model — ids and field lists come from the
  // canonical English definition, text follows the locale.
  const steps = useMemo(
    () =>
      kycSteps.map((item) => ({
        ...item,
        title: t(`kycWizard.steps.${item.id}.title`),
        shortTitle: t(`kycWizard.steps.${item.id}.shortTitle`),
        description: t(`kycWizard.steps.${item.id}.description`),
      })),
    [t],
  );

  const fieldLabels = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(kycFieldLabels) as KycField[]).map((field) => [
          field,
          t(`kycWizard.fields.${field}`),
        ]),
      ) as Record<KycField, string>,
    [t],
  );

  const rules = useMemo(
    () => buildKycRules(fieldLabels, createValidationMessages(t)),
    [fieldLabels, t],
  );

  const docTypeOptions = useMemo(
    () =>
      documentTypeOptions.map((option) => ({
        ...option,
        label: t(`kycWizard.options.documentType.${option.value}`),
      })),
    [t],
  );

  const sofOptions = useMemo(
    () =>
      sourceOfFundsOptions.map((option) => ({
        ...option,
        label: t(`kycWizard.options.sourceOfFunds.${option.value}`),
      })),
    [t],
  );

  const investorOptions = useMemo(
    () =>
      investorTypeOptions.map((option) => ({
        ...option,
        label: t(`kycWizard.options.investorType.${option.value}`),
      })),
    [t],
  );

  const countries = useMemo(
    () =>
      countryOptions.map((option) => ({
        ...option,
        label: t.fallback(`kycWizard.options.countries.${option.value}`, option.label),
      })),
    [t],
  );

  const step = steps[stepIndex];
  const isReview = stepIndex === steps.length - 1;
  const maxReached = useRef(0);
  maxReached.current = Math.max(maxReached.current, stepIndex);

  const updateField =
    (field: KycField) =>
    (value: string): void => {
      setValues((previous) => ({ ...previous, [field]: value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const jumpTo = (index: number): void => {
    if (index < 0 || index > maxReached.current) return;
    setStepIndex(index);
    setAttempted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const continueNext = (): void => {
    const nextErrors = validateKycStep(step, values, rules);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setAttempted(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    setAttempted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = (): void => {
    setStepIndex((index) => Math.max(index - 1, 0));
    setAttempted(false);
  };

  const handleSubmit = async (): Promise<void> => {
    if (submitting) return;

    const nextErrors = validateAllKyc(values, rules);
    setErrors(nextErrors);
    setAttempted(true);

    if (Object.keys(nextErrors).length > 0) {
      // Send the user back to the earliest step with a problem.
      const firstBad = steps.findIndex((item) => item.fields.some((f) => nextErrors[f]));
      setStepIndex(firstBad === -1 ? 0 : firstBad);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!acknowledged) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);
    try {
      const result = await submitKyc(values, documentFile);
      if (result.ok) {
        setReferenceId(result.referenceId);
        setReferralCode(result.referralCode ?? null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmissionError(result.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (referenceId) {
    return (
      <div className="rounded-[30px] border border-[#d9d2c3] bg-[#f8f5f0] p-8 text-center shadow-[0_30px_80px_rgba(11,35,64,0.08)] sm:p-12">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 text-4xl text-emerald-600">
          ✓
        </span>
        <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] text-[#102033] sm:text-4xl">
          {t("kycWizard.successTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-slate-600">
          {t("kycWizard.successBody")}
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#d9d2c3] bg-white p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            {t("kycWizard.referenceNumber")}
          </p>
          <p className="mt-2 font-mono text-2xl font-black text-[#0b2340]">{referenceId}</p>
        </div>
        {referralCode && (
          <div className="mx-auto mt-4 max-w-sm rounded-2xl border border-[#d9d2c3] bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
              {t("kycWizard.yourReferralCode")}
            </p>
            <p className="mt-2 font-mono text-xl font-black text-[#0b2340]">{referralCode}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/deals" className="ghost-button justify-center px-6 py-3.5">
            {t("kycWizard.browseDeals")}
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">{t("kycWizard.successNote")}</p>
      </div>
    );
  }

  return (
    <div ref={formRef} className="scroll-mt-28 rounded-[30px] border border-[#d9d2c3] bg-[#f8f5f0] p-5 shadow-[0_30px_80px_rgba(11,35,64,0.08)] sm:p-8">
      {/* Stepper */}
      <ol className="mb-8 flex flex-wrap gap-2">
        {steps.map((item, index) => {
          const state =
            index === stepIndex ? "current" : index < stepIndex ? "done" : "todo";
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => jumpTo(index)}
                aria-current={index === stepIndex ? "step" : undefined}
                className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
                  state === "current"
                    ? "bg-[#0b2340] text-white shadow-[0_12px_28px_rgba(11,35,64,0.18)]"
                    : state === "done"
                      ? "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 hover:bg-emerald-500/18"
                      : "bg-white text-slate-600 ring-1 ring-[#d9d2c3]"
                }`}
              >
                {state === "done" ? "✓ " : `${index + 1}. `}
                {item.shortTitle}
              </button>
            </li>
          );
        })}
      </ol>

      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {t("kycWizard.stepLabel", { current: stepIndex + 1, total: steps.length })}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#102033]">{step.title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">{step.description}</p>

      <p aria-live="polite" className="sr-only">
        {t("kycWizard.stepAria", { current: stepIndex + 1, total: steps.length, title: step.title })}
      </p>

      {attempted && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {t("kycWizard.fixFieldsAlert")}
        </div>
      )}

      {stepIndex === 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <TextField
            id="kyc-first-name"
            label={fieldLabels.firstName}
            name="firstName"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={updateField("firstName")}
            error={errors.firstName}
            placeholder="Ava"
          />
          <TextField
            id="kyc-last-name"
            label={fieldLabels.lastName}
            name="lastName"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={updateField("lastName")}
            error={errors.lastName}
            placeholder="Morgan"
          />
          <TextField
            id="kyc-email"
            label={fieldLabels.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={updateField("email")}
            error={errors.email}
            placeholder="you@example.com"
          />
          <TextField
            id="kyc-phone"
            label={fieldLabels.phone}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={values.phone}
            onChange={updateField("phone")}
            error={errors.phone}
            placeholder="+1 575 517 7726"
          />
          <TextField
            id="kyc-dob"
            label={fieldLabels.dateOfBirth}
            name="dateOfBirth"
            type="date"
            required
            autoComplete="bday"
            value={values.dateOfBirth}
            onChange={updateField("dateOfBirth")}
            error={errors.dateOfBirth}
          />
          <TextField
            id="kyc-nationality"
            label={fieldLabels.nationality}
            name="nationality"
            required
            autoComplete="nationality"
            value={values.nationality}
            onChange={updateField("nationality")}
            error={errors.nationality}
            placeholder="United States"
          />
          <TextField
            id="kyc-referral"
            label={fieldLabels.referredByCode}
            name="referredByCode"
            value={values.referredByCode}
            onChange={updateField("referredByCode")}
            error={errors.referredByCode}
            hint={t("kycWizard.referralHint")}
            placeholder="IND-AB12CD34"
          />
        </div>
      )}

      {stepIndex === 1 && (
        <div className="mt-6 grid gap-5">
          <TextField
            id="kyc-address"
            label={fieldLabels.addressLine1}
            name="addressLine1"
            required
            autoComplete="street-address"
            value={values.addressLine1}
            onChange={updateField("addressLine1")}
            error={errors.addressLine1}
            placeholder="540 Park Avenue"
          />
          <div className="grid gap-5 md:grid-cols-3">
            <TextField
              id="kyc-city"
              label={fieldLabels.city}
              name="city"
              required
              autoComplete="address-level2"
              value={values.city}
              onChange={updateField("city")}
              error={errors.city}
              placeholder="New York"
            />
            <TextField
              id="kyc-postal"
              label={fieldLabels.postalCode}
              name="postalCode"
              required
              autoComplete="postal-code"
              value={values.postalCode}
              onChange={updateField("postalCode")}
              error={errors.postalCode}
              placeholder="10022"
            />
            <SelectField
              id="kyc-country"
              label={fieldLabels.country}
              name="country"
              options={countries}
              required
              autoComplete="country-name"
              value={values.country}
              onChange={updateField("country")}
              error={errors.country}
            />
          </div>
        </div>
      )}

      {stepIndex === 2 && (
        <div className="mt-6 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              id="kyc-doc-type"
              label={fieldLabels.documentType}
              name="documentType"
              options={docTypeOptions}
              required
              value={values.documentType}
              onChange={updateField("documentType")}
              error={errors.documentType}
            />
            <TextField
              id="kyc-doc-number"
              label={fieldLabels.documentNumber}
              name="documentNumber"
              required
              autoComplete="off"
              value={values.documentNumber}
              onChange={updateField("documentNumber")}
              error={errors.documentNumber}
              hint={t("kycWizard.docHint")}
              placeholder="X8429182"
            />
          </div>

          <div
            className={`rounded-2xl border border-dashed p-5 transition ${
              errors.documentFileName
                ? "border-red-300 bg-red-50/50"
                : "border-[#d9d2c3] bg-white"
            }`}
          >
            <p className="text-sm font-medium text-slate-700">
              {fieldLabels.documentFileName}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {t("kycWizard.docUploadHint")}
            </p>

            {values.documentFileName ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-emerald-800">
                  <span aria-hidden="true">✓</span>
                  <span className="truncate">{values.documentFileName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDocumentFile(null);
                    updateField("documentFileName")("");
                  }}
                  className="text-xs font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
                >
                  {t("kycWizard.removeFile")}
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <label
                  htmlFor="kyc-doc-file"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#0b2340] bg-[#0b2340]/5 px-5 py-2.5 text-sm font-semibold text-[#0b2340] transition hover:bg-[#0b2340]/10"
                >
                  <span aria-hidden="true">⬆</span> {t("kycWizard.selectFile")}
                </label>
                <input
                  id="kyc-doc-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const fileError = validateKycDocument(file);
                      if (fileError) {
                        setDocumentFile(null);
                        setErrors((previous) => ({ ...previous, documentFileName: fileError }));
                        event.target.value = "";
                        return;
                      }
                      setDocumentFile(file);
                      updateField("documentFileName")(file.name);
                    }
                  }}
                />
              </div>
            )}

            {errors.documentFileName && (
              <p id="kyc-doc-error" className="field-error mt-2">
                <span aria-hidden="true">⚠</span>
                <span>{errors.documentFileName}</span>
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              id="kyc-sof"
              label={fieldLabels.sourceOfFunds}
              name="sourceOfFunds"
              options={sofOptions}
              required
              value={values.sourceOfFunds}
              onChange={updateField("sourceOfFunds")}
              error={errors.sourceOfFunds}
            />
            <SelectField
              id="kyc-investor-type"
              label={fieldLabels.investorType}
              name="investorType"
              options={investorOptions}
              required
              value={values.investorType}
              onChange={updateField("investorType")}
              error={errors.investorType}
            />
          </div>
        </div>
      )}

      {isReview && (
        <div className="mt-6 space-y-6">
          {submissionError && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {submissionError}
            </div>
          )}
          <div className="rounded-2xl border border-[#d9d2c3] bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {t("kycWizard.reviewTitle")}
            </p>
            <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {(Object.keys(fieldLabels) as KycField[])
                .filter((field) => field !== "documentFileName")
                .map((field) => (
                  <div key={field}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {fieldLabels[field]}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[#102033]">
                      {values[field] || "—"}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>

          <label
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-5 transition ${
              attempted && !acknowledged
                ? "border-red-300 bg-red-50/50"
                : "border-[#d9d2c3] bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
              className="checkbox mt-0.5"
            />
            <span className="text-sm leading-relaxed text-slate-600">
              {t("kycWizard.acknowledgeText")}
              {attempted && !acknowledged && (
                <span className="mt-1 block font-semibold text-red-700">
                  {t("kycWizard.acknowledgeRequired")}
                </span>
              )}
            </span>
          </label>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={submitting}
              className="ghost-button justify-center rounded-2xl px-6 py-3.5"
            >
              {t("kycWizard.back")}
            </button>
          ) : (
            <Link href="/login" className="ghost-button justify-center rounded-2xl px-6 py-3.5">
              {t("kycWizard.backToSignIn")}
            </Link>
          )}

          {!isReview ? (
            <button
              type="button"
              onClick={continueNext}
              className="gold-button justify-center rounded-2xl px-6 py-3.5"
            >
              {t("kycWizard.continue")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="gold-button justify-center rounded-2xl px-6 py-3.5"
            >
              {submitting ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
                  />
                  {t("kycWizard.submitting")}
                </>
              ) : (
                t("kycWizard.submitApplication")
              )}
            </button>
          )}
        </div>

        <p className="text-xs text-slate-500">{t("kycWizard.footerNote")}</p>
      </div>
    </div>
  );
}