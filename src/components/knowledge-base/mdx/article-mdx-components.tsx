import type { ReactNode } from "react";

export function ArticleCallout({ children }: { readonly children: ReactNode }) {
  return (
    <aside className="border-accent-blue/20 bg-accent-blue/10 text-text-secondary my-6 rounded-2xl border p-5">
      {children}
    </aside>
  );
}

export function ArticleNote({ children }: { readonly children: ReactNode }) {
  return (
    <aside className="border-accent-green/20 bg-accent-green/10 text-text-secondary my-6 rounded-2xl border p-5">
      {children}
    </aside>
  );
}

export function ArticleWarning({ children }: { readonly children: ReactNode }) {
  return (
    <aside className="text-text-secondary my-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
      {children}
    </aside>
  );
}

export function ArticleFigure({
  caption,
  children,
}: {
  readonly caption: string;
  readonly children: ReactNode;
}) {
  return (
    <figure className="my-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      {children}
      <figcaption className="text-text-muted mt-3 font-mono text-xs">{caption}</figcaption>
    </figure>
  );
}

export function ArticleCodeBlock({
  language,
  code,
}: {
  readonly language: string;
  readonly code: string;
}) {
  return (
    <pre className="bg-background-deep my-6 overflow-x-auto rounded-2xl border border-white/10 p-5">
      <code className="text-text-secondary font-mono text-sm" data-language={language}>
        {code}
      </code>
    </pre>
  );
}

export function ArticleMetrics({
  items,
}: {
  readonly items: readonly { readonly label: string; readonly value: string }[];
}) {
  return (
    <div className="my-8 grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="font-display text-text-primary text-2xl font-black">{item.value}</p>
          <p className="text-text-muted mt-1 font-mono text-xs uppercase">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ArticleQuote({ quote, by }: { readonly quote: string; readonly by?: string }) {
  return (
    <blockquote className="border-accent-green/50 my-8 border-l-4 pl-5">
      <p className="font-display text-text-primary text-xl font-bold">{quote}</p>
      {by ? <cite className="text-text-muted mt-3 block font-mono text-xs">{by}</cite> : null}
    </blockquote>
  );
}
