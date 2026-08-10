"use client";

import { useId, useState } from "react";

type BaseProps = {
  label: string;
  /** Explicit id keeps label/input/error wiring stable across renders. */
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
};

/**
 * Wires up label → input → hint/error with the correct ARIA relationships.
 *
 * The previous forms used bare `<label>` elements with no `htmlFor` and no `id`
 * on the input, so clicking a label did nothing and screen readers announced
 * unlabelled fields.
 */
function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  hintId,
  errorId,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  hintId: string;
  errorId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="ml-2 text-xs font-normal text-ink-muted">Optional</span>}
      </label>

      {children}

      {hint && !error && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="field-error">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/** Describes the field with its hint or error, whichever is showing. */
function describedBy(error: string | undefined, hint: string | undefined, errorId: string, hintId: string) {
  if (error) return errorId;
  if (hint) return hintId;
  return undefined;
}

export function TextField({
  type = "text",
  inputMode,
  ...props
}: BaseProps & {
  type?: "text" | "email" | "tel" | "date" | "number";
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  const generatedId = useId();
  const id = props.id ?? `${props.name}-${generatedId}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={props.label}
      required={props.required}
      error={props.error}
      hint={props.hint}
      hintId={hintId}
      errorId={errorId}
      className={props.className}
    >
      <input
        id={id}
        name={props.name}
        type={type}
        inputMode={inputMode}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        disabled={props.disabled}
        required={props.required}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.error, props.hint, errorId, hintId)}
        className={`field ${props.error ? "field-invalid" : ""}`}
      />
    </FieldShell>
  );
}

export function PasswordField(props: BaseProps) {
  const generatedId = useId();
  const id = props.id ?? `${props.name}-${generatedId}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const [revealed, setRevealed] = useState(false);

  return (
    <FieldShell
      id={id}
      label={props.label}
      required={props.required}
      error={props.error}
      hint={props.hint}
      hintId={hintId}
      errorId={errorId}
      className={props.className}
    >
      <div className="relative">
        <input
          id={id}
          name={props.name}
          type={revealed ? "text" : "password"}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          disabled={props.disabled}
          required={props.required}
          autoComplete={props.autoComplete ?? "current-password"}
          placeholder={props.placeholder}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy(props.error, props.hint, errorId, hintId)}
          className={`field pr-20 ${props.error ? "field-invalid" : ""}`}
        />
        {/* This was a decorative button that did nothing before. */}
        <button
          type="button"
          onClick={() => setRevealed((value) => !value)}
          aria-pressed={revealed}
          aria-controls={id}
          className="absolute inset-y-0 right-2 my-1.5 rounded-xl px-3 text-sm font-semibold text-ink-muted transition hover:bg-canvas-panel hover:text-navy"
        >
          {revealed ? "Hide" : "Show"}
        </button>
      </div>
    </FieldShell>
  );
}

export function SelectField({
  options,
  ...props
}: BaseProps & { options: { value: string; label: string }[] }) {
  const generatedId = useId();
  const id = props.id ?? `${props.name}-${generatedId}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={props.label}
      required={props.required}
      error={props.error}
      hint={props.hint}
      hintId={hintId}
      errorId={errorId}
      className={props.className}
    >
      <select
        id={id}
        name={props.name}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        disabled={props.disabled}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.error, props.hint, errorId, hintId)}
        className={`field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23596a7d" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-12 ${
          props.error ? "field-invalid" : ""
        }`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
