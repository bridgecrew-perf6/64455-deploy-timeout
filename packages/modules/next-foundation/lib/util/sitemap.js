import { joinUrl, mergeObjects, interpolateUrl } from '.';

const pageDefaults = { changefreq: 'weekly', priority: 0.5 };

const registry = [];

export function definePath(path, fn, defaults = {}) {
  registry.push({ path, fn, defaults });
}

export function defineStatic(path = '/', defaults = {}) {
  definePath(
    path,
    ({ locales }) => {
      return locales.map(locale => ({ params: { path: [] }, locale }));
    },
    defaults
  );
}

export function buildUrl(path, locale, params = {}, options = {}) {
  const url = interpolateUrl(joinUrl(locale ? '/[locale]' : '/', path), {
    ...params,
    locale,
  });
  return options.baseUrl ? joinUrl(options.baseUrl, url) : url;
}

export function buildPage(path, page, defaults = {}, options = {}) {
  const { defaultLocale } = options;
  const isDefaultLocale = defaultLocale === page.locale;
  const params = { ...page, ...page.params };

  const url = buildUrl(
    path,
    isDefaultLocale ? null : page.locale,
    params,
    options
  );

  const meta = mergeObjects(pageDefaults, defaults, {
    changefreq: page.changefreq,
    priority: page.priority,
  });

  const alternateRefs = options.locales.map(hreflang => {
    return {
      href: buildUrl(
        path,
        hreflang === defaultLocale ? null : hreflang,
        params,
        options
      ),
      hreflang,
    };
  });

  return {
    loc: url,
    lastmod: page.updatedAt ?? defaults.updatedAt ?? new Date().toISOString(),
    ...meta,
    alternateRefs,
  };
}

export function buildAll(options = {}) {
  const opts = {
    defaultLocale: 'en',
    baseUrl: '/',
    locales: [],
    ...options,
    raw: true,
  };
  const promises = registry.map(async ({ path, fn, defaults }) => {
    const pages = await fn(opts);
    return pages.map(page => buildPage(path, page, defaults, opts));
  });
  return Promise.all(promises).then(v => v.flat());
}
