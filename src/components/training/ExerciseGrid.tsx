'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import { Illustration } from '@/components/illustrations';
import { EXERCISES } from '@/content/training';
import { cn } from '@/lib/utils';

export function ExerciseGrid() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {EXERCISES.map((e) => (
        <div key={e.id} className={cn('border border-line bg-white transition-colors', open === e.id && 'border-forest')}>
          <button type="button" onClick={() => setOpen(open === e.id ? null : e.id)} aria-expanded={open === e.id} className="focus-ring w-full p-3 text-left">
            <div className="border border-line/70 bg-cream"><Illustration name={e.art} /></div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div><p className="font-display text-lg text-ink">{e.name}</p><p className="mt-0.5 text-[0.7rem] text-mist">{e.category}</p></div>
              <ChevronDown size={16} className={cn('shrink-0 text-forest transition-transform', open === e.id && 'rotate-180')} />
            </div>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-charcoal/65">{e.features}</p>
          </button>
          {open === e.id && (
            <div className="border-t border-line bg-mint/30 p-4 text-[0.78rem] leading-relaxed">
              <dl className="space-y-2.5">
                <div><dt className="font-semibold text-ink">适用人群</dt><dd className="text-charcoal/75">{e.suitable}</dd></div>
                <div><dt className="font-semibold text-ink">强度控制</dt><dd className="text-charcoal/75">{e.intensity}</dd></div>
                <div><dt className="font-semibold text-ink">运动时间</dt><dd className="text-charcoal/75">{e.duration}</dd></div>
                <div><dt className="font-semibold text-ink">常见错误</dt><dd><ul className="mt-1 space-y-1 text-charcoal/75">{e.mistakes.map((m) => <li key={m}>· {m}</li>)}</ul></dd></div>
              </dl>
              <p className="mt-3 flex gap-2 border-t border-line pt-3 text-[#9A5B22]"><AlertTriangle size={14} className="mt-0.5 shrink-0" /><span><strong>安全：</strong>{e.safety}</span></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
