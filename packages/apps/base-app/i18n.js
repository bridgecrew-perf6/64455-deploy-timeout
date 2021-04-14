module.exports = {
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'app'],
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`./src/translations/${lang}/${ns}`).then(m => m.default);
  },
};
