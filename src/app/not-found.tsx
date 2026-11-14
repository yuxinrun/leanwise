import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[55vh] flex-col items-start justify-center py-16">
      <p className="eyebrow">404 · 页面未找到</p>
      <h1 className="mt-4 font-display text-display text-ink">这一页还没有被写进知识体系</h1>
      <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-charcoal/70">可能是链接已变更，或文章还在编写中。你可以从首页、全部文章或实用工具继续。</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/">返回首页</ButtonLink>
        <ButtonLink href="/articles" variant="outline">浏览全部文章</ButtonLink>
        <ButtonLink href="/tools" variant="outline">打开工具</ButtonLink>
      </div>
    </div>
  );
}
