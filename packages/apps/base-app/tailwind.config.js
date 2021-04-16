const foundation = require('@atelierfabien/next-foundation/config/tailwind');

module.exports = {
  presets: [foundation()],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
