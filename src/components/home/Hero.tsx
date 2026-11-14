import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { BASE_PATH } from '@/content/site';

/**
 * Hero 视觉：底层为品牌色渐变与原创 SVG 科学装饰，
 * 上层优先使用 public/images/hero.jpg（若存在），否则回退到远程生活方式摄影图。
 * 图片主题为健康饮食与自然光下的日常活动，不使用前后对比或身材羞辱式素材。
 */
function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F6A4E] via-[#245B45] to-[#102A21]" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(180deg, rgba(16,42,33,.10) 0%, rgba(16,42,33,.05) 45%, rgba(16,42,33,.55) 100%), url('${BASE_PATH}/images/hero.jpg'), url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80')`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center',
        }}
      />
      <svg viewBox="0 0 420 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="#F7F6EF" strokeOpacity="0.32" strokeWidth="1">
          <circle cx="330" cy="128" r="72" />
          <circle cx="330" cy="128" r="94" strokeDasharray="3 8" />
          <circle cx="330" cy="128" r="52" strokeOpacity="0.2" />
          <path d="M28 400 H180 M28 414 H140 M28 428 H110" />
          <path d="M60 60 q40 -24 80 0" strokeOpacity="0.22" />
        </g>
        <g fill="#F2C879">
          <circle cx="330" cy="128" r="5" />
          <circle cx="258" cy="128" r="3" fillOpacity="0.7" />
          <circle cx="402" cy="128" r="3" fillOpacity="0.7" />
        </g>
        <g stroke="#E89A51" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M300 150 C310 122 330 108 356 104" />
          <path d="M356 104 l-11 -2 M356 104 l-3 11" />
        </g>
        <text x="28" y="92" fill="#F7F6EF" fillOpacity="0.72" fontSize="11" letterSpacing="3" fontFamily="system-ui, sans-serif">ENERGY IN</text>
        <text x="28" y="112" fill="#F7F6EF" fillOpacity="0.5" fontSize="9" letterSpacing="2" fontFamily="system-ui, sans-serif">ENERGY OUT</text>
        <text x="250" y="232" fill="#F7F6EF" fillOpacity="0.62" fontSize="10" letterSpacing="2" fontFamily="system-ui, sans-serif">BALANCE OVER TIME</text>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-[0.68rem] text-cream/80 sm:bottom-6 sm:left-6">
        <span className="rounded-sm border border-cream/30 bg-ink/35 px-2.5 py-1.5 backdrop-blur-sm">健康生活方式主题摄影 · 原创 SVG 装饰</span>
        <span className="hidden sm:inline">非前后对比 · 非体型评价</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="container">
        <div className="grid min-h-0 lg:min-h-[580px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center py-14 sm:py-16 lg:py-20 lg:pr-12">
            <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sun">
              <span className="h-px w-8 bg-sun" /> LEANWISE · 科学减脂知识平台
            </p>
            <h1 className="font-display text-hero text-cream">科学减脂，<br /><span className="text-sun">不靠饿肚子。</span></h1>
            <p className="mt-7 max-w-xl text-[1rem] leading-[1.9] text-cream/80 sm:text-[1.05rem]">
              从能量平衡到营养管理，从运动计划到行为习惯，用科学的方法建立可持续的减脂系统。
            </p>
            <p className="mt-3 text-[0.85rem] italic tracking-wide text-cream/55">Understand Your Body. Build Better Habits.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/practice#30days" variant="light" size="lg">开始科学减脂 <ArrowRight size={16} /></ButtonLink>
              <ButtonLink href="/science" size="lg" className="border border-cream/40 bg-transparent text-cream hover:bg-cream/10">探索减脂科学</ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/20 pt-6 text-[0.75rem] text-cream/65">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-sun" />不宣扬极端节食</span>
              <span>不承诺「几天瘦几斤」</span>
              <span>不制造身材焦虑</span>
            </div>
          </div>
          <div className="relative min-h-[300px] border-t border-cream/15 sm:min-h-[380px] lg:min-h-full lg:border-l lg:border-t-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
