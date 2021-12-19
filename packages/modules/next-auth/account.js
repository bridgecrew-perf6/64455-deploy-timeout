import groq from 'groq';

import { define, defineQuery } from '@atelierfabien/next-sanity';

import { defaultLocale } from '@root/i18n';

// Document access for Account

const referencedTypes = ['page'];

export const documentsPredicate = groq`
  _type in $types && _id in (*[_type == 'user' && _id == $userId][].references[]._ref)
`;

export const documentsProjection = groq`
  _id, _type, _createdAt, _updatedAt, alias,
  'type': coalesce(type, kind),
  'name': coalesce(label, name, title),
  'description': coalesce(content.intro, intro, description),
  'image': coalesce(cover, images[0])
`;

export const documentsQuery = groq`
  *[${documentsPredicate}]{
    ...,
    ...i18n[$defaultLocale], ...i18n[$locale]
  }
`;

export const documentsQueryOptions = {
  filter: groq`{ ${documentsProjection} }|order(name, _type)`,
  types: referencedTypes,
  defaultLocale,
};

const getDocuments = defineQuery('all', {
  predicate: documentsPredicate,
  types: referencedTypes,
  defaultLocale,
});

const getDocumentsList = defineQuery(
  'query',
  documentsQuery,
  documentsQueryOptions
);

const getDocument = defineQuery('id', {
  predicate: documentsPredicate,
  types: referencedTypes,
  defaultLocale,
});

const getDocumentByAlias = defineQuery('alias', {
  predicate: documentsPredicate,
  types: referencedTypes,
  defaultLocale,
});

// Example:
//
// const check = await account.checkDocument({
//   id: 'clients.014f03ee-8a87-4512-bc63-fe302444eaf6',
//   types: authConfig.referencedTypes,
//   userId: session.user.id,
//   locale,
//   defaultLocale,
// });

const checkDocument = defineQuery(
  'raw',
  groq`count(*[${documentsPredicate} && _id == $id]) > 0`,
  {
    types: referencedTypes,
    defaultLocale,
  }
);

// Example:
//
// const check = await account.checkDocuments({
//   ids: ['clients.014f03ee-8a87-4512-bc63-fe302444eaf6'],
//   types: authConfig.referencedTypes,
//   userId: session.user.id,
//   locale,
//   defaultLocale,
// });

const checkDocuments = defineQuery(
  'raw',
  groq`count(*[${documentsPredicate} && _id in $ids]) > 0`,
  {
    types: referencedTypes,
    defaultLocale,
  }
);

export default define({
  getDocuments,
  getDocumentByAlias,
  getDocumentsList,
  getDocument,
  checkDocument,
  checkDocuments,
});
