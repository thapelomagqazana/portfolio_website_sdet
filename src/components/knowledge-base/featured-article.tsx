import Link from "next/link";
import { articleCategoryLabels, difficultyLabels } from "@/data/knowledge-base";
import type { KnowledgeArticle } from "@/data/knowledge-base";

export function FeaturedArticle({ article }: { readonly article: KnowledgeArticle }) {
  return (
    <article
      className="border-accent-green/30 bg-accent-green/10 rounded-3xl border p-6"
      data-testid="featured-article"
    >
      <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
        Featured Article
      </p>

      <h3 className="font-display text-text-primary mt-4 text-3xl font-black">{article.title}</h3>

      <p className="text-text-secondary mt-4 text-base leading-8">{article.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span>{articleCategoryLabels[article.category]}</span>
        <span>{difficultyLabels[article.difficulty]}</span>
        <span>{article.readingMinutes} min read</span>
      </div>

      <Link
        href={`/engineering/${article.slug}`}
        className="border-accent-green/40 bg-accent-green/10 text-accent-green mt-6 inline-flex rounded-full border px-5 py-3 font-mono text-sm font-semibold"
      >
        Read Article →
      </Link>
    </article>
  );
}
