const { dirname } = require('path');

const mono = dirname(require.resolve('@atelierfabien/mono-next'));

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './slices/**/*.{js,jsx,ts,tsx}',
    `${mono}/**/*.{js,jsx,ts,tsx}`
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
