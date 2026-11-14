import type { Article, SectionId } from '@/types';
import { SCIENCE_ARTICLES } from './part1-science';
import { NUTRITION_ARTICLES } from './part2-nutrition';
import { DIET_PATTERN_ARTICLES } from './part3-diet-patterns';
import { TRAINING_ARTICLES } from './part4-training';
import { PRACTICE_ARTICLES } from './part5-practice';
import { WEIGHT_ARTICLES } from './part6-weight';

export const ARTICLES: Article[] = [
  ...SCIENCE_ARTICLES,
  ...NUTRITION_ARTICLES,
  ...DIET_PATTERN_ARTICLES,
  ...TRAINING_ARTICLES,
  ...PRACTICE_ARTICLES,
  ...WEIGHT_ARTICLES,
];

export const ARTICLE_MAP = new Map(ARTICLES.map((a) => [a.slug, a]));

export function getArticle(slug: string) {
  return ARTICLE_MAP.get(slug);
}

export function relatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.relatedSlugs.map((s) => getArticle(s)).filter((a): a is Article => Boolean(a));
}

export function getArticlesBySection(section: SectionId | 'home') {
  return ARTICLES.filter((a) => a.section === section);
}

export const LATEST_GROUPS = [
  { label: '最新科学研究解读', slug: 'energy-balance', note: '从能量平衡模型看「少吃多动」为什么不够解释一切' },
  { label: '饮食实战', slug: 'takeout', note: '外卖场景下可执行的点餐结构与份量策略' },
  { label: '运动指南', slug: 'weekly-training', note: '把有氧、力量与恢复排进真实的一周' },
  { label: '减脂误区', slug: 'carbs-not-enemy', note: '碳水、局部减脂与「代谢损坏」的常见误解' },
  { label: '平台期解决方案', slug: 'plateau', note: '先确认是不是真平台期，再谈如何调整' },
] as const;

export const ARTICLE_CATEGORY_ORDER = [
  '减脂科学', '饮食营养', '运动减脂', '减脂实战', '体重管理',
];

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return ARTICLES;
  return ARTICLES.filter((a) =>
    [a.title, a.summary, a.category, ...a.tags, ...a.keyPoints].join(' ').toLowerCase().includes(q),
  );
}

export { defineArticle, articleReferences } from './define';
export type { ArticleSeed } from './define';
