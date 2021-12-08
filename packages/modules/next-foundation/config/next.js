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

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

const defaults = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 100,
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
