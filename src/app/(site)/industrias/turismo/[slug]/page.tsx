import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import {
  getIndustryArticleBySlug,
  getIndustrySlugs,
  getRelatedIndustryArticles,
} from '@/lib/industrias';

interface TurismoArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getIndustrySlugs('turismo').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TurismoArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getIndustryArticleBySlug('turismo', slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `/industrias/turismo/${slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      url: `https://jairosaul.com/industrias/turismo/${slug}`,
    },
  };
}

export default async function TurismoArticlePage({ params }: TurismoArticlePageProps) {
  const { slug } = await params;
  const article = getIndustryArticleBySlug('turismo', slug);
  if (!article) notFound();

  const related = getRelatedIndustryArticles(article, 3);

  return (
    <ArticleLayout
      title={article.title}
      description={article.description}
      date={article.date}
      readingTime={article.readingTime}
      tags={article.tags}
      sectionLabel="Industrias · Turismo"
      backHref="/industrias/turismo"
      backLabel="Volver a Turismo"
      canonical={`https://jairosaul.com/industrias/turismo/${slug}`}
      category={article.cluster}
      content={article.content}
      related={related.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        href: `/industrias/turismo/${item.slug}`,
      }))}
    />
  );
}
