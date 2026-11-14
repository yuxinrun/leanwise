import type { Article, ArticleBlock, ChartId, DataSourceKind, EvidenceLevel, Reference, SectionId } from '@/types';
import { getReferences } from '@/content/evidence';
import { hashString } from '@/lib/utils';

/**
 * 文章种子 → 完整 Article。
 * 用紧凑的结构化文本描述正文，由工厂补齐统一模板要求的全部章节，
 * 保证 30 篇文章都具备：结论、适合谁、目录、核心概念、原理、证据、
 * 实操、常见错误、案例、图表、行动清单、FAQ、参考文献与相关文章。
 */

export interface ArticleSeed {
  slug: string;
  title: string;
  summary: string;
  section: SectionId | 'home';
  category: string;
  tags: string[];
  updated?: string;
  readingMinutes?: number;
  level?: Article['level'];
  conclusion: string;
  audience: string[];
  evidenceLevel: EvidenceLevel;
  keyPoints: string[];
  illustration: string;
  chart: { id: ChartId; caption: string; source: DataSourceKind; sourceNote?: string };
  evidenceText: string;
  referenceIds: string[];
  relatedSlugs: string[];
  checklist: string[];
  faq: { q: string; a: string }[];
  quote?: string;
  caseStudy: { title: string; situation: string; action: string; result: string };
  /** '# ' 标题、'- ' 列表项、'> ' 提示框，其余为段落 */
  body: string[];
  table?: { after: string; caption: string; head: string[]; rows: string[][] };
}

function heading(text: string): ArticleBlock {
  return { type: 'heading', text, id: `sec-${hashString(text) % 100000}` };
}

function parseBody(lines: string[]): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) { blocks.push({ type: 'list', items: list }); list = []; }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('# ')) { flush(); blocks.push(heading(line.slice(2))); }
    else if (line.startsWith('- ')) { list.push(line.slice(2)); }
    else if (line.startsWith('> ')) { flush(); blocks.push({ type: 'callout', tone: 'warning', title: '适用边界', text: line.slice(2) }); }
    else { flush(); blocks.push({ type: 'paragraph', text: line }); }
  }
  flush();
  return blocks;
}

export function defineArticle(seed: ArticleSeed): Article {
  const body = parseBody(seed.body);
  if (seed.table) {
    const idx = body.findIndex((b) => b.type === 'heading' && b.text === seed.table!.after);
    const tableBlock: ArticleBlock = {
      type: 'table', caption: seed.table.caption, head: seed.table.head, rows: seed.table.rows,
    };
    body.splice(idx >= 0 ? idx + 1 : body.length, 0, tableBlock);
  }

  const blocks: ArticleBlock[] = [
    heading('核心概念'),
    { type: 'list', items: seed.keyPoints },
    ...(seed.quote ? [{ type: 'quote', text: seed.quote } as ArticleBlock] : []),
    ...body,
    heading('研究证据'),
    { type: 'evidence', level: seed.evidenceLevel, text: seed.evidenceText, referenceIds: seed.referenceIds },
    heading('真实生活案例'),
    { type: 'case', ...seed.caseStudy },
    heading('图表与插画解释'),
    { type: 'illustration', art: seed.illustration, caption: '本站原创 SVG 示意图，用于解释机制与结构，不代表个体测量数据。' },
    { type: 'chart', chartId: seed.chart.id, caption: seed.chart.caption, source: seed.chart.source, sourceNote: seed.chart.sourceNote },
    heading('行动清单'),
    { type: 'checklist', title: '下一步可以这样做', items: seed.checklist },
    heading('常见问题'),
    { type: 'faq', items: seed.faq },
  ];

  return {
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    section: seed.section,
    category: seed.category,
    tags: seed.tags,
    updated: seed.updated ?? '2026-11-14',
    readingMinutes: seed.readingMinutes ?? 9,
    level: seed.level ?? '入门',
    conclusion: seed.conclusion,
    audience: seed.audience,
    evidenceLevel: seed.evidenceLevel,
    keyPoints: seed.keyPoints,
    illustration: seed.illustration,
    blocks,
    referenceIds: seed.referenceIds,
    relatedSlugs: seed.relatedSlugs,
  };
}

export function articleReferences(article: Article): Reference[] {
  return getReferences(article.referenceIds);
}
