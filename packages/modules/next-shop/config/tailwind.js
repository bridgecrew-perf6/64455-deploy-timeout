const path = require('path');

const local = path.resolve(path.join(__dirname, '..'));

module.exports = (config = {}) => {
  return {
    purge: [`${local}/**/*.{js,jsx,ts,tsx}`, ...(config.purge || [])],
    ...config,
  };
};
