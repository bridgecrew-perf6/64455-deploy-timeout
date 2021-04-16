const path = require('path');

const foundation = path.resolve(path.join(__dirname, '..'));

module.exports = (config = {}) => {
  return {
    purge: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './slices/**/*.{js,jsx,ts,tsx}',
      `${foundation}/**/*.{js,jsx,ts,tsx}`,
      ...(config.purge || []),
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
};
