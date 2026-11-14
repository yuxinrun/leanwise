import { Art, Arrow, C, Caption, Label, type ArtProps } from './primitives';

function Stage({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <Art className="w-full" label={title}>
      <Label x={120} y={22} size={10}>{title}</Label>
      <path d="M16 144 H224" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      {children}
    </Art>
  );
}

function Figure({ head, paths }: { head: [number, number]; paths: string[] }) {
  return (
    <g>
      <circle cx={head[0]} cy={head[1]} r="9" fill={C.mint} stroke={C.forest} strokeWidth="1.8" />
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.forest} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </g>
  );
}

export function Walking({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '快走动作示意'}>
      <Figure head={[108, 48]} paths={['M108 59 L106 96', 'M106 70 L88 86 L92 100', 'M106 70 L126 84 L122 98', 'M106 96 L88 116 L84 142', 'M106 96 L128 112 L134 142']} />
      <path d="M40 60 Q70 44 96 56" fill="none" stroke={C.orange} strokeWidth="1.6" strokeDasharray="4 4" />
      <Arrow x1={40} y1={62} x2={92} y2={58} color={C.orange} width={1.4} dashed />
      <rect x="150" y="52" width="70" height="46" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={185} y={68} size={8}>强度参考</Label>
      <Label x={185} y={82} size={7.5} fill={C.mist} weight={400}>能说话，不能唱歌</Label>
      <Label x={185} y={94} size={7.5} fill={C.mist} weight={400}>步频略高于日常</Label>
      <Caption>动作线条示意；有关节不适时请缩短步幅并咨询专业人士</Caption>
    </Stage></div>
  );
}

export function Running({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '慢跑动作示意'}>
      <Figure head={[116, 44]} paths={['M116 55 L104 94', 'M112 66 L92 74 L84 64', 'M110 68 L132 78 L138 68', 'M104 94 L82 104 L74 124', 'M104 94 L128 108 L132 138']} />
      <Arrow x1={56} y1={54} x2={92} y2={48} color={C.orange} width={1.5} dashed />
      <rect x="152" y="50" width="70" height="50" rx="2" fill={C.mint} stroke={C.forest} strokeWidth="1" />
      <Label x={187} y={66} size={8}>循序渐进</Label>
      <Label x={187} y={80} size={7.5} fill={C.mist} weight={400}>走跑交替起步</Label>
      <Label x={187} y={93} size={7.5} fill={C.mist} weight={400}>每周增量宜保守</Label>
      <Caption>动作线条示意；跑量增加过快是常见损伤原因</Caption>
    </Stage></div>
  );
}

export function Cycling({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '骑行动作示意'}>
      <circle cx="62" cy="118" r="22" fill="none" stroke={C.forest} strokeWidth="2" />
      <circle cx="168" cy="118" r="22" fill="none" stroke={C.forest} strokeWidth="2" />
      <path d="M62 118 L104 118 L128 88 L168 118 M104 118 L92 88 L128 88 M92 88 L84 88 M128 88 L142 88" fill="none" stroke={C.charcoal} strokeWidth="2.4" strokeLinejoin="round" />
      <Figure head={[116, 44]} paths={['M116 55 L104 84', 'M110 62 L128 76 L142 86', 'M104 84 L122 100 L118 118', 'M104 84 L92 100 L104 118']} />
      <rect x="176" y="40" width="46" height="30" rx="2" fill={C.sun} stroke={C.orange} />
      <Label x={199} y={59} size={7.5}>低冲击</Label>
      <Caption>动作与器械结构示意；骑行强度应结合心率或主观用力感控制</Caption>
    </Stage></div>
  );
}

export function Squat({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '深蹲动作示意'}>
      <Figure head={[104, 46]} paths={['M104 58 L112 92', 'M108 66 L82 76', 'M108 66 L134 76', 'M112 92 L82 104 L86 140', 'M112 92 L140 104 L136 140']} />
      <Arrow x1={168} y1={58} x2={168} y2={92} color={C.orange} width={1.6} dashed />
      <Label x={186} y={70} size={8} anchor="start">髋膝协同</Label>
      <Label x={186} y={84} size={7.5} anchor="start" fill={C.mist} weight={400}>背部保持中立</Label>
      <rect x="164" y="100" width="58" height="30" rx="2" fill={C.mint} stroke={C.forest} strokeWidth="1" />
      <Label x={193} y={119} size={7.5}>先练动作模式</Label>
      <Caption>动作线条示意；疼痛、代偿或基础疾病请先做专业评估</Caption>
    </Stage></div>
  );
}

export function PushUp({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '俯卧撑动作示意'}>
      <Figure head={[60, 92]} paths={['M70 96 L152 110', 'M82 100 L78 138', 'M82 100 L100 128', 'M152 110 L176 122 L176 142', 'M152 110 L166 140']} />
      <path d="M40 142 H200" stroke={C.orange} strokeWidth="1.2" strokeDasharray="4 4" />
      <Arrow x1={120} y1={62} x2={120} y2={92} color={C.orange} width={1.5} dashed />
      <rect x="140" y="52" width="78" height="34" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={179} y={67} size={8}>可用跪姿 / 上斜</Label>
      <Label x={179} y={80} size={7.5} fill={C.mist} weight={400}>按能力选择难度</Label>
      <Caption>动作线条示意；以可控制的幅度优先，不追求次数</Caption>
    </Stage></div>
  );
}

