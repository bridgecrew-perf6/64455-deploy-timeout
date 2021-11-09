import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import { buildNodeProjection, pageProjection } from '@app/sanity/queries';
import { resolveProps } from '@app/sanity/types/page';

import { defaultLocale } from '@root/i18n';

export const predicate = groq`
  _type == 'navigation.node' && defined(item) &&
  item->_type == 'page' && item->hidden != true
`;

// NOTE: full i18n object is required for translated path support

export const projection = buildNodeProjection(pageProjection);

const options = { predicate, projection, defaultLocale, i18n: true };

// Methods

const get = defineQuery('id', options);

const getByPath = defineQuery('path', options);

const getByRoutePath = defineQuery('one', {
  ...options,
  predicate: groq`
    route->path.current == $target &&
    !defined(i18n[$locale].path.current) &&
    !defined(i18n[$defaultLocale].path.current)
  `,
});

const fetch = defineQuery('all', options);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  query: groq`item->standalone != true`,
  projection: groq`_id, _type, i18n, item, 'updatedAt': coalesce(item->_updatedAt, _updatedAt)`,
});

export default define({
  get,
  getByRoutePath,
  getByPath,
  fetch,
  getStaticPaths,
  resolveProps,
});
