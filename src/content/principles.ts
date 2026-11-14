import type { EvidenceLevel } from '@/types';

export interface Principle {
  id: string;
  index: string;
  title: string;
  statement: string;
  explanation: string;
  articleSlug: string;
  evidence: EvidenceLevel;
  referenceIds: string[];
  art: string;
}

export const EVIDENCE_LABELS: Record<EvidenceLevel, { label: string; desc: string; className: string }> = {
  strong: { label: '证据较充分', desc: '有多项系统综述、Meta 分析或一致的高质量随机对照试验支持。', className: 'bg-forest/12 text-forest border-forest/25' },
  moderate: { label: '有一定证据', desc: '有随机对照试验或高质量队列研究支持，但结论受人群与条件限制。', className: 'bg-mint text-ink border-forest/20' },
  limited: { label: '证据有限', desc: '仅有小样本研究、机制推论或不一致的结果，不宜过度推广。', className: 'bg-sun/25 text-[#7A5A17] border-sun/70' },
  insufficient: { label: '尚无充分证据', desc: '缺乏可靠人体研究，或现有证据不足以支持明确结论。', className: 'bg-orange-soft text-[#9A5B22] border-orange/40' },
};

export const PRINCIPLES: Principle[] = [
  {
    id: 'p1', index: '01', title: '长期能量平衡', statement: '减脂的关键是长期能量平衡。',
    explanation: '脂肪组织储存的能量要被动员并氧化，需要一段时期内的能量缺口；但「摄入 − 消耗」两端都会随体重、活动与生理适应而变化，因此静态的 3500 kcal 换算并不可靠。',
    articleSlug: 'energy-balance', evidence: 'strong', referenceIds: ['hall2012', 'hall2011', 'hall2017'], art: 'EnergyBalance',
  },
  {
    id: 'p2', index: '02', title: '体重 ≠ 脂肪', statement: '体重下降不等于全部都是脂肪下降。',
    explanation: '水分、糖原、胃肠道内容物与瘦体重都会影响体重。快速下降常包含大量水分变化，力量训练与足量蛋白质有助于在减脂期间保留瘦体重。',
    articleSlug: 'weight-fluctuation', evidence: 'strong', referenceIds: ['hall2012', 'morton2018', 'leibel1995'], art: 'MuscleFat',
  },
  {
    id: 'p3', index: '03', title: '蛋白质与力量训练', statement: '足够的蛋白质和力量训练有助于保留瘦体重。',
    explanation: '减脂期同时施加「能量缺口」与「机械张力」信号，更有利于保留肌肉；蛋白质补充对力量训练带来的肌肉与力量增益有系统性证据支持。',
    articleSlug: 'strength-training', evidence: 'strong', referenceIds: ['morton2018', 'westcott2012', 'acsm2009'], art: 'DumbbellArt',
  },
  {
    id: 'p4', index: '04', title: '不必戒断碳水', statement: '减脂不意味着必须戒掉碳水。',
    explanation: '不同宏量营养素配比的减重效果在组间差异通常不大，长期依从性往往比配比本身更关键；碳水还是训练表现与日常活动的重要燃料。',
    articleSlug: 'carbs-not-enemy', evidence: 'strong', referenceIds: ['sacks2009', 'gardner2018'], art: 'CarbFoods',
  },
  {
    id: 'p5', index: '05', title: '睡眠、压力与行为', statement: '睡眠、压力和行为习惯会影响减脂过程。',
    explanation: '睡眠不足可能改变饥饿相关激素、进食机会与食物选择；在同等热量限制下，睡眠不足会减少脂肪占减重的比例。压力与情绪性进食则影响长期执行率。',
    articleSlug: 'sleep-weight', evidence: 'moderate', referenceIds: ['nedeltcheva2010', 'patel2008', 'hall2019'], art: 'SleepFat',
  },
  {
    id: 'p6', index: '06', title: '可持续优先', statement: '可持续的方案通常比极端方案更容易长期坚持。',
    explanation: '严格限制在短期试验里常出现更快的初始下降，但 12 个月以上的随访中，不同饮食模式的差距明显缩小；能持续执行、可复盘、可调整的方案更值得选择。',
    articleSlug: '30day-guide', evidence: 'moderate', referenceIds: ['sacks2009', 'gardner2018', 'sumithran2011'], art: 'HabitLoop',
  },
];
