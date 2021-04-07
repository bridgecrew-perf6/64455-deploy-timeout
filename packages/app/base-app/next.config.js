const withPlugins = require('next-compose-plugins');

const withPreval = require('next-plugin-preval/config')();
const withTranslations = require('next-translate');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const redirects = async () => ([
  fbLocaleRedirect('/nl/:path*', 'nl'),
]);

const nextConfig = {
  redirects
};

module.exports = withPlugins([
  withPreval(),
  withTranslations,
  withBundleAnalyzer
], nextConfig);

function fbLocaleRedirect(destination, ...values) {
  const match = `^(${values.join('|')}).*?`;
  return {
    has: [{ type: 'header', key: 'x-facebook-locale', value: match }],
    source: '/:path*', destination, permanent: true
  }
};
