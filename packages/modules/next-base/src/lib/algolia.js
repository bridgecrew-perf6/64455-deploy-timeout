import algoliasearch from 'algoliasearch/lite';

import appConfig from '@app/config/app';

export const config = {
  ...appConfig.search,
};

export const getIndexName = (locale, sortBy) => {
  const indexName = `${config?.algolia?.indexBasename}_${locale}`;
  return sortBy ? `${indexName}_${sortBy}` : indexName;
};

export const searchClient = algoliasearch(
  appConfig.search?.algolia?.id,
  appConfig.search?.algolia?.publicKey
);
