/* eslint-disable prettier/prettier */

import {
  pick,
  sortObjectsByIds,
} from '@atelierfabien/next-foundation/lib/util';

import {
  getClient,
  traverse,
  processResults,
  DataLoader,
} from '@atelierfabien/next-sanity/lib/server';

import { coreProjection, i18nProjection } from '@shop/sanity/queries';

const client = getClient();

const resolvedTypes = ['internalLink'];

export const isReferenceOfTypes = (types, value) => {
  return (
    typeof value === 'object' &&
    types.includes(value?._type) &&
    typeof value?.reference === 'object' &&
    typeof value?.reference?._ref === 'string'
  );
};

export const isReferenceOfType = (type, value) => {
  return isReferenceOfTypes([type], value);
};

export const resolveReferences = (data, options = {}) => {
  const params = pick(options, 'locale', 'defaultLocale');
  const promises = [];

  const referenceResolver = new DataLoader((ids) => {
    return client
      .fetch(`*[_id in $ids]{ ${coreProjection}, ${i18nProjection} }`, {
        ...params,
        ids,
      })
      .then((resolved) => {
        return sortObjectsByIds('_id', ids, processResults(resolved), true);
      });
  });

  traverse(data).forEach(function process(value) {
    const node = this;
    if (isReferenceOfTypes(resolvedTypes, value)) {
      const promise = referenceResolver
        .load(value.reference._ref)
        .then((resolved) => {
          node.update({ ...value, reference: resolved });
        });
      promises.push(promise);
    }
  });

  return Promise.all(promises).then(() => data);
};
