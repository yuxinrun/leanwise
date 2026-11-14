import type { EvidenceLevel } from '@/types';

export interface DietPattern {
  id: string;
  name: string;
  en: string;
  definition: string;
  evidence: EvidenceLevel;
  evidenceNote: string;
  pros: string[];
  limits: string[];
  suitable: string[];
  notSuitable: string[];
  referenceIds: string[];
  articleSlug: string;
}

/**
 * 饮食模式评估：不宣称任何一种适合所有人。
 * 证据等级依据本站证据库中的人体研究与指南，未纳入商业机构的营销材料。
 */
export const DIET_PATTERNS: DietPattern[] = [
  {
    id: 'mediterranean', name: '地中海饮食', en: 'Mediterranean Diet',
    definition: '以蔬菜、水果、全谷、豆类、坚果、橄榄油与鱼类为主体，少量红肉与加工食品的传统饮食结构。',
    evidence: 'strong',
    evidenceNote: '多项大型随机对照与队列研究关注其对心血管代谢指标的影响；本站证据库收录的 Sacks 等（2009）与 Gardner 等（2018）强调食物质量与长期依从性。具体效应因研究人群与执行程度而异。',
    pros: ['食物多样、饱腹感较好', '便于长期执行，不依赖极端限制', '与心血管健康指标改善相关'],
    limits: ['不自动带来能量缺口，仍需注意份量', '橄榄油与坚果能量密度高', '部分食材在本地可得性与成本上有限制'],
    suitable: ['希望改善整体膳食结构的人', '能接受家庭烹饪的人', '关注长期心血管健康指标的人'],
    notSuitable: ['需要严格限制钾、磷等医学情况者（须个体化）', '对坚果/鱼类过敏者'],
    referenceIds: ['sacks2009', 'gardner2018', 'cns2022'], articleSlug: 'lowcarb-vs-balanced',
  },
  {
    id: 'dash', name: 'DASH 饮食', en: 'Dietary Approaches to Stop Hypertension',
    definition: '以高蔬菜水果、低脂乳制品、全谷与低钠为特征、最初面向血压管理设计的饮食结构。',
    evidence: 'strong',
    evidenceNote: 'DASH 对血压的影响有较多随机对照证据；用于减脂时仍需配合总能量管理。本站未把血压相关结论外推为减脂优势。',
    pros: ['结构清晰、钠与加工食品较少', '高纤维、食物体积大', '对血压管理有独立价值'],
    limits: ['不直接等于减脂方案', '外食场景执行难度较高', '低钠要求需结合个人医学情况'],
    suitable: ['关注血压与膳食结构的人', '偏好明确规则的人'],
    notSuitable: ['需限制钾摄入的肾病患者（须遵医嘱）', '无法调整外食结构者需循序渐进'],
    referenceIds: ['cns2022', 'who2020', 'sacks2009'], articleSlug: 'lowcarb-vs-balanced',
  },
  {
    id: 'high-protein', name: '高蛋白饮食', en: 'Higher-Protein Diet',
    definition: '在总能量框架内提高蛋白质占比（常见 1.2–2.2 g/kg），并配合抗阻训练的饮食结构。',
    evidence: 'strong',
    evidenceNote: 'Morton 等（2018）Meta 分析支持蛋白质补充配合抗阻训练对瘦体重与力量的小幅增益；Sacks 等（2009）提示不同配比在长期减重上差异较小。证据支持「保留瘦体重」，不支持「蛋白本身燃脂」。',
    pros: ['有助于减脂期保留瘦体重', '饱腹感通常较好', '与力量训练目标一致'],
    limits: ['长期依从性受食物成本与偏好影响', '不自动产生能量缺口', '肾功能异常者需医学个体化'],
    suitable: ['进行规律力量训练的人', '减脂期容易饿的人'],
    notSuitable: ['慢性肾病等需限制蛋白者', '以加工高蛋白零食为主要来源者'],
    referenceIds: ['morton2018', 'sacks2009', 'westcott2012'], articleSlug: 'protein-intake',
  },
  {
    id: 'low-carb', name: '低碳饮食', en: 'Low-Carbohydrate Diet',
    definition: '降低碳水化合物供能占比、相应提高脂肪或蛋白质占比的一类饮食，强度从适度减少到极低碳差异很大。',
    evidence: 'strong',
    evidenceNote: 'Sacks 等（2009）与 Gardner 等（2018）的大型随机对照试验显示，长期减重在健康低脂与健康低碳组间差异较小；短期较快下降常包含糖原与水分变化。',
    pros: ['部分人更容易简化食物选择', '减少含糖饮料与精制点心', '可作为偏好明确者的长期结构'],
    limits: ['早期读数下降不等于脂肪减少', '可能影响高强度训练表现', '纤维不足与血脂变化需留意'],
    suitable: ['偏好低碳结构且能长期坚持的人', '希望减少甜食与含糖饮料的人'],
    notSuitable: ['孕期/哺乳期、未成年人', '使用胰岛素或磺脲类药物的糖尿病患者（须医学监督）', '高强度训练量较大且表现下降者'],
    referenceIds: ['sacks2009', 'gardner2018', 'hall2017'], articleSlug: 'lowcarb-vs-balanced',
  },
  {
    id: 'if', name: '间歇性禁食', en: 'Intermittent Fasting',
    definition: '按时间安排进食的一类方案，包括限时进食（TRE）、5:2 与隔日禁食，并非单一饮食结构。',
    evidence: 'moderate',
    evidenceNote: 'Trepanowski 等（2017）1 年随机试验中，隔日禁食与每日限热量减重无显著组间差异且脱落率更高；不同形式的证据强度差别很大，长期优势尚无充分证据。',
    pros: ['规则简单，减少夜间无意识进食', '部分人更容易控制总摄入', '不要求特殊食材'],
    limits: ['窗口内仍可能能量超标', '轮班、社交与家庭共餐时执行困难', '可能诱发暴食倾向者的补偿行为'],
    suitable: ['作息规律、早餐需求低的人', '希望减少晚间加餐的人'],
    notSuitable: ['未成年人、孕期/哺乳期', '进食障碍史或当前暴食倾向', '使用需随餐药物或胰岛素者'],
    referenceIds: ['trepanowski2017', 'sacks2009', 'gardner2018'], articleSlug: 'intermittent-fasting',
  },
  {
    id: 'plant-based', name: '植物性饮食', en: 'Plant-Based / Vegetarian Diet',
    definition: '以谷物、豆类、蔬菜、水果、坚果种子为主体，可包含不同程度蛋奶摄入的饮食结构。',
    evidence: 'moderate',
    evidenceNote: '植物性结构与较高纤维摄入、较低能量密度相关（Slavin 2005；Hall 2019），但观察性研究不能证明因果；减脂效果仍取决于总能量与结构。',
    pros: ['纤维与食物体积通常较高', '食物多样、饱腹感较好', '可与本地豆制品结合'],
    limits: ['蛋白质与部分微量营养素需刻意安排', '纯素者需关注维生素 B12、铁、钙', '外食可选范围有时受限'],
    suitable: ['偏好植物性食物的人', '希望增加豆类与蔬菜比例的人'],
    notSuitable: ['未做营养规划即长期严格纯素的人', '有特定吸收障碍者（须医学评估）'],
    referenceIds: ['slavin2005', 'hall2019', 'cns2022'], articleSlug: 'protein-intake',
  },
  {
    id: 'portion', name: '控制份量法', en: 'Portion Control',
    definition: '不改变食物种类，通过固定餐具、称重、手掌法或预分装控制份量，从而建立适度能量缺口。',
    evidence: 'moderate',
    evidenceNote: '份量控制是多数随机对照减重干预的共同组成部分（Sacks 等 2009；Gardner 等 2018），但很少有研究把「份量法」单独作为独立干预验证，长期效果主要取决于执行一致性。',
    pros: ['不禁止任何食物，心理压力较小', '适合外食与家庭共餐', '与记录工具天然契合'],
    limits: ['估算误差较大', '高能量密度食物份量稍变即影响较大', '需要一定的记录成本'],
    suitable: ['不喜欢严格饮食规则的人', '经常外食或家庭共餐的人'],
    notSuitable: ['记录行为会明显加重焦虑者（可改用结构法）', '需要精确钠/糖管理的医学情况'],
    referenceIds: ['sacks2009', 'gardner2018', 'hall2019'], articleSlug: 'takeout',
  },
];

export const DIET_PATTERN_NOTE =
  '上表评价的是「饮食结构在一般健康成人自我管理中的适用性」，不是医学营养治疗建议。存在慢性病、孕期/哺乳期、未成年人或进食障碍风险者，请先咨询医生或注册营养师。';
