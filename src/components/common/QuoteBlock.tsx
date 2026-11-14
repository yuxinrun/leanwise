import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuoteBlock({ text, tag, variant = 'light', className }: { text: string; tag?: string; variant?: 'light' | 'dark'; className?: string }) {
  const dark = variant === 'dark';
  return (
    <blockquote className={cn('relative border-l-[3px] py-6 pl-6 sm:py-8 sm:pl-10', dark ? 'border-sun bg-ink' : 'border-orange bg-mint/40', className)}>
      <Quote size={22} className={cn('absolute left-5 top-4 opacity-25 sm:left-8', dark ? 'text-sun' : 'text-forest')} aria-hidden />
      <p className={cn('relative font-display text-xl leading-[1.6] sm:text-[1.65rem]', dark ? 'text-cream' : 'text-ink')}>「{text}」</p>
      <footer className={cn('mt-4 flex items-center gap-3 text-[0.7rem] tracking-wide', dark ? 'text-mint/80' : 'text-charcoal/55')}>
        <span>{tag ?? '科学减脂观点'}</span>
        <span className="h-px w-6 bg-current opacity-40" />
        <span>LEANWISE 本站原创文案</span>
      </footer>
    </blockquote>
  );
}
