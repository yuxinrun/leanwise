'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ChartId } from '@/types';
import { CHART_TITLES, DEMO_CHARTS } from './datasets';
import { ChartPanel } from './ChartPanel';
import { Button } from '@/components/ui/Button';

const ALL = Object.keys(CHART_TITLES) as ChartId[];

export function ChartGallery() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? ALL : ALL.slice(0, 4);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-mist">共 {ALL.length} 类可复用图表 · 统一配色、Tooltip、图例与单位 · 支持空数据与三类数据切换</p>
        <Button variant="outline" size="sm" onClick={() => setExpanded((v) => !v)}>
          {expanded ? '收起图表' : `展开全部 ${ALL.length} 类图表`} <ChevronDown size={14} className={expanded ? 'rotate-180' : ''} />
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((id) => (
          <ChartPanel key={id} chartId={id} height={220} title={CHART_TITLES[id]} description={DEMO_CHARTS[id].note} />
        ))}
      </div>
    </div>
  );
}
