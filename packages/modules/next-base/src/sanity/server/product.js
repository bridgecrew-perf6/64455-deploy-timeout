/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import groq from 'groq';

import {
  get,
  set,
  has,
  map,
  pick,
  omit,
  sortBy,
  cloneDeep,
} from '@atelierfabien/next-foundation/server';

import {
  getClient,
  traverse,
  processResults,
} from '@atelierfabien/next-sanity/lib/server';

import { defaultLocale } from '@root/i18n';

import {
  productPredicate,
  productProjection,
  categoryProductsQuery,
  algoliaProductProjection,
} from '@app/sanity/queries';

import config from '@app/config/shop';

const RESERVED_KEYS = ['_rev', '_type'];

const DISPLAY_PROPERTIES = ['color'];

export const fetchProducts = async (locale = defaultLocale) => {
  const query = `*[${productPredicate}]{ ${productProjection} }`;
  const data = await getClient().fetch(query, {
    locale,
    defaultLocale,
  });
  return processResults(data ?? {});
};

export default (client, _options = {}) => {
  let lookupData;

  const fetchCategories = async () => {
    const data = await client.fetch(
      groq`*[_type == 'product.category']{
        'id': _id, 'path': path.current, i18n
      }`
    );

    return processResults(data).reduce((memo, item) => {
      memo[item.id] = item;
      return memo;
    }, {});
  };

  const fetchVariantOptions = async () => {
    const data = await client.fetch(
      groq`*[_type == 'property.type' && variantOption]{
        'id': _id, 'alias': alias.current, i18n, order
      }|order(order)`
    );

    return processResults(data).reduce((memo, item) => {
      memo[item.id] = item;
      return memo;
    }, {});
  };

  const fetchPropertyValues = async () => {
    const data = await client.fetch(
      groq`*[_type == 'property.value']{
        'id': _id, 'alias': alias.current, i18n, numeric, value, order,
        'display': display { 'color': color.hex },
        property-> {
          'id': _id, 'alias': alias.current, i18n
        }
      }|order(order)`
    );

    return processResults(data).reduce((memo, item) => {
      memo[item.id] = item;
      return memo;
    }, {});
  };

  const fetchProducts = async (locale = defaultLocale, optionNames = []) => {
    const data = await client.fetch(buildProductsQuery(locale, optionNames));
    return processResults(data);
  };

  const fetchLookupData = async (force = false) => {
    if (typeof lookupData === 'object' && !force) {
      return lookupData;
    } else {
      return Promise.all([
        fetchCategories(),
        fetchVariantOptions(),
        fetchPropertyValues(),
      ]).then(([categories, variantOptions, variantValues]) => {
        const optionNames = getOptionNames(variantOptions);
        lookupData = { optionNames, categories, variantOptions, variantValues };
        return lookupData;
      });
    }
  };

  const serializeAll = async (locale = defaultLocale, options = {}) => {
    const lookups = await fetchLookupData();
    const products = await fetchProducts(locale, lookups.optionNames);
    return products
      .map(d => serializeProduct(d, lookups, locale, options))
      .flat();
  };

  const serializeByCategory = async (
    categoryPath = [],
    locale = defaultLocale,
    options = {}
  ) => {
    const lookups = await fetchLookupData();

    const projection = buildProductsProjection(
      locale,
      lookups.optionNames,
      true
    );

    const path =
      categoryPath.length > 0 ? `/${categoryPath.join('/')}/*` : '/*';

    const ids = await client.fetch(categoryProductsQuery, { path });

    let query = groq`*[${productPredicate} && _id in $ids]`;

    if (options.term) {
      query += groq`|score(
        boost(master.sku match $match, 5),
        boost(i18n[$locale].name match $term, 4),
        boost(i18n[$defaultLocale].name match $term, 3),
        boost(pt::text(i18n[$locale].description) match $term, 3),
        boost(pt::text(i18n[$defaultLocale].description) match $term, 3),
        boost(i18n[$locale].seo.keywords match $term, 2),
        boost(i18n[$defaultLocale].seo.keywords match $term, 2)
      )`;
      query += groq`[ _score > 0 ]|order(_score desc)|`;
    }

    const data = await client.fetch(`${query}{ ${projection} }`, {
      ids,
      locale,
      defaultLocale,
      term: options.term ? `*${options.term}*` : '',
      match: options.term ?? '',
    });

    const products = processResults(data);

    if (typeof options.serializeProduct === 'function') {
      return products
        .map(d => options.serializeProduct(d, lookups, locale, options))
        .flat();
    } else {
      return products
        .map(d => serializeProduct(d, lookups, locale, options))
        .flat();
    }
  };

  const isVisibleProduct = document => {
    if (has(document, 'hidden') && typeof document.hidden === 'boolean') {
      return !document.hidden;
    } else {
      return true;
    }
  };

  const getConfig = async (locale = defaultLocale) => {
    const lookups = await fetchLookupData();
    const projection = buildProductsProjection(locale, lookups.optionNames);
    const serializer = d => serializeProduct(d, lookups, locale);
    const visible = isVisibleProduct;
    return { projection: `{ ${projection} }`, serializer, visible };
  };

  const getIndexer = async (indexer, algoliaIndex, locale = defaultLocale) => {
    const { projection, serializer, visible } = await getConfig(locale);
    return indexer(
      {
        product: {
          index: algoliaIndex,
          projection,
        },
      },
      serializer,
      visible,
      { deleteByQuery: true }
    );
  };

  return {
    getIndexer,
    getConfig,
    serializeAll,
    serializeByCategory,
    fetchProducts,
    fetchLookupData,
  };
};

