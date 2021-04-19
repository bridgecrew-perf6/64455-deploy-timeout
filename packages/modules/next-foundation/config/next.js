const withPlugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules');
const withTranslations = require('next-translate');

const withPreval = require('next-plugin-preval/config')();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = (config = {}) => {
  const { transpile = {}, plugins = [], ...nextConfig } = config;

  const withTM = transpileModules(
    ['@atelierfabien/next-foundation', ...(transpile.modules || [])],
    {
      resolveSymlinks: true,
      ...transpile.options,
    }
  );

  return withPlugins(
    [
      withPreval(), // first
      withTM, // second
      withTranslations,
      withBundleAnalyzer,
      ...plugins,
    ],
    nextConfig
  );
};
