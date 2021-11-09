import groq from 'groq';

export const referenceProjection = groq`
  ..., 'i18n': null,
  ...{ ...i18n[$defaultLocale], ...i18n[$locale] }
`;

export const internalReferenceProjection = groq`
  _id, _type, _createdAt, _updatedAt,
  ...i18n[$defaultLocale], ...i18n[$locale],
  'path': coalesce(route->.path.current, '') + coalesce(i18n[$locale].path.current, i18n[$defaultLocale].path.current),
`;
