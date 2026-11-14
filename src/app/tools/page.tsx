import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { Badge } from '@/components/ui/Elements';
import { TOOLS, TOOL_CATEGORIES } from '@/content/tools';
import { FORMULA_CAVEAT, SPECIAL_POPULATION_NOTICE } from '@/lib/calculations';

export const metadata: Metadata = {
  title: '实用工具 — BMI、BMR、TDEE、营养素与趋势分析',
  description: '10 个可真实交互的科学减脂工具：输入有单位与校验，展示计算过程、解释结果含义并说明公式局限；不提供诊断，不把估算包装成精准医学结论。',
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="TOOLS · 实用工具"
        title="算得出，也解释得清"
        description="10 个工具覆盖身体指标、能量估算、营养计算与趋势记录。每个都展示计算过程、结果含义、公式局限与适用边界。"
        art="CalculatorArt"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '实用工具', href: '/tools' }]}
        tags={['输入校验', '计算过程可见', '公式局限说明', '不提供诊断']}
      />

      <section className="container py-12">
        {TOOL_CATEGORIES.map((cat) => (
          <div key={cat} className="mb-10">
            <div className="mb-4 flex items-baseline gap-3"><h2 className="font-display text-xl text-ink">{cat}</h2><span className="num text-xs text-mist">{TOOLS.filter((t) => t.category === cat).length} 个工具</span></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.filter((t) => t.category === cat).map((t) => (
                <Link key={t.slug} href={`/tools/${t.slug}`} className="group flex flex-col border border-line bg-white p-5 transition-colors hover:bg-mint/50 focus-ring">
                  <div className="flex items-start justify-between gap-3">
                    <Badge tone="forest">{t.category}</Badge>
                    <ArrowUpRight size={16} className="text-forest/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink group-hover:text-forest">{t.title}</h3>
                  <p className="mt-1 text-[0.7rem] tracking-wide text-mist">{t.subtitle}</p>
                  <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-charcoal/65">{t.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{t.tags.map((tag) => <span key={tag} className="rounded-sm border border-line px-1.5 py-0.5 text-[0.68rem] text-mist">#{tag}</span>)}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-line bg-mint/40 py-10">
        <div className="container">
          <SectionHeading eyebrow="HOW TO READ THE RESULT" title="如何看待工具的每一个数字" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { t: '有单位、有校验', d: '输入框标注单位并限定合理范围；不合理输入不会被包装成结果。' },
              { t: '过程透明', d: '每个结果都列出公式、代入过程与中间量，方便你核对而不是盲信。' },
              { t: '明确局限', d: '公式误差、人群适用性与身体状态信号都写在结果旁边。' },
            ].map((x) => <div key={x.t} className="border border-line bg-white p-4"><p className="text-sm font-semibold text-ink">{x.t}</p><p className="mt-2 text-[0.8rem] leading-relaxed text-charcoal/70">{x.d}</p></div>)}
          </div>
          <Callout tone="warning" title="重要边界"><p>{FORMULA_CAVEAT}</p><p className="mt-2">{SPECIAL_POPULATION_NOTICE}</p></Callout>
        </div>
      </section>
    </>
  );
}
