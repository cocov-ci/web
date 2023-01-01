const nextConfig = {
  reactStrictMode: false,
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
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'cocov_auth_token',
          },
        ],
        permanent: false,
        destination: '/repositories',
      },
    ]
  },
}

module.exports = nextConfig
