'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { NumberInput, SelectInput, SegmentedControl } from '@/components/ui/Form';
import { Badge, Callout } from '@/components/ui/Elements';
import { EChart } from '@/components/charts/EChart';
import { buildOption } from '@/components/charts/buildOption';
import { DataSourceTag } from '@/components/common/DataSourceTag';
import { ResultStat, ToolShell } from './ToolShell';
import { TOOL_MAP } from '@/content/tools';
import { ACTIVITY_LEVELS, PROTEIN_PROFILES, activityFactor, bmi, bmiBand, deficitRange, energyFromMacros, macroPlan, mifflinStJeor, movingAverage, proteinRange, revisedHarrisBenedict, tdeeFromBmr, weeklyRate, whtr, whtrBand } from '@/lib/calculations';
import { lastNDays, round, todayISO, uid } from '@/lib/utils';
import { addEntry } from '@/lib/storage';
import type { ChartDataset } from '@/components/charts/datasets';

/* 1 · BMI */
function BmiView() {
  const tool = TOOL_MAP.get('bmi')!;
  const [height, setHeight] = useState<number | ''>(170);
  const [weight, setWeight] = useState<number | ''>(65);
  const valid = typeof height === 'number' && typeof weight === 'number' && height >= 100 && height <= 250 && weight >= 20 && weight <= 400;
  const value = valid ? bmi(weight as number, height as number) : 0;
  const band = bmiBand(value);
  return (
    <ToolShell tool={tool}
      inputs={<>
        <NumberInput id="bmi-height" label="身高" value={height} onChange={setHeight} unit="cm" min={100} max={250} hint="100–250 cm" error={typeof height === 'number' && (height < 100 || height > 250) ? '请输入 100–250 cm' : undefined} />
        <NumberInput id="bmi-weight" label="体重" value={weight} onChange={setWeight} unit="kg" min={20} max={400} step={0.1} hint="20–400 kg" error={typeof weight === 'number' && (weight < 20 || weight > 400) ? '请输入 20–400 kg' : undefined} />
      </>}
      result={<>
        {valid ? <div className="grid gap-2 sm:grid-cols-2"><ResultStat label="BMI" value={round(value, 1)} unit="kg/m²" /><ResultStat label="中国成人参考区间" value={band.label} note={band.note} tone="orange" /></div> : <p className="text-sm text-[#B4652B]">请填写有效身高与体重。</p>}
        <p className="mt-4 text-[0.78rem] leading-relaxed text-charcoal/70">BMI 只反映体重相对身高的水平，不区分肌肉与脂肪，也不反映脂肪分布。它不是体脂率，更不是健康诊断。</p>
      </>}
      process={['BMI = 体重(kg) ÷ [身高(m)]²', `身高 ${height} cm = ${(Number(height) / 100).toFixed(2)} m`, valid ? `代入：${weight} ÷ ${((Number(height) / 100) ** 2).toFixed(3)} = ${round(value, 2)}` : '等待有效输入', '对照中国成人常用筛查界值：18.5–23.9 / 24.0–27.9 / ≥28']}
      interpretation={<>界值仅用于人群筛查，存在年龄、性别与族群差异。肌肉量较高者可能被判为「超重」，而 BMI 正常者也可能有较高的中心性脂肪。建议结合腰围、腰高比、力量与体检指标一起看，详见「BMI、腰围和体脂率应该怎么看」。</>}
    />
  );
}

