import { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from './navigation';
import { get, canonicalizeLocale } from './util';
import { useSite } from './site';
import { usePage } from './page';

export * from 'next-seo';

// Example
//
// export const getStaticProps = async context => {
//   const document = await fetchDocument(context);
//   if (document) {
//     const props = await getPageProps(context, {
//       page: {
//         title: document.title,
//         router: {
//           path: `/pages/${document.slug}`,
//           canonical: `/pages/${document.slug}`,
//           locales: {
//             en: `/pages/${document.slug}/en`,
//             nl: `/pages/${document.slug}/nl`,
//           },
//         },
//       },
//     });
//     return {
//       props,
//     };
//   } else {
//     return { notFound: true };
//   }
// };

export function useSeo() {
  const router = useRouter();
  const site = useSite();

  return useMemo(() => {
    const { baseUrl, translations, ...defaults } = site;
    const { asPath, locale, defaultLocale, locales = [] } = router;
    const i18n = site?.i18n?.[locale] ?? translations?.[locale] ?? {};
    const seo = { ...defaults, ...i18n };

    const pathname = get(router, ['page', 'path'], asPath);
    const canonical = get(router, ['page', 'canonical']);

    function getUrl(lc, path) {
      if (typeof path === 'string') return `${baseUrl}${path}`;
      path = path ?? get(router, ['page', 'locales', lc], pathname);
      return lc === defaultLocale
        ? `${baseUrl}${path}`
        : `${baseUrl}/${lc}${path}`;
    }

    seo.site_name = seo.site_name ?? seo.name;

    seo.canonical = getUrl(locale, canonical);

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
