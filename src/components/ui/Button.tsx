import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'orange';
type Size = 'sm' | 'md' | 'lg';

export function buttonStyles(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none rounded-sm',
    {
      'bg-forest text-white hover:bg-ink': variant === 'primary',
      'border border-forest/35 text-forest hover:bg-forest/5': variant === 'outline',
      'text-forest hover:bg-forest/8 px-0': variant === 'ghost',
      'bg-white text-ink hover:bg-mint': variant === 'light',
      'bg-orange text-white hover:bg-[#D58742]': variant === 'orange',
    },
    {
      'text-xs px-3.5 py-2': size === 'sm',
      'text-sm px-5 py-2.5': size === 'md',
      'text-[0.95rem] px-7 py-3.5': size === 'lg',
    },
    className,
  );
}

interface Styled { variant?: Variant; size?: Size }

export function Button({ variant, size, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & Styled) {
  return <button className={buttonStyles(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & Styled & { href: string }) {
  return <Link href={href} className={buttonStyles(variant, size, className)} {...props} />;
}
