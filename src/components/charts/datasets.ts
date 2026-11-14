import type { ChartId } from '@/types';
import { lastNDays } from '@/lib/utils';
import { movingAverage } from '@/lib/calculations';

export interface ChartSeries {
  name: string;
  values: (number | null)[];
  kind?: 'line' | 'bar' | 'area';
}

export interface ChartDataset {
  labels: string[];
  series: ChartSeries[];
  yName?: string;
  unit?: string;
  note: string;
  provenance?: string;
}

const days30 = lastNDays(30).map((d) => d.slice(5));
const days7 = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const weeks12 = Array.from({ length: 12 }, (_, i) => `第 ${i + 1} 周`);

/** 确定性伪随机，保证服务端与客户端渲染的演示数据一致，避免 hydration 不一致。 */
function wave(base: number, amplitude: number, phase = 0, n = 30) {
  return Array.from({ length: n }, (_, i) =>
    Math.round((base + Math.sin(i * 0.9 + phase) * amplitude + Math.cos(i * 2.3 + phase) * amplitude * 0.45) * 10) / 10,
  );
}

function descending(base: number, total: number, phase = 0, n = 30) {
  return Array.from({ length: n }, (_, i) =>
    Math.round((base - (total * i) / (n - 1) + Math.sin(i * 1.7 + phase) * 0.65 + Math.cos(i * 2.9 + phase) * 0.35) * 10) / 10,
  );
}

/** 模拟数据集：仅用于展示图表形态，所有图表都明确标注为模拟数据。 */
export const DEMO_CHARTS: Record<ChartId, ChartDataset> = {
  'tdee-composition': {
    labels: ['基础代谢', '日常活动 NEAT', '食物热效应', '计划运动'],
    series: [{ name: '能量消耗（kcal/天）', values: [1350, 380, 190, 180], kind: 'bar' }],
    unit: 'kcal/天', yName: 'kcal/天',
    note: '模拟数据：假想体重 70 kg 成年人的一日能量消耗拆分，仅用于说明组成概念。',
  },
  'macro-pie': {
    labels: ['蛋白质', '碳水化合物', '脂肪'],
    series: [{ name: '能量占比（%）', values: [25, 45, 30] }],
    unit: '%',
    note: '模拟数据：假想的一日三大营养素能量占比，不是推荐配比。',
  },
  'weekly-calories': {
    labels: days7,
    series: [{ name: '摄入热量（kcal）', values: [1820, 1910, 1760, 2040, 1880, 2260, 1950], kind: 'bar' }],
    unit: 'kcal', yName: 'kcal',
    note: '模拟数据：假想一周饮食记录，周末偏高仅用于演示波动。',
  },
  'protein-bars': {
    labels: days7,
    series: [{ name: '蛋白质（g）', values: [88, 102, 95, 110, 92, 84, 105], kind: 'bar' }],
    unit: 'g', yName: 'g',
    note: '模拟数据：假想一周蛋白质摄入记录。',
  },
  'weight-longterm': {
    labels: weeks12,
    series: [{ name: '体重（kg）', values: [74.8, 74.6, 74.7, 74.1, 73.8, 73.9, 73.3, 73.1, 73.2, 72.7, 72.6, 72.4], kind: 'line' }],
    unit: 'kg', yName: 'kg',
    note: '模拟数据：假想 12 周体重趋势，包含短期波动与整体下降方向。',
  },
  'weight-moving-average': {
    labels: days30,
    series: [
      { name: '每日体重（kg）', values: descending(72.8, 1.9, 0.6), kind: 'line' },
      { name: '7 日移动平均（kg）', values: movingAverage(descending(72.8, 1.9, 0.6), 7), kind: 'area' },
    ],
    unit: 'kg', yName: 'kg',
    note: '模拟数据：每日读数与 7 日移动平均对比，展示如何用趋势过滤水分波动。',
  },
  'waist-trend': {
    labels: weeks12,
    series: [{ name: '腰围（cm）', values: [86, 85.8, 85.9, 85.4, 85.1, 84.9, 84.7, 84.6, 84.3, 84.2, 84.0, 83.8], kind: 'line' }],
    unit: 'cm', yName: 'cm',
    note: '模拟数据：假想腰围记录，测量条件应尽量固定。',
  },
  'weekly-cardio': {
    labels: weeks12,
    series: [{ name: '有氧时长（分钟）', values: [90, 110, 100, 130, 120, 145, 135, 150, 140, 160, 155, 170], kind: 'bar' }],
    unit: '分钟/周', yName: '分钟',
    note: '模拟数据：假想每周有氧运动时间；WHO 2020 建议成人每周 150–300 分钟中等强度活动。',
  },
  'training-distribution': {
    labels: ['力量训练', '有氧运动', '日常步行', '柔韧 / 恢复'],
    series: [{ name: '时间占比（%）', values: [35, 30, 28, 7] }],
    unit: '%',
    note: '模拟数据：假想一周运动时间分配，不代表推荐比例。',
  },
  'steps-trend': {
    labels: days30,
    series: [{ name: '每日步数', values: wave(8200, 1900, 1.2), kind: 'bar' }],
    unit: '步', yName: '步',
    note: '模拟数据：假想 30 天步数记录，用于展示 NEAT 的日常波动。',
  },
  'weight-vs-activity': {
    labels: weeks12,
    series: [
      { name: '体重（kg）', values: [74.8, 74.6, 74.7, 74.1, 73.8, 73.9, 73.3, 73.1, 73.2, 72.7, 72.6, 72.4], kind: 'line' },
      { name: '每周活动（分钟）', values: [90, 110, 100, 130, 120, 145, 135, 150, 140, 160, 155, 170], kind: 'bar' },
    ],
    unit: 'kg / 分钟',
    note: '模拟数据：两条曲线同时变化不代表因果关系；相关不等于因果。',
  },
  'before-after-comparison': {
    labels: ['体重 (kg)', '腰围 (cm)', '每周活动 (分钟)', '力量训练 (次/周)'],
    series: [
      { name: '起点', values: [74.8, 86, 90, 0], kind: 'bar' },
      { name: '12 周后', values: [72.4, 83.8, 170, 3], kind: 'bar' },
    ],
    unit: '混合单位',
    note: '模拟数据：不同量纲指标放在同一图中仅作形态演示，实际分析应分开看趋势。',
  },
  'energy-balance': {
    labels: ['第 1 周', '第 2 周', '第 3 周', '第 4 周', '第 5 周', '第 6 周'],
    series: [
      { name: '摄入（kcal/天）', values: [2100, 1950, 1900, 1880, 1860, 1850], kind: 'bar' },
      { name: '估算消耗（kcal/天）', values: [2100, 2080, 2060, 2040, 2020, 2000], kind: 'line' },
    ],
    unit: 'kcal/天', yName: 'kcal/天',
    note: '模拟数据：展示摄入下降与消耗随体重下降而调整的示意，非线性换算。',
  },
  'weight-fluctuation': {
    labels: days30,
    series: [
      { name: '每日体重（kg）', values: descending(72.8, 1.9, 2.1), kind: 'line' },
      { name: '趋势线（kg）', values: descending(72.8, 1.9, 0, 30).map((v) => Math.round(v * 10) / 10), kind: 'area' },
    ],
    unit: 'kg', yName: 'kg',
    note: '模拟数据：短期波动叠加长期趋势的示意。',
  },
};

