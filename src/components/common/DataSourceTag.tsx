import { BarChart3, FlaskConical, LockKeyhole } from 'lucide-react';
import type { DataSourceKind } from '@/types';
import { cn } from '@/lib/utils';

const CONFIG = {
  reference: { label: '真实数据', icon: BarChart3, className: 'border-forest/25 bg-forest/8 text-forest' },
  demo: { label: '模拟数据', icon: FlaskConical, className: 'border-orange/40 bg-orange/10 text-[#9A5B22]' },
  personal: { label: '个人记录', icon: LockKeyhole, className: 'border-sun/70 bg-sun/20 text-[#7A5A17]' },
} as const;

export function DataSourceTag({ kind, note, className }: { kind: DataSourceKind; note?: string; className?: string }) {
  const c = CONFIG[kind];
  const Icon = c.icon;
  return (
    <div className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] leading-relaxed', className)}>
      <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-sm border px-2 py-0.5 font-medium', c.className)}>
        <Icon size={12} strokeWidth={2.2} />{c.label}
      </span>
      {note && <span className="text-mist">{note}</span>}
    </div>
  );
}

export function DataSourceLegend() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {Object.entries(CONFIG).map(([key, c]) => {
        const Icon = c.icon;
        const info = {
          reference: '来自公开文献或权威机构统计，旁边注明出处与适用条件。',
          demo: '为演示图表而构造的示例数据，不代表研究结果或个人情况。',
          personal: '你在本地浏览器录入的记录，不会上传服务器。',
        }[key]!;
        return (
          <div key={key} className="flex gap-2.5 border-t border-line pt-3">
            <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border', c.className)}><Icon size={13} /></span>
            <div>
              <p className="text-xs font-semibold text-ink">{c.label}</p>
              <p className="mt-0.5 text-[0.72rem] leading-relaxed text-charcoal/65">{info}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
