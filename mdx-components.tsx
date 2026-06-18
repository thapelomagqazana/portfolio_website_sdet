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

/**
 * Global MDX component registry.
 *
 * Next.js automatically uses this file to map MDX elements/components.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
