const nextConfig = {
  output: 'export', // これを追加
  distDir: "out", // これが必要
  trailingSlash: true, // これを追加してみる
  images: { unoptimized: true }, // Firebase Hosting で画像最適化を無効化
  assetPrefix: "/", // 静的ファイルのパスを正しく解決
};

export default nextConfig;
