'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bookmark, ExternalLink, Search, ShieldCheck } from 'lucide-react';
import { Badge, EmptyState } from '@/components/ui/Elements';
import { RESOURCES, RESOURCE_GROUPS, RESOURCE_CATEGORIES, RESOURCE_VERIFICATION_NOTE, filterResources } from '@/content/resources';
import { readFavorites, toggleFavorite } from '@/lib/storage';
import { cn } from '@/lib/utils';
import type { ResourceItem } from '@/types';

function ResourceCard({ item, favorite, onToggle }: { item: ResourceItem; favorite: boolean; onToggle: (id: string) => void }) {
  return (
    <article className="flex flex-col border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge tone="forest">{item.region}</Badge>
            <Badge tone="neutral">{item.category}</Badge>
            <Badge tone={item.verified === '已核验' ? 'forest' : 'sun'}>{item.verified === '已核验' ? '链接已核验' : '部分信息待核验'}</Badge>
          </div>
          <h3 className="font-display text-lg leading-snug text-ink">{item.name}</h3>
          {item.originalName && item.originalName !== item.name && <p className="mt-1 text-[0.72rem] italic leading-relaxed text-mist">{item.originalName}</p>}
        </div>
        <button type="button" onClick={() => onToggle(item.id)} aria-label={favorite ? '取消收藏' : '收藏资源'} aria-pressed={favorite} className="focus-ring shrink-0 rounded-sm border border-line p-2 text-charcoal/60 hover:bg-mint">
          <Bookmark size={16} className={cn(favorite && 'fill-forest text-forest')} />
        </button>
      </div>

      <dl className="mt-4 grid gap-x-4 gap-y-2 text-[0.78rem] leading-relaxed sm:grid-cols-2">
        {item.author && <div><dt className="inline text-mist">作者／机构：</dt><dd className="inline text-charcoal/80">{item.author}</dd></div>}
        {item.publisher && <div><dt className="inline text-mist">出版社：</dt><dd className="inline text-charcoal/80">{item.publisher}</dd></div>}
        {item.year && <div><dt className="inline text-mist">年份：</dt><dd className="inline num text-charcoal/80">{item.year}</dd></div>}
        {item.isbn && <div><dt className="inline text-mist">ISBN：</dt><dd className="inline num text-charcoal/80">{item.isbn}</dd></div>}
        {item.chineseTitle && <div className="sm:col-span-2"><dt className="inline text-mist">中文译名：</dt><dd className="inline text-charcoal/80">{item.chineseTitle}</dd></div>}
      </dl>

      <p className="mt-3 text-[0.82rem] leading-[1.85] text-charcoal/75">{item.description}</p>
      <div className="mt-3 space-y-1.5 text-[0.76rem] leading-relaxed text-charcoal/65">
        <p><span className="font-medium text-ink">适合：</span>{item.audience}</p>
        <p><span className="font-medium text-ink">专业属性：</span>{item.authority}</p>
        <p><span className="font-medium text-ink">推荐阅读：</span>{item.suggested}</p>
        {item.coreIdeas && <p><span className="font-medium text-ink">核心观点：</span>{item.coreIdeas}</p>}
        {item.pros && <p><span className="font-medium text-ink">优点：</span>{item.pros}</p>}
        {item.limits && <p><span className="font-medium text-ink">局限：</span>{item.limits}</p>}
      </div>
      {item.verifiedNote && <p className="mt-3 border-l-2 border-sun pl-3 text-[0.72rem] leading-relaxed text-mist">核验说明：{item.verifiedNote}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:underline">访问官方网站 <ExternalLink size={13} /></a>
        <span className="text-[0.7rem] text-mist">{item.group}</span>
      </div>
    </article>
  );
}

export function ResourceExplorer() {
  const [query, setQuery] = useState('');
  const [bucket, setBucket] = useState('全部');
  const [region, setRegion] = useState('全部');
  const [category, setCategory] = useState('全部');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => setFavorites(readFavorites()), []);
  const results = useMemo(() => filterResources({ query, bucket, region, category, favorites }), [query, bucket, region, category, favorites]);
  const onToggle = (id: string) => setFavorites(toggleFavorite(id));

  return (
    <div>
      <div className="border border-line bg-mint/40 p-4 text-[0.78rem] leading-[1.9] text-charcoal/75">
        <p className="flex items-center gap-2 font-semibold text-ink"><ShieldCheck size={15} className="text-forest" />资源核验说明</p>
        <p className="mt-1.5">{RESOURCE_VERIFICATION_NOTE}</p>
        <p className="mt-1">本站不将商业减肥机构的营销文章标注为权威科学证据；商业教育平台在「专业属性」字段中如实标注。</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-b border-line pb-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索名称、作者、分类或关键词…" className="focus-ring w-full rounded-sm border border-line bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-mist/80" />
          </div>
          <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="按地区筛选" className="focus-ring rounded-sm border border-line bg-white px-3 py-2.5 text-sm text-charcoal">
            {['全部', '国际', '中国大陆'].map((r) => <option key={r} value={r}>{r === '全部' ? '全部地区' : r}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="按分类筛选" className="focus-ring rounded-sm border border-line bg-white px-3 py-2.5 text-sm text-charcoal">
            {['全部', ...RESOURCE_CATEGORIES].map((c) => <option key={c} value={c}>{c === '全部' ? '全部分类' : c}</option>)}
          </select>
        </div>
        <div className="table-shell border-b border-line">
          <div className="flex min-w-max gap-1 pb-1">
            {RESOURCE_GROUPS.map((g) => (
              <button key={g} type="button" onClick={() => setBucket(g)} aria-pressed={bucket === g} className={cn('focus-ring whitespace-nowrap rounded-sm px-3 py-1.5 text-xs', bucket === g ? 'bg-forest text-white' : 'text-charcoal/65 hover:bg-mint')}>{g}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-mist">共 {RESOURCES.length} 条资源，当前显示 {results.length} 条 · 收藏状态保存在本机浏览器</p>
      {results.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">{results.map((r) => <ResourceCard key={r.id} item={r} favorite={favorites.includes(r.id)} onToggle={onToggle} />)}</div>
      ) : (
        <div className="mt-6"><EmptyState title="没有匹配的资源" description="试试更短的关键词，或把筛选条件切回「全部」；「我的收藏」需要先点击卡片右上角的书签。" /></div>
      )}
    </div>
  );
}
