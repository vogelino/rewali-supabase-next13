/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `img-src 'self' https://www.gravatar.com https://en.gravatar.com https://secure.gravatar.com https://m.media-amazon.com data: blob:`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} https://en.gravatar.com https://www.gravatar.com https://secure.gravatar.com`,
            ].join("; "),
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imdb-api.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'books.google.com',
        port: '',
        pathname: '/books/**',
      },
    ],
  },
}

module.exports = nextConfig
