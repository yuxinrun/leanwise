# LEANWISE · 科学减脂知识平台

> **Lose Fat, Not Your Health.** 减掉多余脂肪，不透支健康。
>
> 中文科学减脂知识库 + 实战减脂手册 + 体重管理数据实验室。不是减肥博客，而是一个把机制、证据、工具与个人记录串起来的知识平台。

**线上地址**：<https://yuxinrun.github.io/leanwise/>（推送 `main` 后由 GitHub Actions 自动部署）

---

## 一、这个项目解决什么

| 目标 | 站内实现 |
| --- | --- |
| 理解肥胖与脂肪减少的科学原理 | 减脂科学栏目：能量平衡、脂肪代谢、代谢适应、体重波动、减脂速度 |
| 提供可执行、可量化的饮食方案 | 饮食营养栏目：热量管理、三大营养素、12 个可检索食谱、7 种饮食模式评估 |
| 建立可持续的运动习惯 | 运动减脂栏目：8 种有氧图鉴、5 套训练方案、NEAT、组合与运动安全 |
| 处理真实生活里的困难 | 减脂实战栏目：30 天逐日计划、7 类人群指南、平台期与反弹排查流程 |
| 用图表解释复杂知识 | 14 类统一 ECharts 图表 + 28 幅原创 SVG 插画 |
| 记录并分析自己的数据 | 10 个交互工具 + 数据实验室（体重/饮食/运动/仪表盘） |
| 识别伪科学与营销话术 | 证据分级、可核验参考文献、减肥产品核查五步法 |

**核心理念**：不宣扬极端节食，不鼓励快速减重，不制造身材焦虑，不把 BMI 等同于体脂率或健康程度，不宣称局部减脂，不承诺固定时间瘦多少斤，不把短期体重波动误判为脂肪变化。所有健康建议都注明适用范围与局限。

## 二、技术栈

Next.js 15（App Router）、React 19、TypeScript 5、Tailwind CSS 3、shadcn 风格自建 UI 组件、Lucide Icons、Apache ECharts 5（SVG renderer）、MDX、Zod、浏览器 `localStorage`。

- 组件化开发，页面与业务逻辑分离（`app/` 只负责路由与组合，`components/` 负责渲染与交互）。
- 重要数据全部结构化配置（`content/`），图表与 SVG 均有可复用注册表。
- 全部 56 个页面静态生成（SSG），无服务端运行时、无账号体系、无数据上传接口。

## 三、快速开始

环境要求：Node.js ≥ 20.9（开发时使用 22）、pnpm 9。

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 本地开发服务器 |
| `pnpm build` | 常规生产构建（输出到 `.next/`，可用 `pnpm start` 启动） |
| `pnpm build:pages` | GitHub Pages 静态导出（输出到 `out/`，见第六节） |
| `pnpm start` | 启动常规生产构建 |
| `pnpm typecheck` | TypeScript 类型检查 |

## 四、目录结构

```
.
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── scripts/build-pages.mjs        # 静态导出构建（自动推断仓库与 basePath）
├── next.config.mjs                # MDX / 静态导出 / basePath 开关
├── tailwind.config.ts             # 品牌色彩、字体与动效令牌
├── mdx-components.tsx             # MDX 全局组件映射
├── public/                        # 静态资源（可放 images/hero.jpg）
└── src/
    ├── app/                       # 首页 / 9 个栏目 / 文章详情 / 工具详情 / sitemap / robots / 404
    ├── components/
    │   ├── layout/                # 响应式导航、页脚、栏目页头
    │   ├── ui/                    # 按钮、表单、徽章、响应式表格、Tabs
    │   ├── illustrations/         # 28 幅原创 SVG 插画 + 名称注册表
    │   ├── charts/                # EChart 渲染器、14 类 option、数据集、ChartPanel、展厅
    │   ├── home/                  # 独立首页（Hero、原创金句）
    │   ├── article/               # 统一文章模板与区块渲染器
    │   ├── content/               # 栏目知识章节
    │   ├── nutrition/             # 食谱检索、饮食模式对比
    │   ├── training/              # 有氧图鉴、5 套训练方案
    │   ├── practice/              # 30 天逐日计划
    │   ├── resources/             # 资源检索 + 本地收藏
    │   ├── tools/                 # 10 个可交互计算器
    │   └── lab/                   # 数据实验室
    ├── content/                   # 结构化内容配置（文章、证据、食谱、方案、资源、导航…）
    ├── lib/                       # 计算公式、统计、图表主题、本地存储、通用工具
    └── types/                     # 全站共享类型
```

