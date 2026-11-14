import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [], rehypePlugins: [] },
});

const isPagesBuild = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // GitHub Pages 提供的是纯静态托管：导出 out/，并让所有资源链接带上 /<repo> 前缀。
  ...(isPagesBuild
    ? { output: 'export', basePath, trailingSlash: true }
    : {}),
};

export default withMDX(nextConfig);
