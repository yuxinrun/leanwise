'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, LockKeyhole, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NumberInput, TextInput } from '@/components/ui/Form';
import { Badge, EmptyState, Callout } from '@/components/ui/Elements';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { DataSourceTag } from '@/components/common/DataSourceTag';
import type { ChartDataset } from '@/components/charts/datasets';
import { buildExport, clearAll, downloadJson, importBundle, readCollection, removeEntry, writeCollection } from '@/lib/storage';
import { movingAverage } from '@/lib/calculations';
import { round, todayISO, uid } from '@/lib/utils';
import type { ActivityEntry, ChartId, FoodEntry, WeightEntry } from '@/types';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'dashboard', label: '进度仪表盘' },
  { id: 'weight', label: '体重追踪' },
  { id: 'food', label: '饮食记录' },
  { id: 'activity', label: '运动记录' },
  { id: 'privacy', label: '数据隐私' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function PersonalChart({ chartId, dataset, height = 240, title, description }: { chartId: ChartId; dataset: ChartDataset; height?: number; title?: string; description?: string }) {
  const hasData = dataset.labels.length > 0;
  if (!hasData) return <EmptyState title="还没有个人记录" description="在上方表单录入第一条记录后，这里会自动生成只属于你的图表。当前可先切换到模拟数据查看图表形态。" />;
  return <ChartPanel chartId={chartId} personal={dataset} defaultMode="personal" height={height} title={title} description={description} />;
}

export function LabDashboard() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const refresh = () => {
      setWeights(readCollection('weight') as WeightEntry[]);
      setFoods(readCollection('food') as FoodEntry[]);
      setActivities(readCollection('activity') as ActivityEntry[]);
    };
    refresh();
    window.addEventListener('leanwise:data-changed', refresh);
    return () => window.removeEventListener('leanwise:data-changed', refresh);
  }, []);

  const sortedWeights = useMemo(() => [...weights].sort((a, b) => a.date.localeCompare(b.date)), [weights]);
  const sortedFoods = useMemo(() => [...foods].sort((a, b) => b.date.localeCompare(a.date)), [foods]);
  const sortedActivities = useMemo(() => [...activities].sort((a, b) => b.date.localeCompare(a.date)), [activities]);

  const weightDataset: ChartDataset = useMemo(() => ({
    labels: sortedWeights.map((w) => w.date.slice(5)),
    series: [{ name: '体重（kg）', values: sortedWeights.map((w) => w.weight), kind: 'line' }],
    unit: 'kg', yName: 'kg', note: '个人记录 · 仅保存在本机浏览器',
  }), [sortedWeights]);

  const maDataset: ChartDataset = useMemo(() => ({
    labels: sortedWeights.map((w) => w.date.slice(5)),
    series: [
      { name: '每日体重（kg）', values: sortedWeights.map((w) => w.weight), kind: 'line' },
      { name: '7 日移动平均（kg）', values: movingAverage(sortedWeights.map((w) => w.weight), 7), kind: 'area' },
    ],
    unit: 'kg', yName: 'kg', note: '个人记录 · 7 次移动平均用于过滤短期波动',
  }), [sortedWeights]);

  const waistDataset: ChartDataset = useMemo(() => ({
    labels: sortedWeights.filter((w) => typeof w.waist === 'number').map((w) => w.date.slice(5)),
    series: [{ name: '腰围（cm）', values: sortedWeights.filter((w) => typeof w.waist === 'number').map((w) => w.waist as number), kind: 'line' }],
    unit: 'cm', yName: 'cm', note: '个人记录 · 固定测量条件才可比',
  }), [sortedWeights]);

  const foodByDate = useMemo(() => {
    const map = new Map<string, { kcal: number; protein: number; carb: number; fat: number }>();
    foods.forEach((f) => {
      const cur = map.get(f.date) ?? { kcal: 0, protein: 0, carb: 0, fat: 0 };
      map.set(f.date, { kcal: cur.kcal + f.kcal, protein: cur.protein + f.protein, carb: cur.carb + f.carb, fat: cur.fat + f.fat });
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [foods]);

  const kcalDataset: ChartDataset = useMemo(() => ({
    labels: foodByDate.map(([d]) => d.slice(5)),
    series: [{ name: '摄入热量（kcal）', values: foodByDate.map(([, v]) => Math.round(v.kcal)), kind: 'bar' }],
    unit: 'kcal', yName: 'kcal', note: '个人记录 · 食物热量多为估算值',
  }), [foodByDate]);

  const proteinDataset: ChartDataset = useMemo(() => ({
    labels: foodByDate.map(([d]) => d.slice(5)),
    series: [{ name: '蛋白质（g）', values: foodByDate.map(([, v]) => Math.round(v.protein)), kind: 'bar' }],
    unit: 'g', yName: 'g', note: '个人记录 · 按日汇总',
  }), [foodByDate]);

  const macroDataset: ChartDataset = useMemo(() => {
    const total = foodByDate.reduce((acc, [, v]) => ({ p: acc.p + v.protein, c: acc.c + v.carb, f: acc.f + v.fat }), { p: 0, c: 0, f: 0 });
    return { labels: ['蛋白质', '碳水化合物', '脂肪'], series: [{ name: '能量（kcal）', values: [Math.round(total.p * 4), Math.round(total.c * 4), Math.round(total.f * 9)] }], unit: 'kcal', note: '个人记录 · 按 4/4/9 系数估算' };
  }, [foodByDate]);

  const activityByDate = useMemo(() => {
    const map = new Map<string, { minutes: number; steps: number }>();
    activities.forEach((a) => {
      const cur = map.get(a.date) ?? { minutes: 0, steps: 0 };
      map.set(a.date, { minutes: cur.minutes + a.minutes, steps: cur.steps + (a.steps ?? 0) });
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [activities]);

  const activityDataset: ChartDataset = useMemo(() => ({
    labels: activityByDate.map(([d]) => d.slice(5)),
    series: [{ name: '活动时长（分钟）', values: activityByDate.map(([, v]) => v.minutes), kind: 'bar' }],
    unit: '分钟', yName: '分钟', note: '个人记录 · 每周活动量',
  }), [activityByDate]);

  const stepsDataset: ChartDataset = useMemo(() => ({
    labels: activityByDate.map(([d]) => d.slice(5)),
    series: [{ name: '步数', values: activityByDate.map(([, v]) => v.steps), kind: 'bar' }],
    unit: '步', yName: '步', note: '个人记录 · 步数是 NEAT 的粗略代理',
  }), [activityByDate]);

  const weightActivityDataset: ChartDataset = useMemo(() => {
    const minutesByDate = new Map(activityByDate);
    return {
      labels: sortedWeights.map((w) => w.date.slice(5)),
      series: [
        { name: '体重（kg）', values: sortedWeights.map((w) => w.weight), kind: 'line' },
        { name: '活动时长（分钟）', values: sortedWeights.map((w) => minutesByDate.get(w.date)?.minutes ?? null), kind: 'bar' },
      ],
      unit: 'kg / 分钟', note: '个人记录 · 两条曲线同时变化不代表因果关系',
    };
  }, [sortedWeights, activityByDate]);

  const first = sortedWeights[0];
  const last = sortedWeights[sortedWeights.length - 1];
  const weightChange = first && last ? round(last.weight - first.weight, 1) : null;
  const waistFirst = sortedWeights.find((w) => typeof w.waist === 'number');
  const waistLast = [...sortedWeights].reverse().find((w) => typeof w.waist === 'number');
  const waistChange = waistFirst && waistLast ? round((waistLast.waist ?? 0) - (waistFirst.waist ?? 0), 1) : null;
  const avgMinutes = activities.length ? Math.round(activities.reduce((s, a) => s + a.minutes, 0) / activities.length) : 0;
  const foodDays = new Set(foods.map((f) => f.date)).size;
  const activityDays = new Set(activities.map((a) => a.date)).size;

  // ── 表单状态 ──
  const [wForm, setWForm] = useState({ date: todayISO(), weight: 70 as number | '', waist: '' as number | '', note: '' });
  const [fForm, setFForm] = useState({ date: todayISO(), name: '', grams: 100 as number | '', kcal: 0 as number | '', protein: 0 as number | '', carb: 0 as number | '', fat: 0 as number | '' });
  const [aForm, setAForm] = useState({ date: todayISO(), type: '快走', minutes: 30 as number | '', intensity: '中' as '低' | '中' | '高', steps: 8000 as number | '', strength: '' });
  const [importText, setImportText] = useState('');

  const submitWeight = () => {
    if (!wForm.date || typeof wForm.weight !== 'number' || wForm.weight < 20 || wForm.weight > 400) { setMessage('体重请输入 20–400 kg。'); return; }
    writeCollection('weight', [...weights, { id: uid(), date: wForm.date, weight: Number(wForm.weight), waist: typeof wForm.waist === 'number' ? wForm.waist : undefined, note: wForm.note || undefined }]);
    setWForm({ date: todayISO(), weight: '' as number | '', waist: '' as number | '', note: '' });
    setMessage('体重记录已保存到本机。');
  };
  const submitFood = () => {
    if (!fForm.name.trim() || !fForm.date || typeof fForm.kcal !== 'number') { setMessage('请填写日期、食物名称与热量。'); return; }
    writeCollection('food', [...foods, { id: uid(), date: fForm.date, name: fForm.name.trim(), grams: Number(fForm.grams) || 0, kcal: Number(fForm.kcal) || 0, protein: Number(fForm.protein) || 0, carb: Number(fForm.carb) || 0, fat: Number(fForm.fat) || 0 }]);
    setFForm({ ...fForm, name: '', kcal: 0, protein: 0, carb: 0, fat: 0 });
    setMessage('饮食记录已保存到本机。');
  };
  const submitActivity = () => {
    if (!aForm.date || typeof aForm.minutes !== 'number') { setMessage('请填写日期与运动时长。'); return; }
    writeCollection('activity', [...activities, { id: uid(), date: aForm.date, type: aForm.type.trim() || '日常活动', minutes: Number(aForm.minutes) || 0, intensity: aForm.intensity, steps: typeof aForm.steps === 'number' ? aForm.steps : undefined, strength: aForm.strength || undefined }]);
    setMessage('运动记录已保存到本机。');
  };

  const stat = (label: string, value: string, note?: string) => (
    <div className="border border-line bg-white p-4"><p className="text-[0.72rem] text-mist">{label}</p><p className="num mt-1.5 text-xl font-semibold text-forest">{value}</p>{note && <p className="mt-1 text-[0.7rem] text-charcoal/60">{note}</p>}</div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 border border-forest/20 bg-mint/50 p-4 text-[0.8rem] leading-relaxed text-ink">
        <LockKeyhole size={16} className="shrink-0 text-forest" />
        所有记录默认只保存在当前浏览器的 localStorage，服务端不接收任何个人健康数据。可随时导出、导入或一键删除。
      </div>
      {message && <p className="mt-3 border-l-2 border-forest pl-3 text-xs text-forest" role="status">{message}</p>}

      <div role="tablist" className="table-shell mt-6 border-b border-line">
        <div className="flex min-w-max gap-1">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={cn('relative whitespace-nowrap px-4 py-3 text-sm focus-ring', tab === t.id ? 'font-semibold text-forest' : 'text-charcoal/60 hover:text-ink')}>
              {t.label}{tab === t.id && <span className="absolute inset-x-3 bottom-0 h-[2px] bg-forest" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-7">
        {tab === 'dashboard' && (
          <div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {stat('当前体重', last ? `${last.weight} kg` : '—', last ? `记录于 ${last.date}` : '尚无记录')}
              {stat('初始体重', first ? `${first.weight} kg` : '—', first ? `记录于 ${first.date}` : undefined)}
              {stat('体重变化', weightChange === null ? '—' : `${weightChange > 0 ? '+' : ''}${weightChange} kg`, '不区分脂肪与水分')}
              {stat('腰围变化', waistChange === null ? '—' : `${waistChange > 0 ? '+' : ''}${waistChange} cm`, '需固定测量条件')}
              {stat('平均日活动量', `${avgMinutes} 分钟`, `共 ${activities.length} 条运动记录`)}
              {stat('饮食记录天数', `${foodDays} 天`, `共 ${foods.length} 条饮食记录`)}
              {stat('运动记录天数', `${activityDays} 天`, '含步行与力量训练')}
              {stat('体重记录条数', `${weights.length} 条`, '建议固定条件连续记录')}
            </div>
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <PersonalChart chartId="weight-moving-average" dataset={maDataset} title="体重与 7 日移动平均" />
              <PersonalChart chartId="weekly-calories" dataset={kcalDataset} title="每日饮食热量" />
              <PersonalChart chartId="weekly-cardio" dataset={activityDataset} title="每日活动时长" />
              <PersonalChart chartId="steps-trend" dataset={stepsDataset} title="每日步数" />
            </div>
            <Callout tone="info" title="仪表盘怎么读">体重变化不区分脂肪、水分与瘦体重；平均日活动量由你录入的记录计算，不含未记录的日子。图表中的「个人记录」与模拟数据、文献数据严格区分，相关变化不代表因果。</Callout>
          </div>
        )}

        {tab === 'weight' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <section className="border border-line bg-white p-5">
              <p className="eyebrow mb-1">新增记录</p>
              <h2 className="mb-4 font-display text-lg text-ink">记录体重与腰围</h2>
              <div className="space-y-3">
                <TextInput id="lab-w-date" label="日期" type="date" value={wForm.date} onChange={(v) => setWForm({ ...wForm, date: v })} />
                <NumberInput id="lab-w-weight" label="体重" value={wForm.weight} onChange={(v) => setWForm({ ...wForm, weight: v })} unit="kg" min={20} max={400} step={0.1} />
                <NumberInput id="lab-w-waist" label="腰围（可选）" value={wForm.waist} onChange={(v) => setWForm({ ...wForm, waist: v })} unit="cm" min={30} max={250} step={0.1} />
                <TextInput id="lab-w-note" label="备注（可选）" value={wForm.note} onChange={(v) => setWForm({ ...wForm, note: v })} placeholder="例：晨起、如厕后" />
                <Button size="sm" onClick={submitWeight}>保存到本地记录</Button>
              </div>
              <div className="mt-6 max-h-64 overflow-y-auto border-t border-line pt-3">
                <p className="mb-2 text-xs font-semibold text-ink">已有记录（{weights.length}）</p>
                {weights.length === 0 && <p className="text-xs text-mist">尚无体重记录。</p>}
                {[...sortedWeights].reverse().map((w) => (
                  <div key={w.id} className="flex items-center justify-between gap-2 border-b border-line/60 py-2 text-[0.78rem]">
                    <span className="num text-mist">{w.date}</span>
                    <span className="text-charcoal/80">{w.weight} kg{w.waist ? ` · 腰围 ${w.waist} cm` : ''}</span>
                    <button type="button" onClick={() => removeEntry('weight', w.id)} className="text-[0.7rem] text-[#B4652B] hover:underline">删除</button>
                  </div>
                ))}
              </div>
            </section>
            <div className="space-y-4">
              <PersonalChart chartId="weight-moving-average" dataset={maDataset} title="体重与 7 日移动平均" description="7 次移动平均过滤短期水分波动" />
              <PersonalChart chartId="weight-longterm" dataset={weightDataset} title="体重长期变化" />
              <PersonalChart chartId="waist-trend" dataset={waistDataset} title="腰围变化" />
              <div className="border border-line bg-white p-4 text-[0.78rem] leading-relaxed text-charcoal/70">
                <DataSourceTag kind="personal" note="以上图表只使用你在本机录入的数据" />
                <p className="mt-2">波动区间：{sortedWeights.length >= 2 ? `${Math.min(...sortedWeights.map((w) => w.weight))}–${Math.max(...sortedWeights.map((w) => w.weight))} kg` : '数据不足'}。单日读数包含水分与内容物变化，不代表脂肪变化。</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'food' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <section className="border border-line bg-white p-5">
              <p className="eyebrow mb-1">新增记录</p>
              <h2 className="mb-4 font-display text-lg text-ink">记录一餐 / 一种食物</h2>
              <div className="space-y-3">
                <TextInput id="lab-f-date" label="日期" type="date" value={fForm.date} onChange={(v) => setFForm({ ...fForm, date: v })} />
                <TextInput id="lab-f-name" label="食物名称" value={fForm.name} onChange={(v) => setFForm({ ...fForm, name: v })} placeholder="例：杂粮饭 + 清蒸鱼" />
                <NumberInput id="lab-f-grams" label="食物重量" value={fForm.grams} onChange={(v) => setFForm({ ...fForm, grams: v })} unit="g" min={0} max={10000} />
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput id="lab-f-kcal" label="热量" value={fForm.kcal} onChange={(v) => setFForm({ ...fForm, kcal: v })} unit="kcal" min={0} />
                  <NumberInput id="lab-f-p" label="蛋白质" value={fForm.protein} onChange={(v) => setFForm({ ...fForm, protein: v })} unit="g" min={0} />
                  <NumberInput id="lab-f-c" label="碳水" value={fForm.carb} onChange={(v) => setFForm({ ...fForm, carb: v })} unit="g" min={0} />
                  <NumberInput id="lab-f-fat" label="脂肪" value={fForm.fat} onChange={(v) => setFForm({ ...fForm, fat: v })} unit="g" min={0} />
                </div>
                <Button size="sm" onClick={submitFood}>保存到本地记录</Button>
              </div>
              <p className="mt-3 text-[0.72rem] leading-relaxed text-mist">营养数值多来自包装标签或估算，不同品牌与烹饪方式差异明显，记录一致性比绝对精度更有助于趋势判断。</p>
              <div className="mt-5 max-h-56 overflow-y-auto border-t border-line pt-3">
                <p className="mb-2 text-xs font-semibold text-ink">已有记录（{foods.length}）</p>
                {sortedFoods.map((f) => (
                  <div key={f.id} className="flex items-center justify-between gap-2 border-b border-line/60 py-2 text-[0.76rem]">
                    <span className="num text-mist">{f.date}</span><span className="min-w-0 flex-1 truncate text-charcoal/80">{f.name} · {f.kcal} kcal</span>
                    <button type="button" onClick={() => removeEntry('food', f.id)} className="text-[0.7rem] text-[#B4652B] hover:underline">删除</button>
                  </div>
                ))}
              </div>
            </section>
            <div className="space-y-4">
              <PersonalChart chartId="weekly-calories" dataset={kcalDataset} title="每日饮食热量" />
              <PersonalChart chartId="protein-bars" dataset={proteinDataset} title="每日蛋白质摄入" />
              <PersonalChart chartId="macro-pie" dataset={macroDataset} title="累计三大营养素能量占比" />
            </div>
          </div>
        )}

        {tab === 'activity' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <section className="border border-line bg-white p-5">
              <p className="eyebrow mb-1">新增记录</p>
              <h2 className="mb-4 font-display text-lg text-ink">记录一次活动</h2>
              <div className="space-y-3">
                <TextInput id="lab-a-date" label="日期" type="date" value={aForm.date} onChange={(v) => setAForm({ ...aForm, date: v })} />
                <TextInput id="lab-a-type" label="运动类型" value={aForm.type} onChange={(v) => setAForm({ ...aForm, type: v })} placeholder="快走 / 力量训练 / 骑行" />
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput id="lab-a-min" label="时长" value={aForm.minutes} onChange={(v) => setAForm({ ...aForm, minutes: v })} unit="分钟" min={0} max={1440} />
                  <NumberInput id="lab-a-steps" label="步数（可选）" value={aForm.steps} onChange={(v) => setAForm({ ...aForm, steps: v })} unit="步" min={0} max={200000} />
                </div>
                <TextInput id="lab-a-strength" label="力量训练项目（可选）" value={aForm.strength} onChange={(v) => setAForm({ ...aForm, strength: v })} placeholder="例：深蹲 3×10、坐姿划船 3×12" />
                <div>
                  <p className="mb-1.5 text-[0.82rem] font-medium text-ink">强度</p>
                  <div className="flex gap-1">{(['低', '中', '高'] as const).map((i) => <button key={i} type="button" onClick={() => setAForm({ ...aForm, intensity: i })} className={cn('rounded-sm border px-3 py-1.5 text-xs', aForm.intensity === i ? 'border-forest bg-forest text-white' : 'border-line text-charcoal/70')}>{i}</button>)}</div>
                </div>
                <Button size="sm" onClick={submitActivity}>保存到本地记录</Button>
              </div>
              <div className="mt-5 max-h-56 overflow-y-auto border-t border-line pt-3">
                <p className="mb-2 text-xs font-semibold text-ink">已有记录（{activities.length}）</p>
                {sortedActivities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-2 border-b border-line/60 py-2 text-[0.76rem]">
                    <span className="num text-mist">{a.date}</span><span className="min-w-0 flex-1 truncate text-charcoal/80">{a.type} · {a.minutes} 分钟{a.steps ? ` · ${a.steps} 步` : ''}</span>
                    <button type="button" onClick={() => removeEntry('activity', a.id)} className="text-[0.7rem] text-[#B4652B] hover:underline">删除</button>
                  </div>
                ))}
              </div>
            </section>
            <div className="space-y-4">
              <PersonalChart chartId="weekly-cardio" dataset={activityDataset} title="每日活动时长" />
              <PersonalChart chartId="steps-trend" dataset={stepsDataset} title="每日步数" />
              <PersonalChart chartId="weight-vs-activity" dataset={weightActivityDataset} title="体重与运动量关系" description="两条曲线同时变化不代表因果关系" />
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="border border-line bg-white p-5">
              <h2 className="font-display text-lg text-ink">导出数据</h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/70">导出一个 JSON 文件，包含体重、饮食、运动记录与资源收藏。文件只下载到你的设备，不经过任何服务器。</p>
              <Button size="sm" className="mt-4" onClick={() => { downloadJson(`leanwise-backup-${todayISO()}.json`, buildExport()); setMessage('已生成导出文件。'); }}><Download size={14} />导出 JSON</Button>
            </section>
            <section className="border border-line bg-white p-5">
              <h2 className="font-display text-lg text-ink">导入数据</h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/70">选择此前导出的 JSON 文件，或直接粘贴内容。导入会覆盖当前本机的三类记录，请先导出备份。</p>
              <input type="file" accept="application/json,.json" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                setImportText(text);
                setMessage(importBundle(text).message);
              }} className="mt-3 block w-full text-xs text-charcoal/70 file:mr-3 file:rounded-sm file:border file:border-line file:bg-mint file:px-3 file:py-2 file:text-xs file:text-ink" />
              <textarea value={importText} onChange={(e) => setImportText(e.target.value)} rows={3} placeholder="或在此粘贴 JSON 内容" className="focus-ring mt-3 w-full rounded-sm border border-line px-3 py-2 font-mono text-xs" />
              <Button size="sm" variant="outline" className="mt-3" onClick={() => setMessage(importBundle(importText).message)}><Upload size={14} />导入</Button>
            </section>
            <section className="border border-orange/50 bg-orange-soft/30 p-5 lg:col-span-2">
              <h2 className="font-display text-lg text-ink">删除全部本地数据</h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/70">会清除本站保存在本机的体重、饮食、运动记录与资源收藏，操作不可撤销。建议先导出备份。</p>
              <Button size="sm" variant="orange" className="mt-4" onClick={() => {
                if (typeof window !== 'undefined' && window.confirm('确定删除本站保存在本机的全部记录吗？此操作不可撤销。')) { clearAll(); setMessage('已清除全部本地数据。'); }
              }}><Trash2 size={14} />删除全部数据</Button>
            </section>
            <div className="lg:col-span-2">
              <Callout tone="info" title="数据隐私承诺">本站不设置账号体系，不收集个人健康数据，不使用需要上传记录的分析服务。所有记录通过浏览器 localStorage 保存在当前设备；清除浏览器数据、更换设备或使用无痕模式都会导致记录不可见。需要跨设备保存时，请使用导出 / 导入功能。</Callout>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-line pt-5">
        <Badge tone="sun">三类数据说明</Badge>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-charcoal/65">真实数据（公开文献 / 指南，注明出处）、模拟数据（演示图表形态）、个人记录（本机录入）在本站所有图表中都有独立标签。相关性图表不代表因果关系。</p>
      </div>
    </div>
  );
}
