'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem { id: string; label: string }

export function Tabs({
  tabs, panels, initial, className,
}: {
  tabs: TabItem[];
  panels: ReactNode[];
  initial?: string;
  className?: string;
}) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);
  const index = Math.max(0, tabs.findIndex((t) => t.id === active));
  return (
    <div className={className}>
      <div role="tablist" className="table-shell border-b border-line">
        <div className="flex min-w-max gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={cn(
                'relative whitespace-nowrap px-4 py-3 text-sm transition-colors focus-ring',
                t.id === active ? 'font-semibold text-forest' : 'text-charcoal/60 hover:text-ink',
              )}
            >
              {t.label}
              {t.id === active && <span className="absolute inset-x-3 bottom-0 h-[2px] bg-forest" />}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" className="pt-6">{panels[index]}</div>
    </div>
  );
}
