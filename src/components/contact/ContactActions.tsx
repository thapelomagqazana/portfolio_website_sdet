import { Mail, ArrowUpRight, Download } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/lib/cn';
import { RouteLink } from '@/lib/router';
import { contactChannels, type ContactChannel } from '@/content/contact';

/**
 * ContactActions — the three contact CTAs plus CV download.
 *
 * Task P15-01:
 *   - Email (mailto:)
 *   - LinkedIn (external)
 *   - GitHub (external)
 *
 * CV actions:
 *   - "Download CV (PDF)" — tertiary, muted text link
 *   - "or view online" — alternates to the /cv route
 *   - Both are de-emphasised relative to the contact channels
 *     to preserve the hero's primary conversion hierarchy
 *     (Conversion Goals §3, §4)
 *
 * Accessibility (Task P15-02):
 *   - Every action is a native <a> — keyboard accessible
 *   - External links open in a new tab with rel=noopener noreferrer
 *   - External links carry an sr-only "(opens in a new tab)" hint
 *   - Email uses mailto: which the OS handles natively
 *   - Icons are aria-hidden — the labels carry meaning
 *
 * Design System §21 — Three tertiary actions, no primary CTA.
 */
export interface ContactActionsProps {
  className?: string;
}

function IconFor({ channel }: { channel: ContactChannel }) {
  if (channel.id === 'email') {
    return <Mail aria-hidden="true" size={18} />;
  }
  if (channel.id === 'linkedin') {
    return <LinkedinIcon size={18} />;
  }
  return <SiGithub aria-hidden="true" size={18} />;
}

export function ContactActions({ className }: ContactActionsProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* Primary contact channels */}
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {contactChannels.map((channel) => {
          const isExternal = channel.kind === 'external';

          return (
            <li key={channel.id}>
              <a
                href={channel.destination}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                data-event={channel.event}
                className={cn(
                  'inline-flex items-center gap-3',
                  'rounded-md border border-border px-4 py-3',
                  'text-body text-foreground',
                  'transition-colors duration-fast ease-standard',
                  'hover:border-border-strong hover:bg-surface-elevated',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                )}
              >
                <IconFor channel={channel} />
                <span>{channel.label}</span>
                {isExternal ? (
                  <>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      className="text-foreground-subtle"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Tertiary — CV download + view online */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
        <a
          href="/thapelo-magqazana-cv.pdf"
          download="thapelo-magqazana-cv.pdf"
          data-event="cv_download"
          className={cn(
            'inline-flex items-center gap-2',
            'text-small text-foreground-muted',
            'hover:text-foreground',
            'transition-colors duration-fast',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm',
          )}
        >
          <Download aria-hidden="true" size={16} />
          <span>Download CV (PDF)</span>
        </a>

        <span aria-hidden="true" className="text-small text-foreground-subtle">
          ·
        </span>

        <RouteLink
          to="/cv"
          className={cn(
            'inline-flex items-center',
            'text-small text-foreground-subtle',
            'hover:text-foreground-muted',
            'transition-colors duration-fast',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm',
          )}
        >
          or view online
        </RouteLink>
      </div>
    </div>
  );
}
