import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BarChart3, Calculator, Check, Database, FlaskConical, LineChart, ShieldCheck } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { QuoteDaily } from '@/components/home/QuoteDaily';
import { Illustration } from '@/components/illustrations';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading, Badge } from '@/components/ui/Elements';
import { ButtonLink } from '@/components/ui/Button';
import { DataSourceLegend } from '@/components/common/DataSourceTag';
import { BRAND, CORE_PRINCIPLES, HOME_ENTRIES } from '@/content/site';
import { PRINCIPLES, EVIDENCE_LABELS } from '@/content/principles';
import { ARTICLE_MAP, LATEST_GROUPS } from '@/content/articles';
import { QUOTES } from '@/content/quotes';

export default function HomePage() {
  const initial = Math.floor(Date.now() / 86400000) % QUOTES.length;

  return (
    <>
      <Hero />

      {/* 事实带：不用夸张数字，用可核验的定位 */}
      <section className="border-b border-line bg-cream">
        <div className="container grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {[
            { icon: BarChart3, title: '科学解释', desc: '从能量平衡到脂肪代谢的机制' },
            { icon: Calculator, title: '真实工具', desc: '10 个可交互计算与记录工具' },
            { icon: Database, title: '本地数据', desc: '个人记录默认保存在你的浏览器' },
            { icon: ShieldCheck, title: '证据分级', desc: '区分充分、有限与尚无充分证据' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3 bg-cream px-4 py-6 sm:px-6">
                <Icon size={19} className="mt-0.5 shrink-0 text-forest" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-charcoal/60">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 六个核心知识入口 */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow="START HERE · 知识入口"
          title="先建立地图，再开始行动"
          description="减脂不是一堆互相矛盾的技巧，而是一套可以按顺序理解的系统。从下面六个入口进入。"
          action={<ButtonLink href="/articles" variant="outline" size="sm">浏览全部 30 篇文章 <ArrowUpRight size={14} /></ButtonLink>}
        />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {HOME_ENTRIES.map((entry, i) => (
            <Link key={entry.id} href={entry.href} className="group flex flex-col bg-white p-5 transition-colors hover:bg-mint/50 focus-ring sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="num text-[0.7rem] text-mist">0{i + 1}</span>
                <span className="eyebrow text-[0.6rem]">{entry.en}</span>
              </div>
              <div className="mx-auto mt-3 w-full max-w-[190px]"><Illustration name={entry.art} /></div>
              <h3 className="mt-4 font-display text-xl text-ink group-hover:text-forest">{entry.title}</h3>
              <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-charcoal/65">{entry.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-forest">进入栏目 <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 核心科学观点 */}
      <section className="border-y border-line bg-mint/40">
        <div className="container py-16 sm:py-20">
          <SectionHeading
            eyebrow="CORE IDEAS · 科学观点"
            title="六个经得起追问的基本原则"
            description="每条观点都标注证据等级，并可进入对应的深度文章查看研究对象、主要结果与局限。"
          />
          <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Link key={p.id} href={`/articles/${p.articleSlug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-b border-line/80 py-6 focus-ring sm:gap-5">
                <span className="num pt-1 text-lg text-forest/45">{p.index}</span>
                <div className="min-w-0">
                  <p className="text-[0.7rem] tracking-wide text-mist">{p.title}</p>
                  <h3 className="mt-1 font-display text-[1.15rem] leading-snug text-ink group-hover:text-forest sm:text-[1.3rem]">{p.statement}</h3>
                  <p className="mt-2 text-[0.82rem] leading-[1.8] text-charcoal/65">{p.explanation}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge className="border" tone="forest">{EVIDENCE_LABELS[p.evidence].label}</Badge>
                    <span className="text-[0.7rem] text-mist">{p.referenceIds.length} 篇可核验文献</span>
                  </div>
                </div>
                <ArrowUpRight size={17} className="mt-1 shrink-0 text-forest/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 数据可视化预览 */}
      <section className="bg-ink py-16 text-cream sm:py-20">
        <div className="container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3 text-sun">DATA VIEW · 首页数据可视化</p>
              <h2 className="font-display text-[1.75rem] text-cream sm:text-[2.35rem]">把复杂机制，画成能读的图</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">每张图都带单位、图例、Tooltip 与数据说明。真实数据、模拟数据与个人记录严格区分，可在图表内切换。</p>
            </div>
            <ButtonLink href="/lab" variant="light" size="sm" className="self-start sm:self-auto">进入数据实验室 <ArrowUpRight size={14} /></ButtonLink>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <ChartPanel chartId="energy-balance" height={250} title="能量摄入与消耗示意" description="摄入与消耗都会随身体适应变化" />
            <ChartPanel chartId="macro-pie" height={250} title="不同营养素能量占比" description="可切换文献参考区间与模拟配比" defaultMode="reference" />
            <ChartPanel chartId="training-distribution" height={250} title="一周运动活动分布" description="力量、有氧、日常活动与恢复" />
            <ChartPanel chartId="weight-longterm" height={250} title="体重长期趋势示意" description="看趋势方向，而不是单日读数" />
          </div>
          <div className="mt-8 border-t border-cream/15 pt-6"><DataSourceLegend /></div>
        </div>
      </section>

      {/* 每日金句 */}
      <section className="border-b border-line bg-forest/95 py-16 text-cream sm:py-20">
        <div className="container"><QuoteDaily quotes={QUOTES} initial={initial} /></div>
      </section>

      {/* 最新文章：按主题分组，而不是普通列表 */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow="LATEST READING · 最新文章"
          title="从五个真实问题开始读"
          description="首批 30 篇深度文章已上线，每篇都包含研究证据、实操步骤、案例、图表与参考文献。"
          action={<ButtonLink href="/articles" variant="outline" size="sm">查看全部文章 <ArrowUpRight size={14} /></ButtonLink>}
        />
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {LATEST_GROUPS.map((group, i) => {
            const article = ARTICLE_MAP.get(group.slug);
            if (!article) return null;
            return (
              <div key={group.slug} className="border-t-2 border-forest/70 pt-4">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <p className="eyebrow">{group.label}</p>
                  <span className="num text-[0.7rem] text-mist">0{i + 1}</span>
                </div>
                <ArticleCard article={article} compact />
                <p className="mt-3 text-xs text-mist">{group.note}</p>
              </div>
            );
          })}
          <div className="flex flex-col justify-center border border-line bg-mint/40 p-6 md:min-h-[220px]">
            <LineChart size={24} className="text-forest" strokeWidth={1.6} />
            <h3 className="mt-4 font-display text-xl text-ink">想直接开始记录？</h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-charcoal/70">体重、饮食、运动三类记录默认保存在本机，可随时导出或删除。图表会自动区分「个人记录」与「模拟数据」。</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/lab" size="sm">打开数据实验室</ButtonLink>
              <ButtonLink href="/tools" variant="outline" size="sm">查看工具</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 工具与实验室入口 */}
      <section className="border-y border-line bg-white">
        <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">TOOLS & LAB · 工具与记录</p>
            <h2 className="font-display text-[1.75rem] text-ink sm:text-3xl">算得出，也看得见</h2>
            <p className="mt-4 text-sm leading-[1.9] text-charcoal/70">所有计算器都展示计算过程、解释结果含义并说明公式局限；不提供诊断，也不把估算包装成精准医学结论。</p>
            <ButtonLink href="/tools" className="mt-6" size="sm">浏览 10 个工具 <ArrowUpRight size={14} /></ButtonLink>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Calculator, slug: 'bmi', title: 'BMI 计算器', desc: '含中国成人参考界值与局限说明' },
              { icon: FlaskConical, slug: 'tdee', title: 'TDEE 估算', desc: '公式交叉对照与温和缺口参考' },
              { icon: LineChart, slug: 'weight-trend', title: '趋势分析', desc: '7 日均值与每周变化速率' },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.slug} href={`/tools/${t.slug}`} className="group border border-line bg-cream p-5 transition-colors hover:bg-mint/60 focus-ring">
                  <Icon size={20} className="text-forest" strokeWidth={1.7} />
                  <p className="mt-4 text-sm font-semibold text-ink group-hover:text-forest">{t.title}</p>
                  <p className="mt-1.5 text-[0.75rem] leading-relaxed text-charcoal/60">{t.desc}</p>
                  <ArrowUpRight size={14} className="mt-4 text-forest/60" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 内容边界 */}
      <section className="container py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">OUR BOUNDARIES · 内容边界</p>
            <h2 className="font-display text-2xl text-ink">我们不做什么，和做什么一样重要</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/65">{BRAND.sloganEn} {BRAND.sloganCn}</p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {CORE_PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-2.5 border-b border-line/70 pb-3 text-[0.85rem] leading-relaxed text-charcoal/75">
                <Check size={15} className="mt-0.5 shrink-0 text-forest" />{p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
