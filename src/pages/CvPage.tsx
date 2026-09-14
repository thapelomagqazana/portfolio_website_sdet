import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import {
  contactChannels,
  SITE_HOST,
  SITE_URL,
  type ContactChannel,
} from '@/content/contact';
import {
  cvHeader,
  cvSummary,
  cvExperience,
  cvEducation,
  cvCertifications,
  cvSkills,
} from '@/content/cv';

/**
 * CvPage — printable, one-page CV.
 *
 * Reads the same content files as the site, so experience,
 * education, certifications and contact details never drift.
 *
 * Print-optimized via src/styles/print.css. When printed, the
 * site nav, footer, and CTAs are hidden and the layout
 * collapses to a single column.
 *
 * Contact strip is derived from src/content/contact.ts and
 * rendered as real <a> links:
 *   - Clickable in the browser and in the generated PDF
 *     (when Playwright's `tagged: true` option is set)
 *   - Print as plain black text on paper via print.css
 *
 * Regenerate public/thapelo-magqazana-cv.pdf after any content
 * change — see docs/cv-maintenance.md.
 */

const CV_CANONICAL = `${SITE_URL}/#/cv`;

/**
 * Human-readable display value for a contact channel.
 *
 * Prefers the channel's explicit `displayValue` (used for
 * phone numbers, where the tel: URI has no spaces) and falls
 * back to a stripped destination — removes mailto:, tel:,
 * https:// and www. so the CV shows clean URLs.
 */
function displayValue(channel: ContactChannel): string {
  if (channel.displayValue) return channel.displayValue;
  return channel.destination
    .replace(/^mailto:/, '')
    .replace(/^tel:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '');
}

export function CvPage() {
  useDocumentMeta({
    title: 'CV | Thapelo Magqazana',
    description:
      'Curriculum vitae — Thapelo Magqazana, QA Engineer and Test Automation Engineer.',
    canonical: CV_CANONICAL,
  });

  return (
    <article className="cv-page mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <header className="cv-header border-b border-border pb-6">
        <h1 className="cv-name text-h2 text-foreground">{cvHeader.name}</h1>
        <p className="cv-role mt-1 text-body text-foreground-muted">
          {cvHeader.role}
        </p>
        <p className="cv-tagline mt-3 text-small italic text-foreground-subtle">
          {cvHeader.tagline}
        </p>

        {/* Contact strip — clickable links on screen and in the
            PDF, readable plain text on paper. Derived from
            src/content/contact.ts so it never drifts. */}
        <ul className="cv-contact mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-mono text-foreground-subtle">
          {contactChannels.map((channel, index) => {
            const isExternal = channel.kind === 'external';
            return (
              <li key={channel.id} className="flex items-center gap-x-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-foreground-subtle">
                    ·
                  </span>
                ) : null}
                <a
                  href={channel.destination}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
                >
                  {displayValue(channel)}
                  {isExternal ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </header>

      {/* Summary */}
      <section className="cv-section mt-8">
        <h2 className="cv-section-title text-label mb-3">SUMMARY</h2>
        <p className="text-body text-foreground-muted">{cvSummary}</p>
      </section>

      {/* Experience */}
      <section className="cv-section mt-8">
        <h2 className="cv-section-title text-label mb-3">EXPERIENCE</h2>
        <ul className="cv-experience-list flex flex-col gap-6">
          {cvExperience.map((entry) => (
            <li key={entry.id} className="cv-experience-item">
              <div className="cv-item-header flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <strong className="text-body text-foreground">
                  {entry.organisation}
                </strong>
                <span className="cv-dates font-mono text-mono text-foreground-subtle">
                  {entry.dates}
                </span>
              </div>
              <p className="text-small text-foreground-muted">
                {entry.position}
                {entry.location ? ` · ${entry.location}` : ''}
              </p>
              <ul className="cv-responsibilities mt-2 flex flex-col gap-1 pl-4">
                {entry.responsibilities.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="list-disc text-small text-foreground-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="cv-section mt-8">
        <h2 className="cv-section-title text-label mb-3">
          TECHNICAL CAPABILITY
        </h2>
        <dl className="cv-skills grid gap-3 sm:grid-cols-2">
          {Object.entries(cvSkills).map(([category, items]) => (
            <div key={category} className="cv-skill-group">
              <dt className="text-small font-medium capitalize text-foreground">
                {category}
              </dt>
              <dd className="text-small text-foreground-muted">
                {items.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Certifications */}
      <section className="cv-section mt-8">
        <h2 className="cv-section-title text-label mb-3">CERTIFICATIONS</h2>
        <ul className="cv-certifications flex flex-col gap-2">
          {cvCertifications.map((cert) => (
            <li key={cert.id} className="text-small text-foreground-muted">
              <strong className="text-foreground">{cert.name}</strong>
              {' — '}
              {cert.issuer}
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="cv-section mt-8">
        <h2 className="cv-section-title text-label mb-3">EDUCATION</h2>
        <ul className="cv-education flex flex-col gap-3">
          {cvEducation.map((entry) => (
            <li key={entry.id}>
              <div className="cv-item-header flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <strong className="text-small text-foreground">
                  {entry.institution}
                </strong>
                <span className="cv-dates font-mono text-mono text-foreground-subtle">
                  {entry.dates}
                </span>
              </div>
              <p className="text-small text-foreground-muted">
                {entry.programme}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer note */}
      <footer className="cv-footer mt-12 border-t border-border pt-4">
        <p className="text-small text-foreground-subtle">
          Full case studies, project details and engineering notes at{' '}
          {SITE_HOST}
        </p>
      </footer>
    </article>
  );
}
