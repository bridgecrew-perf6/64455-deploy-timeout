const config = require('@atelierfabien/next-foundation/config/i18n');

module.exports = config({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'app', 'lexicons', 'shop'],
  },
});