export function buildProductsQuery(locale = defaultLocale, optionNames = []) {
  const projection = buildProductsProjection(locale, optionNames, true);
  return `*[${productPredicate}]{ ${projection} }`;
}

export function buildProductsProjection(
  locale = defaultLocale,
  optionNames = [],
  isQuery = false
) {
  const optionProjection = optionNames.map(o => `'${o}': ${o}._ref`).join(', ');

  const query = algoliaProductProjection
    .replace(/\sOptionsProjection\s/g, optionProjection)
    .replace(/\[\$defaultLocale\]/g, `.${defaultLocale}`)
    .replace(/\[\$locale\]/g, `.${locale}`)
    .replace(/\$defaultLocale/g, defaultLocale)
    .replace(/\$locale/g, locale);

  return isQuery ? `_id, _type, ${query}` : query;
}

function serializeProduct(
  document,
  lookups,
  locale = defaultLocale,
  options = {}
) {
  if (document._type !== 'product') return [document];

  const { distinct = false } = options;

  const { categories, variantOptions, variantValues } = lookups;

  let taxons = [];

  document = stripObject(document);

  const common = pick(document, [
    'alias',
    'name',
    'description',
    'keywords',
    'kind',
    'brand',
    'category',
  ]);

  common.createdAt = toUnixTs(document.createdAt);
  common.updatedAt = toUnixTs(document.updatedAt);
  common.publishedAt = toUnixTs(document.publishedAt);

  common.source = document._id;
  common.master = pick(document.master, 'id', 'sku');

  common.paths = [];

  common.categories = lookupValue(
    Array.isArray(document.categories) ? document.categories : [],
    categories
  ).reduce((memo, c) => {
    if (Array.isArray(c)) {
      const hierarchy = [];
      c.forEach((category, i) => {
        if (!memo[`lvl${i}`]) memo[`lvl${i}`] = [];
        const level = memo[`lvl${i}`];
        const label = translate(locale, 'name', category);
        if (!taxons.includes(label)) taxons.push(label);
        hierarchy.push(label);
        const current = hierarchy.join(' > ');
        if (!level.includes(current)) level.push(current);
        if (!common.paths.includes(category.path)) {
          common.paths.push(category.path);
        }
        if (category.id === common.category?.id) {
          common.category.hierarchy = hierarchy;
        }
      });
    }
    return memo;
  }, {});

  common.taxons = taxons;

  common.collections = (
    Array.isArray(document.collections) ? document.collections : []
  ).map(c => c._id);

  let attributes = lookupValue(document.attributes, variantValues);

  attributes = sortBy(attributes, sortByValueOrOrder);

  common.attributes = attributes.reduce((memo, attr) => {
    memo[attr.property.alias] = memo[attr.property.alias] || [];
    memo[attr.property.alias].push(translate(locale, 'label', attr));
    return memo;
  }, {});

  common.attrs = attributes.reduce((memo, attr) => {
    memo[attr.property.alias] = memo[attr.property.alias] || [];
    memo[attr.property.alias].push(attr.id);
    return memo;
  }, {});

  common.all = cloneDeep({
    attributes: common.attributes,
    attrs: common.attrs,
  });

  common.variable = cloneDeep({
    attributes: {},
    attrs: {},
  });

  common.markers = [];
  Object.entries(document.markers || {}).map(([key, bool]) => {
    if (bool) common.markers.push(key);
  });

  common.pricing = serializePricing(document.pricing);

  if (Array.isArray(document.variantOptions)) {
    common.variantOptions = document.variantOptions.reduce((memo, ref) => {
      const option = get(variantOptions, [ref, 'alias']);
      if (option && !memo.includes(option)) memo.push(option);
      return memo;
    }, []);
  } else {
    common.variantOptions = [];
  }

  common.variants = [];

  if (
    Array.isArray(document.variants) &&
    document.variants.length > 0 &&
    !distinct
  ) {
    document.variants.forEach(variant => {
      common.variants.push(variant.id);
      common.variantOptions.forEach(option => {
        const propValue = get(variantValues, get(variant, ['options', option]));
        if (propValue) {
          assignAttribute(propValue, common.all, locale);
          assignAttribute(propValue, common.variable, locale);
        }
      });
    });

    postProcessOptions(locale, common, common.all, variantValues);
    postProcessOptions(locale, common, common.variable, variantValues);

    return document.variants.map(variant =>
      serializeVariant(cloneDeep(common), variant, document, lookups, locale)
    );
  } else {
    return [serializeMaster(common, document, lookups, locale)];
  }
}

