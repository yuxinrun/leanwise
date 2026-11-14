'use client';

import { useMemo, useState } from 'react';
import type { ChartId, DataSourceKind } from '@/types';
import { SegmentedControl } from '@/components/ui/Form';
import { EmptyState } from '@/components/ui/Elements';
import { DataSourceTag } from '@/components/common/DataSourceTag';
import { CHART_TITLES, DEMO_CHARTS, REFERENCE_CHARTS, type ChartDataset } from './datasets';
import { buildOption, isEmptyDataset } from './buildOption';
import { EChart } from './EChart';

const MODE_LABEL: Record<DataSourceKind, string> = {
  reference: '真实数据', demo: '模拟数据', personal: '个人记录',
};

export function ChartPanel({
  chartId, title, description, height = 280, personal, className, defaultMode = 'demo',
}: {
  chartId: ChartId;
  title?: string;
  description?: string;
  height?: number;
  personal?: ChartDataset;
  className?: string;
  defaultMode?: DataSourceKind;
}) {
  const variants: Partial<Record<DataSourceKind, ChartDataset>> = {
    demo: DEMO_CHARTS[chartId],
    reference: REFERENCE_CHARTS[chartId],
    personal,
  };
  const available = (Object.keys(variants) as DataSourceKind[]).filter((k) => !isEmptyDataset(variants[k]));
  const [mode, setMode] = useState<DataSourceKind>(available.includes(defaultMode) ? defaultMode : available[0] ?? 'demo');
  const active = variants[mode] ?? variants.demo;
  const option = useMemo(() => (active ? buildOption(chartId, active) : null), [chartId, active]);

  return (
    <figure className={`rounded-sm border border-line bg-white p-4 sm:p-5 ${className ?? ''}`}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <figcaption className="text-sm font-semibold text-ink">{title ?? CHART_TITLES[chartId]}</figcaption>
          {description && <p className="mt-1 text-xs leading-relaxed text-charcoal/60">{description}</p>}
        </div>
        {available.length > 1 && (
          <SegmentedControl
            value={mode}
            onChange={setMode}
            options={available.map((k) => ({ value: k, label: MODE_LABEL[k] }))}
          />
        )}
      </div>

      {option ? (
        <EChart option={option} height={height} />
      ) : (
        <EmptyState title="暂无可展示的数据" description="录入个人记录，或切换到模拟数据查看图表形态。" />
      )}

      <div className="mt-3 border-t border-line pt-3">
        <DataSourceTag kind={mode} note={active?.note} />
        {active?.provenance && <p className="mt-1.5 text-[0.7rem] leading-relaxed text-mist">出处：{active.provenance}</p>}
        {mode === 'reference' && <p className="mt-1 text-[0.7rem] text-mist">数据来自公开文献 / 指南，本站未做任何实测或改写。</p>}
        {chartId === 'weight-vs-activity' && <p className="mt-1 text-[0.7rem] text-mist">两条曲线同时变化不代表因果关系。</p>}
      </div>
    </figure>
  );
}
