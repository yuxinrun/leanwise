/** 全站共用数据类型。内容以结构化配置管理，便于校验、检索与复用到图表。 */

export type DataSourceKind = 'reference' | 'demo' | 'personal';

export type EvidenceLevel = 'strong' | 'moderate' | 'limited' | 'insufficient';

export type SectionId =
  | 'science'
  | 'nutrition'
  | 'training'
  | 'practice'
  | 'weight'
  | 'resources'
  | 'lab'
  | 'tools'
  | 'about';

export interface Reference {
  id: string;
  author: string;
  year: number;
  title: string;
  source: string;
  url?: string;
  doi?: string;
  pmid?: string;
  studyType: string;
  population: string;
  finding: string;
  limitation: string;
  takeaway: string;
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'info' | 'warning' | 'myth'; title: string; text: string }
  | { type: 'case'; title: string; situation: string; action: string; result: string }
  | { type: 'steps'; title: string; items: { title: string; text: string }[] }
  | { type: 'chart'; chartId: ChartId; caption: string; source: DataSourceKind; sourceNote?: string }
  | { type: 'illustration'; art: string; caption: string }
  | { type: 'quote'; text: string }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'evidence'; level: EvidenceLevel; text: string; referenceIds: string[] };

export type ChartId =
  | 'tdee-composition'
  | 'macro-pie'
  | 'weekly-calories'
  | 'protein-bars'
  | 'weight-longterm'
  | 'weight-moving-average'
  | 'waist-trend'
  | 'weekly-cardio'
  | 'training-distribution'
  | 'steps-trend'
  | 'weight-vs-activity'
  | 'before-after-comparison'
  | 'energy-balance'
  | 'weight-fluctuation';

export interface Article {
  slug: string;
  title: string;
  summary: string;
  section: SectionId | 'home';
  category: string;
  tags: string[];
  updated: string;
  readingMinutes: number;
  level: '入门' | '进阶' | '系统';
  conclusion: string;
  audience: string[];
  evidenceLevel: EvidenceLevel;
  keyPoints: string[];
  illustration: string;
  blocks: ArticleBlock[];
  referenceIds: string[];
  relatedSlugs: string[];
}

export interface Recipe {
  id: string;
  name: string;
  category: '早餐' | '午餐' | '晚餐' | '加餐';
  scenarios: string[];
  ingredients: { name: string; amount: string }[];
  steps: string[];
  nutrition: { kcal: number; protein: number; carb: number; fat: number; fiber: number };
  swaps: string[];
  note: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  originalName?: string;
  region: '国际' | '中国大陆';
  group: '书籍' | '机构网站' | '数据库' | '学术平台' | '专业媒体';
  category: string;
  description: string;
  audience: string;
  authority: string;
  url: string;
  suggested: string;
  author?: string;
  publisher?: string;
  year?: number;
  isbn?: string;
  chineseTitle?: string;
  verified: '已核验' | '待核验';
  verifiedNote?: string;
  evidenceLevel?: EvidenceLevel;
  pros?: string;
  limits?: string;
  coreIdeas?: string;
}

export interface ExerciseMove {
  id: string;
  name: string;
  art: string;
  category: string;
  features: string;
  suitable: string;
  intensity: string;
  duration: string;
  mistakes: string[];
  safety: string;
}

export interface TrainingPlan {
  id: string;
  name: string;
  frequency: string;
  suitable: string;
  sessions: {
    day: string;
    focus: string;
    moves: { name: string; sets: string; reps: string; rest: string; intensity: string; art: string; swap: string }[];
  }[];
  progression: string;
  note: string;
}

export interface Quote {
  id: string;
  text: string;
  tag: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  waist?: number;
  note?: string;
}

export interface FoodEntry {
  id: string;
  date: string;
  name: string;
  grams: number;
  kcal: number;
  protein: number;
  carb: number;
  fat: number;
}

export interface ActivityEntry {
  id: string;
  date: string;
  type: string;
  minutes: number;
  intensity: '低' | '中' | '高';
  steps?: number;
  strength?: string;
}
