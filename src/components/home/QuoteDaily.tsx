'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { QuoteBlock } from '@/components/common/QuoteBlock';
import type { Quote } from '@/types';

export function QuoteDaily({ quotes, initial }: { quotes: Quote[]; initial: number }) {
  const [index, setIndex] = useState(initial % quotes.length);
  useEffect(() => setIndex(Math.floor(Date.now() / 86400000) % quotes.length), [quotes.length]);
  const current = quotes[index];
  const others = [1, 2, 3].map((offset) => quotes[(index + offset) % quotes.length]);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
      <div>
        <p className="eyebrow mb-5 text-sun">每日科学减脂金句 · DAILY NOTE</p>
        <QuoteBlock text={current.text} tag={current.tag} variant="dark" className="border-sun/70" />
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % quotes.length)}
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-sm border border-cream/30 px-4 py-2 text-xs text-cream/80 transition-colors hover:bg-cream/10"
        >
          <RefreshCw size={13} />换一句
        </button>
        <p className="mt-3 text-[0.7rem] text-cream/45">全部金句均为 LEANWISE 本站原创文案，不引用未核实的名人名言。</p>
      </div>
      <div className="flex flex-col justify-center gap-4 border-t border-cream/20 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        {others.map((q) => (
          <div key={q.id} className="border-l-2 border-sun/40 pl-4">
            <p className="font-display text-[0.95rem] leading-relaxed text-cream/85">「{q.text}」</p>
            <p className="mt-1.5 text-[0.68rem] tracking-wide text-cream/45">{q.tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
