import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { BRAND, SITE_ORIGIN, siteUrl } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'LEANWISE 科学减脂 — 减脂知识库、实战手册与体重管理数据实验室',
    template: '%s | LEANWISE 科学减脂',
  },
  description: BRAND.description,
  keywords: ['科学减脂', '能量平衡', 'TDEE', '基础代谢', '营养学', '力量训练', '体重管理', 'BMI', '膳食指南', '减脂平台期'],
  applicationName: 'LEANWISE 科学减脂',
  authors: [{ name: 'LEANWISE 编辑组' }],
  openGraph: {
    type: 'website', locale: 'zh_CN', siteName: 'LEANWISE 科学减脂',
    title: 'LEANWISE 科学减脂 — 减掉多余脂肪，不透支健康',
    description: BRAND.description,
    url: siteUrl('/'),
  },
  twitter: { card: 'summary_large_image', title: 'LEANWISE 科学减脂', description: BRAND.sloganCn },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl('/') },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F6EF',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LEANWISE 科学减脂',
  alternateName: '科学减脂 · 理性变瘦',
  url: siteUrl('/'),
  description: BRAND.description,
  inLanguage: 'zh-CN',
  publisher: { '@type': 'Organization', name: 'LEANWISE', slogan: BRAND.sloganEn },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-4 focus:py-2 focus:text-white">跳到正文</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