/* 2 · BMR */
function BmrView() {
  const tool = TOOL_MAP.get('bmr')!;
  const [sex, setSex] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number | ''>(32);
  const [height, setHeight] = useState<number | ''>(165);
  const [weight, setWeight] = useState<number | ''>(65);
  const valid = [age, height, weight].every((v) => typeof v === 'number') && Number(age) >= 15 && Number(age) <= 100 && Number(height) >= 120 && Number(height) <= 230 && Number(weight) >= 25 && Number(weight) <= 350;
  const m = valid ? mifflinStJeor(sex, Number(weight), Number(height), Number(age)) : 0;
  const h = valid ? revisedHarrisBenedict(sex, Number(weight), Number(height), Number(age)) : 0;
  return (
    <ToolShell tool={tool}
      inputs={<>
        <SegmentedControl label="生理性别（用于公式系数）" value={sex} onChange={setSex} options={[{ value: 'female', label: '女' }, { value: 'male', label: '男' }]} />
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberInput id="bmr-age" label="年龄" value={age} onChange={setAge} unit="岁" min={15} max={100} />
          <NumberInput id="bmr-height" label="身高" value={height} onChange={setHeight} unit="cm" min={120} max={230} />
          <NumberInput id="bmr-weight" label="体重" value={weight} onChange={setWeight} unit="kg" min={25} max={350} step={0.1} />
        </div>
      </>}
      result={<>
        {valid ? <div className="grid gap-2 sm:grid-cols-2"><ResultStat label="Mifflin-St Jeor（1990）" value={m} unit="kcal/天" /><ResultStat label="修订 Harris-Benedict（1984）" value={h} unit="kcal/天" tone="orange" /><ResultStat label="两式估算区间" value={`${Math.min(m, h)}–${Math.max(m, h)}`} unit="kcal/天" note="把差距视为不确定性，而非误差要消除" /></div> : <p className="text-sm text-[#B4652B]">请填写 15–100 岁、有效身高与体重。</p>}
      </>}
      process={['Mifflin-St Jeor：10×体重 + 6.25×身高 − 5×年龄 + 5（男）/ −161（女）', valid ? `代入：10×${weight} + 6.25×${height} − 5×${age} ${sex === 'male' ? '+ 5' : '− 161'} = ${m} kcal/天` : '等待有效输入', '修订 Harris-Benedict 作为交叉对照，得到第二个估算值', '静息消耗 ≠ 一天总消耗；下一步需乘活动系数得到 TDEE']}
      interpretation={<>BMR/RMR 是安静状态下维持生命活动的耗能，通常占 TDEE 的最大部分，但不含日常活动、食物热效应与运动。两个公式都是群体回归模型，个体误差可达数百千卡；体重变化超过约 5% 时建议重新估算。</>}
    />
  );
}

/* 3 · TDEE */
function TdeeView() {
  const tool = TOOL_MAP.get('tdee')!;
  const [sex, setSex] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number | ''>(32);
  const [height, setHeight] = useState<number | ''>(165);
  const [weight, setWeight] = useState<number | ''>(65);
  const [activity, setActivity] = useState<(typeof ACTIVITY_LEVELS)[number]['id']>('light');
  const valid = [age, height, weight].every((v) => typeof v === 'number') && Number(age) >= 15 && Number(height) >= 120 && Number(weight) >= 25;
  const bmr = valid ? mifflinStJeor(sex, Number(weight), Number(height), Number(age)) : 0;
  const factor = activityFactor(activity);
  const tdee = tdeeFromBmr(bmr, factor);
  const d = deficitRange(tdee);
  const level = ACTIVITY_LEVELS.find((a) => a.id === activity)!;
  return (
    <ToolShell tool={tool}
      inputs={<>
        <SegmentedControl label="生理性别" value={sex} onChange={setSex} options={[{ value: 'female', label: '女' }, { value: 'male', label: '男' }]} />
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberInput id="tdee-age" label="年龄" value={age} onChange={setAge} unit="岁" min={15} max={100} />
          <NumberInput id="tdee-height" label="身高" value={height} onChange={setHeight} unit="cm" min={120} max={230} />
          <NumberInput id="tdee-weight" label="体重" value={weight} onChange={setWeight} unit="kg" min={25} max={350} step={0.1} />
        </div>
        <SelectInput id="tdee-activity" label="过去一个月的真实活动水平" value={activity} onChange={setActivity} options={ACTIVITY_LEVELS.map((a) => ({ value: a.id, label: a.label }))} hint="不要按计划或理想状态选" />
        <p className="text-[0.72rem] leading-relaxed text-mist">{level.note}</p>
      </>}
      result={<>
        {valid ? <div className="grid gap-2 sm:grid-cols-2"><ResultStat label="估算静息消耗 BMR" value={bmr} unit="kcal/天" /><ResultStat label="活动系数" value={factor} note={level.label} /><ResultStat label="估算 TDEE" value={tdee} unit="kcal/天" /><ResultStat label="温和缺口参考（10% / 15% / 20%）" value={`${d.conservative} / ${d.standard} / ${d.upper}`} unit="kcal" tone="orange" /></div> : <p className="text-sm text-[#B4652B]">请填写有效的年龄、身高与体重。</p>}
      </>}
      process={['先用 Mifflin-St Jeor 估算静息消耗 BMR', `选择活动系数 ${factor}（${level.label}）`, `TDEE = ${bmr} × ${factor} ≈ ${tdee} kcal/天`, `缺口参考：TDEE × 10% = ${d.conservative}；× 15% = ${d.standard}；× 20% = ${d.upper} kcal`, '以上仅为试运行起点，需用 2–4 周趋势校准']}
      interpretation={<>活动系数把基础代谢、食物热效应、日常活动与运动打包成一个倍数，误差较大。建议从 10%–15% 的缺口试运行，记录 2–4 周体重 7 日均值、步数与饥饿感后再决定是否调整。本站不提供固定减重速度承诺。</>}
    />
  );
}

