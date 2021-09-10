// const { i18n } = require('./next-i18next.config')

module.exports = {
  // i18n,
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  }
};