function serializeMaster(common, document, _lookups, _locale = defaultLocale) {
  const base = {
    objectID: get(document, ['master', 'id']),
    sku: get(document, ['master', 'sku']),
  };

  const data = { isVariant: false };

  data.options = cloneDeep(common.attributes);

  data.opts = cloneDeep(common.attrs);

  if (Array.isArray(document.images) && document.images.length > 0) {
    data.images = document.images.map(img => omit(img, 'attributes'));
  } else {
    data.images = [];
  }

  return postProcess({ ...base, ...common, ...data });
}

function serializeVariant(
  common,
  variant,
  document,
  lookups,
  locale = defaultLocale
) {
  const { variantValues } = lookups;

  const attributes = [];

  const base = {
    objectID: get(variant, 'id'),
    sku: get(variant, 'sku'),
    identifier: get(variant, 'identifier'),
  };

  const data = { isVariant: true };

  data.options = common.variantOptions.reduce((memo, option) => {
    const propValue = get(variantValues, get(variant, ['options', option]));
    if (propValue) memo[option] = [translate(locale, 'label', propValue)];
    return memo;
  }, {});

  data.opts = common.variantOptions.reduce((memo, option) => {
    const propValue = get(variantValues, get(variant, ['options', option]));
    if (propValue) {
      memo[option] = [propValue.id];
      attributes.push(propValue.id);
      assignAttribute(propValue, common, locale);
    }
    return memo;
  }, {});

  postProcessOptions(locale, common, common, variantValues);

  if (get(variant, 'customPrice') && get(variant, ['pricing', 'price']) > 0) {
    data.pricing = serializePricing(variant.pricing, true);
  }

  if (Array.isArray(document.images) && document.images.length > 0) {
    const variantImages = [];
    const masterImages = [];

    document.images.forEach(img => {
      if (matchesAttributes(img, attributes)) {
        variantImages.push({ ...omit(img, 'attributes'), variant: true });
      } else {
        masterImages.push({ ...omit(img, 'attributes'), variant: false });
      }
    });

    // Variant specific images are prioritized
    data.images = variantImages.concat(masterImages);
  } else {
    data.images = [];
  }

  return postProcess({ ...base, ...common, ...data });
}

