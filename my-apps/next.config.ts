
export default nextConfig;

import { defineConfig } from 'next';

const nextConfig = defineConfig({
  output: 'export', // 必須：これがないと `out/` が生成されない
});

export default nextConfig;
