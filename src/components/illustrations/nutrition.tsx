import { Art, Arrow, C, Caption, FoodToken, Label, type ArtProps } from './primitives';

export function HealthyPlate({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '健康餐盘结构示意图'}>
      <Label x={120} y={24} size={11}>一份可长期执行的餐盘结构</Label>
      <circle cx="96" cy="94" r="58" fill={C.white} stroke={C.forest} strokeWidth="2" />
      <path d="M96 36 A58 58 0 0 1 96 152 Z" fill={C.mint} />
      <path d="M96 36 A58 58 0 0 0 38 94 Z" fill={C.sun} fillOpacity={0.65} />
      <path d="M38 94 A58 58 0 0 0 96 152 Z" fill={C.orange} fillOpacity={0.35} />
      <circle cx="96" cy="94" r="42" fill="none" stroke={C.white} strokeWidth="2" />
      <Label x={124} y={66} size={8.5}>蔬菜 ½</Label>
      <Label x={62} y={70} size={8.5}>全谷 ¼</Label>
      <Label x={62} y={124} size={8.5}>蛋白 ¼</Label>
      <g transform="translate(168 52)">
        <rect x="0" y="0" width="10" height="10" fill={C.mint} stroke={C.line} /><Label x={16} y={9} size={8} anchor="start">蔬菜与水果</Label>
        <rect x="0" y="20" width="10" height="10" fill={C.sun} stroke={C.line} /><Label x={16} y={29} size={8} anchor="start">全谷 / 薯类</Label>
        <rect x="0" y="40" width="10" height="10" fill={C.orange} fillOpacity={0.4} stroke={C.line} /><Label x={16} y={49} size={8} anchor="start">鱼禽蛋豆</Label>
        <rect x="0" y="60" width="10" height="10" fill={C.white} stroke={C.line} /><Label x={16} y={69} size={8} anchor="start">少量植物油</Label>
      </g>
      <Caption>参考《中国居民膳食指南（2022）》平衡膳食理念；比例为结构示意而非精确克数</Caption>
    </Art>
  );
}

