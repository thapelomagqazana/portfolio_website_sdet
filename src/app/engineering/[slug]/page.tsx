import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleCategoryLabels, difficultyLabels } from "@/data/knowledge-base";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";

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
      title: "Article not found",
    };
  }

  return {
    title: `${article.title} | Engineering Intelligence`,
    description: article.description,
    keywords: [...article.tags],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function EngineeringArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const ArticleContent = await import(`../../../../content/articles/${article.slug}.mdx`).then(
    (module) => module.default
  );

  const related = getRelatedArticles(article);

  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
          {articleCategoryLabels[article.category]}
        </p>

        <h1 className="font-display text-text-primary mt-4 text-4xl font-black">{article.title}</h1>

        <p className="text-text-secondary mt-5 text-lg leading-8">{article.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span>{article.readingMinutes} min read</span>
          <span>{difficultyLabels[article.difficulty]}</span>
        </div>

        <div className="prose prose-invert mt-10 max-w-none">
          <ArticleContent />
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-display text-text-primary text-2xl font-black">Related Articles</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug} className="text-text-secondary">
                {item.title}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
