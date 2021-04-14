import locales from '../../data/locales';

export function matchLocale(lc, locales = []) {
  lc = typeof lc === 'string' ? lc : '';
  locales = [].concat(locales || []);
  const [locale, region] = lc.split(/[-_]/);
  const canonical = (region ? [locale, region] : [locale]).join('-');
  const match = locales.find(lc => {
    return canonical === lc;
  });
  return (
    match ??
    locales.find(lc => {
      const [base] = lc.split('-');
      return locale === base;
    })
  );
}

export function canonicalizeLocale(lc, dasherize = false) {
  lc = String(locales[lc] ?? lc ?? 'en');
  return lc
    .replace('-', '_')
    .split('_')
    .map((s, i) => {
      if (i === 1) return s.toUpperCase();
      return s.toLowerCase();
    })
    .join(dasherize ? '_' : '-');
}

export function simplifyLocale(lc) {
  lc = String(locales[lc] ?? lc ?? 'en').toLocaleLowerCase();
  return lc.replace('-', '_').split('_')[0];
}

export function localePaths(entries, locales = []) {
  return entries.reduce((memo, entry) => {
    if (typeof entry === 'object') {
      return memo.concat(locales.map(locale => ({ ...entry, locale })));
    }
    if (typeof entry === 'string') {
      const e = { params: { slug: entry } };
      return memo.concat(locales.map(locale => ({ ...e, locale })));
    }
  }, []);
}
