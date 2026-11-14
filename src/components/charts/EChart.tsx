'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { cn } from '@/lib/utils';

/** 全站唯一的 ECharts 渲染器：SVG 渲染、自动响应容器宽度、卸载时释放实例。 */
export function EChart({ option, height = 280, className }: { option: EChartsOption; height?: number; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const chart = echarts.init(container.current, undefined, { renderer: 'svg' });
    instance.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      chart.dispose();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    instance.current?.setOption(option, { notMerge: true, lazyUpdate: false });
  }, [option]);

  return <div ref={container} className={cn('w-full', className)} style={{ height }} role="img" aria-label="交互式数据图表" />;
}
