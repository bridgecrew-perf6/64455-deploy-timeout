import { buildSitemapXml } from 'next-sitemap';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import init from '@app/sanity/types';

import appConfig from '@app/config/app';

import siteConfig from '@app/config/site';

import {
  defineStatic,
  definePath,
  buildAll,
} from '@foundation/lib/util/sitemap';

import { defaultLocale, locales } from '@root/i18n';

const homepageId = appConfig?.homepage?.page;

defineStatic('/', { changefreq: 'daily', priority: 1.0 });

defineStatic('/shop', { changefreq: 'daily', priority: 0.8 });

definePath('/pages/[path]', options => {
  const types = init(getClient());
  return types.page.getStaticPaths(options, doc => {
    return homepageId !== doc._id;
  });
});

definePath(
  '/shop/products/[path]',
  options => {
    const types = init(getClient());
    return types.product.getStaticPaths(options);
  },
  { changefreq: 'weekly', priority: 0.7 }
);

export async function buildSitemap() {
  const entries = await buildAll({
    defaultLocale,
    locales,
    baseUrl: siteConfig.baseUrl,
  });

  return buildSitemapXml(entries);
}
