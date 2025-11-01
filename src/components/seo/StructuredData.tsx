import { siteConfig } from '@/lib/config';

interface StructuredDataProps {
  type: 'person' | 'website' | 'article' | 'breadcrumb';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Jairo Saul Salas Quiñones',
          alternateName: 'JairoSaul',
          url: 'https://jairosaul.com',
          image: 'https://jairosaul.com/images/profile.webp',
          sameAs: [
            'https://github.com/JairoSaulProDev',
            'https://linkedin.com/in/JairoSaulProDev',
            'https://twitter.com/JairoSaulProDev',
            'https://youtube.com/@JairoSaulProDev',
            'https://instagram.com/JairoSaulProDev',
            'https://tiktok.com/@JairoSaulProDev'
          ],
          jobTitle: 'Startup Technical Founder',
          worksFor: {
            '@type': 'Organization',
            name: 'Independent'
          },
          knowsAbout: [
            'Software Engineering',
            'Startup Development',
            'Business Development',
            'Full Stack Development',
            'React',
            'Next.js',
            'TypeScript',
            'Entrepreneurship',
            'Innovation',
            'Technology'
          ],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Universidad Nacional de San Antonio Abad del Cusco'
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cusco',
            addressCountry: 'PE'
          },
          ...data
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'JairoSaul.com',
          alternateName: 'Jairo Saul Salas Quiñones',
          url: 'https://jairosaul.com',
          description: 'Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator',
          author: {
            '@type': 'Person',
            name: 'Jairo Saul Salas Quiñones'
          },
          inLanguage: 'es',
          copyrightYear: new Date().getFullYear(),
          publisher: {
            '@type': 'Person',
            name: 'Jairo Saul Salas Quiñones'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://jairosaul.com/buscar?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          },
          ...data
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title || '',
          description: data.description || '',
          image: data.image || 'https://jairosaul.com/images/og-image.jpg',
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: 'Jairo Saul Salas Quiñones',
            url: 'https://jairosaul.com'
          },
          publisher: {
            '@type': 'Person',
            name: 'Jairo Saul Salas Quiñones'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || 'https://jairosaul.com'
          },
          keywords: data.keywords || [],
          articleSection: data.category || 'Technology',
          inLanguage: 'es',
          ...data
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: (data.items as Array<{ name: string; url: string }> || []).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
