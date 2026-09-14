import { useEffect } from 'react';

/**
 * useDocumentMeta — override document metadata for a page.
 *
 * Sets title, meta description, canonical link and og:url
 * while the component is mounted, then restores the previous
 * values on unmount.
 *
 * Use in page components:
 *
 *   useDocumentMeta({
 *     title: 'QINIS — Case Study | Thapelo Magqazana',
 *     description: 'Engineering intelligence for software quality.',
 *     canonical: 'https://thapelo-magqazana.netlify.app/#/work/qinis',
 *   });
 *
 * Caveats with hash routing:
 *   - Crawlers do not re-evaluate metadata on hash change.
 *     This hook improves UX (browser tab, history) and is a
 *     no-op for SEO until the router migrates to the History
 *     API.
 *   - It always writes to the same <meta> elements. Do not
 *     mount two page components simultaneously.
 */
export interface DocumentMeta {
  /** Full document title (no automatic suffix appended). */
  title: string;
  /** Meta description. */
  description: string;
  /** Canonical URL. */
  canonical?: string;
  /** Open Graph URL. Defaults to the canonical when omitted. */
  ogUrl?: string;
}

function setMetaTag(selector: string, attr: string, value: string): void {
  let el: HTMLMetaElement | HTMLLinkElement | null =
    document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);

  if (!el) {
    if (selector.startsWith('link')) {
      const link = document.createElement('link');
      const relMatch = /rel="([^"]+)"/.exec(selector);
      if (relMatch) {
        link.rel = relMatch[1]!;
      }
      el = link;
    } else {
      const meta = document.createElement('meta');
      const attrMatch = /\[([^=]+)="([^"]+)"\]/.exec(selector);
      if (attrMatch) {
        meta.setAttribute(attrMatch[1]!, attrMatch[2]!);
      }
      el = meta;
    }
    document.head.appendChild(el);
  }

  el.setAttribute(attr, value);
}

export function useDocumentMeta(meta: DocumentMeta): void {
  useEffect(() => {
    // Capture previous values for restoration
    const prevTitle = document.title;
    const prevDescription = document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.getAttribute('content');
    const prevCanonical = document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute('href');
    const prevOgUrl = document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.getAttribute('content');

    document.title = meta.title;
    setMetaTag('meta[name="description"]', 'content', meta.description);

    const canonical = meta.canonical;
    if (canonical) {
      setMetaTag('link[rel="canonical"]', 'href', canonical);
    }
    setMetaTag(
      'meta[property="og:url"]',
      'content',
      meta.ogUrl ?? canonical ?? '',
    );

    return () => {
      document.title = prevTitle;
      if (prevDescription) {
        setMetaTag('meta[name="description"]', 'content', prevDescription);
      }
      if (prevCanonical) {
        setMetaTag('link[rel="canonical"]', 'href', prevCanonical);
      }
      if (prevOgUrl) {
        setMetaTag('meta[property="og:url"]', 'content', prevOgUrl);
      }
    };
  }, [meta.title, meta.description, meta.canonical, meta.ogUrl]);
}
