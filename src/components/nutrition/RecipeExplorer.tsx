'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { SegmentedControl } from '@/components/ui/Form';
import { Badge, EmptyState } from '@/components/ui/Elements';
import { RECIPES, RECIPE_CATEGORIES, RECIPE_SCENARIOS, RECIPE_DATA_NOTE, searchRecipes } from '@/content/recipes';
import type { Recipe } from '@/types';

function RecipeDetail({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const n = recipe.nutrition;
  return (
    <div className="mt-5 border-2 border-forest bg-white p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">食谱详情</p>
          <h3 className="font-display text-2xl text-ink">{recipe.name}</h3>
        </div>
        <button type="button" onClick={onClose} aria-label="关闭详情" className="focus-ring rounded-sm border border-line p-1.5 text-charcoal/60 hover:bg-mint"><X size={16} /></button>
      </div>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">食材与重量</p>
          <ul className="space-y-1.5">
            {recipe.ingredients.map((i) => <li key={i.name} className="flex justify-between gap-4 border-b border-line/70 pb-1.5 text-[0.83rem] text-charcoal/75"><span>{i.name}</span><span className="num shrink-0 text-ink">{i.amount}</span></li>)}
          </ul>
          <p className="mt-5 mb-2 text-sm font-semibold text-ink">制作步骤</p>
          <ol className="list-decimal space-y-1.5 pl-5 text-[0.83rem] leading-relaxed text-charcoal/75">
            {recipe.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">估算营养（每份）</p>
          <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
            {[['热量', `${n.kcal} kcal`], ['蛋白质', `${n.protein} g`], ['碳水', `${n.carb} g`], ['脂肪', `${n.fat} g`], ['膳食纤维', `${n.fiber} g`]].map(([k, v]) => (
              <div key={k} className="bg-white p-3"><p className="text-[0.7rem] text-mist">{k}</p><p className="num mt-1 text-sm font-semibold text-ink">{v}</p></div>
            ))}
          </div>
          <p className="mt-4 mb-1.5 text-sm font-semibold text-ink">可替换食材</p>
          <ul className="space-y-1 text-[0.82rem] text-charcoal/75">{recipe.swaps.map((s) => <li key={s} className="flex gap-2"><span className="text-orange">↔</span>{s}</li>)}</ul>
          <p className="mt-4 mb-1.5 text-sm font-semibold text-ink">适用场景</p>
          <div className="flex flex-wrap gap-1.5">{recipe.scenarios.map((s) => <Badge key={s} tone="forest">{s}</Badge>)}</div>
          <p className="mt-4 border-l-2 border-sun pl-3 text-[0.8rem] leading-relaxed text-charcoal/70">{recipe.note}</p>
        </div>
      </div>
      <p className="mt-6 border-t border-line pt-3 text-[0.72rem] leading-relaxed text-mist">{RECIPE_DATA_NOTE}</p>
    </div>
  );
}

export function RecipeExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const [scenario, setScenario] = useState('全部');
  const [selected, setSelected] = useState<string | null>(null);
  const results = useMemo(() => searchRecipes(query, category, scenario), [query, category, scenario]);
  const detail = RECIPES.find((r) => r.id === selected);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索食谱名称、食材或场景…" className="focus-ring w-full rounded-sm border border-line bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-mist/80" />
          </div>
          <select value={scenario} onChange={(e) => setScenario(e.target.value)} aria-label="按场景筛选" className="focus-ring rounded-sm border border-line bg-white px-3 py-2.5 text-sm text-charcoal">
            {['全部', ...RECIPE_SCENARIOS].map((s) => <option key={s} value={s}>{s === '全部' ? '全部场景' : s}</option>)}
          </select>
        </div>
        <SegmentedControl value={category} onChange={setCategory} options={['全部', ...RECIPE_CATEGORIES].map((c) => ({ value: c, label: c }))} />
      </div>
      <p className="mt-4 text-xs text-mist">共 {results.length} 个食谱 · {RECIPE_DATA_NOTE}</p>
      {results.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <button key={r.id} type="button" onClick={() => setSelected(r.id)} aria-pressed={selected === r.id} className="focus-ring group border border-line bg-white p-4 text-left transition-colors hover:bg-mint/50">
              <div className="flex items-start justify-between gap-2">
                <Badge tone="forest">{r.category}</Badge>
                <span className="num text-[0.7rem] text-mist">≈ {r.nutrition.kcal} kcal</span>
              </div>
              <p className="mt-3 font-display text-lg text-ink group-hover:text-forest">{r.name}</p>
              <p className="mt-1.5 line-clamp-2 text-[0.78rem] leading-relaxed text-charcoal/65">{r.note}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem] text-mist">
                <span>蛋白 {r.nutrition.protein} g</span><span>·</span><span>碳水 {r.nutrition.carb} g</span><span>·</span><span>纤维 {r.nutrition.fiber} g</span>
              </div>
              <p className="mt-3 text-[0.72rem] font-medium text-forest">查看食材与步骤 →</p>
            </button>
          ))}
        </div>
      ) : <div className="mt-6"><EmptyState title="没有匹配的食谱" description="试试更短的关键词，或把分类与场景切回「全部」。" /></div>}
      {detail && <RecipeDetail recipe={detail} onClose={() => setSelected(null)} />}
    </div>
  );
}
