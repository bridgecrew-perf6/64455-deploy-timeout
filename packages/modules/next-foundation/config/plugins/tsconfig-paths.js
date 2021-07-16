const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const withTsConfigPaths = () => (nextConfig = {}) => {
  const workspace = process.cwd();

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.resolve.plugins = [
        ...config.resolve.plugins,
        new TsconfigPathsPlugin({
          configFile: join(workspace, 'tsconfig.json')
        }),
      ];

      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [workspace],
          exclude: /node_modules/,
          use: options.defaultLoaders.babel,
        },
      ];

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  })
}

module.exports = withTsConfigPaths;