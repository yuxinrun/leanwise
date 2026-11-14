import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BRAND, GLOBAL_DISCLAIMER, NAV_ITEMS } from '@/content/site';
import { LogoMark } from '@/components/illustrations';
import { DataSourceLegend } from '@/components/common/DataSourceTag';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-cream">
      <div className="container py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="text-lg font-bold tracking-[0.16em]">LEANWISE</p>
                <p className="text-[0.7rem] tracking-[0.14em] text-cream/60">科学减脂 · 理性变瘦</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm font-display text-xl leading-relaxed text-sun">Lose Fat, Not Your Health.</p>
            <p className="mt-2 text-sm text-cream/80">{BRAND.sloganCn}</p>
            <p className="mt-5 max-w-md text-xs leading-[1.9] text-cream/55">{BRAND.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-cream/20 px-3 py-2 text-[0.72rem] text-cream/75">
              <ShieldCheck size={15} className="text-sun" />
              个人记录默认只保存在你的浏览器，不上传服务器
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4 text-sun">栏目导航</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.82rem]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/70 transition-colors hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-sun">快速开始</p>
            <ul className="space-y-3 text-[0.82rem] text-cream/70">
              <li><Link className="inline-flex items-center gap-1 hover:text-white" href="/tools">估算你的能量需求 <ArrowUpRight size={13} /></Link></li>
              <li><Link className="inline-flex items-center gap-1 hover:text-white" href="/lab">开始记录体重趋势 <ArrowUpRight size={13} /></Link></li>
              <li><Link className="inline-flex items-center gap-1 hover:text-white" href="/articles/energy-balance">读第一篇：能量平衡 <ArrowUpRight size={13} /></Link></li>
              <li><Link className="inline-flex items-center gap-1 hover:text-white" href="/resources">查证专业资源 <ArrowUpRight size={13} /></Link></li>
              <li><Link className="inline-flex items-center gap-1 hover:text-white" href="/about">编辑原则与内容边界 <ArrowUpRight size={13} /></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-8">
          <p className="eyebrow mb-4 text-sun">图表数据如何区分</p>
          <div className="text-cream/70 [&_p]:text-cream/70"><DataSourceLegend /></div>
        </div>

        <div className="mt-10 border-t border-cream/15 pt-6 text-[0.72rem] leading-[1.9] text-cream/45">
          <p>{GLOBAL_DISCLAIMER}</p>
          <p className="mt-2">本站不提供医学诊断、药物方案或固定期限的减重承诺；不宣扬极端节食，不制造身材焦虑。所有金句均为本站原创文案。</p>
          <p className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} LEANWISE · 科学减脂知识平台</span>
            <span>内容以科普为目的，最后更新：2026 年 11 月</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
