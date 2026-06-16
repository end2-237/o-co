import { Container } from "@/components/ui/Container";
import { AssembleHeading } from "@/components/ui/AssembleHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * The team — advisor cards with initials avatars (trust / E-E-A-T).
 */
export function Team({ t }: { t: Dictionary["team"] }) {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p
              data-reveal
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay"
            >
              <span aria-hidden className="h-px w-10 bg-clay" />
              {t.eyebrow}
            </p>
            <AssembleHeading
              variant="mask"
              id="team-heading"
              text={t.heading}
              className="mt-6 text-balance font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl"
            />
          </div>
          <p data-reveal className="max-w-md text-pretty text-lg leading-relaxed text-ink/70">
            {t.body}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.members.map((member, i) => (
            <li
              key={member.name}
              data-reveal
              data-reveal-delay={i * 90}
              className="flex flex-col items-start rounded-2xl border border-ink/10 bg-bone p-6"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-ink font-display text-lg font-semibold text-cream">
                {member.initials}
              </span>
              <p className="mt-5 font-display text-lg font-medium text-ink">{member.name}</p>
              <p className="mt-1 text-sm leading-snug text-ink/55">{member.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
