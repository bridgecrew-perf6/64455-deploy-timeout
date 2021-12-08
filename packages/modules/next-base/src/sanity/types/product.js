import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import { getPageProps } from '@foundation/next';

import {
  get as getter,
  map,
  pick,
  orderBy,
  isBlank,
  detect,
  mergeObjects,
  kebabCase,
} from '@foundation/lib/util';

import { getPageLayout, getPageType } from '@app/lib/page';

import {
  buildProductTitle,
  buildProductUrl,
  getOpengraphImage,
  processVariant,
  processVariants,
} from '@app/lib/shop';

import appConfig from '@app/config/app';

import shopConfig from '@app/config/shop';

import {
  productPredicate,
  productProjection,
  variantPredicate,
  variantDetailsProjection,
} from '@app/sanity/queries';

import { defaultLocale } from '@root/i18n';

const propertiesOrder = map(appConfig?.shop?.properties || [], '_id');

const imageAttributes = ['color'].concat(shopConfig.imageAttributes ?? []);

export const predicate = productPredicate;

export const projection = productProjection;

const options = { predicate, projection, defaultLocale };

// Methods

const get = defineQuery('id', options);

const getByAlias = defineQuery('alias', options);

const fetch = defineQuery('all', options);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  projection: groq`
    _id, _type, alias,
    'sku': master.sku, 'updatedAt': coalesce(item->_updatedAt, _updatedAt)
  `,
  properties: ['alias', 'sku'],
});

const getVariant = defineQuery('one', {
  predicate: variantPredicate,
  projection: variantDetailsProjection,
  defaultLocale,
});

export async function resolveProps(item = {}, context = {}) {
  const { router = {} } = context;
  const variantOptions = [].concat(item.variantOptions ?? []);

  const targetSKU = context?.params?.sku;

  const skus = [].concat(item.master?.sku || []);

  const images = Array.isArray(item.images) ? item.images : [];

  let seoImage;

  item.title = buildProductTitle(item);

  // Markers
  item.markers = Object.entries(item.markers || {}).reduce(
    (memo, [key, bool]) => {
      if (bool) memo.push(key);
      return memo;
    },
    []
  );

  // Master

  item.master = item.master ?? {};
  item.master.pricing = mergeObjects({}, item?.pricing);
  item.master.attributes = [];
  item.master.options = {};
  item.master.opts = {};

  item.master.url = buildProductUrl({
    alias: item.alias,
    sku: item.master?.sku,
  });

  item.master = processVariant(item, item.master);

  // Variants

  item.variantOptions.forEach(option => {
    option.values = [];
    item.variants.forEach((variant, index) => {
      variant.opts = variant.opts ?? {};
      const value = getter(variant, ['options', option.alias]);
      let mapped = value;

      const mapping = option.type
        ? shopConfig?.variantOptionMapping?.[option.type]
        : false;

      if (typeof mapping === 'function') {
        mapped = mapping(value, { variant, option, context });
        if (typeof mapped !== 'object') return; // skip
        mapped.property = option._id;
        mapped.value = mapped.value ?? value;
        mapped.label = mapped.label ?? String(mapped.value);
        mapped.alias = mapped.alias ?? kebabCase(mapped.label);
        mapped.order = mapped.order ?? index + 1;
      }

      if (typeof mapped === 'object' && !isBlank(mapped)) {
        const exists = option.values.find(o => o.alias === mapped?.alias);
        if (!exists) option.values.push(mapped);
        variant.opts[option.alias] = mapped._id;
        variant.options[option.alias] = mapped;
      }
    });
    option.values = orderBy(option.values, 'order');
  });

  item.variants.forEach(variant => {
    if (!isBlank(variant.sku)) skus.push(variant.sku);

    variant.isActive = Boolean(targetSKU && variant.sku === targetSKU);

    variant.attributes = orderBy(Object.values(variant.options), attr =>
      propertiesOrder.indexOf(attr.property)
    );

    variant.pricing = mergeObjects(item.master.pricing, variant.pricing);

    variant.url = buildProductUrl({
      alias: item.alias,
      sku: variant.sku,
    });

    if (variant.isActive) item.title = buildProductTitle(item, variant);

    const imageAttrs = map(
      Object.values(pick(variant.options, imageAttributes)),
      '_id'
    );

    const image =
      detect(images, image => {
        const match = image.attributes.find(attr =>
          imageAttrs.includes(attr._id)
        );
        if (match) return image;
      }) ?? images[0];

    if (!seoImage && variant.isActive && image) {
      seoImage = image;
    }

    if (image?.asset?.url) variant.imageUrl = image.asset.url;
  });

  // Normalize and order based on properties
  item.variants = processVariants(item);

  // Lookup social media image
  const openGraphImage = getOpengraphImage(item, seoImage) ?? null;

  // Page layout, mapped to site layout component
  const pageLayout = getPageLayout(item, 'shop');

  // Page type, mapped to page component
  const pageType = getPageType(item, 'product');

  return getPageProps(context, {
    page: {
      ...item,
      skus,
      variantOptions,
    },
    router: {
      path: item.master.url, // instead of canonical
      ...router,
    },
    pageLayout,
    pageType,
    seo: { image: openGraphImage },
  });
}

export default define({
  get,
  getByAlias,
  getVariant,
  fetch,
  getStaticPaths,
  resolveProps,
});
