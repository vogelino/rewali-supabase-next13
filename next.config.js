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
              `img-src 'self' https://www.gravatar.com https://en.gravatar.com https://secure.gravatar.com data: blob:`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} https://en.gravatar.com https://www.gravatar.com`,
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
}

module.exports = nextConfig
