/** 所有估算公式集中在此。公式仅提供起点，不构成医学诊断或个体化处方。 */

export type Sex = 'male' | 'female';

export const KCAL_PER_GRAM = { protein: 4, carb: 4, fat: 9 } as const;

export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: '久坐（办公室，几乎无计划运动）', factor: 1.2, note: '日常步数通常较低，仅作起点' },
  { id: 'light', label: '轻度活动（每周 1–3 次运动）', factor: 1.375, note: '含规律步行或轻训练' },
  { id: 'moderate', label: '中度活动（每周 3–5 次运动）', factor: 1.55, note: '最常见的估算档位' },
  { id: 'active', label: '高度活动（每周 6–7 次运动）', factor: 1.725, note: '含较高训练量' },
  { id: 'veryActive', label: '体力劳动 / 双练', factor: 1.9, note: '高估风险较大，建议用实测趋势校正' },
] as const;

export type ActivityId = (typeof ACTIVITY_LEVELS)[number]['id'];

/** Mifflin-St Jeor（1990），健康成人静息能量消耗常用预测式 */
export function mifflinStJeor(sex: Sex, weightKg: number, heightCm: number, age: number) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(base + (sex === 'male' ? 5 : -161));
}

/** 修订 Harris-Benedict（Roza & Shizgal, 1984），供交叉对照 */
export function revisedHarrisBenedict(sex: Sex, weightKg: number, heightCm: number, age: number) {
  return sex === 'male'
    ? Math.round(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age)
    : Math.round(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age);
}

/** Cunningham（1980/1991）基于去脂体重；仅在有可信体成分数据时使用 */
export function cunningham(leanMassKg: number) {
  return Math.round(500 + 22 * leanMassKg);
}

export function activityFactor(id: ActivityId) {
  return ACTIVITY_LEVELS.find((a) => a.id === id)?.factor ?? 1.2;
}

export function tdeeFromBmr(bmr: number, factor: number) {
  return Math.round(bmr * factor);
}

export function bmi(weightKg: number, heightCm: number) {
  const m = heightCm / 100;
  return m > 0 ? weightKg / (m * m) : 0;
}

/** 中国成人 BMI 分类（WS/T 428-2013 成人体重判定常用界值），仅作人群筛查参考 */
export function bmiBand(value: number) {
  if (value < 18.5) return { label: '低于 18.5', note: '偏低体重范围' };
  if (value < 24) return { label: '18.5–23.9', note: '中国成人参考正常范围' };
  if (value < 28) return { label: '24.0–27.9', note: '中国成人参考超重范围' };
  return { label: '≥ 28', note: '中国成人参考肥胖范围' };
}

export function whtr(waistCm: number, heightCm: number) {
  return heightCm > 0 ? waistCm / heightCm : 0;
}

export function whtrBand(value: number) {
  if (value < 0.5) return { label: '低于 0.5', note: '常用参考界值以下' };
  if (value < 0.6) return { label: '0.5–0.59', note: '中心性脂肪偏高，建议结合其他指标' };
  return { label: '≥ 0.6', note: '中心性脂肪明显偏高，建议做专业评估' };
}

export const PROTEIN_PROFILES = [
  { id: 'general', label: '一般成年人（无规律训练）', min: 1.0, max: 1.2, note: '以参考体重或目标体重计算' },
  { id: 'active', label: '规律运动 / 减脂期', min: 1.2, max: 1.6, note: '配合力量训练更有助于保留瘦体重' },
  { id: 'strength', label: '系统力量训练者', min: 1.6, max: 2.2, note: '常见于减脂期保留肌肉的文献区间' },
  { id: 'older', label: '中老年人', min: 1.0, max: 1.3, note: '需结合肾功能等医学情况个体化评估' },
] as const;

export type ProteinProfileId = (typeof PROTEIN_PROFILES)[number]['id'];

