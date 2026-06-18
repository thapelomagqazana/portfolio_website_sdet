import type { MDXComponents } from "mdx/types";
import {
  ArticleCallout,
  ArticleCodeBlock,
  ArticleFigure,
  ArticleMetrics,
  ArticleNote,
  ArticleQuote,
  ArticleWarning,
} from "@/components/knowledge-base/mdx/article-mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-display text-text-primary mt-10 text-4xl leading-tight font-black"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-display text-text-primary mt-12 border-t border-white/10 pt-8 text-3xl leading-tight font-black"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="font-display text-text-primary mt-8 text-2xl font-black" {...props} />
    ),
    p: (props) => <p className="text-text-secondary mt-5 text-base leading-8" {...props} />,
    ul: (props) => <ul className="text-text-secondary mt-5 list-disc space-y-2 pl-6" {...props} />,
    ol: (props) => (
      <ol className="text-text-secondary mt-5 list-decimal space-y-2 pl-6" {...props} />
    ),
    li: (props) => <li className="leading-7" {...props} />,
    strong: (props) => <strong className="text-text-primary font-bold" {...props} />,
    hr: () => <hr className="my-8 border-white/10" />,
    blockquote: (props) => (
      <blockquote
        className="border-accent-green/60 text-text-primary my-6 border-l-4 pl-5"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="text-accent-green rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-background-deep my-6 overflow-x-auto rounded-2xl border border-white/10 p-5"
        {...props}
      />
    ),

    ArticleCallout,
    ArticleNote,
    ArticleWarning,
    ArticleFigure,
    ArticleCodeBlock,
    ArticleMetrics,
    ArticleQuote,

    ...components,
  };
}
