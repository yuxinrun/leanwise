import { z } from 'zod';
import type { ActivityEntry, FoodEntry, WeightEntry } from '@/types';

/** 默认只使用浏览器 localStorage，不上传任何个人健康数据。 */

export const STORAGE_KEYS = {
  weight: 'leanwise:weight',
  food: 'leanwise:food',
  activity: 'leanwise:activity',
  favorites: 'leanwise:favorites',
  settings: 'leanwise:settings',
} as const;

export const weightSchema = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  weight: z.number().min(20).max(400),
  waist: z.number().min(30).max(250).optional(),
  note: z.string().max(200).optional(),
});

export const foodSchema = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().min(1).max(80),
  grams: z.number().min(0).max(10000),
  kcal: z.number().min(0).max(20000),
  protein: z.number().min(0).max(2000),
  carb: z.number().min(0).max(2000),
  fat: z.number().min(0).max(2000),
});

export const activitySchema = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.string().min(1).max(40),
  minutes: z.number().min(0).max(1440),
  intensity: z.enum(['低', '中', '高']),
  steps: z.number().min(0).max(200000).optional(),
  strength: z.string().max(120).optional(),
});

const schemas = { weight: weightSchema, food: foodSchema, activity: activitySchema };
type CollectionKey = keyof typeof schemas;

function safeParseArray<T>(raw: string | null, schema: z.ZodTypeAny): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => schema.safeParse(item).success) as T[];
  } catch {
    return [];
  }
}

export function readCollection<K extends CollectionKey>(key: K): (K extends 'weight' ? WeightEntry : K extends 'food' ? FoodEntry : ActivityEntry)[] {
  if (typeof window === 'undefined') return [];
  const schema = schemas[key];
  return safeParseArray(window.localStorage.getItem(STORAGE_KEYS[key]), schema) as never;
}

export function writeCollection<K extends CollectionKey>(key: K, items: unknown[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(items));
  window.dispatchEvent(new Event('leanwise:data-changed'));
}

export function addEntry<K extends CollectionKey>(key: K, entry: unknown) {
  const items = readCollection(key) as unknown[];
  writeCollection(key, [entry, ...items]);
}

export function removeEntry(key: CollectionKey, id: string) {
  const items = readCollection(key) as { id: string }[];
  writeCollection(key, items.filter((x) => x.id !== id));
}

export function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string) {
  const current = readFavorites();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  window.localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  window.dispatchEvent(new Event('leanwise:data-changed'));
  return next;
}

export interface ExportBundle {
  app: 'LEANWISE';
  version: 1;
  exportedAt: string;
  weight: WeightEntry[];
  food: FoodEntry[];
  activity: ActivityEntry[];
  favorites: string[];
}

export function buildExport(): ExportBundle {
  return {
    app: 'LEANWISE',
    version: 1,
    exportedAt: new Date().toISOString(),
    weight: readCollection('weight') as WeightEntry[],
    food: readCollection('food') as FoodEntry[],
    activity: readCollection('activity') as ActivityEntry[],
    favorites: readFavorites(),
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBundle(json: string): { ok: boolean; message: string } {
  try {
    const parsed = JSON.parse(json) as Partial<ExportBundle>;
    if (parsed.app !== 'LEANWISE') return { ok: false, message: '不是 LEANWISE 导出的数据文件。' };
    const weight = (parsed.weight ?? []).filter((x) => weightSchema.safeParse(x).success);
    const food = (parsed.food ?? []).filter((x) => foodSchema.safeParse(x).success);
    const activity = (parsed.activity ?? []).filter((x) => activitySchema.safeParse(x).success);
    writeCollection('weight', weight);
    writeCollection('food', food);
    writeCollection('activity', activity);
    return { ok: true, message: `已导入 ${weight.length} 条体重、${food.length} 条饮食、${activity.length} 条运动记录。` };
  } catch {
    return { ok: false, message: '文件解析失败，请检查 JSON 格式。' };
  }
}

export function clearAll() {
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
  window.dispatchEvent(new Event('leanwise:data-changed'));
}
