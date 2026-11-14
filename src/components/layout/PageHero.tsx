import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Illustration } from '@/components/illustrations';
import { Badge } from '@/components/ui/Elements';

export function PageHero({
  eyebrow, title, description, art, breadcrumb, tags, aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  art?: string;
  breadcrumb?: { label: string; href: string }[];
  tags?: string[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-mint/45">
      <div className="container py-10 sm:py-14">
        {breadcrumb && (
          <nav aria-label="面包屑" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-mist">
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                <Link href={b.href} className="hover:text-forest hover:underline">{b.label}</Link>
              </span>
            ))}
          </nav>
        )}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="font-display text-display text-ink">{title}</h1>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.9] text-charcoal/75">{description}</p>
            {tags && <div className="mt-6 flex flex-wrap gap-2">{tags.map((t) => <Badge key={t} tone="forest">{t}</Badge>)}</div>}
            {aside && <div className="mt-7">{aside}</div>}
          </div>
          {art && (
            <div className="hidden rounded-sm border border-line bg-white p-3 shadow-card lg:block">
              <Illustration name={art} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
