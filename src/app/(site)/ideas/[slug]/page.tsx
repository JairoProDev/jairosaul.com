import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import GiscusComments from '@/components/engagement/GiscusComments';
import NewsletterSignup from '@/components/engagement/NewsletterSignup';
import { getAllIdeaSlugs, getIdeaBySlug, getRelatedIdeas } from '@/lib/mdx';

interface IdeaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIdeaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IdeaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea) return {};

  return {
    title: idea.title,
    description: idea.description,
    alternates: { canonical: `/ideas/${slug}` },
    openGraph: {
      type: 'article',
      title: idea.title,
      description: idea.description,
      publishedTime: idea.date,
      url: `https://jairosaul.com/ideas/${slug}`,
    },
  };
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea) notFound();

  const related = getRelatedIdeas(slug, idea.tags, 3);

  return (
    <>
      <ArticleLayout
        title={idea.title}
        description={idea.description}
        date={idea.date}
        readingTime={idea.readingTime}
        tags={idea.tags}
        sectionLabel={idea.category === 'jairoprodev' ? 'Jairoprodev' : 'Jairogrowhack'}
        backHref="/ideas"
        backLabel="Volver a Ideas"
        canonical={`https://jairosaul.com/ideas/${slug}`}
        category={idea.category}
        content={idea.content}
        related={related.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          href: `/ideas/${item.slug}`,
        }))}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <NewsletterSignup />
        <div className="mt-16">
          <GiscusComments theme="dark" />
        </div>
      </div>
    </>
  );
}
