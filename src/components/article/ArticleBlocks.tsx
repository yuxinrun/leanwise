import { ExternalLink, FlaskConical, Lightbulb, UserRound } from 'lucide-react';
import type { ArticleBlock, Reference } from '@/types';
import { Callout, DataTable, Badge } from '@/components/ui/Elements';
import { Illustration } from '@/components/illustrations';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { QuoteBlock } from '@/components/common/QuoteBlock';
import { DataSourceTag } from '@/components/common/DataSourceTag';
import { EVIDENCE_LABELS } from '@/content/principles';
import { ChecklistBlock, FaqBlock } from './BlockViews';

export function ReferenceCard({ reference: r, index }: { reference: Reference; index: number }) {
  return (
    <div className="border-t border-line py-5">
      <div className="flex gap-3">
        <span className="num pt-0.5 text-xs text-mist">[{index + 1}]</span>
        <div className="min-w-0">
          <p className="text-[0.9rem] font-medium leading-snug text-ink">{r.title}</p>
          <p className="mt-1 text-xs text-charcoal/65">{r.author} · {r.year} · {r.source}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem]">
            {r.doi && <span className="text-mist">DOI: {r.doi}</span>}
            {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-forest hover:underline">{r.pmid ? `PubMed PMID ${r.pmid}` : '查看原文 / 机构页面'} <ExternalLink size={11} /></a>}
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.78rem] leading-relaxed sm:grid-cols-2">
            <div><dt className="inline font-semibold text-ink">研究类型：</dt><dd className="inline text-charcoal/70">{r.studyType}</dd></div>
            <div><dt className="inline font-semibold text-ink">研究对象：</dt><dd className="inline text-charcoal/70">{r.population}</dd></div>
            <div className="sm:col-span-2"><dt className="inline font-semibold text-ink">主要结果：</dt><dd className="inline text-charcoal/70">{r.finding}</dd></div>
            <div className="sm:col-span-2"><dt className="inline font-semibold text-ink">研究局限：</dt><dd className="inline text-charcoal/70">{r.limitation}</dd></div>
            <div className="sm:col-span-2"><dt className="inline font-semibold text-ink">对普通人的意义：</dt><dd className="inline text-charcoal/70">{r.takeaway}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function ArticleBlocks({ blocks, references, slug }: { blocks: ArticleBlock[]; references: Reference[]; slug: string }) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={i} id={block.id}>{block.text}</h2>;
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'list':
            return block.ordered
              ? <ol key={i}>{block.items.map((x, j) => <li key={j}>{x}</li>)}</ol>
              : <ul key={i}>{block.items.map((x, j) => <li key={j}>{x}</li>)}</ul>;
          case 'table':
            return <DataTable key={i} caption={block.caption} head={block.head} rows={block.rows} />;
          case 'callout':
            return <Callout key={i} tone={block.tone} title={block.title}>{block.text}</Callout>;
          case 'case':
            return (
              <div key={i} className="my-8 border-l-[3px] border-sun bg-white p-5 sm:p-6">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><UserRound size={15} className="text-forest" />{block.title}</p>
                <dl className="space-y-2.5 text-[0.86rem] leading-relaxed">
                  {[['情境', block.situation], ['做法', block.action], ['结果与解读', block.result]].map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-4">
                      <dt className="font-medium text-ink">{k}</dt><dd className="text-charcoal/75">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          case 'steps':
            return (
              <div key={i} className="my-8">
                <p className="mb-4 text-sm font-semibold text-ink">{block.title}</p>
                <ol className="space-y-3">{block.items.map((s, j) => (
                  <li key={j} className="flex gap-3 border-b border-line/70 pb-3">
                    <span className="num pt-0.5 text-xs text-forest">{String(j + 1).padStart(2, '0')}</span>
                    <div><p className="font-medium text-ink">{s.title}</p><p className="mt-1 text-[0.85rem] text-charcoal/70">{s.text}</p></div>
                  </li>
                ))}</ol>
              </div>
            );
          case 'chart':
            return (
              <figure key={i} className="my-8">
                <ChartPanel chartId={block.chartId} defaultMode={block.source === 'reference' ? 'reference' : 'demo'} height={270} />
                <figcaption className="mt-2 text-xs leading-relaxed text-mist">{block.caption}{block.sourceNote ? ` · ${block.sourceNote}` : ''}</figcaption>
                <DataSourceTag kind={block.source} className="mt-1.5" />
              </figure>
            );
          case 'illustration':
            return (
              <figure key={i} className="my-8 border border-line bg-white p-4 sm:p-6">
                <div className="mx-auto max-w-[420px]"><Illustration name={block.art} /></div>
                <figcaption className="mt-3 text-center text-xs text-mist">{block.caption}</figcaption>
              </figure>
            );
          case 'quote':
            return <div key={i} className="my-9"><QuoteBlock text={block.text} tag="本文观点" /></div>;
          case 'checklist':
            return <ChecklistBlock key={i} title={block.title} items={block.items} storageKey={slug} />;
          case 'faq':
            return <FaqBlock key={i} items={block.items} />;
          case 'evidence':
            return (
              <div key={i} className="my-7 border border-line bg-white p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <FlaskConical size={16} className="text-forest" />
                  <Badge tone="forest">{EVIDENCE_LABELS[block.level].label}</Badge>
                  <span className="text-[0.72rem] text-mist">{EVIDENCE_LABELS[block.level].desc}</span>
                </div>
                <p className="text-[0.88rem] leading-[1.9] text-charcoal/80">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}

      <h2 id="references">参考文献</h2>
      <p className="text-[0.82rem] text-mist">以下条目可通过 DOI 或 PubMed 链接核验；未核实到 DOI / PMID 的条目使用机构页面或检索入口，本站不填写未经确认的标识符。</p>
      <div className="mt-5">
        {references.map((r, i) => <ReferenceCard key={r.id} reference={r} index={i} />)}
      </div>
      <div className="mt-6 flex gap-3 border border-line bg-mint/40 p-4">
        <Lightbulb size={17} className="mt-0.5 shrink-0 text-forest" />
        <p className="text-[0.8rem] leading-relaxed text-charcoal/75">
          证据分级说明：{EVIDENCE_LABELS.strong.label}（系统综述 / Meta 分析 / 一致的 RCT）、{EVIDENCE_LABELS.moderate.label}（RCT 或高质量队列，结论受条件限制）、{EVIDENCE_LABELS.limited.label}（小样本或机制推论）、{EVIDENCE_LABELS.insufficient.label}（缺乏可靠人体研究）。相关不等于因果，动物实验不直接等同于人体证据。
        </p>
      </div>
    </div>
  );
}
