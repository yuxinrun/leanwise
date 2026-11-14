import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { TopicNav, TopicSection } from '@/components/content/TopicSection';
import { SCIENCE_TOPICS } from '@/content/sections';
import { getArticlesBySection } from '@/content/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/ui/Elements';
import { Illustration } from '@/components/illustrations';

export const metadata: Metadata = {
  title: '减脂科学 — 能量平衡、脂肪代谢与体重波动',
  description: '系统理解减脂的生理机制：BMR、RMR、TDEE、TEF、NEAT、脂肪动员与氧化、代谢适应、体重波动与合理减脂速度，附原创 SVG 图解与可核验文献。',
};

const SCIENCE_ARTS = [
  { art: 'EnergyBalance', title: '人体能量平衡机制', desc: '摄入端与消耗端的动态反馈' },
  { art: 'MetabolismFlow', title: '人体代谢能量流向', desc: '四个消耗组分如何构成 TDEE' },
  { art: 'TdeeComposition', title: 'TDEE 组成结构', desc: '比例仅为一般成人的粗略范围' },
  { art: 'WeightFluctuation', title: '体重变化与能量平衡', desc: '单日波动叠加长期趋势' },
];

export default function SciencePage() {
  const articles = getArticlesBySection('science');
  return (
    <>
      <PageHero
        eyebrow="SCIENCE · 减脂科学"
        title="把「变瘦」拆成可以被解释的过程"
        description="能量平衡、脂肪代谢、代谢适应、体重波动与减脂速度。这里不提供口号，只提供机制、证据等级与适用边界。"
        art="EnergyBalance"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '减脂科学', href: '/science' }]}
        tags={['能量平衡', '脂肪代谢', '代谢适应', '体重波动', '减脂速度']}
      />
      <TopicNav topics={SCIENCE_TOPICS} />

      <section className="container py-12">
        <SectionHeading eyebrow="ORIGINAL SVG · 原创知识插图" title="四张图看懂能量去哪了" description="以下插画均为本站原创 SVG，使用统一视觉语言，可在不同尺寸下保持清晰。" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCIENCE_ARTS.map((item) => (
            <figure key={item.art} className="border border-line bg-white p-3">
              <Illustration name={item.art} />
              <figcaption className="mt-3 border-t border-line pt-2">
                <p className="text-[0.8rem] font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-[0.7rem] leading-relaxed text-mist">{item.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="container pb-4">{SCIENCE_TOPICS.map((t) => <TopicSection key={t.id} topic={t} />)}</div>

      <section className="border-t border-line bg-mint/40">
        <div className="container py-14">
          <SectionHeading eyebrow="FURTHER READING" title="深入阅读" description="本栏目对应的深度文章，每篇都附参考文献与证据分级。" />
          <div className="mt-7 grid gap-x-10 md:grid-cols-2">{articles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>
    </>
  );
}
