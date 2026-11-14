import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { TopicNav, TopicSection } from '@/components/content/TopicSection';
import { TRAINING_TOPICS } from '@/content/sections';
import { getArticlesBySection } from '@/content/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/ui/Elements';
import { ExerciseGrid } from '@/components/training/ExerciseGrid';
import { PlanExplorer } from '@/components/training/PlanExplorer';
import { COMBINE_CASES } from '@/content/training';
import { SPECIAL_POPULATION_NOTICE } from '@/lib/calculations';

export const metadata: Metadata = {
  title: '运动减脂 — 有氧图鉴、力量训练方案与运动安全',
  description: '8 种有氧运动的特点与强度控制、5 套可切换的力量训练方案（含动作 SVG、组数次数、休息、强度与替代动作）、NEAT、训练组合与运动安全。',
};

export default function TrainingPage() {
  const articles = getArticlesBySection('training');
  return (
    <>
      <PageHero
        eyebrow="TRAINING · 运动减脂"
        title="运动的价值，不只是消耗热量"
        description="有氧改善心肺与活动量，力量训练帮助保留瘦体重，日常活动决定长期基线。这里提供可直接执行的方案，也说明每一步的安全边界。"
        art="Squat"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '运动减脂', href: '/training' }]}
        tags={['8 种有氧图鉴', '5 套训练方案', 'RPE / RIR', 'NEAT', '运动安全']}
      />
      <TopicNav topics={TRAINING_TOPICS} />

      <section id="cardio" className="container scroll-mt-24 py-12">
        <SectionHeading eyebrow="CARDIO ATLAS · 有氧运动图鉴" title="选一种你能长期做下去的" description="点击卡片展开：适用人群、强度控制、运动时间、常见错误与安全注意事项。" />
        <div className="mt-8"><ExerciseGrid /></div>
      </section>

      <section id="plans" className="scroll-mt-24 border-y border-line bg-white py-12">
        <div className="container">
          <SectionHeading eyebrow="TRAINING PLANS · 力量训练方案" title="从每周 2 次到 4 次，都有完整动作表" description="每套方案含动作名称、组数、次数、休息时间、强度说明、动作 SVG、替代动作与进阶方式。" />
          <div className="mt-8"><PlanExplorer /></div>
        </div>
      </section>

      <div className="container pb-4">{TRAINING_TOPICS.filter((t) => t.id !== 'cardio' && t.id !== 'strength').map((t) => <TopicSection key={t.id} topic={t} />)}</div>

      <section id="combine" className="container scroll-mt-24 py-10">
        <SectionHeading eyebrow="REAL-WEEK CASES" title="有氧与力量组合的实际案例" />
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMBINE_CASES.map((c) => (
            <div key={c.title} className="border-t-2 border-forest/60 bg-white p-4">
              <p className="text-sm font-semibold text-ink">{c.title}</p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-charcoal/70">{c.detail}</p>
              <p className="mt-3 text-[0.72rem] text-mist">适合：{c.suitable}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-mist">{SPECIAL_POPULATION_NOTICE}</p>
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
