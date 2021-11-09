import { define, defineQuery } from '@atelierfabien/next-sanity';

import { routePredicate, routeProjection } from '@app/sanity/queries';

import { defaultLocale } from '@root/i18n';

export const predicate = routePredicate;

export const projection = routeProjection;

const options = { predicate, projection, defaultLocale };

// Methods

const get = defineQuery('id', options);

const getByPath = defineQuery('path', options);

const fetch = defineQuery('all', options);

export default define({
  get,
  getByPath,
  fetch,
});
