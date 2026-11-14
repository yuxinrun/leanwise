'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PLAN_30, PLAN_PHASES } from '@/content/plan30';
import { Badge } from '@/components/ui/Elements';
import { cn } from '@/lib/utils';

export function Plan30Explorer() {
  const [phase, setPhase] = useState<number>(0);
  const [day, setDay] = useState<number>(1);
  const days = useMemo(() => PLAN_30.filter((d) => phase === 0 || d.phase === phase), [phase]);
  const active = PLAN_30.find((d) => d.day === day) ?? PLAN_30[0];
  const phaseMeta = PLAN_PHASES.find((p) => p.id === active.phase)!;

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN_PHASES.map((p) => (
          <div key={p.id} className="border-t-2 border-forest/60 bg-white p-4">
            <p className="eyebrow">{p.range}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{p.title}</p>
            <p className="mt-1.5 text-[0.76rem] leading-relaxed text-charcoal/65">{p.goal}</p>
            <p className="mt-2 text-[0.7rem] text-mist">{p.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex flex-wrap gap-1.5">
          {[{ id: 0, label: '全部 30 天' }, ...PLAN_PHASES.map((p) => ({ id: p.id, label: `阶段 ${p.id}` }))].map((b) => (
            <button key={b.id} type="button" onClick={() => setPhase(b.id)} aria-pressed={phase === b.id} className={cn('focus-ring rounded-sm border px-3 py-1.5 text-xs', phase === b.id ? 'border-forest bg-forest text-white' : 'border-line bg-white text-charcoal/70 hover:bg-mint')}>{b.label}</button>
          ))}
        </div>
        <p className="text-xs text-mist">点击日期查看当天完整任务</p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 lg:grid-cols-6">
          {days.map((d) => (
            <button key={d.day} type="button" onClick={() => setDay(d.day)} aria-pressed={day === d.day} className={cn(
              'focus-ring flex aspect-square flex-col items-center justify-center rounded-sm border text-xs transition-colors',
              day === d.day ? 'border-forest bg-forest text-white' : 'border-line bg-white text-charcoal/70 hover:bg-mint/60',
            )}>
              <span className="num text-[0.65rem] opacity-70">DAY</span>
              <span className="num text-sm font-semibold">{d.day}</span>
            </button>
          ))}
        </div>

        <div className="border-2 border-forest bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge tone="forest">第 {active.day} 天</Badge>
            <span className="text-[0.7rem] text-mist">阶段 {active.phase} · {phaseMeta.title}</span>
          </div>
          <p className="mt-4 font-display text-lg leading-snug text-ink">{active.task}</p>
          <dl className="mt-4 space-y-3 text-[0.8rem] leading-relaxed">
            {[
              ['饮食建议', active.diet], ['活动建议', active.activity], ['记录项目', active.record],
              ['常见困难', active.difficulty], ['解决方法', active.solution],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-line/70 pt-2.5">
                <dt className="mb-1 flex items-center gap-1.5 font-semibold text-forest"><CheckCircle2 size={13} />{k}</dt>
                <dd className="text-charcoal/75">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-5 border-l-2 border-orange pl-3 text-[0.78rem] leading-relaxed text-charcoal/65">
        本计划不承诺 30 天减掉固定体重。30 天的目标是建立可运行的记录、活动与复盘系统；漏记几天直接继续，不补记、不补偿、不惩罚。
      </p>
    </div>
  );
}
