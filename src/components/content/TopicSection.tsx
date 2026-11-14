import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ChartId, DataSourceKind } from '@/types';
import { Illustration } from '@/components/illustrations';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { Badge, DataTable } from '@/components/ui/Elements';
import { getReferences } from '@/content/evidence';

export interface Topic {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  lead: string;
  paragraphs: string[];
  bullets?: string[];
  art?: string;
  artCaption?: string;
  chartId?: ChartId;
  chartMode?: DataSourceKind;
  referenceIds?: string[];
  links?: { label: string; href: string }[];
  table?: { caption: string; head: string[]; rows: string[][] };
}

export function TopicSection({ topic }: { topic: Topic }) {
  const refs = getReferences(topic.referenceIds ?? []);
  return (
    <section id={topic.id} className="scroll-mt-24 border-t border-line py-12 sm:py-14">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        <div className="min-w-0">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="num text-2xl text-forest/35">{topic.index}</span>
            <p className="eyebrow">{topic.eyebrow}</p>
          </div>
          <h2 className="font-display text-[1.65rem] leading-tight text-ink sm:text-[2rem]">{topic.title}</h2>
          <p className="mt-4 text-[0.95rem] font-medium leading-[1.85] text-forest">{topic.lead}</p>
          {topic.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-[0.9rem] leading-[1.95] text-charcoal/75">{p}</p>
          ))}
          {topic.bullets && (
            <ul className="mt-5 space-y-2.5">
              {topic.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 border-b border-line/60 pb-2.5 text-[0.86rem] leading-relaxed text-charcoal/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />{b}
                </li>
              ))}
            </ul>
          )}
          {topic.table && <DataTable caption={topic.table.caption} head={topic.table.head} rows={topic.table.rows} />}
          {topic.links && (
            <div className="mt-6 flex flex-wrap gap-2">
              {topic.links.map((l) => (
                <Link key={l.href} href={l.href} className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-forest/25 bg-white px-3 py-2 text-xs font-medium text-forest hover:bg-mint">
                  {l.label} <ArrowUpRight size={13} />
                </Link>
              ))}
            </div>
          )}
          {refs.length > 0 && (
            <div className="mt-6 border-l-2 border-line pl-4">
              <p className="eyebrow mb-2">本节依据</p>
              <ul className="space-y-1 text-[0.75rem] leading-relaxed text-charcoal/60">
                {refs.map((r) => <li key={r.id}>{r.author}（{r.year}）· {r.source}{r.doi ? ` · doi:${r.doi}` : ''}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {topic.art && (
            <figure className="border border-line bg-white p-3">
              <Illustration name={topic.art} />
              <figcaption className="mt-2 px-1 text-[0.7rem] leading-relaxed text-mist">{topic.artCaption ?? '本站原创 SVG 示意图，用于解释机制与结构。'}</figcaption>
            </figure>
          )}
          {topic.chartId && (
            <ChartPanel chartId={topic.chartId} defaultMode={topic.chartMode ?? 'demo'} height={230} />
          )}
          {!topic.art && !topic.chartId && <div className="border border-dashed border-line bg-white p-6 text-xs leading-relaxed text-mist"><Badge tone="forest">知识卡片</Badge><p className="mt-3">本节以文字与表格为主，配套图表见数据实验室与相关文章。</p></div>}
        </div>
      </div>
    </section>
  );
}

export function TopicNav({ topics }: { topics: Topic[] }) {
  return (
    <nav aria-label="本页目录" className="border-y border-line bg-white">
      <div className="container table-shell">
        <div className="flex min-w-max gap-1 py-1">
          {topics.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="whitespace-nowrap px-3 py-2.5 text-[0.8rem] text-charcoal/70 hover:text-forest">
              <span className="num mr-1.5 text-[0.65rem] text-mist">{t.index}</span>{t.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
