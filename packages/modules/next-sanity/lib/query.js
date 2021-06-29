/* eslint-disable func-names */

import { get, isBlank, mergeObjects, trim } from '@foundation/next';
import groq from 'groq';
import { processResults } from './tree';

export const andPredicate = (...predicates) => {
  const valid = predicates.filter((p) => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' && ')})` : '';
};

export const orPredicate = (...predicates) => {
  const valid = predicates.filter((p) => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' || ')})` : '';
};

export const filterPredicate = (filter) => {
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
    return function (params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale }
      );
    };
  },
  // Fetch one based on one param
  one: (options = {}) => {
    return function (target, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
            *[${andPredicate(predicate, query)}][0]{
              ${projection}
            }${filterPredicate(filter)}`,
        { ...queryParams, target, locale, defaultLocale }
      );
    };
  },
  // Fetch one as singleton
  singleton: (options = {}) => {
    return function (params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
            *[${andPredicate(predicate, query)}][0]{
              ${projection}
            }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by id
  ids: (options = {}) => {
    return function (ids, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && _id in $ids][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, ids, locale, defaultLocale }
      );
    };
  },
  // Fetch one by id
  id: (options = {}) => {
    return function (id, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && _id == $id][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, id, locale, defaultLocale }
      );
    };
  },
  // Fetch one by path
  path: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$path in [i18n[$locale].path.current, i18n[$defaultLocale].path.current]`
      : groq`$path == path.current`;
    return function (path, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const pathname = Array.isArray(path) ? `/${path.join('/')}` : path;
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, path: pathname, locale, defaultLocale }
      );
    };
  },
  // Fetch one by alias
  alias: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$alias in [i18n[$locale].alias.current, i18n[$defaultLocale].alias.current]`
      : groq`$alias == alias.current`;
    return function (alias, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, alias, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by property
  property: (property, options = {}) => {
    return function (target, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)} && ${property} == $target]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, target, locale, defaultLocale }
      );
    };
  },
  // Custom function
  custom: (fn, options = {}) => {
    return function (params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(fn(params, options), options);
      return this.fetchData(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale }
      );
    };
  },
  // Attach function - this needs to be a normal function, not an arrow fn
  attach: (fn) => {
    return function (...args) {
      return fn.apply(this, args);
    };
  },
  // Get all static paths
  staticPaths: (options = {}) => {
    const property = options.property ?? ['path'];
    return async function (params = {}, filterFn = passThrough) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        locales,
        ...queryParams
      } = getParams(params, options);

      if (!locales.includes(defaultLocale)) locales.unshift(defaultLocale);

      const documents = await this.fetchData(
        groq`*[${andPredicate(predicate, query)}]{
            ${projection}
        }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale }
      );

      return documents.reduce((memo, node) => {
        if (!filterFn(node)) return memo; // skip
        locales.forEach((locale) => {
          const i18n = node?.i18n ?? {};
          const merged = mergeObjects(node, i18n[defaultLocale], i18n[locale]);
          const path = trim(get(merged, property, '') ?? '');
          if (path === '/') {
            memo.push({ params: { path: [] }, locale });
          } else if (!isBlank(path)) {
            memo.push({ params: { path: trim(path, '/').split('/') }, locale });
          }
        });
        return memo;
      }, []);
    };
  },
};

export const defineQuery = (type, options = {}) => {
  if (typeof type === 'function') {
    return types.attach(type, options);
  } else if (typeof types[type] === 'function') {
    return types[type](options);
  } else {
    throw new Error(`Invalid query type: ${type}`);
  }
};

export const define = (methods = {}, setupFn) => {
  return (client) => {
    const definition = {
      ...methods,
      client,
      fetchData,
    };
    if (typeof setupFn === 'function') setupFn(definition);
    return definition;
  };
};

async function fetchData(...args) {
  // eslint-disable-next-line no-console
  if (this.debug === true) console.log(args[0]);
  const data = await this.client.fetch(...args);
  return typeof data === 'object' && data !== null
    ? processResults(data)
    : data;
}
