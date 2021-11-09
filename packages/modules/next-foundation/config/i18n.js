// NOTE: pages need to explicitly "export default" in order to work
// see: https://github.com/vinissimus/next-translate/issues/526

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