/** 真实数据集：仅收录可用公开出处核对的数字，并注明其性质与适用条件。 */
export const REFERENCE_CHARTS: Partial<Record<ChartId, ChartDataset>> = {
  'tdee-composition': {
    labels: ['基础代谢', '日常活动 NEAT', '食物热效应', '计划运动'],
    series: [{ name: '占比（%）', values: [65, 20, 10, 5], kind: 'bar' }],
    unit: '% 占比', yName: '%',
    note: '真实数据（示意中值）：取 Hall 等（2012）综述中一般成人 TDEE 各组分常见范围的中值；NEAT 个体差异最大。',
    provenance: 'Hall KD et al. Am J Clin Nutr. 2012;95(4):989–994. doi:10.3945/ajcn.111.027904',
  },
  'macro-pie': {
    labels: ['蛋白质', '碳水化合物', '脂肪'],
    series: [{ name: '能量占比（%）', values: [20, 50, 30] }],
    unit: '%',
    note: '真实数据（指南范围）：示意取一般成人宏量营养素可接受范围的中间值，用于说明「不是唯一最优配比」。',
    provenance: '中国营养学会《中国居民膳食指南（2022）》；Sacks FM et al. NEJM 2009;360(9):859–873',
  },
  'weekly-cardio': {
    labels: ['中等强度下限', '中等强度上限', '高强度下限', '高强度上限'],
    series: [{ name: '每周分钟数', values: [150, 300, 75, 150], kind: 'bar' }],
    unit: '分钟/周', yName: '分钟',
    note: '真实数据：WHO 2020 身体活动指南对成人每周有氧活动量的推荐区间；不是减脂处方。',
    provenance: 'WHO guidelines on physical activity and sedentary behaviour (2020)',
  },
};

export const CHART_TITLES: Record<ChartId, string> = {
  'tdee-composition': 'TDEE 能量消耗组成',
  'macro-pie': '每日营养素能量占比',
  'weekly-calories': '每周饮食热量趋势',
  'protein-bars': '蛋白质摄入柱状图',
  'weight-longterm': '体重长期变化',
  'weight-moving-average': '体重与 7 日移动平均',
  'waist-trend': '腰围变化',
  'weekly-cardio': '每周有氧运动时间',
  'training-distribution': '力量与有氧时间分布',
  'steps-trend': '每日步数变化',
  'weight-vs-activity': '体重与运动量',
  'before-after-comparison': '身体数据对比',
  'energy-balance': '能量摄入与消耗示意',
  'weight-fluctuation': '体重波动与趋势',
};