## 五、内容与数据体系

### 文章

30 篇深度文章由 `src/content/articles/` 中的结构化种子经 `define.ts` 生成，统一补齐：一句话结论、适合谁阅读、目录、核心概念、科学原理、研究证据、实操方法、常见错误、生活案例、图表与 SVG 解释、行动清单、常见问题、参考文献、相关文章。

新增文章只需在对应 `part*.ts` 中追加一个 seed，模板结构、目录、文献卡片与相关文章会自动生成。

### 证据

`src/content/evidence.ts` 收录 26 条可公开检索的真实研究与机构文件，每条含作者、年份、期刊、DOI/PMID、研究对象、主要结果、研究局限与对普通人的实际意义。证据分四级：证据较充分 / 有一定证据 / 证据有限 / 尚无充分证据。

**未核实到可靠来源的 DOI、PMID、ISBN、中文译名与出版信息一律留空并标注「待核验」**，不编造论文、结论、书目或引用。动物实验不直接等同于人体证据，相关性不表述为因果。

### 三类数据严格区分

| 类型 | 含义 | 展示方式 |
| --- | --- | --- |
| 真实数据 | 公开文献或权威机构的统计 | 图表旁注明出处与适用条件 |
| 模拟数据 | 为演示图表形态构造 | 明确标注「模拟数据 · 仅作演示」 |
| 个人记录 | 用户在浏览器本地录入 | 标注「个人记录 · 本地保存」 |

所有图表带 `DataSourceTag`，支持三态切换（有对应数据时）、Tooltip、清晰图例、单位说明与空数据状态；相关性图表额外提示「相关不等于因果」。

### 个人数据隐私

体重、饮食、运动记录与资源收藏只写入浏览器 `localStorage`，服务端不接收任何个人健康数据。数据实验室提供 JSON 导出、导入与一键删除；无账号、无跨设备同步，换设备请用导出文件。

## 六、GitHub Pages 自动部署

### 启用步骤（只需一次）

1. 打开仓库 **Settings → Pages**，在 *Build and deployment → Source* 选择 **GitHub Actions**。
2. 确认 **Settings → Actions → General** 允许 workflow 运行（含 `Read and write permissions` 或本 workflow 显式声明的 `pages: write` / `id-token: write`）。
3. 推送 `main` 分支，或在 **Actions → Deploy to GitHub Pages** 手动 `Run workflow`。
4. 部署完成后访问 <https://yuxinrun.github.io/leanwise/>。

### 触发条件

- `push` 到 `main`
- `workflow_dispatch`（手动）
- `concurrency: pages` 保证同一时刻只有一个部署，且不中断进行中的任务。

### 构建流程

```
pnpm install --frozen-lockfile → pnpm typecheck → pnpm build:pages
   → actions/configure-pages → upload-pages-artifact(out/) → deploy-pages
```

`scripts/build-pages.mjs` 会从 `GITHUB_REPOSITORY`（CI）或 `git remote origin`（本地）推断 owner / repo，并注入：

| 环境变量 | 项目页默认值 | 作用 |
| --- | --- | --- |
| `GITHUB_PAGES` | `true` | 在 `next.config.mjs` 中启用 `output: 'export'`、`basePath`、`trailingSlash` |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://yuxinrun.github.io` | `metadataBase`、canonical、og:url、sitemap、robots、JSON-LD |
| `NEXT_PUBLIC_BASE_PATH` | `/leanwise` | 所有内部链接、`/_next/` 资源、Hero 本地图片路径的前缀 |
| `PAGES_CNAME` | 空 | 设置自定义域名时同时写入 `out/CNAME`，并把 basePath 置空 |

产物 `out/` 中会自动生成 `.nojekyll`（避免 GitHub Pages 忽略 `_next` 目录）、`sitemap.xml`、`robots.txt` 与 `404.html`。

