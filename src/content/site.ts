import type { SectionId } from '@/types';

/** 站点地址由构建脚本注入；本地开发使用占位域名。 */
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://leanwise.example.org').replace(/\/$/, '');
/** GitHub Pages 项目页需要 /<repo> 前缀；自定义域名或本地开发时为空。 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

export function siteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${BASE_PATH}${normalized}`;
}

export const BRAND = {
  name: 'LEANWISE',
  cn: '科学减脂',
  tagline: '科学减脂 · 理性变瘦',
  sloganEn: 'Lose Fat, Not Your Health.',
  sloganCn: '减掉多余脂肪，不透支健康。',
  description:
    'LEANWISE 是一个中文科学减脂知识平台：系统梳理能量平衡、营养学、运动科学与体重管理方法，提供可交互的计算工具、本地数据实验室与经过核验的专业资源。',
  url: siteUrl('/'),
} as const;

export const NAV_ITEMS: { label: string; href: string; id: SectionId | 'home' }[] = [
  { label: '首页', href: '/', id: 'home' },
  { label: '减脂科学', href: '/science', id: 'science' },
  { label: '饮食营养', href: '/nutrition', id: 'nutrition' },
  { label: '运动减脂', href: '/training', id: 'training' },
  { label: '减脂实战', href: '/practice', id: 'practice' },
  { label: '体重管理', href: '/weight', id: 'weight' },
  { label: '书籍与网站', href: '/resources', id: 'resources' },
  { label: '数据实验室', href: '/lab', id: 'lab' },
  { label: '实用工具', href: '/tools', id: 'tools' },
  { label: '关于本站', href: '/about', id: 'about' },
];

export interface SectionMeta {
  id: SectionId;
  title: string;
  en: string;
  href: string;
  description: string;
  topics: { label: string; href: string; note?: string }[];
  icon: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'science', title: '减脂科学', en: 'SCIENCE', href: '/science', icon: 'Atom',
    description: '把「变瘦」拆成可以被解释、被测量、被证伪的生理过程：能量平衡、脂肪代谢、代谢适应与体重波动。',
    topics: [
      { label: '能量平衡', href: '/science#energy-balance', note: 'BMR / RMR / TDEE / TEF / NEAT' },
      { label: '脂肪代谢', href: '/science#fat-metabolism', note: '甘油三酯 · 脂肪动员 · 氧化' },
      { label: '基础代谢与适应', href: '/science#adaptation', note: '为什么不能怪「代谢损坏」' },
      { label: '体重波动', href: '/science#fluctuation', note: '水分、糖原、钠与长期趋势' },
      { label: '减脂速度', href: '/science#rate', note: '看趋势，也看腰围、力量与体能' },
    ],
  },
  {
    id: 'nutrition', title: '饮食营养', en: 'NUTRITION', href: '/nutrition', icon: 'Salad',
    description: '不靠戒断与忍耐，而是靠结构：热量、蛋白质、碳水、脂肪、纤维，以及能长期执行的食谱与饮食模式。',
    topics: [
      { label: '热量管理', href: '/nutrition#calories', note: '估算 → 记录 → 用趋势校准' },
      { label: '三大营养素', href: '/nutrition#macros', note: '蛋白质 · 碳水 · 脂肪' },
      { label: '膳食纤维与饱腹感', href: '/nutrition#fiber', note: '能量密度与食物体积' },
      { label: '减脂食谱库', href: '/nutrition#recipes', note: '可检索、带可替换食材' },
      { label: '饮食模式评估', href: '/nutrition#patterns', note: '证据、优势、限制与适用人群' },
      { label: '补剂与产品', href: '/nutrition#supplements', note: '补剂不是减脂的基础' },
    ],
  },
  {
    id: 'training', title: '运动减脂', en: 'TRAINING', href: '/training', icon: 'Dumbbell',
    description: '运动的价值不只是「消耗热量」，更在于保留瘦体重、改善体能、建立稳定的活动习惯。',
    topics: [
      { label: '有氧运动图鉴', href: '/training#cardio', note: '8 种方式的强度与安全' },
      { label: '力量训练', href: '/training#strength', note: '渐进超负荷 · RPE / RIR' },
      { label: '训练方案', href: '/training#plans', note: '每周 2 / 3 / 4 次 + 家庭徒手' },
      { label: 'NEAT 日常活动', href: '/training#neat', note: '步数目标如何可持续' },
      { label: '有氧与力量组合', href: '/training#combine', note: '同日 / 分日 / 恢复' },
      { label: '运动安全', href: '/training#safety', note: '热身、负荷与恢复' },
    ],
  },
  {
    id: 'practice', title: '减脂实战', en: 'PRACTICE', href: '/practice', icon: 'Route',
    description: '从「知道」到「做到」：30 天入门计划、不同人群指南、常见困难、平台期与反弹的处理流程。',
    topics: [
      { label: '30 天入门计划', href: '/practice#30days', note: '四阶段，不承诺固定减重' },
      { label: '不同人群指南', href: '/practice#audiences', note: '久坐 / 出差 / 素食 / 中老年' },
      { label: '常见困难', href: '/practice#difficulties', note: '饥饿、晚上吃多、聚餐、外卖' },
      { label: '平台期', href: '/practice#plateau', note: '先排查，再调整' },
      { label: '体重反弹', href: '/practice#regain', note: '维持期饮食与节假日' },
    ],
  },
  {
    id: 'weight', title: '体重管理', en: 'WEIGHT MANAGEMENT', href: '/weight', icon: 'Activity',
    description: '体重秤只是一个传感器：把单点读数变成 7 日均值与 30 日趋势，再与腰围、训练表现、健康指标一起看。',
    topics: [
      { label: '指标与局限', href: '/weight#metrics', note: 'BMI · 腰围 · 腰高比 · 体脂率' },
      { label: '趋势解读', href: '/weight#trend', note: '7 日均线 · 30 日趋势' },
      { label: '身体成分', href: '/weight#composition', note: '体重变化 ≠ 脂肪变化' },
      { label: '长期维持', href: '/weight#maintenance', note: '行为与指标一起稳定' },
    ],
  },
  {
    id: 'resources', title: '书籍与网站', en: 'RESOURCES', href: '/resources', icon: 'Library',
    description: '可检索、可分类、可收藏的资源库：国内外专业书籍、机构网站、文献数据库与学术平台。',
    topics: [
      { label: '国外书籍', href: '/resources?group=books-intl' },
      { label: '国内书籍与指南', href: '/resources?group=books-cn' },
      { label: '国外专业网站', href: '/resources?group=sites-intl' },
      { label: '国内专业网站', href: '/resources?group=sites-cn' },
      { label: '文献与证据', href: '/resources#evidence' },
    ],
  },
  {
    id: 'lab', title: '数据实验室', en: 'LAB', href: '/lab', icon: 'FlaskConical',
    description: '体重、饮食、运动三类记录 + 个人仪表盘。数据默认只保存在你自己的浏览器里，可导出、可删除。',
    topics: [
      { label: '体重追踪', href: '/lab#weight' },
      { label: '饮食记录', href: '/lab#food' },
      { label: '运动记录', href: '/lab#activity' },
      { label: '进度仪表盘', href: '/lab#dashboard' },
      { label: '数据隐私', href: '/lab#privacy' },
    ],
  },
  {
    id: 'tools', title: '实用工具', en: 'TOOLS', href: '/tools', icon: 'Calculator',
    description: '10 个能真实计算的工具，展示过程、解释结果，并明确说明公式的适用条件与误差。',
    topics: [],
  },
  {
    id: 'about', title: '关于本站', en: 'ABOUT', href: '/about', icon: 'Info',
    description: '编辑原则、证据分级、内容边界与数据隐私说明。',
    topics: [],
  },
];

export const HOME_ENTRIES = [
  { id: 'principle', title: '减脂原理', en: 'THE SCIENCE', desc: '能量平衡、代谢适应与脂肪减少的真实机制', href: '/science', art: 'EnergyBalance' },
  { id: 'nutrition', title: '饮食营养', en: 'NUTRITION', desc: '热量、蛋白质、碳水与可持续的膳食结构', href: '/nutrition', art: 'HealthyPlate' },
  { id: 'training', title: '运动减脂', en: 'TRAINING', desc: '有氧、力量与日常活动的组合策略', href: '/training', art: 'Squat' },
  { id: 'habit', title: '习惯养成', en: 'HABITS', desc: '把计划落到日程里，而不是靠意志力硬撑', href: '/practice#30days', art: 'HabitLoop' },
  { id: 'plateau', title: '平台期与反弹', en: 'PLATEAU & REGAIN', desc: '先分辨波动，再复盘记录，最后才谈调整', href: '/practice#plateau', art: 'Plateau' },
  { id: 'tools', title: '实用计算工具', en: 'TOOLS', desc: 'BMI、BMR、TDEE、营养素与趋势分析', href: '/tools', art: 'CalculatorArt' },
] as const;

export const DATA_SOURCE_TYPES = [
  { id: 'reference', label: '真实数据', desc: '来自公开文献或权威机构统计，图表旁注明具体出处与适用条件。', className: 'bg-forest/10 text-forest border-forest/25' },
  { id: 'demo', label: '模拟数据', desc: '为演示图表形态而构造的示例数据，不代表任何研究结果或个人情况。', className: 'bg-orange/10 text-[#9A5B22] border-orange/35' },
  { id: 'personal', label: '个人记录', desc: '由你在本地浏览器中录入的记录，仅保存在本机，不会上传。', className: 'bg-sun/20 text-[#7A5A17] border-sun/60' },
] as const;

export const GLOBAL_DISCLAIMER =
  '本站内容用于健康科普与自我管理，不构成医疗诊断、治疗方案或个体化营养处方。所有估算均有误差，健康决策请结合专业人士意见。';

export const CORE_PRINCIPLES = [
  '不宣扬极端节食，也不鼓励快速减重与不合理的热量限制。',
  '不制造体重与身材焦虑，不用「几天瘦几斤」作为卖点。',
  '不把 BMI 等同于体脂率或健康程度。',
  '不宣称局部训练可以减掉局部脂肪。',
  '不把短期体重波动误判为脂肪变化。',
  '所有健康建议都注明适用范围与局限。',
];
