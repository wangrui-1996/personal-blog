/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化图片处理
  images: {
    unoptimized: true,
  },
  // 确保 ESLint 在构建时运行
  eslint: {
    ignoreDuringBuilds: false,
  },
  // TypeScript 配置
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
