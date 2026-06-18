import Link from "next/link";
import { articleCategoryLabels, difficultyLabels } from "@/data/knowledge-base";
import type { KnowledgeArticle } from "@/data/knowledge-base";

export function ArticleCard({ article }: { readonly article: KnowledgeArticle }) {
  return (
    <article className="hover:border-accent-blue/30 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition">
      <p className="text-accent-blue font-mono text-[10px] tracking-[0.22em] uppercase">
        {articleCategoryLabels[article.category]}
      </p>

      <h3 className="font-display text-text-primary mt-3 text-2xl font-black">
        <Link href={`/engineering/${article.slug}`} className="focus:outline-none">
          {article.title}
        </Link>
      </h3>

      <p className="text-text-secondary mt-3 text-sm leading-7">{article.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-text-muted rounded-full border border-white/10 px-3 py-1 font-mono text-[10px]">
          {article.readingMinutes} min read
        </span>
        <span className="text-text-muted rounded-full border border-white/10 px-3 py-1 font-mono text-[10px]">
          {difficultyLabels[article.difficulty]}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="border-accent-green/20 bg-accent-green/10 text-accent-green rounded-full border px-3 py-1 font-mono text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
