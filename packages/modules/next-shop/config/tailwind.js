const path = require('path');

const local = path.resolve(path.join(__dirname, '..'));

module.exports = (config = {}) => {
  return {
    content: [`${local}/**/*.{js,jsx,ts,tsx}`, ...(config.content || [])],
    ...config,
  };
};
