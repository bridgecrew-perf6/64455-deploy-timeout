const config = require('@atelierfabien/next-foundation/config/next');

module.exports = config({
  redirects: async () => [fbLocaleRedirect('/nl/:path*', 'nl')],
  rewrites: async () => [
    {
      source: '/sitemap.xml',
      destination: '/api/sitemap',
    },
  ],
  transpile: {
    modules: ['@atelierfabien/next-shop', '@atelierfabien/next-sanity'],
  },
  experimental: {
    scrollRestoration: true,
  },
});

function fbLocaleRedirect(destination, ...values) {
  const match = `^(${values.join('|')}).*?`;
  return {
    has: [{ type: 'header', key: 'x-facebook-locale', value: match }],
    source: '/:path*',
    destination,
    permanent: true,
  };
}
