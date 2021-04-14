const { dirname } = require('path');

const foundation = dirname(require.resolve('@atelierfabien/next-foundation'));

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './slices/**/*.{js,jsx,ts,tsx}',
    `${foundation}/**/*.{js,jsx,ts,tsx}`,
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
