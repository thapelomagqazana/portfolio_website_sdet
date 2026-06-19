import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleCategoryLabels, difficultyLabels } from "@/data/knowledge-base";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { buildArticleMetadata } from "@/lib/seo";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | Engineering Intelligence",
    };
  }

  return buildArticleMetadata({
    title: article.title,
    description: article.description,
    path: `/engineering/${article.slug}`,
    publishedTime: article.publishedAt,
    keywords: article.tags,
  });
}

export default async function EngineeringArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const ArticleContent = await import(`../../../../content/articles/${article.slug}.mdx`).then(
    (articleModule) => articleModule.default
  );

  const related = getRelatedArticles(article);

  const articleJsonLd = buildArticleJsonLd({
    headline: article.title,
    description: article.description,
    url: `/engineering/${article.slug}`,
    publishedAt: article.publishedAt,
    keywords: article.tags,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Engineering Intelligence", path: "/#engineering-intelligence" },
    { name: article.title, path: `/engineering/${article.slug}` },
  ]);

  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-4xl">
        <header>
          <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
            {articleCategoryLabels[article.category]}
          </p>

          <h1 className="font-display text-text-primary mt-4 max-w-3xl text-4xl leading-tight font-black tracking-tight sm:text-5xl">
            {article.title}
          </h1>

          <p className="text-text-secondary mt-5 max-w-3xl text-lg leading-8">
            {article.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-text-secondary rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs">
              {article.readingMinutes} min read
            </span>

            <span className="text-text-secondary rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs">
              {difficultyLabels[article.difficulty]}
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-text-primary prose-h1:text-4xl prose-h2:mt-12 prose-h2:border-t prose-h2:border-white/10 prose-h2:pt-8 prose-h2:text-3xl prose-h3:text-2xl prose-p:text-text-secondary prose-p:leading-8 prose-li:text-text-secondary prose-li:leading-7 prose-strong:text-text-primary prose-a:text-accent-blue prose-blockquote:border-accent-green prose-blockquote:text-text-primary prose-hr:border-white/10 prose-code:text-accent-green prose-pre:border prose-pre:border-white/10 prose-pre:bg-background-deep mt-10 max-w-none">
          <ArticleContent />
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto mt-16 max-w-4xl" aria-labelledby="related-articles-heading">
          <h2
            id="related-articles-heading"
            className="font-display text-text-primary text-2xl font-black"
          >
            Related Articles
          </h2>

          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {related.map((item) => (
              <li
                key={item.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-accent-blue font-mono text-[10px] tracking-[0.2em] uppercase">
                  {articleCategoryLabels[item.category]}
                </p>

                <Link
                  href={`/engineering/${item.slug}`}
                  className="font-display text-text-primary hover:text-accent-blue mt-2 block text-sm font-bold transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
