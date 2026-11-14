'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { BRAND, NAV_ITEMS } from '@/content/site';
import { LogoMark } from '@/components/illustrations';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className="hidden border-b border-line/80 bg-ink text-cream md:block">
        <div className="container flex h-8 items-center justify-between text-[0.7rem] tracking-wide">
          <p><span className="font-semibold text-sun">{BRAND.sloganEn}</span>　{BRAND.sloganCn}</p>
          <p className="text-cream/65">科学减脂 · 理性变瘦　|　个人数据默认仅保存在本机</p>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="container flex h-[4.25rem] items-center justify-between gap-4">
          <Link href="/" className="focus-ring flex shrink-0 items-center gap-2.5" aria-label="LEANWISE 首页">
            <LogoMark className="h-9 w-9" />
            <span className="leading-none">
              <span className="block text-[1.05rem] font-bold tracking-[0.16em] text-ink">LEANWISE</span>
              <span className="mt-1 block text-[0.62rem] tracking-[0.15em] text-mist">科学减脂 · 理性变瘦</span>
            </span>
          </Link>

          <nav aria-label="主导航" className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'focus-ring whitespace-nowrap rounded-sm px-2 py-2 text-[0.8rem] transition-colors',
                  isActive(item.href) ? 'font-semibold text-forest' : 'text-charcoal/70 hover:bg-mint/70 hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Link href="/resources" className="focus-ring hidden rounded-sm p-2 text-ink hover:bg-mint sm:inline-flex" aria-label="检索资源库">
              <Search size={18} strokeWidth={1.8} />
            </Link>
            <Link href="/tools" className="focus-ring hidden rounded-sm bg-forest px-3.5 py-2 text-xs font-medium text-white hover:bg-ink xl:inline-flex">
              开始计算
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? '关闭菜单' : '打开菜单'}
              aria-expanded={open}
              className="focus-ring inline-flex rounded-sm border border-line p-2 text-ink hover:bg-mint lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 top-[4.25rem] z-30 lg:hidden">
          <button type="button" aria-label="关闭菜单" className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <nav aria-label="移动端导航" className="relative max-h-[calc(100vh-4.25rem)] overflow-y-auto border-b border-line bg-cream px-5 pb-8 pt-3 shadow-soft">
            <p className="eyebrow mb-3">全部栏目</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="border-b border-line/70">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-baseline gap-2 py-3 text-[0.95rem]',
                      isActive(item.href) ? 'font-semibold text-forest' : 'text-charcoal/85',
                    )}
                  >
                    <span className="num text-[0.65rem] text-mist">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-orange pl-3 text-xs leading-relaxed text-charcoal/70">{BRAND.sloganCn}</p>
          </nav>
        </div>
      )}
    </>
  );
}
