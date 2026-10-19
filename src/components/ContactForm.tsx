import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { contact } from '../content';
import {
  FIELD_ORDER,
  LIMITS,
  emptyContact,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../lib/contactForm';
import { contactTransport } from '../services/contact';

const SPORT_VALUES = contact.sports.map((s) => s.value);

type Status = 'idle' | 'submitting' | 'demo' | 'error';

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const id = (field: keyof ContactValues) => `${uid}-${field}`;

  const update = (field: keyof ContactValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validateContact(next, SPORT_VALUES));
  };

  const focusField = (field: keyof ContactValues) => {
    const form = formRef.current;
    if (!form) return;
    const target =
      field === 'sport'
        ? form.querySelector<HTMLInputElement>('input[name="sport"]:checked, input[name="sport"]')
        : form.querySelector<HTMLElement>(`#${CSS.escape(id(field))}`);
    target?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setAttempted(true);
    const found = validateContact(values, SPORT_VALUES);
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      focusField(first);
      return;
    }

    setStatus('submitting');
    try {
      const result = await contactTransport.submit(normalizeContact(values));
      setStatus(result.mode === 'demo' ? 'demo' : 'idle');
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(emptyContact);
    setErrors({});
    setAttempted(false);
    setStatus('idle');
    requestAnimationFrame(() => focusField('name'));
  };

  if (status === 'demo') {
    const v = normalizeContact(values);
    const sportLabel = contact.sports.find((s) => s.value === v.sport)?.label ?? v.sport;
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="demo-result focus-ring">
        <p className="demo-badge">Modo demostración</p>
        <h3 className="mt-4 text-2xl font-[720] tracking-tight text-ink">No se envió ningún dato.</h3>
        <p className="mt-3 max-w-[52ch] text-ink-soft">
          El formulario todavía no está conectado y no guarda información. Cuando MIMEN defina el destino, el equipo
          recibirá esta consulta:
        </p>
        <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-[9rem_1fr]">
          <dt className="text-sm text-ink-soft">Nombre</dt>
          <dd className="text-ink">{v.name}</dd>
          <dt className="text-sm text-ink-soft">Correo</dt>
          <dd className="break-all text-ink">{v.email}</dd>
          <dt className="text-sm text-ink-soft">Deporte</dt>
          <dd className="text-ink">{v.sport === 'otro' ? `Otro: ${v.otherSport}` : sportLabel}</dd>
          <dt className="text-sm text-ink-soft">Objetivo</dt>
          <dd className="whitespace-pre-line text-ink">{v.message || '—'}</dd>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn-outline focus-ring" onClick={() => setStatus('idle')}>
            Editar datos
          </button>
          <button type="button" className="btn-ghost focus-ring" onClick={reset}>
            Limpiar formulario
          </button>
        </div>
      </div>
    );
  }

  const errorProps = (field: keyof ContactValues) =>
    errors[field]
      ? { 'aria-invalid': true as const, 'aria-describedby': `${id(field)}-error` }
      : { 'aria-invalid': undefined };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="contact-form" aria-describedby={`${uid}-demo`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor={id('name')} error={errors.name} errorId={`${id('name')}-error`}>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={values.name}
            onChange={update('name')}
            className="field-input"
            {...errorProps('name')}
          />
        </Field>
        <Field label="Correo" htmlFor={id('email')} error={errors.email} errorId={`${id('email')}-error`}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            value={values.email}
            onChange={update('email')}
            className="field-input"
            {...errorProps('email')}
          />
        </Field>
      </div>

      <fieldset
        className="mt-6"
        aria-describedby={errors.sport ? `${id('sport')}-error` : undefined}
        aria-invalid={errors.sport ? true : undefined}
      >
        <legend className="field-label">Deporte</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {contact.sports.map((s) => (
            <label key={s.value} className="sport-pill">
              <input
                type="radio"
                name="sport"
                value={s.value}
                checked={values.sport === s.value}
                onChange={update('sport')}
                className="sr-only"
              />
              {s.label}
            </label>
          ))}
        </div>
        {errors.sport && <FieldError id={`${id('sport')}-error`}>{errors.sport}</FieldError>}
      </fieldset>

      {values.sport === 'otro' && (
        <div className="mt-5">
          <Field
            label="¿Qué deporte practicas?"
            htmlFor={id('otherSport')}
            error={errors.otherSport}
            errorId={`${id('otherSport')}-error`}
          >
            <input
              id={id('otherSport')}
              name="otherSport"
              type="text"
              required
              maxLength={LIMITS.otherSport}
              value={values.otherSport}
              onChange={update('otherSport')}
              className="field-input"
              {...errorProps('otherSport')}
            />
          </Field>
        </div>
      )}

      <div className="mt-6">
        <Field
          label="Tu objetivo"
          optional
          htmlFor={id('message')}
          error={errors.message}
          errorId={`${id('message')}-error`}
        >
          <textarea
            id={id('message')}
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={update('message')}
            placeholder="Por ejemplo: preparar mi primer medio maratón."
            className="field-input min-h-28 resize-y py-3"
            {...errorProps('message')}
          />
        </Field>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm font-medium text-error">
          No pudimos procesar el formulario. Tus datos siguen aquí; inténtalo de nuevo.
        </p>
      )}

      <button
        type="submit"
        className="btn-brand focus-ring mt-4 h-13 w-full px-7 text-base sm:w-auto"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting' || undefined}
      >
        {status === 'submitting' ? 'Procesando…' : contact.submit}
      </button>

      <p className="mt-5 max-w-[60ch] text-xs leading-relaxed text-ink-soft">{contact.privacyPending}</p>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  optional?: boolean;
  children: ReactNode;
}

function Field({ label, htmlFor, error, errorId, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-soft">(opcional)</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-error">
      <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden fill="currentColor">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v5h-1.5v-5Zm0 6.25h1.5v1.5h-1.5v-1.5Z" />
      </svg>
      {children}
    </p>
  );
}