### 本地复现静态导出

```bash
# Linux / macOS
pnpm build:pages                                  # 按项目页默认生成 /leanwise 前缀
NEXT_PUBLIC_BASE_PATH="" pnpm build:pages        # 无前缀，便于本地静态服务器预览
npx serve out                                    # 或 python -m http.server -d out

# Windows PowerShell
$env:NEXT_PUBLIC_BASE_PATH=""; pnpm build:pages
npx serve out
```

> 常规 `pnpm dev` / `pnpm build` 不会启用 `basePath` 与静态导出，本地开发体验不受影响。

### 自定义域名

1. 在 DNS 为域名添加指向 `yuxinrun.github.io` 的 `CNAME` 记录。
2. 仓库 **Settings → Secrets and variables → Actions → Variables** 新增 `CUSTOM_DOMAIN`，值为你的域名。
3. 在 **Settings → Pages → Custom domain** 填入同一域名并保存。
4. 触发一次部署：脚本会写入 `out/CNAME`，自动去掉 `/leanwise` 前缀，并把站点地址改为 `https://<你的域名>`。

## 七、视觉与图片

- 品牌色：森林绿 `#245B45`、深墨绿 `#173C30`、米白 `#F7F6EF`、浅绿 `#E5EFE6`、活力橙 `#E89A51`、柔和黄 `#F2C879`、深灰 `#292D2A`。
- 首页 Hero 独立设计：品牌色渐变 + 原创 SVG 科学装饰 + 生活方式摄影图层，PC / 手机分别适配，不使用前后对比或身材羞辱式素材。
- 摄影图使用已核验可访问的 Unsplash 生活方式图片 URL 作兜底。**替换成自有素材时，把文件放到 `public/images/hero.jpg` 即会自动优先使用本地图片**（多层 CSS 背景顺序已预留，且路径带 `basePath`），无需改代码。
- 28 幅插画全部为手写可编辑 SVG 组件，统一 `viewBox="0 0 240 180"`，通过 `illustrations/index.tsx` 的名称注册表按字符串引用；新增插画只需写一个组件并加入注册表。

## 八、维护指南

| 想做什么 | 改哪里 |
| --- | --- |
| 新增文章 | `src/content/articles/part*.ts` 追加 seed；文献先加入 `content/evidence.ts` |
| 新增工具 | `content/tools.ts` 加元数据 + `components/tools/ToolViews.tsx` 加视图并注册 |
| 新增图表 | `components/charts/datasets.ts` 加数据集 + `buildOption.ts` 处理特殊类型 |
| 新增插画 | `components/illustrations/*.tsx` + `index.tsx` 注册表 |
| 新增食谱 / 训练方案 | `content/recipes.ts` / `content/training.ts` |
| 新增或修正资源 | `content/resources.ts`（务必更新 `verified` 与 `verifiedNote`） |
| 调整导航 / 品牌 | `content/site.ts`、`tailwind.config.ts` |

## 九、部署前与上线后检查

1. 站点地址无需硬编码：CI 自动注入；本地 `pnpm dev` 使用占位域名，只影响本地 canonical 预览。
2. 资源库链接指向机构 / 出版社官方主域名，核验记录写在 `content/resources.ts`（2026-11-14 人工核对，含 `nhc.gov.cn` 返回 412 反爬的说明）。上线后建议定期跑自动化链接检查。
3. 中文译名、ISBN、部分国内教材版次 / 出版社尚未核实，卡片上明确标注「待核验」，请勿当作可引用书目信息。
4. 食谱营养数据均为估算值，不同品牌、生熟重与烹饪用油差异明显，界面已显著说明。
5. 每次发布前执行 `pnpm typecheck && pnpm build:pages`；CI 已内置这两步。

## 十、内容边界

本站内容用于健康科普与自我管理，不构成医疗诊断、治疗方案或个体化营养处方；不提供自行使用减肥药物的方案。未成年人、孕期与哺乳期人群，以及有进食障碍风险、慢性病或正在服药者，请先咨询医生或注册营养师。全部金句均为本站原创文案，不引用未核实的名人名言。
