import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DIET_PATTERNS, DIET_PATTERN_NOTE } from '@/content/diet-patterns';
import { EVIDENCE_LABELS } from '@/content/principles';
import { Badge } from '@/components/ui/Elements';
import { getReferences } from '@/content/evidence';

export function DietPatternTable() {
  return (
    <div>
      <div className="table-shell rounded-sm border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-[0.84rem]">
          <thead className="bg-mint/70 text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">饮食模式</th>
              <th className="px-4 py-3 font-semibold">证据</th>
              <th className="px-4 py-3 font-semibold">优势</th>
              <th className="px-4 py-3 font-semibold">限制</th>
              <th className="px-4 py-3 font-semibold">适合 / 不适合</th>
            </tr>
          </thead>
          <tbody>
            {DIET_PATTERNS.map((p) => (
              <tr key={p.id} className="border-t border-line/70 align-top">
                <td className="px-4 py-4"><p className="font-medium text-ink">{p.name}</p><p className="mt-0.5 text-[0.7rem] text-mist">{p.en}</p><p className="mt-2 max-w-[220px] text-[0.75rem] leading-relaxed text-charcoal/65">{p.definition}</p></td>
                <td className="px-4 py-4"><Badge tone="forest">{EVIDENCE_LABELS[p.evidence].label}</Badge></td>
                <td className="px-4 py-4"><ul className="max-w-[200px] space-y-1 text-[0.76rem] leading-relaxed text-charcoal/70">{p.pros.map((x) => <li key={x}>· {x}</li>)}</ul></td>
                <td className="px-4 py-4"><ul className="max-w-[200px] space-y-1 text-[0.76rem] leading-relaxed text-charcoal/70">{p.limits.map((x) => <li key={x}>· {x}</li>)}</ul></td>
                <td className="px-4 py-4"><p className="text-[0.75rem] leading-relaxed text-forest">适合：{p.suitable.join('、')}</p><p className="mt-2 text-[0.75rem] leading-relaxed text-[#9A5B22]">不适合：{p.notSuitable.join('、')}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-mist">{DIET_PATTERN_NOTE}</p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {DIET_PATTERNS.map((p) => (
          <details key={p.id} className="group border border-line bg-white p-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-ink group-open:text-forest">{p.name} · 证据说明与阅读建议</summary>
            <p className="mt-3 text-[0.8rem] leading-[1.9] text-charcoal/75">{p.evidenceNote}</p>
            <p className="mt-3 text-[0.72rem] text-mist">依据：{getReferences(p.referenceIds).map((r) => `${r.author.split(',')[0]}（${r.year}）`).join('；')}</p>
            <Link href={`/articles/${p.articleSlug}`} className="link-arrow mt-3 text-xs">阅读相关文章 <ArrowUpRight size={13} /></Link>
          </details>
        ))}
      </div>
    </div>
  );
}
