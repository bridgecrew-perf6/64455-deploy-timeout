/* eslint-disable func-names */

import { get, isBlank, mergeObjects, trim } from '@foundation/next';
import groq from 'groq';

import { deduceItem, processData } from './util';

export { processResults } from './tree';

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

const prepare = (query, params = {}, previewOptions, _singleItem = false) => {
  if (typeof previewOptions === 'object') {
    previewOptions.enabled = true;
    previewOptions.query = query;
    previewOptions.params = params;
    previewOptions.single = Boolean(_singleItem);
  }
  return [query, params];
};

const finalize = (data, previewOptions) => {
  if (typeof previewOptions === 'object') {
    const initialData = previewOptions.single ? deduceItem(data, true) : data;
    previewOptions.initialData = initialData;
    return initialData;
  } else {
    return data;
  }
};

const types = {
  // Fetch multiple
  all: (options = {}) => {
    return function (params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const args = prepare(
        groq`*[${andPredicate(predicate, query)}]{
          ${projection}
        }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale },
        _previewOptions
      );
      return this.fetchData(...args);
    };
  },
  // Fetch one based on one param
  one: (options = {}) => {
    return async function (target, params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const isPreview = typeof _previewOptions === 'object';
      const single = isPreview ? '' : '[0]';
      const args = prepare(
        groq`*[${andPredicate(predicate, query)}]${single}{
          ${projection}
        }${filterPredicate(filter)}`,
        { ...queryParams, target, locale, defaultLocale },
        _previewOptions,
        true
      );
      const data = await this.fetchData(...args);
      return finalize(data, _previewOptions);
    };
  },
  // Fetch one as singleton
  singleton: (options = {}) => {
    return async function (params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const isPreview = typeof _previewOptions === 'object';
      const single = isPreview ? '' : '[0]';
      const args = prepare(
        groq`
            *[${andPredicate(predicate, query)}]${single}{
              ${projection}
            }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale },
        _previewOptions,
        true
      );
      const data = await this.fetchData(...args);
      return finalize(data, _previewOptions);
    };
  },
  // Fetch multiple by id
  ids: (options = {}) => {
    return function (ids, params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)} && _id in $ids]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, ids, locale, defaultLocale },
        _previewOptions
      );
      return this.fetchData(...args);
    };
  },
  // Fetch one by id
  id: (options = {}) => {
    return async function (id, params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const isPreview = typeof _previewOptions === 'object';
      const single = isPreview ? '' : '[0]';
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)} && _id == $id]${single}{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, id, locale, defaultLocale },
        _previewOptions,
        true
      );
      const data = await this.fetchData(...args);
      return finalize(data, _previewOptions);
    };
  },
  // Fetch one by path
  path: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$path in [i18n[$locale].path.current, i18n[$defaultLocale].path.current]`
      : groq`$path == path.current`;
    return async function (path, params = {}, _previewOptions) {
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
      const isPreview = typeof _previewOptions === 'object';
      const single = isPreview ? '' : '[0]';
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}]${single}{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, path: pathname, locale, defaultLocale },
        _previewOptions,
        true
      );
      const data = await this.fetchData(...args);
      return finalize(data, _previewOptions);
    };
  },
  // Fetch one by alias
  alias: (options = {}) => {
    const basePredicate = options.i18n
      ? groq`$alias in [i18n[$locale].alias.current, i18n[$defaultLocale].alias.current]`
      : groq`$alias == alias.current`;
    return async function (alias, params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const isPreview = typeof _previewOptions === 'object';
      const single = isPreview ? '' : '[0]';
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)} && ${basePredicate}]${single}{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, alias, locale, defaultLocale },
        _previewOptions,
        true
      );
      const data = await this.fetchData(...args);
      return finalize(data, _previewOptions);
    };
  },
  // Fetch multiple by property
  property: (property, options = {}) => {
    return function (target, params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(params, options);
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)} && ${property} == $target]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, target, locale, defaultLocale },
        _previewOptions
      );
      return this.fetchData(...args);
    };
  },
  // Custom function
  custom: (fn, options = {}) => {
    return function (params = {}, _previewOptions) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        ...queryParams
      } = getParams(fn(params, options), options);
      const args = prepare(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...queryParams, locale, defaultLocale },
        _previewOptions
      );
      return this.fetchData(...args);
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
    const { properties, property = ['path'] } = options;
    const pathProperties = Array.isArray(properties) ? properties : [property];
    return async function (params = {}, filterFn = passThrough) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
        locales,
        raw,
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
          const path = pathProperties
            .map((p) => getProperty(merged, p))
            .join('/');
          const meta = raw ? node : {};
          if (path === '/') {
            memo.push({ ...meta, params: { path: [] }, locale });
          } else if (!isBlank(path)) {
            memo.push({
              ...meta,
              params: { path: trim(path, '/').split('/') },
              locale,
            });
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
  return processData(data);
}

function getProperty(obj, property) {
  return trim(get(obj, property, '') ?? '');
}
