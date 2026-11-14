import type { EChartsOption } from 'echarts';

/** ECharts 统一视觉语言：所有图表共享配色、网格、Tooltip 与轴样式。 */
export const CHART_COLORS = {
  forest: '#245B45',
  ink: '#173C30',
  mint: '#9FC4A7',
  paleMint: '#E5EFE6',
  orange: '#E89A51',
  sun: '#F2C879',
  charcoal: '#292D2A',
  mist: '#858B84',
  line: '#DDDCD1',
  cream: '#F7F6EF',
} as const;

export const SERIES_PALETTE = [
  CHART_COLORS.forest,
  CHART_COLORS.orange,
  CHART_COLORS.sun,
  CHART_COLORS.mint,
  CHART_COLORS.ink,
  CHART_COLORS.mist,
];

export const AXIS_LABEL = { color: '#6B726C', fontSize: 11, fontFamily: 'system-ui, sans-serif' };
export const AXIS_LINE = { lineStyle: { color: CHART_COLORS.line } };
export const SPLIT_LINE = { lineStyle: { color: CHART_COLORS.line, type: 'dashed' as const, opacity: 0.7 } };

export function baseTooltip(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    backgroundColor: '#FFFFFF',
    borderColor: CHART_COLORS.line,
    borderWidth: 1,
    padding: [10, 14],
    textStyle: { color: CHART_COLORS.charcoal, fontSize: 12 },
    extraCssText: 'box-shadow: 0 10px 30px -18px rgba(23,60,48,.45); border-radius: 4px; max-width: 260px; white-space: normal;',
    ...extra,
  };
}

export function baseLegend(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    textStyle: { color: '#5C635D', fontSize: 11 },
    itemWidth: 12,
    itemHeight: 8,
    top: 0,
    ...extra,
  };
}

export function cartesianBase(params: {
  xData: (string | number)[];
  yName?: string;
  xName?: string;
  yMin?: number | 'dataMin';
  legend?: boolean;
}): EChartsOption {
  return {
    color: SERIES_PALETTE,
    grid: { left: 8, right: 14, top: params.legend ? 42 : 26, bottom: 24, containLabel: true },
    tooltip: { trigger: 'axis', ...baseTooltip(), axisPointer: { type: 'line', lineStyle: { color: CHART_COLORS.orange } } },
    legend: params.legend ? (baseLegend() as EChartsOption['legend']) : undefined,
    xAxis: {
      type: 'category',
      data: params.xData,
      name: params.xName,
      nameTextStyle: AXIS_LABEL,
      axisLabel: { ...AXIS_LABEL, hideOverlap: true },
      axisLine: AXIS_LINE,
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: params.yName,
      nameTextStyle: AXIS_LABEL,
      min: params.yMin,
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      splitLine: SPLIT_LINE,
    },
  } as EChartsOption;
}

export const CHART_SOURCE_LABEL = {
  reference: '真实数据 · 已注明来源',
  demo: '模拟数据 · 仅作演示',
  personal: '个人记录 · 本地保存',
} as const;
