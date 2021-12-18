import groq from 'groq';

import { i18nProjection } from '.';

export const referenceProjection = groq`
  ..., 'i18n': null,
  ...{ ${i18nProjection} }
`;

export const internalReferenceProjection = groq`
  _id, _type, _createdAt, _updatedAt,
  ${i18nProjection},
  'path': coalesce(route->.path.current, '') + coalesce(i18n[$locale].path.current, i18n[$defaultLocale].path.current),
`;
