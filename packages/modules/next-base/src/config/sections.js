import { isEmpty } from '@foundation/next';

import { resolveCollectionQuery } from '@app/sanity/types/collection';

export const sectionResolvers = new Map();

sectionResolvers.set('section.collection', async (client, section, options) => {
  const { collection } = section;

  if (collection && isEmpty(collection.items) && !isEmpty(collection.query)) {
    const resolved = await resolveCollectionQuery(client, collection, options);
    return { ...section, collection: resolved };
  } else {
    return section;
  }
});