export function DumbbellArt({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '哑铃训练动作示意'}>
      <Figure head={[116, 44]} paths={['M116 56 L116 96', 'M116 66 L94 82 L94 66', 'M116 66 L138 82 L138 66', 'M116 96 L104 122 L102 142', 'M116 96 L130 122 L132 142']} />
      <g stroke={C.ink} strokeWidth="3" fill={C.sun}>
        <path d="M84 60 H104" /><rect x="80" y="52" width="7" height="16" rx="1.5" /><rect x="101" y="52" width="7" height="16" rx="1.5" />
        <path d="M128 60 H148" /><rect x="124" y="52" width="7" height="16" rx="1.5" /><rect x="145" y="52" width="7" height="16" rx="1.5" />
      </g>
      <rect x="158" y="76" width="64" height="42" rx="2" fill={C.mint} stroke={C.forest} strokeWidth="1" />
      <Label x={190} y={92} size={8}>渐进超负荷</Label>
      <Label x={190} y={106} size={7.5} fill={C.mist} weight={400}>重量 / 次数 / 组数</Label>
      <Label x={190} y={116} size={7.5} fill={C.mist} weight={400}>每次只加一点</Label>
      <Caption>动作线条示意；训练强度用 RPE / RIR 结合动作质量判断</Caption>
    </Stage></div>
  );
}

export function Stretching({ className, title }: ArtProps) {
  return (
    <div className={className}><Stage title={title ?? '拉伸与放松动作示意'}>
      <Figure head={[108, 50]} paths={['M108 60 L110 96', 'M110 68 L84 60 L72 44', 'M110 68 L136 76', 'M110 96 L88 118 L82 142', 'M110 96 L136 116 L142 142']} />
      <path d="M44 62 Q60 44 76 44" fill="none" stroke={C.orange} strokeWidth="1.6" strokeDasharray="4 4" />
      <rect x="150" y="54" width="72" height="46" rx="2" fill={C.pale} stroke={C.line} />
      <Label x={186} y={70} size={8}>温和、无痛范围</Label>
      <Label x={186} y={84} size={7.5} fill={C.mist} weight={400}>配合呼吸，不硬拉</Label>
      <Label x={186} y={96} size={7.5} fill={C.mist} weight={400}>训练后与休息日均可</Label>
      <Caption>动作线条示意；急性损伤或疼痛时避免自行强行拉伸</Caption>
    </Stage></div>
  );
}

export function CalculatorArt({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '实用计算工具示意图'}>
      <rect x="66" y="24" width="108" height="130" rx="4" fill={C.white} stroke={C.forest} strokeWidth="2" />
      <rect x="76" y="34" width="88" height="26" rx="2" fill={C.mint} />
      <Label x={162} y={51} size={11} anchor="end">1,850 kcal</Label>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <rect key={`${r}-${c}`} x={78 + c * 30} y={68 + r * 24} width="24" height="18" rx="2" fill={r === 2 && c === 2 ? C.orange : C.pale} stroke={C.line} />
      )))}
      <circle cx="42" cy="58" r="16" fill={C.sun} stroke={C.orange} strokeWidth="1.4" />
      <Label x={42} y={62} size={12}>+</Label>
      <circle cx="198" cy="106" r="16" fill={C.mint} stroke={C.forest} strokeWidth="1.4" />
      <Label x={198} y={110} size={12}>=</Label>
      <Caption>估算结果只是起点，需要结合趋势与身体反馈校准</Caption>
    </Art>
  );
}

export function WeightScale({ className, title }: ArtProps) {
  return (
    <Art className={className} label={title ?? '体重趋势记录示意图'}>
      <Label x={120} y={26} size={11}>记录趋势，而不是审判单日读数</Label>
      <rect x="52" y="42" width="136" height="92" rx="8" fill={C.white} stroke={C.forest} strokeWidth="2" />
      <circle cx="120" cy="88" r="30" fill={C.pale} stroke={C.line} />
      <path d="M120 88 L138 72" stroke={C.orange} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="120" cy="88" r="3" fill={C.forest} />
      <path d="M20 62 H40 M200 62 H220 M20 104 H40 M200 104 H220" stroke={C.line} strokeWidth="1.2" />
      <Caption>示意插画；体重、腰围、体脂率都是带误差的指标</Caption>
    </Art>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="LEANWISE 标志" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="38" height="38" rx="4" fill={C.forest} />
      <path d="M11 27 C11 17 18 11 29 10 C29 21 23 29 11 29 Z" fill={C.mint} />
      <path d="M12 29 C17 23 22 19 28 15" fill="none" stroke={C.forest} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="29" cy="29" r="3" fill={C.sun} />
    </svg>
  );
}
