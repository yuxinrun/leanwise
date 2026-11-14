import type { Metadata } from 'next';
import Editorial from '@/content/editorial.mdx';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { DataSourceLegend } from '@/components/common/DataSourceTag';
import { QuoteBlock } from '@/components/common/QuoteBlock';
import { ButtonLink } from '@/components/ui/Button';
import { BRAND, CORE_PRINCIPLES, GLOBAL_DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: '关于本站 — 编辑原则、证据分级与数据隐私',
  description: 'LEANWISE 科学减脂知识平台的定位、核心理念、编辑与证据原则、三类数据区分、内容边界与个人数据隐私说明。',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT · 关于本站"
        title="Lose Fat, Not Your Health."
        description={BRAND.description}
        art="EnergyBalance"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '关于本站', href: '/about' }]}
        tags={[BRAND.tagline, '证据分级', '本地数据', '不制造焦虑']}
      />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="OUR POSITION" title="不是减肥博客，是知识平台" />
            <p className="mt-5 text-[0.92rem] leading-[1.95] text-charcoal/75">普通减脂内容常把复杂问题压缩成一句口号：少吃、多动、戒碳水、几天见效。LEANWISE 想做相反的事——把机制拆开、把证据标出来、把适用条件写清楚，并提供可以真实交互的工具与本地数据实验室。</p>
            <p className="mt-4 text-[0.92rem] leading-[1.95] text-charcoal/75">我们相信可验证、可持续、可修正的方法，比短期更激进的数字更有价值。健康不是体重秤上的一个数字，而是身体、行为与生活质量的综合表现。</p>
            <div className="mt-7"><QuoteBlock text={BRAND.sloganCn} tag="核心理念" /></div>
          </div>
          <div className="border border-line bg-white p-5 sm:p-7">
            <p className="eyebrow mb-4">核心原则</p>
            <ul className="space-y-3">
              {CORE_PRINCIPLES.map((p, i) => (
                <li key={p} className="flex gap-3 border-b border-line/70 pb-3 text-[0.86rem] leading-relaxed text-charcoal/75">
                  <span className="num text-xs text-forest/50">0{i + 1}</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mint/40 py-12">
        <div className="container">
          <SectionHeading eyebrow="EDITORIAL STANDARD · MDX" title="编辑原则与内容边界" description="以下内容由站内 MDX 文档渲染，与知识文章共用同一套视觉规范。" />
          <div className="mx-auto mt-8 max-w-3xl border border-line bg-white p-6 sm:p-10">
            <div className="prose prose-headings:font-display prose-p:leading-[1.95] prose-li:leading-[1.9] prose-a:text-forest max-w-none text-charcoal/80">
              <Editorial />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <SectionHeading eyebrow="DATA PRIVACY" title="你的记录只属于你" description="个人数据默认只保存在浏览器 localStorage，不会在未经明确授权的情况下上传服务器。" />
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            { t: '本地保存', d: '体重、饮食、运动与资源收藏使用 localStorage，服务端不接收任何个人健康数据。' },
            { t: '可导出', d: '在数据实验室一键导出 JSON 文件，包含全部三类记录与收藏；也支持导入回本机。' },
            { t: '可删除', d: '一键清除本站保存在本机的全部记录，删除后不可恢复，请先导出备份。' },
          ].map((x) => <div key={x.t} className="border-t-2 border-forest/60 bg-white p-5"><p className="font-display text-lg text-ink">{x.t}</p><p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/70">{x.d}</p></div>)}
        </div>
        <div className="mt-8 border border-line bg-white p-5">
          <p className="eyebrow mb-4">三类数据如何区分</p>
          <DataSourceLegend />
        </div>
      </section>

      <section className="container pb-8">
        <Callout tone="warning" title="使用本站即表示理解以下边界">
          {GLOBAL_DISCLAIMER} 本站不提供医学诊断、药物方案或个体化营养处方，不承诺固定时间减重，也不制造体重与身材焦虑。出现持续疲劳、月经紊乱、暴食冲动或明显情绪困扰时，请停止加码并寻求专业帮助。
        </Callout>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/science" size="sm">从减脂科学开始</ButtonLink>
          <ButtonLink href="/articles" variant="outline" size="sm">浏览全部文章</ButtonLink>
          <ButtonLink href="/lab" variant="outline" size="sm">打开数据实验室</ButtonLink>
        </div>
      </section>
    </>
  );
}
