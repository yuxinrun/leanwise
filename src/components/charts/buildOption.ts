import type { EChartsOption } from 'echarts';
import type { ChartId } from '@/types';
import { AXIS_LABEL, SPLIT_LINE, SERIES_PALETTE, baseLegend, baseTooltip, cartesianBase } from '@/lib/chart-theme';
import type { ChartDataset } from './datasets';

const PIE_CHARTS: ChartId[] = ['macro-pie', 'training-distribution'];

function buildPie(data: ChartDataset): EChartsOption {
  const values = data.series[0]?.values ?? [];
  return {
    color: SERIES_PALETTE,
    tooltip: { trigger: 'item', ...baseTooltip({ formatter: '{b}<br/>{c} ' + (data.unit ?? '') + ' ({d}%)' }) },
    legend: baseLegend({ bottom: 0, top: 'auto', itemGap: 14 }) as EChartsOption['legend'],
    series: [
      {
        type: 'pie',
        radius: ['38%', '66%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#FFFFFF', borderWidth: 2 },
        label: { formatter: '{b}\n{d}%', fontSize: 11, color: '#4B544D', lineHeight: 16 },
        labelLine: { length: 8, length2: 8 },
        data: data.labels.map((label, i) => ({ name: label, value: values[i] ?? 0 })),
      },
    ],
  } as EChartsOption;
}

export function isEmptyDataset(data?: ChartDataset) {
  if (!data) return true;
  return data.labels.length === 0 || data.series.length === 0 || data.series.every((s) => s.values.length === 0);
}

/** 所有图表的统一 option 生成器：保证配色、Tooltip、图例、单位一致。 */
export function buildOption(chartId: ChartId, data: ChartDataset): EChartsOption {
  if (PIE_CHARTS.includes(chartId)) return buildPie(data);

  const dual = chartId === 'weight-vs-activity';
  const base = cartesianBase({ xData: data.labels, yName: dual ? undefined : data.yName, legend: data.series.length > 1 });

  const series = data.series.map((s, i) => {
    const isBar = s.kind === 'bar';
    return {
      name: s.name,
      type: isBar ? 'bar' : 'line',
      data: s.values,
      yAxisIndex: dual && i === 1 ? 1 : 0,
      smooth: isBar ? undefined : 0.28,
      symbol: isBar ? undefined : 'circle',
      symbolSize: isBar ? undefined : 5,
      showSymbol: data.labels.length <= 20,
      connectNulls: true,
      barMaxWidth: 32,
      lineStyle: { width: s.kind === 'area' ? 3 : 2 },
      areaStyle: s.kind === 'area' ? { opacity: 0.13 } : undefined,
      itemStyle: { color: SERIES_PALETTE[i % SERIES_PALETTE.length], borderRadius: isBar ? [3, 3, 0, 0] : 0 },
      emphasis: { focus: 'series' },
    };
  });

  const option: EChartsOption = {
    ...base,
    tooltip: {
      ...base.tooltip,
      valueFormatter: (value) => `${value ?? '—'} ${data.unit ?? ''}`,
    },
    series,
  } as EChartsOption;

  if (dual) {
    option.yAxis = [
      { type: 'value', name: 'kg', nameTextStyle: AXIS_LABEL, axisLabel: AXIS_LABEL, splitLine: SPLIT_LINE, scale: true },
      { type: 'value', name: '分钟', nameTextStyle: AXIS_LABEL, axisLabel: AXIS_LABEL, splitLine: { show: false } },
    ] as EChartsOption['yAxis'];
    option.grid = { ...(option.grid as object), top: 46, right: 12 };
  }

  if (data.labels.length > 12) {
    option.dataZoom = [
      { type: 'inside', start: 0, end: 100, zoomOnMouseWheel: false, moveOnMouseMove: true, moveOnMouseWheel: false },
    ] as EChartsOption['dataZoom'];
  }

  return option;
}
