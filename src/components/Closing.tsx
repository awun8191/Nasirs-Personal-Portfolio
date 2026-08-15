import Reveal from "./Reveal";
import { CONTACTS, CLOSING_SIGN_OFF, STATUS_LINE } from "../data/site";

// Closing (3.9): warm sign-off, contact row, mono status line. End clean.
export default function Closing() {
  return (
    <section id="contact" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Closing</p>
          <p className="mt-6 max-w-[24ch] font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] text-primary">
            {CLOSING_SIGN_OFF}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-col gap-1 md:flex-row md:flex-wrap md:gap-x-12 md:gap-y-2">
            {CONTACTS.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                data-bloom
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.18em] text-accent link-underline"
              >
                {contact.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-14 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {STATUS_LINE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
