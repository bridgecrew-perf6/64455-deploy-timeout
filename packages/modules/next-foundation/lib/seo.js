import { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { resolveSeoImage } from '@app/config/runtime';
import { useRouter } from './navigation';
import { get, pick, canonicalizeLocale, isBlank } from './util';
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
//       },
//       seo: {
//         title: 'SEO Title ...', // optional
//       },
//       router: {
//         path: `/pages/${document.slug}`,
//         canonical: `/pages/${document.slug}`,
//         locales: {
//           en: `/pages/${document.slug}/en`,
//           nl: `/pages/${document.slug}/nl`,
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

export function useSeo(pageSeo = {}) {
  const router = useRouter();
  const site = useSite();

  return useMemo(() => {
    const { baseUrl, translations, additionalMetaTags, ...defaults } = site;
    const { asPath, locale, defaultLocale, locales = [] } = router;
    const i18n = site?.i18n?.[locale] ?? translations?.[locale] ?? {};
    const { _type, ...page } = { ...pageSeo };
    const { image, images, keywords, ...seo } = {
      ...defaults,
      ...i18n,
      ...page,
    };

    console.log(defaults);

    const pathname = get(router, ['page', 'path'], asPath);
    const canonical = get(router, ['page', 'canonical']);

    let openGraphImages = [];
    let metaKeywords = [];

    function getUrl(lc, path) {
      if (typeof path === 'string') return `${baseUrl}${path}`;
      path = path ?? get(router, ['page', 'locales', lc], pathname);
      return lc === defaultLocale
        ? `${baseUrl}${path}`
        : `${baseUrl}/${lc}${path}`;
    }

    seo.additionalMetaTags = Array.isArray(additionalMetaTags)
      ? [].concat(defaults.additionalMetaTags || []).concat(additionalMetaTags)
      : [].concat(defaults.additionalMetaTags || []);

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
      ...page.openGraph,
      locale: canonicalizeLocale(locale, true),
    };

    seo.openGraph.url = getUrl(locale);
    seo.openGraph.alternateLocales = locales.reduce((acc, lc) => {
      if (lc === locale) return acc;
      return acc.concat(canonicalizeLocale(lc, true));
    }, []);

    if (Array.isArray(images)) {
      openGraphImages = images.map(resolveImage);
    } else if (image) {
      openGraphImages = [resolveImage(image)];
    }

    openGraphImages = openGraphImages.filter(image => image);

    if (openGraphImages.length > 0) {
      seo.openGraph.images = openGraphImages;
    }

    if (Array.isArray(keywords) && keywords.length > 0) {
      metaKeywords = keywords;
    } else if (typeof keywords === 'string') {
      metaKeywords = keywords.split(/\s+,\s+/);
    }

    metaKeywords = metaKeywords.filter(s => !isBlank(s));

    if (metaKeywords.length > 0) {
      seo.additionalMetaTags.push({
        name: 'keywords',
        content: metaKeywords.join(', '),
      });
    }

    return seo;
  }, [pageSeo, router, site]);
}

export function resolveImage(image, _resursive) {
  if (typeof image === 'string') {
    return { url: image };
  } else if (typeof image === 'object' && typeof image?.url === 'string') {
    return pick(image, 'url', 'width', 'height', 'alt');
  } else if (
    typeof image === 'object' &&
    typeof image?.asset === 'object' &&
    typeof resolveSeoImage === 'function' &&
    !_resursive
  ) {
    return resolveImage(resolveSeoImage(image), true);
  }
}

export function PageSeo({ openGraph, ...props }) {
  const { title, description, openGraph: og } = usePage();
  const seo = { title, description, ...props };
  return <NextSeo {...seo} openGraph={{ ...openGraph, ...og }} />;
}
