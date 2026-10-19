import type { ContactValues } from '../lib/contactForm';

export type ContactResult = { mode: 'demo' } | { mode: 'sent' };

export interface ContactTransport {
  submit(values: ContactValues): Promise<ContactResult>;
}

/** No destination is configured yet: nothing leaves the browser and nothing is stored. */
export const demoTransport: ContactTransport = {
  async submit() {
    return { mode: 'demo' };
  },
};

export const contactTransport: ContactTransport = demoTransport;
