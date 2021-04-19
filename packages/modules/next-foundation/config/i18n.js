module.exports = (config = {}) => ({
  ...config,
  pages: {
    '*': ['common', 'app'],
    ...config.pages,
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`@app/translations/${lang}/${ns}`).then(m => m.default);
  },
});
