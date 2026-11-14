export interface ToolMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: '身体指标' | '能量估算' | '营养计算' | '趋势与记录';
  tags: string[];
  articleSlug?: string;
}

/** 10 个可真实交互的工具。对应实现见 components/tools/ToolViews.tsx */
export const TOOLS: ToolMeta[] = [
  { slug: 'bmi', title: 'BMI 计算器', subtitle: 'Body Mass Index', description: '计算 BMI 并说明中国成人参考界值与指标局限；不把结果当作健康诊断。', icon: 'Ruler', category: '身体指标', tags: ['BMI', '筛查', '局限'], articleSlug: 'bmi-waist-bodyfat' },
  { slug: 'bmr', title: 'BMR 基础代谢估算器', subtitle: 'Basal Metabolic Rate', description: '用 Mifflin-St Jeor 与修订 Harris-Benedict 交叉估算静息能量消耗。', icon: 'Flame', category: '能量估算', tags: ['BMR', '公式', '区间'], articleSlug: 'bmr-vs-tdee' },
  { slug: 'tdee', title: 'TDEE 每日总能量消耗估算器', subtitle: 'Total Daily Energy Expenditure', description: '在静息消耗基础上乘以活动系数，给出估算区间与温和缺口参考。', icon: 'Activity', category: '能量估算', tags: ['TDEE', '活动系数', '缺口'], articleSlug: 'calorie-needs' },
  { slug: 'protein', title: '蛋白质摄入参考计算器', subtitle: 'Daily Protein Reference', description: '按体重与训练状态给出 g/kg 参考范围，并换算到常见食物组合。', icon: 'Beef', category: '营养计算', tags: ['蛋白质', 'g/kg', '食物'], articleSlug: 'protein-intake' },
  { slug: 'macros', title: '三大营养素分配计算器', subtitle: 'Macronutrient Split', description: '按总热量、蛋白目标与脂肪比例，计算蛋白/碳水/脂肪克数并生成占比图。', icon: 'PieChart', category: '营养计算', tags: ['宏量营养素', '配比', '图表'], articleSlug: 'carbs-not-enemy' },
  { slug: 'food-energy', title: '食物热量换算工具', subtitle: 'Energy From Macros', description: '由蛋白质、碳水、脂肪克数换算能量，理解标签与估算误差。', icon: 'Utensils', category: '营养计算', tags: ['食品标签', '4/4/9', '估算'], articleSlug: 'takeout' },
  { slug: 'whtr', title: '腰高比计算器', subtitle: 'Waist-to-Height Ratio', description: '计算腰围/身高并对照常用筛查界值，说明族群与测量条件差异。', icon: 'ScanLine', category: '身体指标', tags: ['腰围', '腰高比', '筛查'], articleSlug: 'bmi-waist-bodyfat' },
  { slug: 'weight-trend', title: '体重变化趋势分析工具', subtitle: 'Trend From Daily Weights', description: '输入连续体重读数，计算 7 日移动平均与每周趋势速率，绘制本地图表。', icon: 'TrendingDown', category: '趋势与记录', tags: ['7日均值', '趋势', '波动'], articleSlug: '7day-average' },
  { slug: 'weekly-activity', title: '每周运动量记录工具', subtitle: 'Weekly Activity Log', description: '记录一周有氧分钟、步数与力量训练次数，对照 WHO 推荐并保存到本地。', icon: 'CalendarDays', category: '趋势与记录', tags: ['活动量', '步数', '本地保存'], articleSlug: 'daily-steps' },
  { slug: 'progress', title: '个人减脂进度记录工具', subtitle: 'Progress Snapshot', description: '对比起点与当前体重、腰围和活动量，生成进度快照并保存到本地。', icon: 'Target', category: '趋势与记录', tags: ['进度', '腰围', '仪表盘'], articleSlug: '30day-guide' },
];

export const TOOL_MAP = new Map(TOOLS.map((t) => [t.slug, t]));

export const TOOL_CATEGORIES = ['身体指标', '能量估算', '营养计算', '趋势与记录'] as const;
