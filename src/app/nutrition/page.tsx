import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { TopicNav, TopicSection } from '@/components/content/TopicSection';
import { NUTRITION_TOPICS } from '@/content/sections';
import { getArticlesBySection } from '@/content/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { Illustration } from '@/components/illustrations';
import { RecipeExplorer } from '@/components/nutrition/RecipeExplorer';
import { DietPatternTable } from '@/components/nutrition/DietPatternTable';

export const metadata: Metadata = {
  title: '饮食营养 — 热量管理、三大营养素、食谱库与饮食模式',
  description: '从 BMR/TDEE 估算、蛋白质、碳水、脂肪与膳食纤维，到可检索减脂食谱、7 种饮食模式证据评估与补剂辨析，附估算数据说明与可核验文献。',
};

const NUTRITION_ARTS = [
  { art: 'HealthyPlate', label: '健康餐盘' }, { art: 'ProteinFoods', label: '蛋白质食物图鉴' },
  { art: 'CarbFoods', label: '碳水食物图鉴' }, { art: 'HealthyFats', label: '健康脂肪食物图鉴' },
  { art: 'FiberSources', label: '膳食纤维来源' }, { art: 'PortionGuide', label: '食物份量指南' },
  { art: 'FoodLabel', label: '食物标签解读' },
];

export default function NutritionPage() {
  const articles = getArticlesBySection('nutrition');
  return (
    <>
      <PageHero
        eyebrow="NUTRITION · 饮食营养"
        title="不靠戒断，靠结构"
        description="热量、蛋白质、碳水、脂肪、纤维，以及能长期执行的食谱与饮食模式。这里不推荐「最适合所有人」的吃法，只提供证据、适用条件与局限。"
        art="HealthyPlate"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '饮食营养', href: '/nutrition' }]}
        tags={['热量管理', '三大营养素', '可检索食谱', '饮食模式证据', '补剂辨析']}
      />
      <TopicNav topics={NUTRITION_TOPICS} />

      <section className="container py-12">
        <SectionHeading eyebrow="ORIGINAL SVG · 营养插画库" title="把餐盘画清楚" description="7 幅原创 SVG 覆盖餐盘结构、三类食物图鉴、纤维来源、份量指南与标签解读。" />
        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {NUTRITION_ARTS.map((item) => (
            <figure key={item.art} className="border border-line bg-white p-2.5">
              <Illustration name={item.art} />
              <figcaption className="mt-2 border-t border-line pt-2 text-[0.75rem] text-ink">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="container pb-4">
        {NUTRITION_TOPICS.map((t) => (
          <div key={t.id}>
            <TopicSection topic={t} />
            {t.id === 'recipes' && (
              <section id="recipe-library" className="scroll-mt-24 border-t border-line bg-white p-4 sm:p-6">
                <SectionHeading eyebrow="SEARCHABLE LIBRARY" title="减脂食谱库" description="按分类、场景与关键词检索；点击卡片查看食材重量、步骤、估算营养与可替换食材。" />
                <div className="mt-7"><RecipeExplorer /></div>
              </section>
            )}
            {t.id === 'patterns' && (
              <section id="pattern-table" className="scroll-mt-24 border-t border-line bg-white p-4 sm:p-6">
                <SectionHeading eyebrow="EVIDENCE COMPARISON" title="七种饮食模式：证据、优势、限制与适用人群" description="表格在手机上可横向滚动，不会挤压正文；展开下方卡片可查看证据说明与文献。" />
                <div className="mt-7"><DietPatternTable /></div>
              </section>
            )}
          </div>
        ))}
      </div>

      <section className="container pb-6">
        <Callout tone="warning" title="关于食谱数据与补剂的边界">
          食谱中的热量与营养素均为估算值，不同品牌、部位、生熟重与烹调用油会造成明显差异。补剂不是减脂的基础，也不能替代均衡饮食、运动与睡眠；本站不提供自行使用减肥药物的方案。有慢性病、孕期/哺乳期或进食障碍风险者，请先咨询医生或注册营养师。
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
