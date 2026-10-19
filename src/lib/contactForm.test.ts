import { describe, expect, it } from 'vitest';
import { emptyContact, normalizeContact, validateContact } from './contactForm';

const SPORTS = ['running', 'cycling', 'swimming', 'gym', 'otro'];
const valid = { ...emptyContact, name: 'Ana', email: 'ana@correo.com', sport: 'running' };

describe('validateContact', () => {
  it('requires name, email and sport but not the message', () => {
    expect(Object.keys(validateContact(emptyContact, SPORTS)).sort()).toEqual(['email', 'name', 'sport']);
    expect(validateContact(valid, SPORTS)).toEqual({});
  });

  it('rejects malformed emails', () => {
    for (const email of ['ana', 'ana@', 'ana@correo', 'ana @correo.com']) {
      expect(validateContact({ ...valid, email }, SPORTS).email).toBeDefined();
    }
  });

  it('rejects sports outside the list', () => {
    expect(validateContact({ ...valid, sport: 'tenis' }, SPORTS).sport).toBeDefined();
  });

  it('asks which sport only when "Otro" is chosen', () => {
    expect(validateContact({ ...valid, sport: 'otro' }, SPORTS).otherSport).toBeDefined();
    expect(validateContact({ ...valid, sport: 'otro', otherSport: 'Triatlón' }, SPORTS)).toEqual({});
    expect(validateContact({ ...valid, otherSport: '' }, SPORTS).otherSport).toBeUndefined();
  });

  it('treats whitespace-only input as empty', () => {
    expect(validateContact({ ...valid, name: '   ' }, SPORTS).name).toBeDefined();
  });

  it('enforces the message length limit', () => {
    expect(validateContact({ ...valid, message: 'a'.repeat(1001) }, SPORTS).message).toBeDefined();
  });
});

describe('normalizeContact', () => {
  it('trims fields, lowercases email and drops otherSport unless "Otro"', () => {
    expect(
      normalizeContact({ name: '  Ana   Ruiz ', email: ' Ana@Correo.COM ', sport: 'gym', otherSport: 'x', message: ' hola ' }),
    ).toEqual({ name: 'Ana Ruiz', email: 'ana@correo.com', sport: 'gym', otherSport: '', message: 'hola' });
  });
});
