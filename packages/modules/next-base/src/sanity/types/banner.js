import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import { bannerProjection } from '@app/sanity/queries';
import { defaultLocale } from '@root/i18n';

export const predicate = groq`
  _type == 'banner' && !(defined(hidden) && hidden)
`;

export const projection = bannerProjection;

const options = { predicate, projection, defaultLocale };

// Methods

const get = defineQuery('id', options);

const getByAlias = defineQuery('alias', options);

const fetch = defineQuery('all', options);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  projection: groq`_id, _type, alias`,
  property: ['alias'],
});

export default define({
  get,
  getByAlias,
  fetch,
  getStaticPaths,
});
