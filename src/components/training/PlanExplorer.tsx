'use client';

import { useState } from 'react';
import { Illustration } from '@/components/illustrations';
import { TRAINING_PLANS } from '@/content/training';
import { Badge, Callout } from '@/components/ui/Elements';
import { cn } from '@/lib/utils';

export function PlanExplorer() {
  const [active, setActive] = useState(TRAINING_PLANS[0].id);
  const plan = TRAINING_PLANS.find((p) => p.id === active) ?? TRAINING_PLANS[0];
  return (
    <div>
      <div role="tablist" className="table-shell border-b border-line">
        <div className="flex min-w-max gap-1">
          {TRAINING_PLANS.map((p) => (
            <button key={p.id} role="tab" aria-selected={p.id === active} onClick={() => setActive(p.id)} className={cn('relative whitespace-nowrap px-4 py-3 text-[0.82rem] focus-ring', p.id === active ? 'font-semibold text-forest' : 'text-charcoal/60 hover:text-ink')}>
              {p.name}
              {p.id === active && <span className="absolute inset-x-3 bottom-0 h-[2px] bg-forest" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4">
        <Badge tone="forest">{plan.frequency}</Badge>
        <span className="text-[0.8rem] text-charcoal/70">适合：{plan.suitable}</span>
      </div>

      <div className="mt-6 space-y-8">
        {plan.sessions.map((session) => (
          <section key={session.day}>
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-xl text-ink">{session.day}</h3>
              <span className="text-[0.75rem] text-mist">重点：{session.focus}</span>
            </div>
            <div className="space-y-2">
              {session.moves.map((m) => (
                <div key={m.name} className="grid gap-3 border border-line bg-white p-3 sm:grid-cols-[84px_1fr] sm:p-4">
                  <div className="hidden border border-line/70 bg-cream sm:block"><Illustration name={m.art} /></div>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-ink">{m.name}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.76rem] text-charcoal/70">
                      <span>组数 <strong className="num text-ink">{m.sets}</strong></span>
                      <span>次数 <strong className="num text-ink">{m.reps}</strong></span>
                      <span>休息 <strong className="text-ink">{m.rest}</strong></span>
                      <span>强度 <strong className="text-ink">{m.intensity}</strong></span>
                    </div>
                    <p className="mt-2 text-[0.75rem] text-mist">替代动作：{m.swap}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-line bg-mint/40 p-4"><p className="text-sm font-semibold text-ink">进阶方式</p><p className="mt-2 text-[0.82rem] leading-[1.9] text-charcoal/75">{plan.progression}</p></div>
        <div className="border border-line bg-orange-soft/40 p-4"><p className="text-sm font-semibold text-ink">执行提醒</p><p className="mt-2 text-[0.82rem] leading-[1.9] text-charcoal/75">{plan.note}</p></div>
      </div>
      <Callout tone="warning" title="训练方案为结构化示例，不是个体化处方">
        请先评估自身健康状况与动作基础，热身 8–10 分钟，动作全程可控、无痛。有心血管疾病、关节损伤或术后康复需求者，应由医生或运动专业人员评估后再调整动作与负荷。不能把运动消耗卡路里作为惩罚饮食的手段。
      </Callout>
    </div>
  );
}
