module.exports = (config = {}) => ({
  logBuild: false,
  ...config,
  pages: {
    '*': ['common', 'app'],
    ...config.pages,
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`@app/translations/${lang}/${ns}`).then((m) => m.default);
  },
});
