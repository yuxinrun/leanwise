import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { LabDashboard } from '@/components/lab/LabDashboard';
import { ChartGallery } from '@/components/charts/ChartGallery';
import { SectionHeading, Callout } from '@/components/ui/Elements';
import { DataSourceLegend } from '@/components/common/DataSourceTag';

export const metadata: Metadata = {
  title: '数据实验室 — 体重追踪、饮食与运动记录、个人进度仪表盘',
  description: '在本地浏览器记录体重、腰围、饮食与运动，自动计算 7 日移动平均与趋势，展示个人进度仪表盘；数据可导出、导入或一键删除，不上传服务器。',
};

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow="LAB · 数据实验室"
        title="把感觉，变成可以复盘的数据"
        description="体重、饮食、运动三类记录 + 个人进度仪表盘。默认只保存在你的浏览器，图表自动区分「个人记录」「模拟数据」与「真实数据」。"
        art="WeightScale"
        breadcrumb={[{ label: '首页', href: '/' }, { label: '数据实验室', href: '/lab' }]}
        tags={['体重 7 日均值', '30 日趋势', '饮食营养统计', '每周活动量', '本地保存']}
      />

      <section id="dashboard" className="container scroll-mt-24 py-12"><LabDashboard /></section>

      <section id="charts" className="scroll-mt-24 border-t border-line bg-mint/40 py-12">
        <div className="container">
          <SectionHeading eyebrow="CHART SYSTEM · 可复用 ECharts 组件" title="14 类统一图表，全部可交互" description="支持响应式布局、Tooltip、清晰图例、单位说明与空数据状态；可在真实数据、模拟数据与个人记录之间切换。" />
          <div className="mt-8"><ChartGallery /></div>
          <div className="mt-8 border-t border-line pt-6"><DataSourceLegend /></div>
          <Callout tone="warning" title="不要把模拟数据当成研究结果">
            图表中的模拟数据仅为演示形态而构造，不代表任何真实研究、个人情况或产品效果；真实数据均注明公开出处与适用条件。涉及两条曲线的图表会额外提示「相关不等于因果」。
          </Callout>
        </div>
      </section>

      <section id="privacy-note" className="container scroll-mt-24 py-10">
        <SectionHeading eyebrow="PRIVACY BY DEFAULT" title="数据隐私设计" />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { t: '不上传', d: '没有账号体系，没有记录接口，个人健康数据不会离开当前设备。' },
            { t: '可携带', d: '一键导出 JSON，可在另一台设备导入，格式清晰可读。' },
            { t: '可清除', d: '一键删除全部本地记录；清除前建议先导出备份。' },
          ].map((x) => <div key={x.t} className="border border-line bg-white p-5"><p className="font-display text-lg text-ink">{x.t}</p><p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/70">{x.d}</p></div>)}
        </div>
      </section>
    </>
  );
}