/* 4 · 蛋白质 */
function ProteinView() {
  const tool = TOOL_MAP.get('protein')!;
  const [weight, setWeight] = useState<number | ''>(65);
  const [profile, setProfile] = useState<(typeof PROTEIN_PROFILES)[number]['id']>('active');
  const valid = typeof weight === 'number' && weight >= 25 && weight <= 350;
  const p = proteinRange(Number(weight) || 0, profile);
  const meta = PROTEIN_PROFILES.find((x) => x.id === profile)!;
  return (
    <ToolShell tool={tool}
      inputs={<>
        <NumberInput id="protein-weight" label="参考体重" value={weight} onChange={setWeight} unit="kg" min={25} max={350} step={0.1} hint="体重较大者建议用目标体重" />
        <SelectInput id="protein-profile" label="训练状态" value={profile} onChange={setProfile} options={PROTEIN_PROFILES.map((x) => ({ value: x.id, label: x.label }))} />
        <p className="text-[0.72rem] leading-relaxed text-mist">{meta.note}</p>
      </>}
      result={<>
        {valid ? <div className="grid gap-2 sm:grid-cols-2"><ResultStat label="每日蛋白质参考下限" value={p.min} unit="g/天" /><ResultStat label="每日蛋白质参考上限" value={p.max} unit="g/天" tone="orange" /><ResultStat label="参考系数" value={`${p.minPerKg}–${p.maxPerKg}`} unit="g/kg" /><ResultStat label="按三餐分配" value={`${Math.round(p.min / 3)}–${Math.round(p.max / 3)}`} unit="g/餐" note="分配到 3 餐，比集中一餐更易达标" /></div> : <p className="text-sm text-[#B4652B]">请输入 25–350 kg 的体重。</p>}
      </>}
      process={['选定每公斤体重参考范围（依训练状态）', `代入：${weight} kg × ${p.minPerKg}–${p.maxPerKg} g/kg`, `得到 ${p.min}–${p.max} g/天`, '把总量拆到 3–4 餐，每餐安排一个明确的蛋白质来源']}
      interpretation={<>范围是实践参考，不是处方。优先用鸡蛋、奶类、鱼虾、禽肉、豆制品与豆类组合；蛋白粉只是方便工具。有慢性肾脏病等需限制蛋白的情况，必须由医生或注册营养师个体化制定。</>}
      extra={<Callout tone="info" title="食物层面的粗估">普通食物的蛋白质含量差异很大，建议查食物成分表或包装标签（注意「每份 / 每 100 g」）。粗略换算时，一个鸡蛋、一份豆制品、一掌心鱼肉可作为「一份蛋白」的结构单位，而不是精确克数。</Callout>}
    />
  );
}

