import groq from 'groq';

const baseItemProjection = groq`
  ..., ...i18n[$defaultLocale], ...i18n[$locale],
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
  _id, _type, ...i18n[$defaultLocale], ...i18n[$locale],
  alias, query, component,
  'items': coalesce(items[]->{ ${collectionItemProjection} }, [])
`;
