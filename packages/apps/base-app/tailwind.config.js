const foundation = require('@atelierfabien/next-foundation/config/tailwind');

module.exports = {
  presets: [foundation()],
  preflight: false,
  important: true,
};
