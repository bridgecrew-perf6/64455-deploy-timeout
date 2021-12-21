import { getClient } from '@atelierfabien/next-sanity/lib/server';

import { processAvailability } from '@app/lib/shop';

import { defaultLocale } from '@root/i18n';

import init from '@app/sanity/types';

export async function getHomepage(locale = defaultLocale) {
  const types = init(getClient());
  return types.homepage.get({
    locale,
    defaultLocale,
  });
}

export async function getCollection(id, locale = defaultLocale, options = {}) {
  const types = init(getClient());
  const data = await types.collection.get(id, { locale });
  return types.collection.resolveCollection(data, {
    ...options,
    locale,
  });
}

export async function getCategory(path, options = {}) {
  const types = init(getClient());
  return types.category.fetchCategoryAndNode(path, options);
}

export async function getProductAvailability(id) {
  const types = init(getClient());
  const data = await types.product.getVariant(id);
  const target = data?.variant ?? data?.master;
  if (target) {
    return processAvailability(data);
  } else {
    throw new Error('Variant not found');
  }
}
