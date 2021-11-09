import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import { bannerProjection } from '@app/sanity/queries';
import { defaultLocale } from '@root/i18n';

export const predicate = groq`
  _type == 'settings.homepage'
`;

// NOTE: full i18n object is required for translated path support

export const projection = groq`
  banner->{ ${bannerProjection} },
`;

const options = { predicate, projection, defaultLocale, i18n: true };

// Methods

const get = defineQuery('singleton', options);

export default define({
  get,
});
