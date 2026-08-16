import Reveal from "./Reveal";
import { CONTACTS, CLOSING_SIGN_OFF, STATUS_LINE } from "../data/site";

// Closing (3.9): Swiss sign-off, contact row, mono status line. End clean.
export default function Closing() {
  return (
    <section id="contact" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">04 / Contact</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Closing</p>
              <p className="mt-4 max-w-[24ch] font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                {CLOSING_SIGN_OFF}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-12 md:gap-y-3">
            {CONTACTS.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") || contact.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") || contact.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                aria-label={
                  contact.label === "Email"
                    ? "Send email to Dauda Nasir"
                    : contact.label === "CV"
                    ? "Download Dauda Nasir CV (PDF)"
                    : `Visit Dauda Nasir on ${contact.label}`
                }
                className="flex min-h-11 items-center font-mono text-sm uppercase tracking-[0.18em] text-ink link-underline hover:text-accent"
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
