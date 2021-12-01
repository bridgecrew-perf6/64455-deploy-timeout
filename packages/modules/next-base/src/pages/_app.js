import { initializeApp, beforeRender, NProgress } from '@foundation/next';

import { isBlank } from '@foundation/lib/util';

import {
  buildProductTitle,
  getOpengraphImage,
  buildVariantLinks,
  buildProductBreadcrumbs,
  prepareProductBreadcrumbs,
} from '@app/lib/shop';

import Application from '@shop/components/Application';

import '@app/styles/main.scss';
import '@foundation/styles/reset.scss';
import '@foundation/styles/tailwind.scss';

// Setup NProgress

NProgress.configure({ showSpinner: false });

// Initialize app

initializeApp();

// Handle SEO updates

beforeRender((page, { router, options }) => {
  if (
    page._type === 'product' &&
    page.hasVariants &&
    !isBlank(router.query.sku)
  ) {
    const variant = page.variants.find(v => v.sku === router.query.sku);

    options.set(['seo', 'image'], getOpengraphImage(page, variant) ?? null);

    options.set(
      ['seo', 'additionalLinkTags'],
      buildVariantLinks(page, variant)
    );

    return { title: buildProductTitle(page, variant) };
  }
});

// Handle category and breadcrumbs

beforeRender((page, { global, router, options }) => {
  if (router.route.startsWith('/shop/products/')) {
    const category = global.get(['productCategory', router.locale]);
    const categoryUrl = global.get('productCategoryUrl');
    const breadcrumbs = category
      ? prepareProductBreadcrumbs(page, category, categoryUrl)
      : buildProductBreadcrumbs(page, router.locale, categoryUrl);
    global.unset('breadcrumbs');
    options.set(['heading', 'breadcrumbs'], breadcrumbs);
  } else if (router.route !== '/shop' && !router.route.startsWith('/shop/')) {
    global.unset('productCategory');
    global.unset('clickedProduct');
    global.unset('breadcrumbs');
    global.unset('searchState');
  }
});

export default Application;
