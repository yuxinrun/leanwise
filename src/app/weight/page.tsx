import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { TopicNav, TopicSection } from '@/components/content/TopicSection';
import { WEIGHT_TOPICS } from '@/content/sections';
import { getArticlesBySection } from '@/content/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { ButtonLink } from '@/components/ui/Button';
import type { ChartId } from '@/types';

export const metadata: Metadata = {
  title: '体重管理 — BMI 局限、腰围、7 日均值与长期趋势',
  description: '不把 BMI 等同于健康程度：系统介绍腰围、腰高比、体脂率测量误差、身体成分变化与体重维持，并提供 7 日均值、30 日趋势等可视化图表。',
};

const GALLERY: { id: ChartId; title: string; note: string }[] = [
  { id: 'weight-moving-average', title: '体重 7 日均值', note: '每日读数与移动平均对比' },
  { id: 'weight-longterm', title: '体重 30 日 / 长期趋势', note: '看方向而非单日数字' },
  { id: 'waist-trend', title: '腰围变化', note: '固定测量条件才可比' },
  { id: 'weight-vs-activity', title: '体重与训练 / 活动量', note: '两条曲线同时变化不代表因果' },
  { id: 'steps-trend', title: '体重与活动量代理指标', note: '步数是 NEAT 的粗略代理' },
];

export default function WeightPage() {
  const articles = getArticlesBySection('weight');
  return (
    <>
      <PageHero
        eyebrow="WEIGHT MANAGEMENT · 体重管理"
        title="体重秤只是一个传感器"
        description="把单点读数变成 7 日均值与 30 日趋势，再与腰围、力量、体能和健康指标一起看。任何单一指标都不足以判断健康。"
        art="WeightScale"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '体重管理', href: '/weight' }]}
        tags={['BMI 局限', '腰高比', '体脂率误差', '7 日均值', '长期维持']}
      />
      <TopicNav topics={WEIGHT_TOPICS} />

      <section className="container py-12">
        <SectionHeading eyebrow="CHART GALLERY · 可视化图表" title="五类体重管理图表" description="全部图表支持 Tooltip、图例、单位说明与响应式布局；可切换文献数据与模拟数据，个人记录在数据实验室中显示。" />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {GALLERY.map((g) => <ChartPanel key={g.id} chartId={g.id} title={g.title} description={g.note} height={240} />)}
          <div className="flex flex-col justify-between border border-line bg-mint/40 p-6">
            <div>
              <p className="eyebrow mb-3">YOUR OWN DATA</p>
              <h3 className="font-display text-xl text-ink">用你自己的记录替换模拟数据</h3>
              <p className="mt-3 text-[0.85rem] leading-[1.9] text-charcoal/70">在数据实验室记录体重、腰围与活动后，图表会把个人记录单独标注为「个人记录 · 本地保存」，不会与模拟数据或研究结果混淆。</p>
            </div>
            <ButtonLink href="/lab" size="sm" className="mt-6 self-start">打开数据实验室</ButtonLink>
          </div>
        </div>
      </section>

      <div className="container pb-4">{WEIGHT_TOPICS.map((t) => <TopicSection key={t.id} topic={t} />)}</div>

      <section className="container pb-6">
        <Callout tone="warning" title="重要：不要用单一指标判断健康">
          体重、腰围与体脂率测量均有局限，单次读数也不反映脂肪变化。BMI 是人群筛查工具，不等同于体脂率或健康程度。体检异常或有慢性病风险者，请咨询医生并结合专业检查综合评估。
        </Callout>
      </section>

      <section className="border-t border-line bg-mint/40">
        <div className="container py-14">
          <SectionHeading eyebrow="FURTHER READING" title="深入阅读" />
          <div className="mt-7 grid gap-x-10 md:grid-cols-2">{articles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>
    </>
  );
}
