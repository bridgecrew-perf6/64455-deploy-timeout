import groq from 'groq';

import { i18nProjection } from '.';

const baseItemProjection = groq`
  ..., ${i18nProjection},
  'i18n': null,
  'asset': asset->,
  'image': image->{ ..., asset-> },
  'images': coalesce(images[]{ ..., asset-> }, [])
`;

export const collectionItemProjection = groq`
  ${baseItemProjection},
  'items': coalesce(items[]{ ${baseItemProjection} }, [])
`;

export const collectionProjection = groq`
  _id, _type, ${i18nProjection},
  alias, query, component,
  'items': coalesce(items[]->{ ${collectionItemProjection} }, [])
`;
