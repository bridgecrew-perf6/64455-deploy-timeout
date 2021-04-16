const path = require('path');

const local = path.resolve(path.join(__dirname, '..'));

module.exports = (config = {}) => {
  return {
    purge: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './slices/**/*.{js,jsx,ts,tsx}',
      `${local}/**/*.{js,jsx,ts,tsx}`,
      ...(config.purge || []),
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        // setup UIkit breakpoints
        screens: {
          sm: '640px',
          md: '960px',
          lg: '1200px',
          xl: '1600px',
        },
      },
    },
    ...config,
  };
};
