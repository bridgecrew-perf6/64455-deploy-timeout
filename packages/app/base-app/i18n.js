module.exports = {
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  pages: {
    '*': ['common']
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`./src/translations/${lang}/${ns}`).then((m) => m.default);
  }
}