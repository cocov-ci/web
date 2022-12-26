const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  async headers() {
    return [
      {
        source: '/pages/api/:path*',
        headers: [
          {
            key: 'content-type',
            value: 'application/json',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
