import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { Article } from '@/types';
import { Badge } from '@/components/ui/Elements';
import { EVIDENCE_LABELS } from '@/content/principles';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, compact = false, className }: { article: Article; compact?: boolean; className?: string }) {
  const ev = EVIDENCE_LABELS[article.evidenceLevel];
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        'group flex flex-col border-b border-line bg-transparent py-5 transition-colors hover:bg-mint/40 focus-ring',
        !compact && 'sm:flex-row sm:gap-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="forest">{article.category}</Badge>
          <span className="text-[0.7rem] text-mist">{ev.label}</span>
          <span className="inline-flex items-center gap-1 text-[0.7rem] text-mist"><Clock3 size={11} />约 {article.readingMinutes} 分钟</span>
        </div>
        <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-forest sm:text-xl">{article.title}</h3>
        <p className={cn('mt-2 text-[0.85rem] leading-relaxed text-charcoal/65', compact && 'line-clamp-2')}>{article.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-mist">
          {article.tags.slice(0, 3).map((t) => <span key={t} className="rounded-sm border border-line px-1.5 py-0.5">#{t}</span>)}
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-forest">阅读全文 <ArrowUpRight size={13} /></span>
        </div>
      </div>
    </Link>
  );
}
