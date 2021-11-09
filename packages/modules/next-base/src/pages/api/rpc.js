import { processAvailability } from '@app/lib/shop';

import { defaultLocale } from '@root/i18n';

import types from '@app/sanity/server/types';

export const config = { rpc: true };

export async function getHomepage(locale = defaultLocale) {
  return types.homepage.get({
    locale,
    defaultLocale,
  });
}

export async function getCollection(id, locale = defaultLocale, options = {}) {
  const data = await types.collection.get(id, { locale });
  return types.collection.resolveCollection(data, {
    ...options,
    locale,
  });
}

export async function getCategory(path, options = {}) {
  return types.category.fetchCategoryAndNode(path, options);
}

export async function getProductAvailability(id) {
  const data = await types.product.getVariant(id);
  const target = data?.variant ?? data?.master;
  if (target) {
    return processAvailability(data);
  } else {
    throw new Error('Variant not found');
  }
}
