import type { Quote } from '@/types';

/** 本站原创文案。刻意不署任何名人名言，避免伪造引语。 */
export const QUOTES: Quote[] = [
  { id: 'q1', text: '减脂不是和身体对抗，而是学会与身体合作。', tag: '核心理念' },
  { id: 'q2', text: '体重秤记录的是重量，长期趋势记录的才是变化。', tag: '体重管理' },
  { id: 'q3', text: '真正有效的计划，不是最痛苦的计划，而是能够持续执行的计划。', tag: '可持续性' },
  { id: 'q4', text: '不要追求最快的下降速度，要追求最稳定的长期改变。', tag: '减脂速度' },
  { id: 'q5', text: '少一点焦虑，多一点记录；少一点猜测，多一点证据。', tag: '科学方法' },
  { id: 'q6', text: '减脂的本质不是少吃一顿，而是建立一种长期可持续的生活方式。', tag: '生活方式' },
  { id: 'q7', text: '不要用一天的体重，否定一个月的努力。', tag: '体重波动' },
  { id: 'q8', text: '身体不是计算器，公式提供起点，数据帮助你找到答案。', tag: '估算与校准' },
  { id: 'q9', text: '真正的自律，不是每天都完美，而是偏离之后还能重新回到正轨。', tag: '行为弹性' },
  { id: 'q10', text: '体重可以波动，习惯应该稳定。', tag: '习惯养成' },
  { id: 'q11', text: '健康不是体重秤上的一个数字，而是身体、行为与生活质量的综合表现。', tag: '健康定义' },
  { id: 'q12', text: '先问能不能坚持一年，再问能不能坚持一周。', tag: '方案评估' },
  { id: 'q13', text: '记录的意义不是审判自己，而是让下一步调整有依据。', tag: '数据实验室' },
  { id: 'q14', text: '饥饿感是信息，不是必须击败的敌人。', tag: '饱腹感' },
  { id: 'q15', text: '把「今天没做到」改成「下一次怎么做」，计划才有生命力。', tag: '复盘' },
  { id: 'q16', text: '相关性提示线索，不替我们证明因果。', tag: '证据素养' },
  { id: 'q17', text: '减掉多余脂肪，不透支健康。', tag: 'Slogan' },
  { id: 'q18', text: '能测量、能复盘、能修正的方法，才配叫方法。', tag: '可验证性' },
];

export function quoteOfDay(): Quote {
  const day = Math.floor(Date.now() / 86400000);
  return QUOTES[day % QUOTES.length];
}

export function pickQuotes(ids: string[]): Quote[] {
  return ids.map((id) => QUOTES.find((q) => q.id === id)).filter((q): q is Quote => Boolean(q));
}
