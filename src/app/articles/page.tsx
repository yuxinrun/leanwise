import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ArticleExplorer } from '@/components/article/ArticleExplorer';
import { ARTICLES } from '@/content/articles';

export const metadata: Metadata = {
  title: '全部文章 — 30 篇科学减脂深度指南',
  description: 'LEANWISE 首批 30 篇深度文章：能量平衡、热量估算、蛋白质、碳水、力量训练、平台期、体重趋势与 30 天行动指南，每篇附参考文献与证据分级。',
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="ARTICLES · 知识文章"
        title="把每一个说法，追到证据为止"
        description="首批 30 篇深度文章覆盖减脂科学、饮食营养、运动减脂、实战困难与体重管理。每篇都包含一句话结论、研究证据、实操方法、常见错误、案例、图表、行动清单与参考文献。"
        art="FoodLabel"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '全部文章', href: '/articles' }]}
        tags={['30 篇深度文章', '证据分级', '可核验参考文献', '原创 SVG 与交互图表']}
      />
      <div className="container py-12"><ArticleExplorer articles={ARTICLES} /></div>
    </>
  );
}