export function ProteinFoods({ className, title }: ArtProps) {
  const items = [
    { x: 34, t: '鸡蛋', f: C.sun, d: <ellipse cx={34} cy={70} rx={8} ry={11} fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
    { x: 82, t: '鱼虾', f: C.mint, d: <path d="M74 70 Q82 62 90 70 Q82 78 74 70 Z M90 70 l6 -5 v10 Z" fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
    { x: 130, t: '豆制品', f: C.orange, d: <rect x={122} y={63} width={16} height={14} rx={2} fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
    { x: 178, t: '禽肉', f: C.pale, d: <path d="M170 76 q8 -16 16 0 q-8 6 -16 0" fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
    { x: 216, t: '奶类', f: C.sun, d: <path d="M210 62 h12 v16 h-12 Z" fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
  ];
  return (
    <Art className={className} label={title ?? '优质蛋白质食物图鉴'}>
      <Label x={120} y={28} size={11}>蛋白质食物图鉴</Label>
      {items.map((i) => (
        <g key={i.t}>
          <FoodToken x={i.x} y={70} r={21} fill={i.f} detail={i.d} />
          <Label x={i.x} y={104} size={9}>{i.t}</Label>
        </g>
      ))}
      <rect x="20" y="116" width="200" height="34" rx="2" fill={C.mint} />
      <Label x={120} y={132} size={8.5}>动物蛋白与植物蛋白可以搭配，不必二选一</Label>
      <Label x={120} y={144} size={7.5} fill={C.mist} weight={400}>每餐安排 1 份，比集中在一餐更容易达标</Label>
      <Caption>食物示意图，不含精确营养数值；具体数据请查食物成分表</Caption>
    </Art>
  );
}

export function CarbFoods({ className, title }: ArtProps) {
  const items = [
    { x: 40, t: '米饭 / 杂粮饭', f: C.pale, d: <path d="M30 76 q10 -12 20 0" fill={C.white} stroke={C.forest} strokeWidth="1.2" /> },
    { x: 96, t: '燕麦 / 全麦', f: C.sun, d: <path d="M90 72 v8 M96 69 v11 M102 72 v8" stroke={C.forest} strokeWidth="1.4" /> },
    { x: 152, t: '薯类', f: C.orange, d: <ellipse cx={152} cy={72} rx={9} ry={6} fill={C.white} fillOpacity={0.7} stroke={C.forest} strokeWidth="1.1" /> },
    { x: 208, t: '水果', f: C.mint, d: <circle cx={208} cy={70} r={7} fill={C.orange} fillOpacity={0.6} stroke={C.forest} strokeWidth="1.1" /> },
  ];
  return (
    <Art className={className} label={title ?? '碳水化合物食物图鉴'}>
      <Label x={120} y={28} size={11}>碳水食物图鉴：优先看加工程度</Label>
      {items.map((i) => (
        <g key={i.t}>
          <FoodToken x={i.x} y={70} r={22} fill={i.f} detail={i.d} />
          <Label x={i.x} y={106} size={8.5}>{i.t}</Label>
        </g>
      ))}
      <path d="M20 122 H220" stroke={C.line} />
      <rect x="20" y="130" width="94" height="24" rx="2" fill={C.mint} />
      <Label x={67} y={146} size={8.5}>全谷 · 薯类 · 豆类</Label>
      <rect x="126" y="130" width="94" height="24" rx="2" fill={C.orange} fillOpacity={0.15} stroke={C.orange} />
      <Label x={173} y={146} size={8.5} fill={C.charcoal}>含糖饮料 · 精制点心</Label>
      <Caption>结构示意；减脂不必戒断碳水，重点是食物质量与总量</Caption>
    </Art>
  );
}

export function HealthyFats({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '健康脂肪食物图鉴'}>
      <Label x={120} y={26} size={11}>脂肪：看类型，也看总量</Label>
      {[
        { x: 38, t: '坚果', f: C.sun, d: <path d="M32 72 q6 -10 12 0 q-6 10 -12 0" fill={C.white} stroke={C.forest} strokeWidth="1.1" /> },
        { x: 92, t: '深海鱼', f: C.mint, d: <path d="M82 72 q10 -8 20 0 q-10 8 -20 0" fill={C.white} stroke={C.forest} strokeWidth="1.1" /> },
        { x: 146, t: '橄榄油', f: C.pale, d: <path d="M142 64 h8 v16 h-8 Z" fill={C.sun} stroke={C.forest} strokeWidth="1.1" /> },
        { x: 200, t: '牛油果', f: C.mint, d: <ellipse cx={200} cy={72} rx={7} ry={10} fill={C.sun} stroke={C.forest} strokeWidth="1.1" /> },
      ].map((i) => (
        <g key={i.t}><FoodToken x={i.x} y={72} r={21} fill={i.f} detail={i.d} /><Label x={i.x} y={108} size={9}>{i.t}</Label></g>
      ))}
      <rect x="20" y="120" width="200" height="30" rx="2" fill={C.orange} fillOpacity={0.12} stroke={C.orange} strokeWidth="1" />
      <Label x={120} y={134} size={8.5}>不饱和脂肪为主 · 尽量减少反式脂肪 · 脂肪摄入也不宜过低</Label>
      <Label x={120} y={146} size={7.5} fill={C.mist} weight={400}>坚果能量密度高，适合用小份量而非「随手抓」</Label>
      <Caption>食物示意图，不是营养含量表；具体摄入需结合总能量安排</Caption>
    </Art>
  );
}

export function FiberSources({ className, title }: ArtProps) {
  const bars = [
    { x: 30, t: '蔬菜', h: 38, c: C.mint },
    { x: 78, t: '豆类', h: 62, c: C.green },
    { x: 126, t: '全谷', h: 52, c: C.sun },
    { x: 174, t: '水果', h: 30, c: C.orange },
  ];
  return (
    <Art className={className} label={title ?? '膳食纤维来源与饱腹感示意图'}>
      <Label x={120} y={26} size={11}>膳食纤维来源（相对示意）</Label>
      <path d="M20 132 H220" stroke={C.forest} strokeWidth="1.5" />
      {bars.map((b) => (
        <g key={b.t}>
          <rect x={b.x} y={132 - b.h} width={30} height={b.h} rx="1.5" fill={b.c} stroke={C.forest} strokeWidth="1" />
          <Label x={b.x + 15} y={146} size={9}>{b.t}</Label>
        </g>
      ))}
      <Arrow x1={20} y1={44} x2={20} y2={128} color={C.mist} width={1} />
      <Label x={26} y={50} size={7.5} anchor="start" fill={C.mist} weight={400}>纤维 / 饱腹感贡献示意</Label>
      <rect x="20" y="152" width="200" height="14" rx="2" fill={C.pale} />
      <Label x={120} y={162} size={8}>柱状高度为概念示意，不代表具体克数或研究结果</Label>
    </Art>
  );
}

export function PortionGuide({ className, title }: ArtProps) {
  const hands = [
    { x: 36, t: '掌心', s: '蛋白质 1 份', c: C.orange },
    { x: 92, t: '拳头', s: '主食 1 份', c: C.sun },
    { x: 148, t: '拇指', s: '油脂 1 份', c: C.mint },
    { x: 204, t: '双手捧', s: '蔬菜 1 份', c: C.pale },
  ];
  return (
    <Art className={className} label={title ?? '食物份量视觉指南（手掌法）'}>
      <Label x={120} y={26} size={11}>没有厨房秤时：用手掌法粗估</Label>
      {hands.map((h) => (
        <g key={h.t}>
          <rect x={h.x - 22} y={50} width={44} height={54} rx="6" fill={h.c} stroke={C.forest} strokeWidth="1.4" />
          <path d={`M${h.x - 14} 104 v-16 M${h.x - 5} 104 v-22 M${h.x + 4} 104 v-20 M${h.x + 13} 104 v-13`} stroke={C.forest} strokeWidth="1.2" />
          <Label x={h.x} y={122} size={9}>{h.t}</Label>
          <Label x={h.x} y={136} size={7.5} fill={C.mist} weight={400}>{h.s}</Label>
        </g>
      ))}
      <rect x="20" y="144" width="200" height="20" rx="2" fill={C.mint} />
      <Label x={120} y={157} size={8}>手掌法是估算工具，误差较大；需要精确时请称重并查成分表</Label>
      <Caption>视觉份量示意，不用于医学营养处方</Caption>
    </Art>
  );
}

export function FoodLabel({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '食品标签解读示意图'}>
      <Label x={120} y={22} size={11}>读懂食品标签的四个位置</Label>
      <rect x="24" y="34" width="112" height="118" rx="2" fill={C.white} stroke={C.forest} strokeWidth="1.6" />
      <rect x="24" y="34" width="112" height="18" fill={C.forest} />
      <Label x={80} y={47} size={9} fill={C.white}>营养成分表（示意）</Label>
      {[
        ['项目', '每 100 g'], ['能量', 'xxx kJ'], ['蛋白质', 'x.x g'],
        ['脂肪', 'x.x g'], ['碳水化合物', 'x.x g'], ['钠', 'xxx mg'],
      ].map((r, i) => (
        <g key={r[0]}>
          <Label x={32} y={66 + i * 14} size={8} anchor="start" fill={i === 0 ? C.mist : C.charcoal} weight={400}>{r[0]}</Label>
          <Label x={128} y={66 + i * 14} size={8} anchor="end" fill={i === 0 ? C.mist : C.charcoal} weight={400}>{r[1]}</Label>
          <path d={`M28 ${70 + i * 14} H132`} stroke={C.line} strokeWidth="0.7" />
        </g>
      ))}
      <rect x="150" y="40" width="76" height="24" rx="2" fill={C.sun} stroke={C.orange} />
      <Label x={188} y={55} size={8}>① 看「每份 / 每 100g」</Label>
      <Arrow x1={150} y1={52} x2={138} y2={52} color={C.orange} width={1.2} />
      <rect x="150" y="72" width="76" height="24" rx="2" fill={C.mint} stroke={C.forest} />
      <Label x={188} y={87} size={8}>② 看能量单位 kJ/kcal</Label>
      <Arrow x1={150} y1={84} x2={138} y2={80} color={C.forest} width={1.2} />
      <rect x="150" y="104" width="76" height="24" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={188} y={119} size={8}>③ 看蛋白质与脂肪</Label>
      <Arrow x1={150} y1={116} x2={138} y2={108} color={C.mist} width={1.2} />
      <rect x="150" y="136" width="76" height="24" rx="2" fill={C.orange} fillOpacity={0.14} stroke={C.orange} />
      <Label x={188} y={151} size={8}>④ 看配料表顺序</Label>
      <Caption>标签为结构示意，数值以实际产品包装与国家标准为准</Caption>
    </Art>
  );
}