/* 5 · 三大营养素分配 */
function MacrosView() {
  const tool = TOOL_MAP.get('macros')!;
  const [calories, setCalories] = useState<number | ''>(1800);
  const [weight, setWeight] = useState<number | ''>(65);
  const [perKg, setPerKg] = useState<number | ''>(1.4);
  const [fatPct, setFatPct] = useState<number | ''>(30);
  const valid = [calories, weight, perKg, fatPct].every((v) => typeof v === 'number') && Number(calories) >= 800 && Number(fatPct) >= 15 && Number(fatPct) <= 45;
  const plan = macroPlan({ calories: Number(calories) || 0, weightKg: Number(weight) || 0, proteinPerKg: Number(perKg) || 0, fatPercent: Number(fatPct) || 0 });
  const dataset: ChartDataset = useMemo(() => ({
    labels: ['蛋白质', '碳水化合物', '脂肪'],
    series: [{ name: '能量（kcal）', values: [plan.proteinKcal, plan.carbKcal, plan.fatKcal] }],
    unit: 'kcal', note: '个人计算 · 本地',
  }), [plan.proteinKcal, plan.carbKcal, plan.fatKcal]);
  return (
    <ToolShell tool={tool}
      inputs={<>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberInput id="macro-kcal" label="每日总热量" value={calories} onChange={setCalories} unit="kcal" min={800} max={6000} />
          <NumberInput id="macro-weight" label="参考体重" value={weight} onChange={setWeight} unit="kg" min={25} max={350} step={0.1} />
          <NumberInput id="macro-protein" label="蛋白质系数" value={perKg} onChange={setPerKg} unit="g/kg" min={0.8} max={2.5} step={0.1} />
          <NumberInput id="macro-fat" label="脂肪供能比例" value={fatPct} onChange={setFatPct} unit="%" min={15} max={45} hint="常见 20–35%" />
        </div>
      </>}
      result={<>
        {valid && plan.valid ? <div className="grid gap-2 sm:grid-cols-3"><ResultStat label="蛋白质" value={plan.proteinG} unit="g" note={`${plan.proteinPct}% 能量`} /><ResultStat label="碳水化合物" value={plan.carbG} unit="g" note={`${plan.carbPct}% 能量`} /><ResultStat label="脂肪" value={plan.fatG} unit="g" note={`${plan.fatPct}% 能量`} /></div> : <p className="text-sm text-[#B4652B]">输入组合不合理：蛋白质与脂肪已占用过多热量，请降低系数或提高总热量。</p>}
        <p className="mt-4 text-[0.78rem] leading-relaxed text-charcoal/70">配比不是「最优解」。大型随机试验显示不同健康配比在长期减重上差异较小，可坚持性更重要。</p>
      </>}
      process={[`蛋白质：${weight} kg × ${perKg} g/kg = ${plan.proteinG} g → ${plan.proteinKcal} kcal（4 kcal/g）`, `脂肪：${calories} × ${fatPct}% ÷ 9 = ${plan.fatG} g → ${plan.fatKcal} kcal`, `碳水：(${calories} − ${plan.proteinKcal} − ${plan.fatKcal}) ÷ 4 = ${plan.carbG} g`, `合计约 ${plan.total} kcal，占比 ${plan.proteinPct}% / ${plan.carbPct}% / ${plan.fatPct}%`]}
      interpretation={<>本站按「先定蛋白质、再定脂肪、剩余给碳水」的顺序计算。食物称重与标签存在误差，计算结果是安排结构的起点，不是必须精确达成的目标；训练量较大时可优先保证碳水。</>}
      extra={valid && plan.valid ? <figure className="border border-line bg-white p-4"><div className="mb-2 flex items-center justify-between gap-3"><figcaption className="text-sm font-semibold text-ink">能量占比图</figcaption><DataSourceTag kind="personal" note="由你输入的参数即时计算，不上传" /></div><EChart option={buildOption('macro-pie', dataset)} height={260} /></figure> : null}
    />
  );
}

/* 6 · 食物热量换算 */
function FoodEnergyView() {
  const tool = TOOL_MAP.get('food-energy')!;
  const [protein, setProtein] = useState<number | ''>(20);
  const [carb, setCarb] = useState<number | ''>(45);
  const [fat, setFat] = useState<number | ''>(10);
  const kcal = energyFromMacros(Number(protein) || 0, Number(carb) || 0, Number(fat) || 0);
  return (
    <ToolShell tool={tool}
      inputs={<div className="grid gap-4 sm:grid-cols-3">
        <NumberInput id="energy-p" label="蛋白质" value={protein} onChange={setProtein} unit="g" min={0} max={2000} step={0.1} />
        <NumberInput id="energy-c" label="碳水化合物" value={carb} onChange={setCarb} unit="g" min={0} max={2000} step={0.1} />
        <NumberInput id="energy-f" label="脂肪" value={fat} onChange={setFat} unit="g" min={0} max={2000} step={0.1} />
      </div>}
      result={<div className="grid gap-2 sm:grid-cols-2"><ResultStat label="估算能量" value={kcal} unit="kcal" /><ResultStat label="脂肪供能占比" value={kcal ? round((Number(fat) * 9 / kcal) * 100, 0) : 0} unit="%" tone="orange" note="脂肪能量密度约为碳水/蛋白的 2 倍" /></div>}
      process={['常用换算系数：蛋白质 4 kcal/g、碳水 4 kcal/g、脂肪 9 kcal/g', `蛋白质 ${protein} × 4 = ${(Number(protein) || 0) * 4} kcal`, `碳水 ${carb} × 4 = ${(Number(carb) || 0) * 4} kcal`, `脂肪 ${fat} × 9 = ${(Number(fat) || 0) * 9} kcal`, `合计 ≈ ${kcal} kcal`]}
      interpretation={<>4/4/9 是通用估算系数，实际可利用能量受食物基质、加工、烹饪与个体消化影响；膳食纤维的能量贡献也未在此单独处理。包装标签先看「每份 / 每 100 g」，再核对是否与实际食用量一致。</>}
    />
  );
}

