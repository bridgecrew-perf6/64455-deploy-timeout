/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

import { useMemo } from 'react';
import * as ns from 'next-seo';
import { resolveSeoImage } from '@app/config/runtime';
import { useRouter } from './router';

import {
  get,
  pick,
  canonicalizeLocale,
  isBlank,
  lookup,
  mergeObjects,
  blocksToText,
  traverse,
} from './util';

import { useSite } from './site';

import { usePage } from './page';

const { NextSeo, DefaultSeo } = ns;

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

export function useSeo(pageSeo = {}, options = {}) {
  const { useTitleTemplate = false, router: routing = {} } = options;
  const router = useRouter();
  const site = useSite();

  return useMemo(() => {
    const { baseUrl, translations, ...defaults } = site;

    const { asPath, locale, defaultLocale, locales = [] } = router;
    const i18n = site?.i18n?.[locale] ?? translations?.[locale] ?? {};
    const urls = { ...router.page, ...routing };
    const { _type, ...page } = { ...pageSeo };
    const { image, images, keywords, ...seo } = {
      ...defaults,
      ...i18n,
      ...page,
    };

    const { additionalMetaTags, additionalLinkTags } = seo;

    const pathname = get(urls, 'path', asPath);
    const canonical = get(urls, 'canonical');

    let openGraphImages = [];
    let metaKeywords = [];

    function getUrl(lc, path) {
      if (typeof path === 'string') return `${baseUrl}${path}`;
      path = path ?? get(urls, ['page', 'locales', lc], pathname);
      return lc === defaultLocale
        ? `${baseUrl}${path}`
        : `${baseUrl}/${lc}${path}`;
    }

    seo.additionalMetaTags = Array.isArray(additionalMetaTags)
      ? [].concat(defaults.additionalMetaTags ?? []).concat(additionalMetaTags)
      : [].concat(defaults.additionalMetaTags ?? []);

    seo.additionalLinkTags = Array.isArray(additionalLinkTags)
      ? [].concat(defaults.additionalLinkTags ?? []).concat(additionalLinkTags)
      : [].concat(defaults.additionalLinkTags ?? []);

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

    if (
      useTitleTemplate &&
      !isBlank(seo.titleTemplate) &&
      !isBlank(seo.openGraph.title)
    ) {
      seo.openGraph.title = seo.titleTemplate.replace(
        /%s/g,
        seo.openGraph.title
      );
    }

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
  }, [pageSeo, router, routing, site, useTitleTemplate]);
}

export const usePageSeo = (options = {}) => {
  const { openGraph, ...opts } = options;
  const page = usePage();
  const pageSeo = typeof page.seo === 'object' ? page.seo : {};

  const title = blocksToText(
    lookup(
      page,
      ['seo', 'title'],
      ['title'],
      ['content', 'title'],
      ['name'],
      ['label']
    ),
    { newlines: false }
  );

  const description = blocksToText(
    lookup(page, ['seo', 'description'], ['description'], ['content', 'intro']),
    { newlines: false }
  );

  const keywords = lookup(page, ['seo', 'keywords'], ['keywords'], ['tags']);

  const og = lookup(page, ['seo', 'openGraph'], ['openGraph']);

  const image =
    pageSeo.image ?? lookup(page, ['social', 'image'], ['images', 0]);

  const seo = mergeObjects(pageSeo, {
    title,
    description,
    keywords,
    image,
    ...opts,
  });

  return useSeo({ ...seo, openGraph: { ...openGraph, ...og } });
};

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

export function PageSeo(props) {
  return <NextSeo {...props} />;
}

export const escapeJsonLdString = string =>
  JSON.stringify(string).replace(/(^"|"$)/g, '');

export const withJsonLdEscaping = Component => {
  // eslint-disable-next-line react/display-name
  return props => {
    const clean = useMemo(() => {
      return traverse(props).map(function (value) {
        if (isBlank(value)) {
          this.remove();
        } else if (typeof value === 'string') {
          this.update(escapeJsonLdString(value));
        }
      });
    }, [props]);
    return <Component {...clean} />;
  };
};

const {
  ArticleJsonLd,
  BlogJsonLd,
  BreadcrumbJsonLd,
  CarouselJsonLd,
  CollectionPageJsonLd,
  CorporateContactJsonLd,
  CourseJsonLd,
  DatasetJsonLd,
  EventJsonLd,
  FAQPageJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  ProductJsonLd,
  ProfilePageJsonLd,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
  SoftwareAppJsonLd,
  VideoGameJsonLd,
  VideoJsonLd,
} = Object.entries(ns).reduce((memo, [name, Component]) => {
  if (name.endsWith('JsonLd')) {
    memo[name] = withJsonLdEscaping(Component);
  }
  return memo;
}, {});

export {
  NextSeo,
  DefaultSeo,
  ArticleJsonLd,
  BlogJsonLd,
  BreadcrumbJsonLd,
  CarouselJsonLd,
  CollectionPageJsonLd,
  CorporateContactJsonLd,
  CourseJsonLd,
  DatasetJsonLd,
  EventJsonLd,
  FAQPageJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  ProductJsonLd,
  ProfilePageJsonLd,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
  SoftwareAppJsonLd,
  VideoGameJsonLd,
  VideoJsonLd,
};
