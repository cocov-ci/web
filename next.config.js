const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
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
        source: '/repos',
        has: [
          {
            type: 'cookie',
            key: 'cocov_auth_token',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