export function proteinRange(weightKg: number, profile: ProteinProfileId) {
  const p = PROTEIN_PROFILES.find((x) => x.id === profile) ?? PROTEIN_PROFILES[0];
  return { min: Math.round(weightKg * p.min), max: Math.round(weightKg * p.max), note: p.note, minPerKg: p.min, maxPerKg: p.max };
}

export interface MacroPlanInput {
  calories: number;
  weightKg: number;
  proteinPerKg: number;
  fatPercent: number;
}

export function macroPlan({ calories, weightKg, proteinPerKg, fatPercent }: MacroPlanInput) {
  const proteinG = Math.round(weightKg * proteinPerKg);
  const fatG = Math.round((calories * (fatPercent / 100)) / KCAL_PER_GRAM.fat);
  const remaining = calories - proteinG * KCAL_PER_GRAM.protein - fatG * KCAL_PER_GRAM.fat;
  const carbG = Math.max(0, Math.round(remaining / KCAL_PER_GRAM.carb));
  const proteinKcal = proteinG * KCAL_PER_GRAM.protein;
  const fatKcal = fatG * KCAL_PER_GRAM.fat;
  const carbKcal = carbG * KCAL_PER_GRAM.carb;
  const total = proteinKcal + fatKcal + carbKcal;
  return {
    proteinG, fatG, carbG,
    proteinKcal, fatKcal, carbKcal,
    total,
    proteinPct: total ? Math.round((proteinKcal / total) * 100) : 0,
    fatPct: total ? Math.round((fatKcal / total) * 100) : 0,
    carbPct: total ? Math.round((carbKcal / total) * 100) : 0,
    valid: remaining >= 0,
  };
}

export function energyFromMacros(proteinG: number, carbG: number, fatG: number) {
  return Math.round(proteinG * KCAL_PER_GRAM.protein + carbG * KCAL_PER_GRAM.carb + fatG * KCAL_PER_GRAM.fat);
}

/** 居中/尾部对齐的移动平均，数据不足时返回 null */
export function movingAverage(values: (number | null)[], window: number): (number | null)[] {
  return values.map((_, i) => {
    const start = Math.max(0, i - window + 1);
    const slice = values.slice(start, i + 1).filter((v): v is number => v !== null && Number.isFinite(v));
    if (slice.length < Math.min(window, 2)) return null;
    return Math.round((slice.reduce((a, b) => a + b, 0) / slice.length) * 100) / 100;
  });
}

/** 最小二乘斜率：返回每天变化量 */
export function dailySlope(values: number[]) {
  const n = values.length;
  if (n < 2) return 0;
  const meanX = (n - 1) / 2;
  const meanY = values.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  values.forEach((y, x) => {
    num += (x - meanX) * (y - meanY);
    den += (x - meanX) ** 2;
  });
  return den === 0 ? 0 : num / den;
}

export function weeklyRate(values: number[]) {
  return Math.round(dailySlope(values) * 7 * 100) / 100;
}

/** 建议的适度能量缺口区间（相对 TDEE 的比例），不是处方 */
export function deficitRange(tdee: number) {
  return {
    conservative: Math.round(tdee * 0.1),
    standard: Math.round(tdee * 0.15),
    upper: Math.round(tdee * 0.2),
    floorNote: '不建议长期低于此估算值太多；出现持续疲劳、月经紊乱、训练表现明显下降时应重新评估并咨询专业人士。',
  };
}

export const FORMULA_CAVEAT =
  '所有公式都是群体统计模型的估算值，个体误差可达数百千卡。真实能量需求应依据连续 2–4 周的体重趋势、活动量、饱腹感与身体状态校准，而不是把公式结果当作精确处方。';

export const SPECIAL_POPULATION_NOTICE =
  '未成年人、孕期或哺乳期人群，以及有进食障碍史、糖尿病、肾病、心血管疾病等慢性病或正在服药者，不应直接套用普通成人的减脂热量目标，请先咨询医生或注册营养师。';
