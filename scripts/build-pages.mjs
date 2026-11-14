import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages 静态导出。自动从 GITHUB_REPOSITORY（CI）或 git remote（本地）推断
 * owner / repo，注入站点地址与 basePath 后执行 next build，并生成 .nojekyll。
 */

function inferRepository() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const matched = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (matched) return `${matched[1]}/${matched[2]}`;
  } catch {
    // 无 git 信息时由显式环境变量补充
  }
  return null;
}

const repository = inferRepository();
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const customDomain = (process.env.PAGES_CNAME || '').trim();

let origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || '';
let basePath = explicitBasePath !== undefined ? explicitBasePath : '';

if (repository) {
  const [owner, repo] = repository.split('/');
  origin = origin || (customDomain ? `https://${customDomain}` : `https://${owner}.github.io`);
  basePath = explicitBasePath !== undefined ? explicitBasePath : (customDomain ? '' : `/${repo}`);
} else if (!origin) {
  console.error('[pages] 无法推断仓库信息，请设置 GITHUB_REPOSITORY 或 NEXT_PUBLIC_SITE_ORIGIN。');
  process.exit(1);
}

origin = origin.replace(/\/$/, '');
basePath = basePath.replace(/\/$/, '');

const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_SITE_ORIGIN: origin,
  NEXT_PUBLIC_BASE_PATH: basePath,
};

console.log(`[pages] site origin : ${origin}`);
console.log(`[pages] base path   : ${basePath || '(none, custom domain)'}`);
console.log('[pages] building static export into out/ ...');

const result = spawnSync(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'build'], {
  stdio: 'inherit',
  env,
});
if (result.status !== 0) process.exit(result.status ?? 1);

mkdirSync('out', { recursive: true });
writeFileSync(resolve('out/.nojekyll'), '');
if (customDomain) writeFileSync(resolve('out/CNAME'), `${customDomain}\n`);

console.log(`[pages] done. Deploy out/ as: ${origin}${basePath}/`);