function serializePricing(pricing, custom = false) {
  if (typeof pricing === 'object') {
    return { ...pick(pricing, 'price', 'suggested', 'discount'), custom };
  } else {
    return { price: 0, suggested: 0, discount: 0, custom };
  }
}

function postProcess(data) {
  const all = {
    attributes: pick(data.all.attributes, config.variantOptions || ['color']),
    attrs: pick(data.all.attrs, config.variantOptions || ['color']),
  };

  if (data.images.length > 0) {
    data.image = getImageId(get(data, ['images', 0, 'asset', '_ref']));
  }

  const images = data.images.slice(0, 3).map(img => omit(img, 'url'));

  return { ...omit(data, []), all, images };
}

function getImageId(ref) {
  return ref
    ? ref.replace(/^image-/, '').replace(/-([^-]+)$/, '.$1')
    : undefined;
}

function stripObject(obj) {
  return traverse(obj).map(function (val) {
    if (
      this.notRoot &&
      (val === null ||
        (typeof this.key === 'string' && RESERVED_KEYS.includes(this.key)))
    ) {
      this.remove();
    }
  });
}

function toUnixTs(dateTime) {
  return Math.round(new Date(dateTime).getTime() / 1000);
}

function lookupValue(value, lookup) {
  if (Array.isArray(value)) {
    return value.map(v => lookupValue(v, lookup));
  } else if (typeof value === 'string') {
    return get(lookup, value);
  }
}

function translate(locale, key, obj) {
  return get(
    obj,
    ['i18n', locale].concat(key || []),
    get(obj, ['i18n', defaultLocale].concat(key || []))
  );
}

function assignAttribute(propValue, common, locale) {
  const option = propValue.property.alias;
  const label = translate(locale, 'label', propValue);
  const value = propValue.id;

  let attributes = get(common, ['attributes', option], []);
  if (!attributes.includes(label)) {
    set(common, ['attributes', option], [label].concat(attributes));
  }

  let attrs = get(common, ['attrs', option], []);
  if (!attrs.includes(value)) {
    set(common, ['attrs', option], [value].concat(attrs));
  }

  if (DISPLAY_PROPERTIES.includes(option)) {
    const values = get(common, ['display', option], []);
    const value = get(propValue, ['display', option]);
    if (value && !values.includes(value)) {
      values.push(value);
      set(common, ['display', option], values);
    }
  }
}

function matchesAttributes(image, attributes) {
  const attrs = get(image, ['attributes'], []);
  return attrs.some(attr => attributes.includes(attr));
}

function postProcessOptions(locale, common, target, variantValues) {
  common.variantOptions.forEach(option => {
    const values = get(target, ['attrs', option]);
    if (Array.isArray(values)) {
      const propValues = values.map(v => get(variantValues, v));
      const sorted = sortBy(propValues, sortByValueOrOrder);
      set(target, ['attrs', option], map(sorted, 'id'));
      set(
        target,
        ['attributes', option],
        map(sorted, v => translate(locale, 'label', v))
      );
    }
  });
}

function getOptionNames(variantOptions) {
  return Object.values(variantOptions).map(o => o.alias);
}

function sortByValueOrOrder(attr) {
  return typeof attr.value === 'number' ? attr.value : attr.order;
}