/* 7 · 腰高比 */
function WhtrView() {
  const tool = TOOL_MAP.get('whtr')!;
  const [waist, setWaist] = useState<number | ''>(80);
  const [height, setHeight] = useState<number | ''>(170);
  const valid = typeof waist === 'number' && typeof height === 'number' && waist >= 40 && waist <= 220 && height >= 120 && height <= 230;
  const value = valid ? whtr(waist as number, height as number) : 0;
  const band = whtrBand(value);
  return (
    <ToolShell tool={tool}
      inputs={<>
        <NumberInput id="whtr-waist" label="腰围" value={waist} onChange={setWaist} unit="cm" min={40} max={220} step={0.1} hint="平静呼气末、脐水平" />
        <NumberInput id="whtr-height" label="身高" value={height} onChange={setHeight} unit="cm" min={120} max={230} />
      </>}
      result={<>
        {valid ? <div className="grid gap-2 sm:grid-cols-2"><ResultStat label="腰高比 WHtR" value={round(value, 2)} note="腰围 ÷ 身高，无单位" /><ResultStat label="常用筛查界值" value={band.label} note={band.note} tone="orange" /></div> : <p className="text-sm text-[#B4652B]">请输入有效腰围与身高。</p>}
      </>}
      process={['WHtR = 腰围(cm) ÷ 身高(cm)', valid ? `代入：${waist} ÷ ${height} = ${round(value, 3)}` : '等待有效输入', '常用筛查提示：腰围不超过身高的一半（WHtR 0.5）', '界值是人群筛查用的经验阈值，不用于诊断']}
      interpretation={<>腰围与腰高比补充了 BMI 缺失的「脂肪分布」信息，但界值受年龄、性别与族群影响（WHO 专家报告，2011；Browning 等，2010）。测量条件必须固定，单次结果不能判断健康，建议结合体重趋势、力量与体检指标。</>}
    />
  );
}

/* 8 · 体重趋势分析 */
function WeightTrendView() {
  const tool = TOOL_MAP.get('weight-trend')!;
  const [raw, setRaw] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const values = useMemo(() => raw.split(/[\s,，、;\n]+/).map((x) => Number(x.trim())).filter((x) => Number.isFinite(x) && x > 20 && x < 400), [raw]);
  const ma = useMemo(() => movingAverage(values, 7), [values]);
  const rate = weeklyRate(values);
  const dataset: ChartDataset = useMemo(() => ({
    labels: values.map((_, i) => `第 ${i + 1} 次`),
    series: [
      { name: '记录值（kg）', values, kind: 'line' },
      { name: '7 次移动平均（kg）', values: ma, kind: 'area' },
    ],
    unit: 'kg', yName: 'kg',
    note: isDemo ? '模拟数据：仅用于演示趋势分析方法' : '个人输入 · 本地计算',
  }), [values, ma, isDemo]);
  return (
    <ToolShell tool={tool}
      inputs={<>
        <label htmlFor="trend-input" className="mb-1.5 block text-[0.82rem] font-medium text-ink">连续体重读数（用空格、逗号或换行分隔）</label>
        <textarea id="trend-input" value={raw} onChange={(e) => { setRaw(e.target.value); setIsDemo(false); }} rows={5} placeholder="例如：72.8 72.6 72.9 72.4 72.5 72.3 72.1" className="focus-ring w-full rounded-sm border border-line bg-white px-3 py-2.5 font-mono text-sm placeholder:text-mist/70" />
        <Button variant="outline" size="sm" onClick={() => { setRaw('72.8 72.5 73.1 72.6 72.2 72.9 72.5 72.1 72.4 71.9 72.3 71.8 71.6 71.9 71.5 71.4 71.7 71.2 71.3 71.0'); setIsDemo(true); }}>填入演示数据</Button>
      </>}
      result={<>
        {values.length >= 2 ? <div className="grid gap-2 sm:grid-cols-3"><ResultStat label="有效读数" value={values.length} unit="次" /><ResultStat label="最新移动平均" value={round(Number(ma[ma.length - 1] ?? values[values.length - 1]), 2)} unit="kg" /><ResultStat label="趋势速率（最小二乘）" value={round(rate, 2)} unit="kg/周" tone="orange" note="仅为线性拟合参考，不代表脂肪变化" /></div> : <p className="text-sm text-[#B4652B]">请至少输入 2 个有效读数（20–400 kg）。</p>}
      </>}
      process={['按输入顺序整理有效读数，剔除 20–400 kg 之外的异常值', '计算最近 7 次读数的移动平均，过滤单日水分波动', '对所有读数做最小二乘线性拟合，斜率 × 7 得到每周趋势速率', '趋势速率仅作参考；判断是否需要调整，应至少看 2–4 周']}
      interpretation={<>读数受水分、糖原、钠、排便与训练后修复影响。7 次移动平均比单日读数更能反映方向；速率为线性拟合，非线性适应会让它逐渐失真。相关不等于因果，本工具不提供诊断，也不区分脂肪与瘦体重变化。</>}
      extra={values.length >= 2 ? <figure className="border border-line bg-white p-4"><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><figcaption className="text-sm font-semibold text-ink">记录值与移动平均</figcaption><DataSourceTag kind={isDemo ? 'demo' : 'personal'} note={dataset.note} /></div><EChart option={buildOption('weight-moving-average', dataset)} height={280} /></figure> : null}
    />
  );
}

