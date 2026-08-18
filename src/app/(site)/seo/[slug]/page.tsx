import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import {
  getAllSeoSlugs,
  getRelatedSeoArticles,
  getSeoArticleBySlug,
} from '@/lib/seo-content';

interface SeoArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SeoArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `/seo/${slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      url: `https://jairosaul.com/seo/${slug}`,
    },
  };
}

export default async function SeoArticlePage({ params }: SeoArticlePageProps) {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedSeoArticles(article, 3);

  return (
    <ArticleLayout
      title={article.title}
      description={article.description}
      date={article.date}
      readingTime={article.readingTime}
      tags={article.tags}
      sectionLabel="SEO técnico"
      backHref="/seo"
      backLabel="Volver a SEO"
      canonical={`https://jairosaul.com/seo/${slug}`}
      category={article.cluster}
      content={article.content}
      related={related.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        href: `/seo/${item.slug}`,
      }))}
    />
  );
}
