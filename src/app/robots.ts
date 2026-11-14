import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/site';

// output: 'export' 要求 metadata 路由显式声明为静态。
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: siteUrl('/sitemap.xml'),
  };
}
