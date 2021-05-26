import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { canonicalizeLocale } from './util';
import { useSite } from './site';
import { usePage } from './page';

export * from 'next-seo';

export function useSeo() {
  const router = useRouter();
  const site = useSite();

  return useMemo(() => {
    const { baseUrl, translations, ...defaults } = site;
    const { asPath, locale, defaultLocale, locales = [] } = router;
    const i18n = site?.i18n?.[locale] ?? translations?.[locale] ?? {};
    const seo = { ...defaults, ...i18n };

    function getUrl(lc) {
      return lc === defaultLocale
        ? `${baseUrl}${asPath}`
        : `${baseUrl}/${lc}${asPath}`;
    }

    seo.site_name = seo.site_name ?? seo.name;

    seo.canonical = getUrl(defaultLocale);

    seo.languageAlternates = [
      {
        hrefLang: 'x-default',
        href: getUrl(defaultLocale),
      },
    ].concat(
      locales.map(lc => ({
        hrefLang: lc,
        href: getUrl(lc),
      }))
    );

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
  }, [router, site]);
}

export function PageSeo({ openGraph, ...props }) {
  const { title, description, openGraph: og } = usePage();
  const seo = { title, description, ...props };
  return <NextSeo {...seo} openGraph={{ ...openGraph, ...og }} />;
}
