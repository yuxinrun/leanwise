import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Info, TriangleAlert } from 'lucide-react';
import { FORMULA_CAVEAT, SPECIAL_POPULATION_NOTICE } from '@/lib/calculations';
import type { ToolMeta } from '@/content/tools';

export function ResultStat({ label, value, unit, note, tone = 'forest' }: { label: string; value: string | number; unit?: string; note?: string; tone?: 'forest' | 'orange' }) {
  return (
    <div className="border border-line bg-white p-4">
      <p className="text-[0.72rem] text-mist">{label}</p>
      <p className={`num mt-1.5 text-2xl font-semibold leading-none ${tone === 'orange' ? 'text-[#B4652B]' : 'text-forest'}`}>
        {value}<span className="ml-1 text-xs font-normal text-charcoal/60">{unit}</span>
      </p>
      {note && <p className="mt-2 text-[0.7rem] leading-relaxed text-charcoal/60">{note}</p>}
    </div>
  );
}

export function ToolShell({
  tool, inputs, result, process, interpretation, extra,
}: {
  tool: ToolMeta;
  inputs: ReactNode;
  result: ReactNode;
  process: string[];
  interpretation: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="border border-line bg-white p-5 sm:p-6">
          <p className="eyebrow mb-1">输入数据</p>
          <h2 className="mb-5 font-display text-lg text-ink">请填写以下信息</h2>
          <div className="space-y-4">{inputs}</div>
          <p className="mt-5 text-[0.72rem] leading-relaxed text-mist">所有输入仅在本页面内计算，不会上传或保存，除非你主动点击「保存到本地记录」。</p>
        </section>
        <section className="border-2 border-forest bg-mint/30 p-5 sm:p-6">
          <p className="eyebrow mb-1">计算结果</p>
          <h2 className="mb-5 font-display text-lg text-ink">估算结果与含义</h2>
          {result}
          <div className="mt-5 border-t border-forest/20 pt-4 text-[0.83rem] leading-[1.9] text-charcoal/80">{interpretation}</div>
        </section>
      </div>

      {extra && <div className="mt-6">{extra}</div>}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="border border-line bg-white p-5 sm:p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink"><Info size={16} className="text-forest" />计算过程</p>
          <ol className="space-y-2.5">
            {process.map((p, i) => (
              <li key={i} className="flex gap-3 border-b border-line/70 pb-2.5 text-[0.82rem] leading-relaxed text-charcoal/75">
                <span className="num shrink-0 text-xs text-forest/60">{String(i + 1).padStart(2, '0')}</span>{p}
              </li>
            ))}
          </ol>
        </section>
        <div className="space-y-5">
          <section className="border-l-[3px] border-orange bg-orange-soft/40 p-5">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"><TriangleAlert size={16} className="text-[#B4652B]" />公式局限与适用边界</p>
            <p className="text-[0.8rem] leading-[1.9] text-charcoal/80">{FORMULA_CAVEAT}</p>
            <p className="mt-2 text-[0.8rem] leading-[1.9] text-charcoal/80">{SPECIAL_POPULATION_NOTICE}</p>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-mist">本工具不提供诊断，也不把估算结果包装成精准医学结论。</p>
          </section>
          {tool.articleSlug && (
            <Link href={`/articles/${tool.articleSlug}`} className="focus-ring flex items-center justify-between gap-3 border border-line bg-white p-4 text-sm text-forest hover:bg-mint/50">
              阅读相关原理文章 <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
