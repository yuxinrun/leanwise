import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/site';
import { ARTICLES } from '@/content/articles';
import { TOOLS } from '@/content/tools';

// output: 'export' 要求 metadata 路由显式声明为静态。
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/science', '/nutrition', '/training', '/practice', '/weight', '/resources', '/lab', '/tools', '/about', '/articles'];
  return [
    ...staticPaths.map((path) => ({ url: siteUrl(path || '/'), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...ARTICLES.map((a) => ({ url: siteUrl(`/articles/${a.slug}`), lastModified: new Date(a.updated), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...TOOLS.map((t) => ({ url: siteUrl(`/tools/${t.slug}`), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
