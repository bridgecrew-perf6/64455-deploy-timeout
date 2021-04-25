const foundation = require('@atelierfabien/next-foundation/config/tailwind');

module.exports = {
  mode: 'jit',
  presets: [foundation()],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
