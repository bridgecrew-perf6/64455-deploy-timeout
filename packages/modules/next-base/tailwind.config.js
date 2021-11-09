const foundation = require('@atelierfabien/next-foundation/config/tailwind');
const shop = require('@atelierfabien/next-shop/config/tailwind');

module.exports = {
  mode: 'jit',
  presets: [foundation(shop())],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
