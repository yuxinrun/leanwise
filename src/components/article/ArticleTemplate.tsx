import Link from 'next/link';
import { ArrowUpRight, BookOpen, CalendarDays, ChevronRight, Clock3, ShieldCheck } from 'lucide-react';
import type { Article } from '@/types';
import { Badge } from '@/components/ui/Elements';
import { Illustration } from '@/components/illustrations';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleBlocks } from '@/components/article/ArticleBlocks';
import { EVIDENCE_LABELS } from '@/content/principles';
import { articleReferences, relatedArticles } from '@/content/articles';
import { GLOBAL_DISCLAIMER } from '@/content/site';
import { formatDateCN } from '@/lib/utils';

export function ArticleTemplate({ article }: { article: Article }) {
  const references = articleReferences(article);
  const related = relatedArticles(article.slug);
  const headings = article.blocks.filter((b) => b.type === 'heading') as Extract<import('@/types').ArticleBlock, { type: 'heading' }>[];
  const toc = [...headings.map((h) => ({ id: h.id ?? '', text: h.text })), { id: 'references', text: '参考文献' }, { id: 'related', text: '相关文章' }];
  const ev = EVIDENCE_LABELS[article.evidenceLevel];

  return (
    <article>
      <header className="border-b border-line bg-mint/45">
        <div className="container py-10 sm:py-14">
          <nav aria-label="面包屑" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-mist">
            <Link href="/" className="hover:text-forest hover:underline">首页</Link><ChevronRight size={12} />
            <Link href="/articles" className="hover:text-forest hover:underline">全部文章</Link><ChevronRight size={12} />
            <span className="text-charcoal/70">{article.category}</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge tone="forest">{article.category}</Badge>
                <Badge tone="neutral">{article.level}</Badge>
                <Badge tone="neutral">{ev.label}</Badge>
              </div>
              <h1 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.8rem]">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-[0.98rem] leading-[1.9] text-charcoal/75">{article.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-mist">
                <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />更新于 {formatDateCN(article.updated)}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />约 {article.readingMinutes} 分钟</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen size={13} />{references.length} 篇可核验参考文献</span>
              </div>
            </div>
            <div className="hidden rounded-sm border border-line bg-white p-3 lg:block"><Illustration name={article.illustration} /></div>
          </div>
        </div>
      </header>

      <div className="container py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow mb-4">本文目录</p>
              <nav aria-label="文章目录" className="border-l border-line">
                {toc.map((t) => (
                  <a key={t.id + t.text} href={`#${t.id}`} className="block border-l-2 border-transparent py-1.5 pl-3 text-[0.78rem] leading-snug text-charcoal/65 hover:border-forest hover:text-forest">{t.text}</a>
                ))}
              </nav>
              <div className="mt-7 border-t border-line pt-5">
                <p className="text-[0.7rem] leading-relaxed text-mist">{ev.desc}</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            {/* 一句话结论 */}
            <section className="border-l-[3px] border-forest bg-mint/50 px-5 py-5 sm:px-7 sm:py-6">
              <p className="eyebrow mb-2">一句话结论</p>
              <p className="font-display text-[1.15rem] leading-[1.75] text-ink sm:text-[1.35rem]">{article.conclusion}</p>
            </section>

            {/* 适合谁阅读 */}
            <section className="mt-7">
              <p className="mb-3 text-sm font-semibold text-ink">适合谁阅读</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {article.audience.map((a) => (
                  <li key={a} className="flex gap-2 border-b border-line/70 pb-2 text-[0.83rem] leading-relaxed text-charcoal/70">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-forest" />{a}
                  </li>
                ))}
              </ul>
            </section>

            {/* 移动端目录 */}
            <details className="mt-7 border border-line bg-white p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-medium text-ink">展开本文目录</summary>
              <nav aria-label="文章目录（移动端）" className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {toc.map((t) => <a key={t.id + t.text} href={`#${t.id}`} className="text-[0.78rem] text-charcoal/70 hover:text-forest">{t.text}</a>)}
              </nav>
            </details>

            <div className="mt-10"><ArticleBlocks blocks={article.blocks} references={references} slug={article.slug} /></div>

            {/* 相关文章 */}
            <section id="related" className="mt-14 border-t-2 border-forest/70 pt-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl text-ink">相关文章</h2>
                <Link href="/articles" className="link-arrow text-xs">全部文章 <ArrowUpRight size={13} /></Link>
              </div>
              <div className="grid sm:grid-cols-2">{related.map((r) => <ArticleCard key={r.slug} article={r} compact className="sm:pr-4" />)}</div>
            </section>

            <div className="mt-12 border-t border-line pt-6 text-[0.75rem] leading-[1.9] text-mist">
              <p>{GLOBAL_DISCLAIMER}</p>
              <p className="mt-1.5">本站内容由 LEANWISE 编辑组依据公开文献与专业指南编写，参考文献均可通过 DOI / PubMed 或机构页面核验；不编造论文、DOI、研究结论或书籍出版信息。</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
