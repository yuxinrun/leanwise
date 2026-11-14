import type { Recipe } from '@/types';

/**
 * 食谱营养数据均为「估算值」：参考常见食物成分数据、包装标签与常规烹饪方式推算，
 * 不同品牌、部位、生熟重与用油量会造成明显差异，不应作为精确营养摄入或医学处方。
 */
export const RECIPE_DATA_NOTE =
  '营养数据为估算值，参考常见食物成分资料与包装标签，按常规份量与少油烹饪推算；不同品牌、部位、生熟重与烹调用油会造成明显差异，请勿视为精确值。';

export const RECIPE_CATEGORIES = ['早餐', '午餐', '晚餐', '加餐'] as const;
export const RECIPE_SCENARIOS = ['高蛋白', '便利店搭配', '外卖搭配', '家庭烹饪', '素食选择'] as const;

export const RECIPES: Recipe[] = [
  {
    id: 'r1', name: '鸡蛋燕麦浆果碗', category: '早餐', scenarios: ['高蛋白', '家庭烹饪'],
    ingredients: [{ name: '即食燕麦（干重）', amount: '40 g' }, { name: '无糖酸奶', amount: '150 g' }, { name: '鸡蛋', amount: '1 个（约 50 g）' }, { name: '蓝莓或其他浆果', amount: '80 g' }],
    steps: ['燕麦用少量热水或牛奶泡软', '加入无糖酸奶与浆果', '另煮一个鸡蛋，搭配食用'],
    nutrition: { kcal: 380, protein: 22, carb: 45, fat: 11, fiber: 6 },
    swaps: ['酸奶 → 无糖豆浆（素食）', '浆果 → 苹果/梨块', '鸡蛋 → 豆腐干 60 g'],
    note: '适合赶时间的早晨；蛋白来源分散到早餐，比集中晚餐更容易达标。',
  },
  {
    id: 'r2', name: '全麦三明治 + 牛奶', category: '早餐', scenarios: ['便利店搭配', '高蛋白'],
    ingredients: [{ name: '全麦面包', amount: '2 片（约 60 g）' }, { name: '即食鸡胸或卤蛋', amount: '60 g / 1 个' }, { name: '生菜与番茄', amount: '80 g' }, { name: '纯牛奶', amount: '250 ml' }],
    steps: ['面包夹入蛋白来源与蔬菜', '酱料选择少量芥末或酸奶酱，避免高脂沙拉酱', '配牛奶'],
    nutrition: { kcal: 410, protein: 27, carb: 44, fat: 12, fiber: 5 },
    swaps: ['鸡胸 → 豆腐片', '牛奶 → 无糖豆浆', '全麦面包 → 杂粮饭团'],
    note: '便利店可完成；注意加工肉制品钠较高，不宜长期作为主要蛋白来源。',
  },
  {
    id: 'r3', name: '杂粮饭 + 清蒸鱼 + 双蔬', category: '午餐', scenarios: ['家庭烹饪', '外卖搭配', '高蛋白'],
    ingredients: [{ name: '杂粮饭（熟）', amount: '150 g' }, { name: '鱼柳', amount: '120 g' }, { name: '西兰花', amount: '150 g' }, { name: '胡萝卜/菌菇', amount: '100 g' }, { name: '烹调用油', amount: '约 8 g' }],
    steps: ['杂粮饭提前焖好，按熟重分装', '鱼柳清蒸或水煮，少油少酱', '蔬菜焯水后少量油快炒'],
    nutrition: { kcal: 520, protein: 36, carb: 56, fat: 14, fiber: 8 },
    swaps: ['鱼柳 → 鸡胸/虾/北豆腐 150 g', '杂粮饭 → 红薯 200 g', '西兰花 → 当季绿叶菜'],
    note: '外卖点单时可备注「少饭、双蔬、酱汁分装」，结构一致比精确热量更重要。',
  },
  {
    id: 'r4', name: '豆腐牛肉盖饭（少油版）', category: '午餐', scenarios: ['外卖搭配', '高蛋白'],
    ingredients: [{ name: '米饭（熟）', amount: '120 g' }, { name: '瘦牛肉', amount: '80 g' }, { name: '北豆腐', amount: '100 g' }, { name: '青菜', amount: '150 g' }, { name: '酱汁', amount: '少量，分装' }],
    steps: ['选择少油烹饪的盖饭，主动要求主食减半', '额外加一份青菜', '酱汁分装，只蘸少量'],
    nutrition: { kcal: 540, protein: 34, carb: 52, fat: 18, fiber: 5 },
    swaps: ['牛肉 → 鸡腿去皮/鱼肉', '米饭 → 杂粮饭', '豆腐 → 鸡蛋'],
    note: '盖饭类外卖常见用油与勾芡偏多，估算值误差较大，适合按结构而非数字复盘。',
  },
  {
    id: 'r5', name: '鸡胸藜麦沙拉碗', category: '午餐', scenarios: ['高蛋白', '便利店搭配'],
    ingredients: [{ name: '藜麦（熟）', amount: '130 g' }, { name: '即食鸡胸', amount: '100 g' }, { name: '混合生菜', amount: '120 g' }, { name: '鹰嘴豆', amount: '50 g' }, { name: '油醋汁', amount: '10 g' }],
    steps: ['藜麦煮熟分装', '加入鸡胸、蔬菜与豆类', '油醋汁分装，食用前再拌'],
    nutrition: { kcal: 470, protein: 38, carb: 48, fat: 13, fiber: 9 },
    swaps: ['鸡胸 → 卤蛋 2 个 / 烟熏豆腐', '藜麦 → 糙米饭', '鹰嘴豆 → 红豆'],
    note: '警惕「沙拉 = 低热量」的误解：蛋白不足与高脂酱汁常让轻食反而更饿。',
  },
  {
    id: 'r6', name: '番茄豆腐荞麦面', category: '晚餐', scenarios: ['家庭烹饪', '素食选择'],
    ingredients: [{ name: '荞麦面（干）', amount: '70 g' }, { name: '北豆腐', amount: '150 g' }, { name: '番茄', amount: '200 g' }, { name: '绿叶菜', amount: '150 g' }, { name: '烹调用油', amount: '约 6 g' }],
    steps: ['番茄炒软后加水做汤底，少油', '下豆腐与绿叶菜', '面条另煮后加入，避免喝完汤底'],
    nutrition: { kcal: 480, protein: 26, carb: 62, fat: 12, fiber: 9 },
    swaps: ['北豆腐 → 鸡蛋 + 虾', '荞麦面 → 全麦意面', '番茄 → 菌菇汤底'],
    note: '纯素版本可用豆制品 + 豆类组合提高蛋白，长期纯素请关注维生素 B12。',
  },
  {
    id: 'r7', name: '虾仁蔬菜炒饭（少油）', category: '晚餐', scenarios: ['家庭烹饪', '高蛋白'],
    ingredients: [{ name: '米饭（熟）', amount: '150 g' }, { name: '虾仁', amount: '120 g' }, { name: '鸡蛋', amount: '1 个' }, { name: '杂蔬丁', amount: '180 g' }, { name: '烹调用油', amount: '约 8 g' }],
    steps: ['用不粘锅，先炒蛋与虾仁盛出', '炒杂蔬后加入米饭，控制用油', '回锅拌匀，少盐少酱'],
    nutrition: { kcal: 520, protein: 35, carb: 58, fat: 14, fiber: 5 },
    swaps: ['虾仁 → 鸡胸丁', '米饭 → 隔夜杂粮饭', '鸡蛋 → 豆腐丁'],
    note: '炒饭能量密度对用油非常敏感，建议用茶匙量油而不是直接倒。',
  },
  {
    id: 'r8', name: '一锅炖：豆类蔬菜 + 红薯', category: '晚餐', scenarios: ['素食选择', '家庭烹饪'],
    ingredients: [{ name: '红豆/鹰嘴豆（熟）', amount: '150 g' }, { name: '红薯', amount: '180 g' }, { name: '洋葱、番茄、绿叶菜', amount: '250 g' }, { name: '橄榄油', amount: '约 6 g' }],
    steps: ['豆类提前浸泡煮熟或使用无盐罐头', '与番茄洋葱同炖', '红薯切块同煮，出锅前加绿叶菜'],
    nutrition: { kcal: 440, protein: 18, carb: 70, fat: 8, fiber: 14 },
    swaps: ['红薯 → 土豆/南瓜', '豆类 → 扁豆', '加一个鸡蛋或豆腐提高蛋白'],
    note: '纯素一锅炖纤维高、饱腹强，但蛋白偏低，建议搭配豆制品或另加蛋白来源。',
  },
  {
    id: 'r9', name: '无糖酸奶 + 坚果 + 水果', category: '加餐', scenarios: ['便利店搭配', '高蛋白'],
    ingredients: [{ name: '无糖酸奶', amount: '150 g' }, { name: '混合坚果', amount: '10 g' }, { name: '苹果或浆果', amount: '100 g' }],
    steps: ['坚果预先分装成 10 g 小份', '与酸奶、水果组合', '作为下午固定加餐，而非随手抓'],
    nutrition: { kcal: 220, protein: 11, carb: 22, fat: 9, fiber: 4 },
    swaps: ['酸奶 → 无糖豆浆', '坚果 → 一小把毛豆', '水果 → 小番茄/黄瓜'],
    note: '坚果能量密度高，小份量是关键；可预期加餐有助于减少晚间失控。',
  },
  {
    id: 'r10', name: '毛豆 + 卤蛋 + 无糖茶', category: '加餐', scenarios: ['便利店搭配', '高蛋白'],
    ingredients: [{ name: '毛豆（带荚）', amount: '150 g' }, { name: '卤蛋', amount: '1 个' }, { name: '无糖茶或水', amount: '1 瓶' }],
    steps: ['选择原味少盐毛豆', '搭配一个卤蛋', '饮品默认无糖'],
    nutrition: { kcal: 250, protein: 20, carb: 16, fat: 12, fiber: 7 },
    swaps: ['卤蛋 → 豆腐干 60 g', '毛豆 → 鹰嘴豆小包', '无糖茶 → 白水'],
    note: '适合出差与加班场景；卤蛋钠较高，不建议每天高频食用。',
  },
  {
    id: 'r11', name: '便利店四件套组合', category: '午餐', scenarios: ['便利店搭配', '外卖搭配'],
    ingredients: [{ name: '即食鸡胸 / 茶叶蛋', amount: '1 份' }, { name: '袋装沙拉或即食蔬果', amount: '1 份' }, { name: '饭团（小）', amount: '1 个' }, { name: '无糖饮品', amount: '1 瓶' }],
    steps: ['按「蛋白 + 蔬果 + 主食 + 无糖饮品」四类各选一件', '沙拉酱只用一半', '饭团选择小份'],
    nutrition: { kcal: 430, protein: 27, carb: 50, fat: 12, fiber: 5 },
    swaps: ['鸡胸 → 豆腐干 + 酸奶', '饭团 → 全麦面包', '沙拉 → 即食西兰花/小番茄'],
    note: '不追求精确热量，重点是让出差期间的膳食结构每天大致一致。',
  },
  {
    id: 'r12', name: '家庭素食高蛋白拼盘', category: '晚餐', scenarios: ['素食选择', '家庭烹饪'],
    ingredients: [{ name: '北豆腐', amount: '180 g' }, { name: '鹰嘴豆（熟）', amount: '100 g' }, { name: '杂粮饭（熟）', amount: '120 g' }, { name: '绿叶菜', amount: '200 g' }, { name: '芝麻酱/橄榄油', amount: '约 8 g' }],
    steps: ['豆腐煎或烤，控制用油', '豆类与杂粮饭搭配，提供氨基酸互补', '绿叶菜焯水，酱料单独蘸取'],
    nutrition: { kcal: 560, protein: 30, carb: 62, fat: 18, fiber: 13 },
    swaps: ['北豆腐 → 天贝/豆干', '鹰嘴豆 → 扁豆', '杂粮饭 → 藜麦'],
    note: '谷物 + 豆类组合能改善植物蛋白的氨基酸模式；长期纯素者请评估 B12、铁与钙。',
  },
];

export function searchRecipes(query: string, category?: string, scenario?: string): Recipe[] {
  const q = query.trim().toLowerCase();
  return RECIPES.filter((r) => {
    const matchQ = !q || [r.name, r.note, ...r.ingredients.map((i) => i.name), ...r.scenarios].join(' ').toLowerCase().includes(q);
    const matchC = !category || category === '全部' || r.category === category;
    const matchS = !scenario || scenario === '全部' || r.scenarios.includes(scenario);
    return matchQ && matchC && matchS;
  });
}
