import { BadgeCheck, ExternalLink } from 'lucide-react';
import { Section } from '@/components/layout';
import { certifications } from '@/content/credentials';

/**
 * Certifications — external validation block.
 *
 * Task P11-01:
 *   ISTQB® Certified Tester — Foundation Level
 *   Microsoft Certified: Azure Fundamentals (AZ-900)
 *
 * Content Inventory §9 — Display credential name, issuer and
 * verification link when available. Never display planned
 * certifications as obtained.
 *
 * Design System §42 — Evidence over decoration. No certificate
 * images, no badge walls — just the facts.
 */
export function Certifications() {
  return (
    <Section
      id="certifications"
      aria-labelledby="certifications-heading"
      spacing="lg"
      surface="surface"
    >
      <header className="mb-10 max-w-2xl">
        <p className="text-label mb-4">CERTIFICATIONS</p>
        <h2 id="certifications-heading" className="text-h2">
          Independent validation.
        </h2>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={cert.id}
            id={`certification-${cert.id}`}
            className="flex flex-col rounded-md border border-border bg-surface-elevated p-6"
          >
            <div className="flex items-start gap-3">
              <BadgeCheck
                aria-hidden="true"
                size={20}
                className="mt-0.5 shrink-0 text-accent"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-h3 text-foreground">{cert.name}</h3>
                <p className="mt-1 text-small text-foreground-muted">
                  {cert.issuer}
                </p>

                {cert.credentialId ? (
                  <p className="mt-3 font-mono text-mono text-foreground-subtle">
                    ID: {cert.credentialId}
                  </p>
                ) : null}

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-small text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
                  >
                    Verify credential
                    <ExternalLink aria-hidden="true" size={14} />
                    <span className="sr-only">
                      {' '}
                      for {cert.name} (opens in a new tab)
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
