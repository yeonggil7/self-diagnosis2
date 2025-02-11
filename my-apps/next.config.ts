import type { NextConfig } from "next";


const nextConfig = {
  output: 'export',  // これがないと静的HTMLが生成されない
  images: {
    unoptimized: true  // 画像最適化を無効にする（Firebase Hosting 用）
  }
};

module.exports = {
  reactStrictMode: false, // ← ここを false にする
};

export default nextConfig;