/* 9 · 每周运动量 */
function WeeklyActivityView() {
  const tool = TOOL_MAP.get('weekly-activity')!;
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const [minutes, setMinutes] = useState<(number | '')[]>([30, 0, 40, 0, 35, 45, 0]);
  const [steps, setSteps] = useState<(number | '')[]>([8000, 7000, 8500, 6500, 8200, 10000, 7500]);
  const [saved, setSaved] = useState(false);
  const totalMin = minutes.reduce<number>((s, v) => s + (typeof v === 'number' ? Math.max(0, v) : 0), 0);
  const avgSteps = Math.round(steps.reduce<number>((s, v) => s + (typeof v === 'number' ? Math.max(0, v) : 0), 0) / 7);
  const save = () => {
    const dates = lastNDays(7);
    dates.forEach((date, i) => {
      const m = typeof minutes[i] === 'number' ? Number(minutes[i]) : 0;
      const st = typeof steps[i] === 'number' ? Number(steps[i]) : 0;
      if (m > 0 || st > 0) addEntry('activity', { id: uid(), date, type: '日常活动记录', minutes: m, intensity: '中', steps: st });
    });
    setSaved(true);
  };
  return (
    <ToolShell tool={tool}
      inputs={<>
        <div className="table-shell"><table className="w-full min-w-[420px] text-left text-[0.78rem]"><thead className="border-b border-line text-mist"><tr><th className="py-2">日期</th><th className="py-2">有氧分钟</th><th className="py-2">步数</th></tr></thead>
          <tbody>{days.map((d, i) => <tr key={d} className="border-b border-line/60"><td className="py-2 text-ink">{d}</td><td className="py-1.5 pr-2"><input type="number" min={0} max={1440} value={minutes[i]} onChange={(e) => setMinutes((prev) => prev.map((v, j) => j === i ? (e.target.value === '' ? '' : Number(e.target.value)) : v))} className="focus-ring w-full rounded-sm border border-line px-2 py-1.5 text-sm" /></td><td className="py-1.5"><input type="number" min={0} max={100000} value={steps[i]} onChange={(e) => setSteps((prev) => prev.map((v, j) => j === i ? (e.target.value === '' ? '' : Number(e.target.value)) : v))} className="focus-ring w-full rounded-sm border border-line px-2 py-1.5 text-sm" /></td></tr>)}</tbody></table></div>
        <Button onClick={save} size="sm">{saved ? '已保存到本地记录' : '保存本周记录到本地'}</Button>
      </>}
      result={<div className="grid gap-2 sm:grid-cols-3"><ResultStat label="本周有氧合计" value={totalMin} unit="分钟" /><ResultStat label="日均步数" value={avgSteps} unit="步" /><ResultStat label="对照 WHO 2020 推荐" value={totalMin >= 150 ? '达到下限' : `还差 ${150 - totalMin}`} unit="分钟" tone="orange" note="成人每周 150–300 分钟中等强度有氧" /></div>}
      process={['逐日累加有氧分钟数与步数', `合计有氧 ${totalMin} 分钟；日均步数 ${avgSteps} 步`, '对照 WHO 2020 成人每周 150–300 分钟中等强度活动推荐区间', '保存后可在数据实验室查看个人记录图表']}
      interpretation={<>推荐区间是公共卫生层面的健康目标，不是减脂处方。步数只是 NEAT 的粗略代理，运动手表显示的消耗也不宜全额「兑换」成食物。保存操作只写入本机 localStorage。</>}
      extra={saved ? <Callout tone="success" title="已保存到本机">7 天内有数据的记录已写入浏览器本地存储，可在「数据实验室 → 运动记录」查看、导出或删除。</Callout> : null}
    />
  );
}

