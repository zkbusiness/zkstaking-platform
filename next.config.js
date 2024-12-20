/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    if (dev) {
      config.stats = 'errors-only';
    }
    return config
  },
};

module.exports = nextConfig;
