import groq from 'groq';

export const coreProperties = [
  '_id',
  '_type',
  '_rev',
  '_createdAt',
  '_updatedAt',
  'alias',
  'path',
];

export const coreProjection = groq`
  _id, _type, _createdAt, _updatedAt, type, alias,
  ...i18n[$defaultLocale], ...i18n[$locale]
`;

export const baseProjection = groq`${coreProjection}, layout->`;
