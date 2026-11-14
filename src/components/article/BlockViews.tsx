'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChecklistBlock({ title, items, storageKey }: { title: string; items: string[]; storageKey?: string }) {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  return (
    <div className="my-8 border border-line bg-white p-5 sm:p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink"><Check size={16} className="text-forest" />{title}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={checked.includes(i)}
              className="focus-ring flex w-full items-start gap-3 rounded-sm text-left text-[0.88rem] leading-relaxed text-charcoal/80 hover:bg-mint/40"
            >
              <span className={cn('mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border', checked.includes(i) ? 'border-forest bg-forest text-white' : 'border-forest/40 bg-white')}>
                {checked.includes(i) && <Check size={11} />}
              </span>
              <span className={cn(checked.includes(i) && 'text-mist line-through')}>{item}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.7rem] text-mist">勾选状态仅保留在当前页面会话中，不会上传或保存到服务器。{storageKey ? '' : ''}</p>
    </div>
  );
}

export function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="my-8 divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="focus-ring flex w-full items-center justify-between gap-4 py-4 text-left text-[0.93rem] font-medium text-ink"
          >
            {item.q}
            <ChevronDown size={16} className={cn('shrink-0 text-forest transition-transform', open === i && 'rotate-180')} />
          </button>
          {open === i && <p className="pb-5 pr-8 text-[0.88rem] leading-[1.9] text-charcoal/75">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
