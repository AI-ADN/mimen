import { brand, contact, journey } from '../content';
import { ContactForm } from './ContactForm';
import { Mark } from './Mark';

export function ContactSection() {
  return (
    <section id="contacto" tabIndex={-1} aria-labelledby="contact-title" className="contact outline-none">
      <div className="contact-intro">
        <p className="sport-label">
          <span className="tabular-nums">{String(journey.length + 1).padStart(2, '0')}</span>
          <span aria-hidden className="mx-2 inline-block h-px w-6 translate-y-[-0.3em] bg-current opacity-50" />
          {contact.navLabel}
        </p>
        <h2 id="contact-title" className="headline mt-5">
          {contact.title}
        </h2>
        <p className="support mt-4">{contact.support}</p>
        <p className="mt-6 max-w-[34ch] text-[0.95rem] text-ink-soft">{contact.otherSport}</p>
        <Mark className="contact-mark mt-auto hidden w-40 text-brand md:block" />
      </div>

      <div className="contact-form-area">
        <ContactForm />
      </div>

      <footer className="contact-footer">
        <span className="wordmark text-sm">{brand.name}</span>
        <span>{brand.tagline}</span>
      </footer>
    </section>
  );
}
