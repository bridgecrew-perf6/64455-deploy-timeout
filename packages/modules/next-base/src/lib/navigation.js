import {
  interpolateUrl as _interpolateUrl,
  joinUrl,
} from '@foundation/lib/util';

import siteConfig from '@app/config/site';

export const buildProductUrl = (params = {}, external = false) => {
  const { alias, sku } = params;
  const pathname = alias
    ? sku
      ? '/shop/products/[alias]/[sku]'
      : '/shop/products/[alias]'
    : '/shop/products';
  return interpolateUrl(pathname, params, external);
};

export const buildCategoryUrl = (params = {}, external = false) => {
  const { path } = params;
  const pathname = path ? '/shop/categories[path]' : '/shop/categories';
  return interpolateUrl(pathname, params, external);
};

export function interpolateUrl(pathname, params = {}, external) {
  const url = _interpolateUrl(pathname, params);
  return external ? joinUrl(siteConfig.baseUrl, url) : url;
}
