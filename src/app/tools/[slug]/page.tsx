import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ToolView } from '@/components/tools/ToolViews';
import { TOOLS, TOOL_MAP } from '@/content/tools';
import { Badge } from '@/components/ui/Elements';
import { siteUrl } from '@/content/site';

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOL_MAP.get(slug);
  if (!tool) return { title: '工具未找到' };
  return { title: `${tool.title} — 科学减脂计算工具`, description: tool.description, alternates: { canonical: siteUrl(`/tools/${tool.slug}`) } };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOL_MAP.get(slug);
  if (!tool) notFound();
  const others = TOOLS.filter((t) => t.slug !== slug).slice(0, 5);
  return (
    <>
      <PageHero
        eyebrow={`TOOLS · ${tool.category}`}
        title={tool.title}
        description={tool.description}
        art="CalculatorArt"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '实用工具', href: '/tools' }, { label: tool.title, href: `/tools/${slug}` }]}
        tags={tool.tags}
      />
      <div className="container py-10"><ToolView slug={slug} /></div>
      <section className="container pb-8">
        <p className="eyebrow mb-3">其他工具</p>
        <div className="flex flex-wrap gap-2">
          {others.map((t) => <Link key={t.slug} href={`/tools/${t.slug}`} className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-3 py-2 text-xs text-forest hover:bg-mint">{t.title} <ChevronRight size={13} /></Link>)}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-mist"><Badge tone="sun">数据说明</Badge> 工具内演示用的示例数字为模拟数据，仅用于说明方法；你输入的数据只在本页计算，除非主动点击「保存到本地记录」。</p>
      </section>
    </>
  );
}
