import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { canonicalizeLocale } from './util';
import { useSite } from './site';

export * from 'next-seo';

export function useSeo() {
  const router = useRouter();
  const site = useSite();

  return useMemo(() => {
    const { baseUrl, translations, ...defaults } = site;
    const { asPath, locale, defaultLocale, locales = [] } = router;
    const i18n = translations?.[locale] || {};
    const seo = { ...defaults, ...i18n };

    function getUrl(lc) {
      return lc === defaultLocale
        ? `${baseUrl}${asPath}`
        : `${baseUrl}/${lc}${asPath}`;
    }

    seo.canonical = getUrl(defaultLocale);

    seo.languageAlternates = locales.map(lc => ({
      hrefLang: lc,
      href: getUrl(lc),
    }));

    seo.openGraph = {
      ...seo.openGraph,
      locale: canonicalizeLocale(locale, true),
    };

    seo.openGraph.url = getUrl(locale);
    seo.openGraph.alternateLocales = locales.reduce((acc, lc) => {
      if (lc === locale) return acc;
      return acc.concat(canonicalizeLocale(lc, true));
    }, []);

    return seo;
  }, [router.asPath, router.locale]);
}

export function PageSeo({ openGraph, ...props }) {
  // workaround for next-seo#544
  return <NextSeo {...props} openGraph={{ ...openGraph }} />;
}
