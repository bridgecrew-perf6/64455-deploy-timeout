const path = require('path');

const local = path.resolve(path.join(__dirname, '..'));

module.exports = (config = {}) => {
  const { content, extend, ...overrides } = config;
  return {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './slices/**/*.{js,jsx,ts,tsx}',
      `${local}/**/*.{js,jsx,ts,tsx}`,
      ...(content || []),
    ],
    theme: {
      extend: {
        // setup UIkit breakpoints
        screens: {
          sm: '640px',
          md: '960px',
          lg: '1200px',
          xl: '1600px',
        },
        colors: {
          primary: '#1e87f0',
          secondary: '#222',
          success: '#32d296',
          warning: '#faa05a',
          danger: '#f0506e',
        },
        ...extend,
      },
    },
    ...overrides,
  };
};
