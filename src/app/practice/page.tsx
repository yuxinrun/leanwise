import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Plan30Explorer } from '@/components/practice/Plan30Explorer';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { AUDIENCE_GUIDES, SPECIAL_GROUPS_NOTICE, COMMON_DIFFICULTIES } from '@/content/plan30';
import { getArticlesBySection } from '@/content/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Illustration } from '@/components/illustrations';
import { ChartPanel } from '@/components/charts/ChartPanel';

export const metadata: Metadata = {
  title: '减脂实战 — 30 天入门计划、不同人群指南、平台期与反弹',
  description: '可执行的 30 天四阶段计划（每日任务、饮食与活动建议、记录项、困难与解决方法）、7 类人群指南、常见困难、真正的平台期定义与体重反弹应对。',
};

export default function PracticePage() {
  const articles = getArticlesBySection('practice');
  return (
    <>
      <PageHero
        eyebrow="PRACTICE · 减脂实战"
        title="从「知道」到「做到」"
        description="不承诺 30 天瘦多少斤，只帮你建立一套能长期运行的系统：建立基线、稳定记录、加入活动、用趋势复盘。"
        art="HabitLoop"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '减脂实战', href: '/practice' }]}
        tags={['30 天逐日计划', '不同人群指南', '常见困难', '平台期排查', '体重反弹']}
      />

      <section id="30days" className="container scroll-mt-24 py-12">
        <SectionHeading eyebrow="30-DAY ONBOARDING" title="30 天科学减脂入门计划" description="四阶段、30 天逐日任务。点击任意一天查看：今日任务、饮食建议、活动建议、记录项目、常见困难与解决方法。" />
        <div className="mt-8"><Plan30Explorer /></div>
      </section>

      <section id="audiences" className="scroll-mt-24 border-y border-line bg-white py-12">
        <div className="container">
          <SectionHeading eyebrow="AUDIENCE GUIDES" title="不同人群的减脂指南" description="同样是减脂，久坐办公、经常出差、素食者与中老年人面对的约束完全不同。" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_GUIDES.map((g) => (
              <div key={g.id} className="border border-line bg-cream p-5">
                <p className="font-display text-lg text-ink">{g.title}</p>
                <p className="mt-1.5 text-[0.78rem] text-forest">{g.focus}</p>
                <ul className="mt-3 space-y-1.5 text-[0.8rem] leading-relaxed text-charcoal/70">{g.points.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange" />{p}</li>)}</ul>
                <p className="mt-3 flex gap-2 border-t border-line pt-3 text-[0.75rem] leading-relaxed text-[#9A5B22]"><AlertTriangle size={13} className="mt-0.5 shrink-0" />{g.caution}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 border border-orange/40 bg-orange-soft/40 p-5">
            <p className="text-sm font-semibold text-ink">需要专门专业医疗指导提醒的人群</p>
            <p className="mt-2 text-[0.82rem] leading-[1.9] text-charcoal/75">以下情况不应直接套用普通成人减脂方案，请先由医生或注册营养师个体化评估：</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {SPECIAL_GROUPS_NOTICE.map((s) => <li key={s.name} className="rounded-sm border border-orange/35 bg-white px-2.5 py-1 text-[0.75rem] text-[#9A5B22]">{s.name}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="difficulties" className="container scroll-mt-24 py-12">
        <SectionHeading eyebrow="COMMON DIFFICULTIES" title="常见困难：先找原因，再找方法" />
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {COMMON_DIFFICULTIES.map((d, i) => (
            <Link key={d.title} href={d.href} className="group bg-white p-5 transition-colors hover:bg-mint/50 focus-ring">
              <span className="num text-[0.7rem] text-mist">0{i + 1}</span>
              <p className="mt-2 font-display text-lg text-ink group-hover:text-forest">{d.title}</p>
              <p className="mt-2 text-[0.79rem] leading-relaxed text-charcoal/65">{d.approach}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-forest">深入阅读 <ArrowUpRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="plateau" className="scroll-mt-24 border-y border-line bg-mint/40 py-12">
        <div className="container">
          <SectionHeading eyebrow="PLATEAU & REGAIN" title="平台期与反弹：先排查，再调整" description="把「几天不动」和「真正走平」区分开，是长期执行最关键的能力。" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <h3 className="font-display text-xl text-ink">如何定义真正的平台期</h3>
              <p className="mt-3 text-[0.88rem] leading-[1.9] text-charcoal/75">在固定称重条件下，7 日移动平均连续 3–4 周基本水平，且腰围、力量与记录都没有明显变化，才更接近真正的平台期。短期读数不动，通常只是水分、糖原、钠与胃肠道内容物的变化。</p>
              <ol className="mt-5 list-decimal space-y-2 pl-5 text-[0.85rem] leading-relaxed text-charcoal/75">
                <li>确认趋势与称重条件，排除短期波动。</li>
                <li>审计记录完整性：饮品、油、酱料、周末与外食。</li>
                <li>检查日均步数、力量训练重量与日常活动量。</li>
                <li>检查睡眠、压力与恢复状态。</li>
                <li>按当前体重重估 TDEE，再考虑小幅调整 100–200 kcal。</li>
              </ol>
              <h3 className="mt-9 font-display text-xl text-ink">为什么减肥后容易反弹</h3>
              <p className="mt-3 text-[0.88rem] leading-[1.9] text-charcoal/75">体重下降后能量需求降低，部分食欲相关适应可能持续；记录停止、运动减少、限制解除与节假日环境共同作用。把维持期当作计划的一部分——按新体重重估需求、分次上调摄入、保留力量训练与低频记录——比反复短期极端减重更可行。</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/articles/plateau" className="link-arrow text-sm">读：平台期究竟是什么 <ArrowUpRight size={14} /></Link>
                <Link href="/articles/regain" className="link-arrow text-sm">读：为什么容易反弹 <ArrowUpRight size={14} /></Link>
              </div>
            </div>
            <div className="space-y-4">
              <figure className="border border-line bg-white p-3"><Illustration name="Plateau" /><figcaption className="mt-2 text-[0.7rem] text-mist">平台期排查顺序示意（原创 SVG）</figcaption></figure>
              <ChartPanel chartId="weight-moving-average" height={210} title="趋势走平的判断" description="模拟数据：7 日均值比单日读数更可读" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <Callout tone="warning" title="不要承诺速度，也不要制造焦虑">
          本站不提供「30 天减 X 斤」之类的目标。减脂速度因人而异，短期体重变化不等于脂肪变化。出现持续疲劳、月经紊乱、暴食冲动或明显情绪困扰时，应停止加码并寻求专业帮助。
        </Callout>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container py-14">
          <SectionHeading eyebrow="FURTHER READING" title="深入阅读" />
          <div className="mt-7 grid gap-x-10 md:grid-cols-2">{articles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>
    </>
  );
}
