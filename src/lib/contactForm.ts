export interface ContactValues {
  name: string;
  email: string;
  sport: string;
  otherSport: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const emptyContact: ContactValues = {
  name: '',
  email: '',
  sport: '',
  otherSport: '',
  message: '',
};

export const LIMITS = { name: 80, email: 254, otherSport: 60, message: 1000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContact(values: ContactValues): ContactValues {
  return {
    name: values.name.trim().replace(/\s+/g, ' '),
    email: values.email.trim().toLowerCase(),
    sport: values.sport,
    otherSport: values.sport === 'otro' ? values.otherSport.trim() : '',
    message: values.message.trim(),
  };
}

export function validateContact(raw: ContactValues, allowedSports: readonly string[]): ContactErrors {
  const v = normalizeContact(raw);
  const errors: ContactErrors = {};

  if (!v.name) errors.name = 'Escribe tu nombre.';
  else if (v.name.length > LIMITS.name) errors.name = `Usa como máximo ${LIMITS.name} caracteres.`;

  if (!v.email) errors.email = 'Escribe tu correo.';
  else if (v.email.length > LIMITS.email || !EMAIL.test(v.email))
    errors.email = 'Revisa el formato del correo, por ejemplo nombre@correo.com.';

  if (!v.sport) errors.sport = 'Elige el deporte que te interesa.';
  else if (!allowedSports.includes(v.sport)) errors.sport = 'Elige una opción de la lista.';

  if (v.sport === 'otro') {
    if (!v.otherSport) errors.otherSport = 'Cuéntanos qué deporte practicas.';
    else if (v.otherSport.length > LIMITS.otherSport)
      errors.otherSport = `Usa como máximo ${LIMITS.otherSport} caracteres.`;
  }

  if (v.message.length > LIMITS.message) errors.message = `Usa como máximo ${LIMITS.message} caracteres.`;

  return errors;
}

export const FIELD_ORDER: (keyof ContactValues)[] = ['name', 'email', 'sport', 'otherSport', 'message'];
