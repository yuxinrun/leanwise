import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticle } from '@/content/articles';
import { ArticleTemplate } from '@/components/article/ArticleTemplate';
import { siteUrl } from '@/content/site';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: '文章未找到' };
  return {
    title: article.title,
    description: article.summary,
    keywords: [article.category, ...article.tags],
    openGraph: { title: article.title, description: article.summary, type: 'article' },
    alternates: { canonical: siteUrl(`/articles/${article.slug}`) },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    inLanguage: 'zh-CN',
    dateModified: article.updated,
    author: { '@type': 'Organization', name: 'LEANWISE 编辑组' },
    publisher: { '@type': 'Organization', name: 'LEANWISE' },
  };
  return (
    <>
      <ArticleTemplate article={article} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
