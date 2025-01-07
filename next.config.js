/** @type {import('next').NextConfig} */

const withbundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    if (!isServer) {
      config.devtool = 'source-map';
    }
    if (dev) {
      config.stats = 'errors-only';
    }
    return config
  },
};

module.exports = withbundleAnalyzer(nextConfig);
