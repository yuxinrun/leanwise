'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Article } from '@/types';
import { SegmentedControl } from '@/components/ui/Form';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/ui/Elements';
import { ARTICLE_CATEGORY_ORDER } from '@/content/articles';

export function ArticleExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const categories = ['全部', ...ARTICLE_CATEGORY_ORDER];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchQ = !q || [a.title, a.summary, a.category, ...a.tags, ...a.keyPoints].join(' ').toLowerCase().includes(q);
      return matchQ && (category === '全部' || a.category === category);
    });
  }, [articles, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题、关键词或概念…"
            className="focus-ring w-full rounded-sm border border-line bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-mist/80"
          />
        </div>
        <SegmentedControl value={category} onChange={setCategory} options={categories.map((c) => ({ value: c, label: c }))} />
      </div>
      <p className="mt-4 text-xs text-mist">共 {filtered.length} 篇文章 · 每篇均含研究证据、实操步骤、图表、插画与可核验参考文献</p>
      {filtered.length ? (
        <div className="mt-3 grid gap-x-10 md:grid-cols-2">
          {filtered.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      ) : (
        <div className="mt-8"><EmptyState title="没有找到相关文章" description="试试更短的关键词，或切换到「全部」分类。" /></div>
      )}
    </div>
  );
}
