import { Art, Arrow, BodySilhouette, C, Caption, Label, type ArtProps } from './primitives';

export function EnergyBalance({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '能量摄入与消耗示意图'}>
      <rect x="16" y="34" width="82" height="104" rx="2" fill={C.mint} stroke={C.line} />
      <Label x={57} y={54} size={11}>能量摄入</Label>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${32 + i * 20} ${74 + (i % 2) * 6})`}>
          <circle r="9" fill={C.white} stroke={C.forest} strokeWidth="1.4" />
          <path d="M-5 -2 Q0 -7 5 -2 M-5 2 Q0 6 5 2" fill="none" stroke={C.green} strokeWidth="1.2" />
        </g>
      ))}
      <Label x={57} y={116} size={9} fill={C.forest}>食物与饮品</Label>
      <Label x={57} y={130} size={8} fill={C.mist}>可记录、可估算</Label>
      <Arrow x1={106} y1={86} x2={136} y2={86} color={C.orange} />
      <Label x={120} y={76} size={8} fill={C.orange}>平衡</Label>
      <rect x="142" y="34" width="82" height="104" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={183} y={54} size={11}>能量消耗</Label>
      <rect x="156" y="66" width="54" height="14" rx="1" fill={C.forest} />
      <rect x="156" y="86" width="38" height="14" rx="1" fill={C.green} />
      <rect x="156" y="106" width="24" height="14" rx="1" fill={C.sun} stroke={C.orange} strokeWidth="1" />
      <Label x={183} y={133} size={8} fill={C.mist}>BMR · TEF · NEAT · 运动</Label>
      <path d="M20 150 H220" stroke={C.line} strokeWidth="1" />
      <Caption>长期缺口才可能带来脂肪减少；两端都会随身体适应而变化</Caption>
    </Art>
  );
}

export function MetabolismFlow({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '人体代谢能量流向图'}>
      <BodySilhouette x={116} y={88} scale={0.72} />
      <circle cx="116" cy="88" r="52" fill="none" stroke={C.line} strokeWidth="1.2" strokeDasharray="3 5" />
      <rect x="8" y="24" width="64" height="30" rx="2" fill={C.sun} stroke={C.orange} />
      <Label x={40} y={43} size={10}>食物能量</Label>
      <Arrow x1={72} y1={42} x2={96} y2={60} />
      <rect x="8" y="124" width="70" height="32" rx="2" fill={C.mint} stroke={C.forest} />
      <Label x={43} y={138} size={9}>基础代谢 BMR</Label>
      <Label x={43} y={150} size={8} fill={C.mist}>维持生命活动</Label>
      <Arrow x1={78} y1={124} x2={98} y2={108} />
      <rect x="164" y="24" width="68" height="30" rx="2" fill={C.mint} stroke={C.forest} />
      <Label x={198} y={43} size={10}>NEAT / 运动</Label>
      <Arrow x1={164} y1={46} x2={140} y2={60} />
      <rect x="164" y="78" width="68" height="30" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={198} y={97} size={10}>食物热效应</Label>
      <Arrow x1={164} y1={92} x2={142} y2={88} />
      <rect x="164" y="124" width="68" height="32" rx="2" fill={C.orange} fillOpacity={0.16} stroke={C.orange} />
      <Label x={198} y={138} size={9}>储存 / 动员</Label>
      <Label x={198} y={150} size={8} fill={C.mist}>脂肪组织</Label>
      <Arrow x1={164} y1={132} x2={140} y2={112} />
      <Caption>TDEE = BMR + TEF + NEAT + 运动消耗（示意，非按比例）</Caption>
    </Art>
  );
}

export function TdeeComposition({ className, title }: ArtProps) {
  const parts = [
    { label: '基础代谢 BMR', pct: '约 60–70%', w: 96, color: C.forest },
    { label: '日常活动 NEAT', pct: '约 15–30%', w: 48, color: C.green },
    { label: '食物热效应 TEF', pct: '约 10%', w: 26, color: C.sun },
    { label: '计划运动', pct: '变动最大', w: 20, color: C.orange },
  ];
  return (
    <Art className={className} label={title ?? 'TDEE 组成结构图'}>
      <Label x={120} y={26} size={11}>每日总能量消耗 TDEE</Label>
      <g transform="translate(20 40)">
        {parts.map((p, i) => {
          const x = parts.slice(0, i).reduce((s, q) => s + q.w + 3, 0);
          return <rect key={p.label} x={x} y={0} width={p.w} height={30} rx="1.5" fill={p.color} />;
        })}
      </g>
      {parts.map((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 24 + col * 100;
        const y = 88 + row * 30;
        return (
          <g key={`legend-${p.label}`}>
            <rect x={x} y={y - 8} width={9} height={9} rx="1" fill={p.color} />
            <Label x={x + 15} y={y} size={8.5} anchor="start" fill={C.charcoal}>{p.label}</Label>
            <Label x={x + 15} y={y + 11} size={7.5} anchor="start" fill={C.mist} weight={400}>{p.pct}</Label>
          </g>
        );
      })}
      <path d="M20 146 H220" stroke={C.line} />
      <Label x={20} y={158} size={8} anchor="start" fill={C.charcoal}>比例为一般健康成人的粗略范围，个体差异明显</Label>
      <Caption>参考 Hall 等（2012）能量平衡综述；比例条为示意，非实测数值</Caption>
    </Art>
  );
}

export function FatDistribution({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '人体脂肪分布示意图'}>
      <BodySilhouette x={120} y={88} scale={0.85} />
      <g fill={C.orange} fillOpacity={0.42} stroke={C.orange} strokeWidth="1.2">
        <ellipse cx="120" cy="84" rx="13" ry="12" />
        <ellipse cx="104" cy="72" rx="6" ry="15" />
        <ellipse cx="136" cy="72" rx="6" ry="15" />
        <ellipse cx="120" cy="104" rx="18" ry="7" />
      </g>
      <Label x={20} y={44} size={9} anchor="start">皮下脂肪</Label>
      <Arrow x1={52} y1={48} x2={98} y2={68} color={C.orange} dashed />
      <Label x={220} y={66} size={9} anchor="end">内脏脂肪</Label>
      <Arrow x1={178} y1={70} x2={134} y2={82} color={C.forest} dashed />
      <rect x="18" y="142" width="204" height="20" rx="2" fill={C.mint} />
      <Label x={120} y={155} size={8.5}>分布模式存在明显个体差异，与性别、年龄、遗传相关</Label>
      <Caption>示意图，不代表体型评价，也不用于医学诊断</Caption>
    </Art>
  );
}

export function VisceralSubcutaneous({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '皮下脂肪与内脏脂肪对比图'}>
      <rect x="14" y="20" width="102" height="126" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={65} y={38} size={10}>皮下脂肪</Label>
      <path d="M28 52 H102" stroke={C.forest} strokeWidth="2" />
      <path d="M28 58 H102" stroke={C.forest} strokeWidth="1" strokeDasharray="3 3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={36 + i * 16} cy={72} r={7} fill={C.sun} stroke={C.orange} strokeWidth="1.2" />
      ))}
      <Label x={65} y={100} size={8.5} fill={C.charcoal}>位于皮肤与肌肉之间</Label>
      <Label x={65} y={116} size={8} fill={C.mist}>可用皮褶厚度粗略估计</Label>
      <Label x={65} y={132} size={8} fill={C.mist}>全身分布差异大</Label>
      <rect x="124" y="20" width="102" height="126" rx="2" fill={C.mint} stroke={C.line} />
      <Label x={175} y={38} size={10}>内脏脂肪</Label>
      <path d="M138 52 H212" stroke={C.forest} strokeWidth="2" />
      <path d="M138 58 H212" stroke={C.forest} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="150" y="64" width="50" height="26" rx="4" fill={C.white} stroke={C.forest} strokeWidth="1.2" />
      {[0, 1, 2].map((i) => <circle key={i} cx={158 + i * 16} cy={77} r={6} fill={C.orange} fillOpacity={0.6} />)}
      <Label x={175} y={104} size={8.5} fill={C.charcoal}>围绕腹腔器官</Label>
      <Label x={175} y={120} size={8} fill={C.mist}>与代谢风险关联更紧密</Label>
      <Label x={175} y={136} size={8} fill={C.mist}>腰围可粗略反映其变化</Label>
      <Caption>示意对比；单次腰围或体脂测量均不能单独判断健康</Caption>
    </Art>
  );
}

export function FatBreakdown({ className, title }: ArtProps) {
  const steps = [
    { x: 24, label: '脂肪细胞', sub: '甘油三酯' },
    { x: 86, label: '脂肪动员', sub: '分解为脂肪酸' },
    { x: 148, label: '血液运输', sub: '送往需能组织' },
    { x: 210, label: '氧化利用', sub: 'CO₂ + 水 + 能量' },
  ];
  return (
    <Art className={className} label={title ?? '脂肪分解过程示意图'}>
      <Label x={120} y={26} size={11}>脂肪减少的基本过程</Label>
      {steps.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x + 4} cy={76} r={22} fill={i === 3 ? C.mint : C.pale} stroke={C.forest} strokeWidth="1.6" />
          {i === 0 && <circle cx={s.x + 4} cy={76} r={13} fill={C.sun} stroke={C.orange} strokeWidth="1.2" />}
          {i === 1 && <><circle cx={s.x - 1} cy={76} r={5} fill={C.sun} /><circle cx={s.x + 10} cy={70} r={4} fill={C.sun} /><circle cx={s.x + 9} cy={84} r={3.5} fill={C.sun} /></>}
          {i === 2 && <path d={`M${s.x - 8} 76 H${s.x + 16}`} stroke={C.forest} strokeWidth="2" strokeDasharray="3 3" />}
          {i === 3 && <path d={`M${s.x - 6} 82 Q${s.x + 4} 64 ${s.x + 14} 78`} stroke={C.orange} strokeWidth="2" fill="none" />}
          <Label x={s.x + 4} y={112} size={9}>{s.label}</Label>
          <Label x={s.x + 4} y={126} size={7.5} fill={C.mist} weight={400}>{s.sub}</Label>
          {i < 3 && <Arrow x1={s.x + 28} y1={76} x2={s.x + 50} y2={76} color={C.forest} width={1.5} />}
        </g>
      ))}
      <rect x="20" y="140" width="200" height="22" rx="2" fill={C.orange} fillOpacity={0.13} />
      <Label x={120} y={155} size={8.5} fill={C.charcoal}>部位选择由全身生理调控，局部训练不能指定减脂位置</Label>
      <Caption>机制示意，不代表可通过某个动作定向减少某处脂肪</Caption>
    </Art>
  );
}

export function MuscleFat({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '肌肉与脂肪组织示意图'}>
      <Label x={120} y={26} size={11}>同样重量，不同体积与功能</Label>
      <g transform="translate(0 6)">
        <circle cx="66" cy="86" r="38" fill={C.forest} stroke={C.ink} strokeWidth="1.6" />
        <path d="M44 74 Q66 62 88 74 M44 86 Q66 74 88 86 M44 98 Q66 86 88 98" stroke={C.mint} strokeWidth="2" fill="none" opacity={0.8} />
        <circle cx="174" cy="86" r="38" fill={C.sun} stroke={C.orange} strokeWidth="1.6" />
        <circle cx="162" cy="76" r="9" fill={C.white} fillOpacity={0.55} />
        <circle cx="184" cy="96" r="11" fill={C.white} fillOpacity={0.45} />
      </g>
      <Label x={66} y={138} size={10}>肌肉组织</Label>
      <Label x={66} y={151} size={8} fill={C.mist} weight={400}>密度较高 · 受训练刺激</Label>
      <Label x={174} y={138} size={10}>脂肪组织</Label>
      <Label x={174} y={151} size={8} fill={C.mist} weight={400}>密度较低 · 内分泌器官</Label>
      <Caption>示意对比；体重数字无法区分两者变化，需结合腰围、力量与趋势</Caption>
    </Art>
  );
}

export function WeightFluctuation({ className, title }: ArtProps) {
  const points = '20,112 34,104 48,118 62,96 76,108 90,88 104,102 118,80 132,94 146,72 160,84 174,62 188,76 202,54 220,62';
  return (
    <Art className={className} label={title ?? '体重波动与长期趋势示意图'}>
      <Label x={120} y={24} size={11}>单日波动 vs 长期趋势</Label>
      <path d="M20 46 H220 M20 86 H220 M20 126 H220" stroke={C.line} strokeWidth="1" strokeDasharray="3 4" />
      <polyline points={points} fill="none" stroke={C.mist} strokeWidth="1.6" strokeLinejoin="round" />
      {points.split(' ').map((p, i) => {
        const [x, y] = p.split(',');
        return <circle key={i} cx={x} cy={y} r={2.2} fill={C.mist} />;
      })}
      <path d="M20 124 L220 48" stroke={C.forest} strokeWidth="2.6" strokeLinecap="round" />
      <Label x={40} y={140} size={8} fill={C.mist} weight={400}>灰线：每日体重（水分、糖原、钠、肠胃内容物）</Label>
      <Label x={176} y={40} size={8} fill={C.forest}>绿线：趋势方向</Label>
      <Label x={120} y={158} size={8.5} fill={C.charcoal}>用 7 日均值与 30 日趋势判断变化，不要用单日读数下结论</Label>
      <Caption>模拟数据示意图，用于解释波动概念，不代表任何研究结果</Caption>
    </Art>
  );
}

export function Plateau({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '减脂平台期示意图'}>
      <Label x={120} y={24} size={11}>平台期：趋势变平，不等于努力失效</Label>
      <path d="M20 44 H220 M20 84 H220 M20 124 H220" stroke={C.line} strokeDasharray="3 4" />
      <path d="M20 50 C50 52 60 66 86 78 C104 87 118 90 138 91 L198 92" fill="none" stroke={C.forest} strokeWidth="2.6" />
      <rect x="132" y="46" width="66" height="72" fill={C.orange} fillOpacity={0.09} stroke={C.orange} strokeDasharray="3 3" />
      <Label x={165} y={60} size={8.5} fill={C.orange}>趋势走平区</Label>
      <Arrow x1={118} y1={34} x2={118} y2={82} color={C.mist} dashed />
      <Label x={104} y={34} size={8} anchor="end" fill={C.mist}>初期下降</Label>
      <rect x="20" y="136" width="200" height="26" rx="2" fill={C.mint} />
      <Label x={120} y={148} size={8.5}>排查顺序：记录完整性 → 活动量 → 睡眠压力 → 重新估算需求</Label>
      <Label x={120} y={158} size={7.5} fill={C.mist} weight={400}>确认 ≥ 3–4 周趋势确实走平后，再考虑小幅调整</Label>
      <Caption>示意图；平台期判断必须基于趋势与记录，而非几天体重不变</Caption>
    </Art>
  );
}

export function HungerSatiety({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '饥饿与饱腹感机制示意图'}>
      <Label x={120} y={24} size={11}>影响饥饿感与饱腹感的多条通路</Label>
      <circle cx="120" cy="88" r="30" fill={C.mint} stroke={C.forest} strokeWidth="1.8" />
      <Label x={120} y={85} size={10}>进食调节</Label>
      <Label x={120} y={99} size={8} fill={C.mist} weight={400}>生理 + 环境 + 行为</Label>
      {[
        { x: 40, y: 46, t: '胃排空 / 体积' },
        { x: 200, y: 46, t: '蛋白质 / 纤维' },
        { x: 40, y: 130, t: '睡眠 / 压力' },
        { x: 200, y: 130, t: '进食速度 / 线索' },
      ].map((s) => (
        <g key={s.t}>
          <rect x={s.x - 40} y={s.y - 12} width="80" height="24" rx="2" fill={C.pale} stroke={C.line} />
          <Label x={s.x} y={s.y + 3} size={8.5}>{s.t}</Label>
          <Arrow x1={s.x + (s.x < 120 ? 40 : -40)} y1={s.y} x2={s.x < 120 ? 96 : 144} y2={s.y < 90 ? 74 : 104} color={C.green} width={1.3} />
        </g>
      ))}
      <Caption>机制示意；饥饿感受多因素影响，不是意志力测试</Caption>
    </Art>
  );
}

export function SleepFat({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '睡眠与体重管理关系示意图'}>
      <Label x={120} y={24} size={11}>睡眠不足影响体重管理的可能路径</Label>
      {[
        { x: 28, y: 52, w: 66, t: '睡眠时长不足', c: C.pale },
        { x: 108, y: 52, w: 66, t: '饥饿感 ↑ / 机会 ↑', c: C.sun },
        { x: 178, y: 52, w: 48, t: '摄入变化', c: C.orange, fillOpacity: 0.25 },
      ].map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width={b.w} height="34" rx="2" fill={b.c} stroke={C.line} />
          <Label x={b.x + b.w / 2} y={b.y + 21} size={8}>{b.t}</Label>
          {i < 2 && <Arrow x1={b.x + b.w + 2} y1={69} x2={b.x + b.w + 12} y2={69} width={1.4} />}
        </g>
      ))}
      <path d="M202 86 V104 H120" fill="none" stroke={C.forest} strokeWidth="1.5" strokeDasharray="3 3" />
      <Arrow x1={120} y1={104} x2={120} y2={116} color={C.forest} width={1.5} />
      <rect x="34" y="118" width="172" height="32" rx="2" fill={C.mint} stroke={C.forest} strokeWidth="1.2" />
      <Label x={120} y={133} size={9}>体重管理执行难度上升</Label>
      <Label x={120} y={145} size={7.5} fill={C.mist} weight={400}>同时还受活动量、疲劳与选择环境影响</Label>
      <Caption>关联路径示意；观察性研究不能证明因果，效应大小因人而异</Caption>
    </Art>
  );
}

export function HabitLoop({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '长期行为习惯形成示意图'}>
      <Label x={120} y={24} size={11}>习惯比单次完美更能预测长期结果</Label>
      <g transform="translate(120 86)">
        <circle r="56" fill="none" stroke={C.line} strokeWidth="1.2" strokeDasharray="3 5" />
        {[
          { a: -90, t: '线索', c: C.sun },
          { a: 30, t: '行为', c: C.mint },
          { a: 150, t: '复盘', c: C.orange },
        ].map((s) => {
          const rad = (s.a * Math.PI) / 180;
          const x = Math.cos(rad) * 56;
          const y = Math.sin(rad) * 56;
          return (
            <g key={s.t}>
              <circle cx={x} cy={y} r="19" fill={s.c} stroke={C.forest} strokeWidth="1.5" />
              <Label x={x} y={y + 3} size={9}>{s.t}</Label>
            </g>
          );
        })}
        <path d="M0 -34 A34 34 0 0 1 29 17" fill="none" stroke={C.forest} strokeWidth="1.6" />
        <path d="M29 17 l-8 -3 l3 8" fill={C.forest} />
        <path d="M-29 17 A34 34 0 0 1 0 -34" fill="none" stroke={C.forest} strokeWidth="1.6" strokeDasharray="3 4" />
      </g>
      <rect x="30" y="146" width="180" height="20" rx="2" fill={C.mint} />
      <Label x={120} y={159} size={8.5}>稳定环境 → 重复行为 → 更低的执行成本</Label>
      <Caption>行为模型示意，非临床干预方案</Caption>
    </Art>
  );
}
