/* eslint-disable func-names */

import { get, isBlank, mergeObjects, trim } from '@foundation/next';
import groq from 'groq';
import { processResults } from './tree';

export const andPredicate = (...predicates) => {
  const valid = predicates.filter(p => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' && ')})` : '';
};

export const orPredicate = (...predicates) => {
  const valid = predicates.filter(p => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' || ')})` : '';
};

export const filterPredicate = filter => {
  return isBlank(filter) ? '' : `|${filter}`;
};

const getParams = (params, options = {}) => {
  const merged = mergeObjects(options, params);
  const { defaultLocale } = merged;
  return { locale: defaultLocale, ...merged };
};

const passThrough = () => true;

const types = {
  // Fetch multiple
  all: (options = {}) => {
    return function(params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, locale, defaultLocale }
      );
    };
  },
  // Fetch one based on one param
  one: (options = {}) => {
    return function(value, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
            *[${andPredicate(predicate, query)}][0]{
              ${projection}
            }${filterPredicate(filter)}`,
        { ...params, value, locale, defaultLocale }
      );
    };
  },
  // Fetch one as singleton
  singleton: (options = {}) => {
    return function(params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
            *[${andPredicate(predicate, query)}][0]{
              ${projection}
            }${filterPredicate(filter)}`,
        { ...params, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by id
  ids: (options = {}) => {
    return function(ids, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && _id in $ids][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, ids, locale, defaultLocale }
      );
    };
  },
  // Fetch one by id
  id: (options = {}) => {
    return function(id, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && _id == $id][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, id, locale, defaultLocale }
      );
    };
  },
  // Fetch one by path
  path: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$path in [i18n[$locale].path.current, i18n[$defaultLocale].path.current]`
      : groq`$path == path.current`;
    return function(path, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      const pathname = Array.isArray(path) ? `/${path.join('/')}` : path;
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, path: pathname, locale, defaultLocale }
      );
    };
  },
  // Fetch one by alias
  alias: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$alias in [i18n[$locale].alias.current, i18n[$defaultLocale].alias.current]`
      : groq`$alias == alias.current`;
    return function(alias, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, alias, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by property
  property: (property, options = {}) => {
    return function(value, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${property} == $value]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, value, locale, defaultLocale }
      );
    };
  },
  // Get all static paths
  staticPaths: (options = {}) => {
    const property = options.property ?? ['path'];
    return async function(params = {}, filterFn = passThrough) {
      const {
        query,
        predicate,
        projection,
        filter,
        defaultLocale,
        locales,
      } = getParams(params, options);

      if (!locales.includes(defaultLocale)) locales.unshift(defaultLocale);

      const documents = await this.fetchData(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        params
      );

      return documents.reduce((memo, node) => {
        if (!filterFn(node)) return memo; // skip
        locales.forEach(locale => {
          const i18n = node?.i18n ?? {};
          const merged = mergeObjects(node, i18n[defaultLocale], i18n[locale]);
          const path = trim(get(merged, property, ''), '/');
          if (!isBlank(path)) {
            memo.push({ params: { path: path.split('/') }, locale });
          }
        });
        return memo;
      }, []);
    };
  },
};

export const defineQuery = (type, options = {}) => {
  if (typeof types[type] === 'function') {
    return types[type](options);
  } else {
    throw new Error(`Invalid query type: ${type}`);
  }
};

export const define = (methods = {}) => {
  return client => {
    return {
      ...methods,
      client,
      fetchData,
    };
  };
};

async function fetchData(...args) {
  if (this.debug === true) console.log(args[0]);
  const data = await this.client.fetch(...args);
  return typeof data === 'object' && data !== null
    ? processResults(data)
    : data;
}
