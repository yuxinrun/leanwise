import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ResourceExplorer } from '@/components/resources/ResourceExplorer';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { Badge } from '@/components/ui/Elements';
import { EVIDENCE_LABELS } from '@/content/principles';
import { REFERENCES } from '@/content/evidence';

export const metadata: Metadata = {
  title: '书籍与网站资源库 — 国内外专业资料检索与收藏',
  description: '可搜索、可分类、可收藏的专业资源库：国内外减脂与营养学书籍、机构网站、文献数据库与学术平台，附核验状态、专业属性与推荐阅读。',
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="RESOURCES · 书籍与网站"
        title="先核实来源，再谈结论"
        description="国内外专业书籍、机构网站、文献数据库与学术平台。可检索、可分类、可收藏；未核实的书目字段明确标注，绝不编造中文译名或出版信息。"
        art="FoodLabel"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '书籍与网站', href: '/resources' }]}
        tags={['可搜索', '可分类', '本地收藏', '核验状态标注']}
      />

      <section className="container py-12"><ResourceExplorer /></section>

      <section id="evidence" className="scroll-mt-24 border-t border-line bg-mint/40 py-12">
        <div className="container">
          <SectionHeading eyebrow="EVIDENCE & REFERENCES" title="本站在用的证据分级与文献库" description="文章中的每条参考文献都可以在此按作者、年份、期刊、DOI 或 PubMed 链接核验。" />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(EVIDENCE_LABELS) as (keyof typeof EVIDENCE_LABELS)[]).map((key) => (
              <div key={key} className="border-t-2 border-forest/60 bg-white p-4">
                <p className="text-sm font-semibold text-ink">{EVIDENCE_LABELS[key].label}</p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-charcoal/70">{EVIDENCE_LABELS[key].desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border border-line bg-white p-5">
            <p className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">参考文献库 <Badge tone="forest">{REFERENCES.length} 条</Badge></p>
            <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {REFERENCES.map((r) => (
                <li key={r.id} className="border-b border-line/70 pb-2 text-[0.76rem] leading-relaxed text-charcoal/70">
                  {r.author}（{r.year}）· {r.title}{r.doi ? ` · doi:${r.doi}` : ''}
                </li>
              ))}
            </ul>
          </div>
          <Callout tone="warning" title="不要把这些材料当成结论本身">
            系统综述、随机对照试验、队列研究、指南与教材的证据权重不同；动物实验不能直接等同于人体证据，小样本研究不应被夸大为普遍规律，相关性也不代表因果。商业减肥机构的营销文章不计入本站证据体系。
          </Callout>
        </div>
      </section>
    </>
  );
}