/* 10 · 个人进度快照 */
function ProgressView() {
  const tool = TOOL_MAP.get('progress')!;
  const [start, setStart] = useState<number | ''>(75);
  const [current, setCurrent] = useState<number | ''>(72);
  const [waistStart, setWaistStart] = useState<number | ''>(88);
  const [waistNow, setWaistNow] = useState<number | ''>(85);
  const [saved, setSaved] = useState(false);
  const weightChange = round((Number(current) || 0) - (Number(start) || 0), 1);
  const waistChange = round((Number(waistNow) || 0) - (Number(waistStart) || 0), 1);
  const save = () => {
    addEntry('weight', { id: uid(), date: todayISO(), weight: Number(current), waist: Number(waistNow), note: '进度工具保存' });
    setSaved(true);
  };
  return (
    <ToolShell tool={tool}
      inputs={<div className="grid gap-4 sm:grid-cols-2">
        <NumberInput id="prog-start" label="起点体重" value={start} onChange={setStart} unit="kg" min={25} max={400} step={0.1} />
        <NumberInput id="prog-current" label="当前体重" value={current} onChange={setCurrent} unit="kg" min={25} max={400} step={0.1} />
        <NumberInput id="prog-waist-start" label="起点腰围" value={waistStart} onChange={setWaistStart} unit="cm" min={40} max={220} step={0.1} />
        <NumberInput id="prog-waist-now" label="当前腰围" value={waistNow} onChange={setWaistNow} unit="cm" min={40} max={220} step={0.1} />
        <div className="sm:col-span-2"><Button onClick={save} size="sm">{saved ? '已保存当前记录' : '保存当前体重与腰围到本地'}</Button></div>
      </div>}
      result={<div className="grid gap-2 sm:grid-cols-2"><ResultStat label="体重变化" value={`${weightChange > 0 ? '+' : ''}${weightChange}`} unit="kg" /><ResultStat label="腰围变化" value={`${waistChange > 0 ? '+' : ''}${waistChange}`} unit="cm" tone="orange" /><ResultStat label="起点体重" value={start} unit="kg" /><ResultStat label="当前体重" value={current} unit="kg" /></div>}
      process={['体重变化 = 当前体重 − 起点体重', '腰围变化 = 当前腰围 − 起点腰围', '单点对比容易受水分与测量条件影响，应结合 7 日均值与 30 日趋势', '把当前记录保存到本地，之后可在数据实验室持续追踪']}
      interpretation={<>两个数字都不区分脂肪、水分与瘦体重。若体重变化不大但腰围下降、力量提升，也可能是有价值的进展。不要用单次对比评价健康，更不要据此设定「必须继续下降」的压力。</>}
      extra={<div className="border border-line bg-white p-4 text-[0.8rem] leading-relaxed text-charcoal/70"><Badge tone="forest">本地数据</Badge><p className="mt-2">保存后可在「数据实验室 → 体重追踪 / 进度仪表盘」查看图表，所有记录默认只保存在本机。</p></div>}
    />
  );
}

const VIEWS: Record<string, () => React.JSX.Element> = {
  bmi: BmiView, bmr: BmrView, tdee: TdeeView, protein: ProteinView, macros: MacrosView,
  'food-energy': FoodEnergyView, whtr: WhtrView, 'weight-trend': WeightTrendView,
  'weekly-activity': WeeklyActivityView, progress: ProgressView,
};

export function ToolView({ slug }: { slug: string }) {
  const View = VIEWS[slug];
  if (!View) return <p className="text-sm text-[#B4652B]">未找到该工具。</p>;
  return <View />;
}
