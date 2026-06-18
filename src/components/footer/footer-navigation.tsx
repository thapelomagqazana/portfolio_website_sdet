import Link from "next/link";
import { footerExternalLinks, footerNavigationLinks } from "@/data/footer";
import type { FooterLink } from "@/data/footer";
import { footerLinkIsRenderable, isExternalFooterLink } from "@/lib/footer";

/**
 * Footer navigation.
 *
 * Includes internal portfolio navigation and external quick actions.
 */
export function FooterNavigation() {
  const internalLinks = footerNavigationLinks.filter(footerLinkIsRenderable);
  const externalLinks = footerExternalLinks.filter(footerLinkIsRenderable);

  return (
    <nav
      aria-label="Footer navigation"
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
      data-testid="footer-navigation"
    >
      <FooterLinkGroup title="Navigate" links={internalLinks} />
      <div className="mt-6">
        <FooterLinkGroup title="Quick Actions" links={externalLinks} />
      </div>
    </nav>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  readonly title: string;
  readonly links: readonly FooterLink[];
}) {
  if (links.length === 0) {
    return (
      <div data-testid="footer-links-empty">
        <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">{title}</p>
        <p className="text-text-secondary mt-3 text-sm">No links configured.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">{title}</p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((link) => {
          const external = isExternalFooterLink(link);

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="bg-background-deep/50 text-text-secondary hover:border-accent-blue/30 hover:text-text-primary focus-visible:ring-accent-blue/70 inline-flex rounded-full border border-white/10 px-3 py-2 font-mono text-xs transition focus:outline-none focus-visible:ring-2"
              >
                {link.label}
                {external ? <span aria-hidden="true">&nbsp;↗</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
