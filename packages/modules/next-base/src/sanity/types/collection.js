import {
  define,
  defineQuery,
  processResults,
} from '@atelierfabien/next-sanity';

import groq from 'groq';

import { isBlank } from '@foundation/next';

import { defaultLocale } from '@root/i18n';

import { i18nProjection } from '@shop/sanity/queries';

export const predicate = groq`
  _type == 'collection'
`;

const baseItemProjection = groq`
  ..., ${i18nProjection},
  'i18n': null,
  'asset': asset->,
  'image': image->{ ..., asset-> },
  'images': coalesce(images[]{ ..., asset-> }, [])
`;

export const itemProjection = groq`
  ${baseItemProjection},
  'items': coalesce(items[]{ ${baseItemProjection} }, [])
`;

export const projection = groq`
  _id, _type, ${i18nProjection},
  alias, query, component,
  'items': coalesce(items[]->{ ${itemProjection} }, [])
`;

const buildQuery = (query, options = {}) => {
  const { projection = '._id' } = options;
  const limit = options.limit > 0 ? options.limit : 100;
  const order = !isBlank(options.order) ? options.order : query.order;
  const params = typeof query.params === 'object' ? query.params : {};
  params._limit = Math.min(query.limit > 0 ? query.limit : 0, limit);

  return !isBlank(order)
    ? `*[${query.filter}]|order(${order})[0...$_limit]${projection}`
    : `*[${query.filter}][0...$_limit]${projection}`;
};

const options = { predicate, projection, defaultLocale, i18n: true };

// Methods

const get = defineQuery('id', options);

const getByAlias = defineQuery('alias', options);

const fetch = defineQuery('all', options);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  projection: groq`_id, _type, alias`,
  property: ['alias'],
});

async function resolveCollection(collection, options = {}) {
  if (!isBlank(collection?.query?.filter)) {
    const { params, locale, ...opts } = options;
    const overrides = {};
    if (typeof locale === 'string') overrides.locale = locale;

    const items = await this.client.fetch(
      buildQuery(collection.query, {
        ...opts,
        projection: `{ ${itemProjection} }`,
      }),
      {
        locale: defaultLocale,
        defaultLocale,
        ...collection?.query.params,
        ...params,
        ...overrides,
      }
    );

    collection.items = processResults(items ?? []);
  }
  return collection;
}

export async function resolveCollectionQuery(client, collection, options = {}) {
  return resolveCollection.call({ client }, collection, options);
}

export default define({
  get,
  getByAlias,
  fetch,
  getStaticPaths,
  resolveCollection,
});
