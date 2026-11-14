import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

export function Badge({ children, className, tone = 'neutral' }: { children: ReactNode; className?: string; tone?: 'neutral' | 'forest' | 'orange' | 'sun' }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[0.68rem] font-medium tracking-wide',
      {
        'border-line bg-white text-charcoal/70': tone === 'neutral',
        'border-forest/25 bg-forest/10 text-forest': tone === 'forest',
        'border-orange/40 bg-orange/10 text-[#9A5B22]': tone === 'orange',
        'border-sun/70 bg-sun/20 text-[#7A5A17]': tone === 'sun',
      },
      className,
    )}>{children}</span>
  );
}

export function SectionHeading({
  eyebrow, title, description, action, align = 'left', className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', align === 'center' && 'text-center sm:flex-col sm:items-center', className)}>
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-[1.75rem] leading-tight text-ink sm:text-[2.35rem]">{title}</h2>
        {description && <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-[0.95rem]">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Callout({
  tone = 'info', title, children,
}: {
  tone?: 'info' | 'warning' | 'myth' | 'success';
  title: string;
  children: ReactNode;
}) {
  const icon = { info: Info, warning: AlertTriangle, myth: XCircle, success: CheckCircle2 }[tone];
  const Icon = icon;
  return (
    <div className={cn(
      'my-7 border-l-[3px] px-5 py-4 sm:px-6',
      {
        'border-forest bg-mint/60': tone === 'info',
        'border-orange bg-orange-soft/50': tone === 'warning',
        'border-[#B4652B] bg-[#FBEDE2]': tone === 'myth',
        'border-forest bg-forest/8': tone === 'success',
      },
    )}>
      <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink"><Icon size={16} strokeWidth={2} />{title}</p>
      <div className="text-[0.9rem] leading-[1.85] text-charcoal/85">{children}</div>
    </div>
  );
}

export function DataTable({ caption, head, rows }: { caption?: string; head: string[]; rows: string[][] }) {
  return (
    <figure className="my-8">
      <div className="table-shell rounded-sm border border-line bg-white">
        <table className="w-full min-w-[520px] text-left text-[0.86rem]">
          <thead className="bg-mint/70 text-ink">
            <tr>{head.map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-line/70 align-top">
                {row.map((cell, j) => <td key={j} className={cn('px-4 py-3 leading-relaxed text-charcoal/80', j === 0 && 'font-medium text-ink')}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-2 text-xs text-mist">{caption}</figcaption>}
    </figure>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-forest/25 bg-white/60 px-6 py-14 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      <p className="max-w-md text-sm leading-relaxed text-charcoal/65">{description}</p>
      {action}
    </div>
  );
}
