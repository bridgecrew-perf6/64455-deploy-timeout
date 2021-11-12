const withPlugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules');
const withTranslations = require('next-translate');

const withPreval = require('next-plugin-preval/config')();

const withRpc = require('next-rpc')();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTsConfigPaths = require('./plugins/tsconfig-paths')();

const coreModules = ['lodash-es', '@atelierfabien/next-foundation'];

const defaults = {
  future: {
    webpack5: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = (config = {}) => {
  const { transpile = {}, plugins = [], ...nextConfig } = config;

  const withTM = transpileModules(
    [...coreModules, ...(transpile.modules || [])],
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
      withRpc,
      withTsConfigPaths,
      ...plugins,
    ],
    { ...defaults, ...nextConfig }
  );
};
