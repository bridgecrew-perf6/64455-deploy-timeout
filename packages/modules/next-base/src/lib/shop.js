import {
  get,
  set,
  has,
  unset,
  pick,
  omit,
  first,
  last,
  map,
  uniqBy,
  keyBy,
  sortBy,
  orderBy,
  every,
  compact,
  isMatch,
  isEqual,
  isBlank,
  difference,
  intersection,
  partition,
  isEmpty,
  isNumber,
  cloneDeep,
  sum,
  mergeObjects,
  blocksToText,
  joinUrl,
} from '@foundation/lib/util';

import { Currency } from '@foundation/lib/currency';

import { buildProductUrl, buildCategoryUrl } from '@app/lib/navigation';

import { buildImage } from '@app/hooks/image';

import { getOpengraphImage as getDefaultOpengraphImage } from '@app/lib/page';

import currencyConfig from '@app/config/currency';

import shopConfig from '@app/config/shop';

import appConfig from '@app/config/app';

import siteConfig from '@app/config/site';

import en from '@app/translations/en/shop';
import nl from '@app/translations/nl/shop';

import { defaultLocale } from '@root/i18n';

const FUTURE_YEARS = 1; // One year from now

const propertyNames = map(appConfig?.shop?.properties, 'alias');

const imageAttributes = ['color'].concat(shopConfig.imageAttributes ?? []);

const availabilityProps = [
  '_id',
  '_type',
  '_createdAt',
  '_updatedAt',
  'alias',
  'master',
  'hasVariants',
];

export const translations = { en, nl };

export { buildProductUrl, buildCategoryUrl }; // re-export

export const propertyLookup = appConfig?.shop?.properties?.reduce(
  (memo, prop) => set(memo, prop.alias, prop),
  {}
);

export const propertyToAlias = appConfig?.shop?.properties?.reduce(
  (memo, prop) => set(memo, prop._id, prop.alias),
  {}
);

export const aliasToProperty = appConfig?.shop?.properties?.reduce(
  (memo, prop) => set(memo, prop.alias, prop._id),
  {}
);

export const buildSnipcartUrl = variant => {
  return joinUrl(
    siteConfig.baseUrl,
    `/api/snipcart/products/${variant._id ?? variant.id}`
  );
};

export const buildAttributesString = (target, key = 'label') =>
  compact(map(target?.attributes ?? [], key)).join(' / ');

export const buildProductTitle = (product, variant) => {
  const title = product.name ?? 'Product';
  if (Array.isArray(variant?.attributes) && !isBlank(variant?.attributes)) {
    return `${title} - ${buildAttributesString(variant)}`;
  } else {
    return title;
  }
};

export const setProductUrl = (router, sku) => {
  const params = sku ? { ...router.query, sku } : omit(router.query, 'sku');
  const url = buildProductUrl(params);
  router.replace(url, undefined, { shallow: true });
};

export function getOpengraphImage(product, variant) {
  const defaultImage = getDefaultOpengraphImage(product);
  if (variant) {
    const image = getVariantImages(variant, product.images, true)[0];
    return image ?? defaultImage;
  } else {
    return defaultImage;
  }
}

export function buildRootCategory(locale = defaultLocale) {
  return {
    _id: 'root',
    _type: 'navigation.node',
    name: get(translations, [locale, 'shop'], 'Shop'),
    path: '/shop',
    isRoot: true,
    order: -1,
    parents: [],
    children: [],
  };
}

export function nodeToCategory(node) {
  const isRoot = node.isRoot || node.path === '/';
  const current = pick(node, '_id');
  current._type = isRoot ? 'navigation.node' : 'product.category';
  current.name = node.label ?? node.name;
  current.path = isRoot ? '/shop' : node.path ?? '/';
  current.order = node.order ?? 0;
  current.node = node._type === 'navigation.node';

  if (current.node && Array.isArray(node.nodes)) {
    current.paths = compact(map(node.nodes, 'item.path'));
  } else {
    current.paths = [];
  }

  const children = Array.isArray(node.nodes) ? node.nodes : [];

  return {
    ...current,
    children,
    parents: [],
  };
}

export function buildCategoryTitle(category) {
  const breadcrumbs = prepareBreadcrumbs(category);
  return map(breadcrumbs.slice(1), 'name').join(' - ');
}

export function buildCategorySeo(category, defaults = {}) {
  const parents = category?.parents ?? [];
  const targets = [defaults].concat(parents, category ?? []);
  targets.reverse();

  const title = buildCategoryTitle(category) || defaults.title;
  const description = findString(targets, 'description'); // find from ancestors
  const openGraph = mergeObjects(defaults.openGraph, { title, description });

  const noindex = parents.length > 0; // only handle first level

  return { title, description, openGraph, noindex };
}

export function prepareBreadcrumbs(category) {
  return [].concat(category?.parents ?? [], category ?? []);
}

export function buildProductBreadcrumbs(
  product,
  locale = defaultLocale,
  targetPath
) {
  const root = buildRootCategory(locale);

  const item = { label: product.name, href: buildProductUrl(product) };
  if (product?.category) {
    return [root].concat(
      prepareProductBreadcrumbs(product, product.category, targetPath)
    );
  } else {
    return [assignTargetPath(root, targetPath), item];
  }
}

export function prepareProductBreadcrumbs(product, category, targetPath) {
  const item = product
    ? { label: product.name, href: buildProductUrl(product) }
    : null;
  if (category) {
    const parents = prepareBreadcrumbs(category);
    const target = last(parents);
    if (target) {
      parents[parents.length - 1] = assignTargetPath(target, targetPath);
    }
    return parents.concat(item ?? []);
  } else {
    return item ? [item] : [];
  }
}

export function getVariantImages(variant, images = [], selective = false) {
  if (variant) {
    const [specific, generic] = partition(images, image => {
      if (Array.isArray(image.attributes) && image.attributes.length > 0) {
        const imageAttrs = map(image.attributes, '_id');
        const variantAttrs = map(variant.attributes, '_id');
        return intersection(variantAttrs, imageAttrs).length > 0;
      } else {
        return false;
      }
    });
    return selective ? specific : specific.concat(generic);
  } else {
    return images;
  }
}

export function getProductAttributes(product, options = {}) {
  const { selectedVariant, properties = [], variants = [] } = options;

  return properties.reduce((memo, property) => {
    const productAttributes = findAttributes(property, product.attributes);

    const variantOption = product.variantOptions.some(
      v => v._id === property._id
    );

    let variantAttributes = [];

    if (selectedVariant) {
      variantAttributes = findAttributes(
        property,
        selectedVariant.attributes,
        true
      );
    } else if (Array.isArray(variants)) {
      variantAttributes = variants.reduce(
        (memo, variant) =>
          memo.concat(findAttributes(property, variant.attributes, true)),
        []
      );
    }

    const attributes = variantAttributes.concat(productAttributes);

    const values = uniqBy(
      property.distinct ? attributes.slice(0, 1) : attributes,
      '_id'
    );

    if (values.length > 0) {
      memo.push({
        ...property,
        variantOption,
        values: sortBy(values, sortByValueOrOrder),
      });
    }

    return memo;
  }, []);
}

export function buildVariants(product, options = {}) {
  const {
    variant,
    selection,
    setSelection,
    properties = [],
    autoSelect = false,
  } = options;

  const { master } = product;

  const variants = cloneDeep(options.variants ?? product.variants ?? []);

  const productImages = Array.isArray(product.images) ? product.images : [];

  if (product.variantOptions.length > 0 && variants.length > 1) {
    let lookup = keyBy(product.variantOptions, 'alias');

    const allProperties = map(properties, 'alias');

    const variantOptions = Object.values(lookup).reduce((memo, prop) => {
      if (prop.values.length > 1) memo.push(prop.alias);
      return memo;
    }, []);

    const variantProperties = intersection(allProperties, variantOptions);

    lookup = pick(lookup, variantProperties);

    const selectionProperties = intersection(
      variantProperties,
      Object.keys(selection)
    );

    const fullSelection =
      selectionProperties.length >= variantProperties.length;

    const lastProperty = last(variantProperties);
    const hasSelection = selectionProperties.length > 0;
    const hasVariant = !isBlank(variant);
    const hasPreset = hasSelection || hasVariant;
    const hasMultipleProperties = variantProperties.length > 1;
    const matchedValues = [];
    const selectedProperties = [];

    const partialProperties = intersection(
      variantProperties,
      hasSelection ? selectionProperties : variantProperties
    ).slice(0, selectionProperties.length > 1 ? -1 : 1);

    const imageProperties = pick(selection, imageAttributes);
    const hasImageProperty = !isEmpty(imageProperties);

    let partialSelection = pick(selection, partialProperties);
    let match;

    if (hasVariant) {
      match = variants.find(v => matchesVariant(variant, v));
      if (match) partialSelection = pick(match.opts, partialProperties);
    } else {
      match = variants.find(
        v => fullSelection && isEqual(pick(v.opts, variantOptions), selection)
      );
    }

    const matches = variants.filter(
      v => hasPreset && isMatch(v.opts, partialSelection)
    );

    if (autoSelect && !match && matches.length > 0) {
      if (matches[0] && setSelection) setSelection(matches[0].opts);
    }

    matches.forEach(v => {
      Object.values(v.opts).forEach(
        v => !matchedValues.includes(v) && matchedValues.push(v)
      );
    });

    const currentSelection = match ? match.opts : partialSelection;

    const required = first(
      difference(variantProperties, Object.keys(currentSelection))
    );

    const target = lookup[required];

    const processedProperties = properties.reduce((memo, property, index) => {
      const prop = lookup[property.alias];
      let selected;
      if (prop) {
        let values = prop.values.map(value => {
          const mapped = { ...value };
          mapped.opts = set({ ...currentSelection }, property.alias, value._id);
          mapped.active = value._id === currentSelection[property.alias];
          mapped.disabled = hasPreset && !matchedValues.includes(value._id);
          mapped.className = compact([
            !selected && mapped.active ? 'uk-active' : false,
            hasMultipleProperties && mapped.disabled && index > 0
              ? 'tm-disabled'
              : false,
          ]).join(' ');

          mapped.variant = variants.find(v => isMatch(v.opts, mapped.opts));

          if (mapped.variant && mapped?.variant?._id === match?._id) {
            mapped.variant.active = true;
          }

          if (!target && mapped.variant && lastProperty === property.alias) {
            mapped.href = mapped.variant.href;
          }

          if (!selected && mapped.active) selected = value;

          return mapped;
        });

        values = sortBy(values, sortByValueOrOrder);

        if (selected) selectedProperties.push({ ...property, value: selected });

        const type = every(values, 'color') ? 'color' : 'value';
        const setValue = createPropertySetter(property, values, setSelection);

        memo.push({
          ...prop,
          value: selected,
          values,
          index,
          type,
          setValue,
        });
      }

      return memo;
    }, []);

    const imageVariant =
      match ??
      variants.find(v => hasImageProperty && isMatch(v.opts, imageProperties));

    const images = getVariantImages(imageVariant, productImages);

    const attributes = getProductAttributes(product, {
      variants,
      properties,
      selectedVariant: match,
    });

    const initialUnits =
      match?.units ??
      variants.reduce(
        (memo, v) => (isNumber(v.units) ? memo + v.units : memo),
        0
      );

    return {
      master,
      attributes,
      initialUnits,
      images,
      complete: Boolean(match),
      selected: match ?? master,
      selectedVariant: match, // the matching variant, if any
      all: variants, // all known variants, ordered
      target, // next candidate for selection
      targets: matches, // candidates for selection
      properties: processedProperties, // all variant properties
      selectedProperties, // selected variant properties
      currentSelection, // object mapping property.alias => value._id
      hasSelection,
      hasVariants: true,
    };
  } else {
    const attributes = getProductAttributes(product, { properties });
    const initialUnits = master?.units ?? 0;
    return {
      master,
      attributes,
      initialUnits,
      images: productImages,
      complete: true,
      selected: master,
      all: [],
      targets: [],
      properties: [],
      selectedProperties: [],
      currentSelection: {},
      hasSelection: false,
      hasVariants: false,
    };
  }
}

export function getProductImage(product, variant, options = {}) {
  const imageUrl =
    variant?.imageUrl || get(product, ['images', 0, 'asset', 'url']);

  const image = product.images.find(img => img?.asset?.url === imageUrl);

  const previewImage = image ? buildImage(image, options) : {};

  return {
    image,
    imageUrl,
    previewImage,
    previewUrl: previewImage?.url ?? null,
  };
}

export function variantToProduct(product, variant) {
  const productCopy = cloneDeep(product);
  productCopy.master = mergeObjects(
    product.master,
    pick(variant, 'sku', 'units')
  );
  productCopy.pricing = mergeObjects(productCopy.pricing, variant?.pricing);
  productCopy.master.pricing = productCopy.pricing;
  productCopy.hasVariants = false;
  productCopy.variants = [];
  productCopy.attributes = uniqBy(
    [].concat(product.attributes ?? []).concat(variant?.attributes ?? []),
    '_id'
  );
  return productCopy;
}

export function processVariants(product) {
  const variantProperties = intersection(
    propertyNames,
    map(product.variantOptions, 'alias')
  );
  return orderBy(
    product.variants.map(variant => processVariant(product, variant)),
    variantProperties.map(
      property => variant =>
        get(variant, ['options', property, 'order'], Number.MAX_SAFE_INTEGER)
    )
  );
}

export function processVariant(product, variant) {
  const href = buildProductUrl({
    alias: product.alias,
    sku: variant.sku,
  });

  const info = pick(product, 'name');

  info.productId = product._id;

  const snipcartUrl = buildSnipcartUrl(variant);

  const { previewUrl } = getProductImage(product, variant, {
    ratio: '1:1', // Snipcart uses square images
    scale: 0.4,
    format: 'jpg',
  });

  return { ...variant, ...info, href, previewUrl, snipcartUrl };
}

export function getProductOffers(product) {
  const priceCurrency = currencyConfig.default ?? 'EUR';
  const futureDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + FUTURE_YEARS)
  );
  const priceValidUntil = futureDate.toISOString().slice(0, 10);

  let offers;

  if (product.hasVariants) {
    offers = product.variants.map(variant => {
      const url = buildProductUrl(
        { alias: product.alias, sku: variant.sku },
        true
      );
      const attrs = getOfferAttributes(product, variant);
      return { ...attrs, url, priceCurrency, priceValidUntil };
    });
  } else {
    const url = buildProductUrl(
      {
        alias: product.alias,
        sku: product.master?.sku,
      },
      true
    );

    const attrs = getOfferAttributes(product);

    offers = { ...attrs, url, priceCurrency, priceValidUntil };
  }
  return offers;
}

// Helpers

function getOfferAttributes(product, variant) {
  const pricing = mergeObjects(product.pricing, variant?.pricing);
  const units = variant?.units ?? product?.master?.units;

  const price =
    pricing.price > 0 ? formatPriceAsString(pricing.price) : undefined;

  const itemCondition = formatSchemaType(
    lookupSchemaValue('condition', product, variant, 'NewCondition')
  );

  const availability = formatSchemaType(
    units > 0
      ? 'InStock'
      : lookupSchemaValue('availability', product, variant, 'InStock')
  );

  const data = { price, itemCondition, availability };

  const seller = lookupAttributeValue('seller', product, variant);

  if (!isBlank(seller?.label) && typeof seller?.label === 'string') {
    set(data, ['seller', 'name'], seller?.label);
  } else {
    set(data, ['seller', 'name'], siteConfig.name);
  }

  return data;
}

function formatPriceAsString(price) {
  return (Math.round(price * 100) / 100).toFixed(2);
}

function formatSchemaType(schemaType) {
  if (!isBlank(schemaType)) return `https://schema.org/${schemaType}`;
}

function lookupSchemaValue(name, product, variant, defaultValue) {
  const value = lookupAttributeValue(name, product, variant);
  return get(value, 'schemaType', defaultValue);
}

function lookupAttributeValue(name, product, variant) {
  const property = aliasToProperty[name];
  return (
    getAttributeValue(property, variant?.attributes) ??
    getAttributeValue(property, product?.attributes)
  );
}

function getAttributeValue(property, attributes = []) {
  return attributes.find(a => a.property === property);
}

function findAttributes(property, attributes = [], isVariant = false) {
  return attributes.reduce((attrs, attr) => {
    if (attr.property === property._id) attrs.push({ ...attr, isVariant });
    return attrs;
  }, []);
}

function matchesVariant(identifier, variant) {
  return (
    !isBlank(identifier) &&
    (variant._id === identifier || variant.sku === identifier)
  );
}

function createPropertySetter(property, values, fn) {
  if (typeof fn !== 'function') fn = () => null;
  const valid = map(values, '_id');
  return (v, e, toggle = false) => {
    if (e && e.preventDefault) e.preventDefault();
    fn(current => {
      if (valid.includes(v)) {
        if (toggle && current[property.alias] === v) {
          unset(current, property.alias);
          return { ...current };
        } else {
          const value = set({}, property.alias, v);
          return { ...current, ...value };
        }
      } else {
        return current;
      }
    });
  };
}

export const convertPrice = (amount, rate = 1) => {
  const price = Currency.from(amount);
  return price.multiply(rate).toUnit(2);
};

export const convertPricing = pricing => {
  const conversions = Object.entries(currencyConfig.currencies).reduce(
    (memo, [code, info]) => {
      if (typeof pricing.price === 'number') {
        memo[code.toLowerCase()] = convertPrice(pricing.price, info.rate);
      }
      return memo;
    },
    {}
  );
  return isBlank(conversions) ? undefined : conversions;
};

export const processAvailability = data => {
  const target = data?.variant ?? data?.master;
  if (target) {
    const isOrderable = !get(data, ['availability', 'isUnavailable']);
    target.pricing = mergeObjects(data.master.pricing, target.pricing);
    if (
      target._type === 'product.master' &&
      data.hasVariants &&
      Array.isArray(data.variants)
    ) {
      target.units = sum(data.variants);
    }
    const conversions = convertPricing(target.pricing);
    const url = buildSnipcartUrl(target);
    return {
      ...target,
      isOrderable,
      isAvailable: target.units > 0,
      conversions,
      url,
    };
  }
};

export const buildAvailability = (product, variant) => {
  const data = pick(product, availabilityProps);
  if (data.hasVariants && Array.isArray(product.variants)) {
    if (typeof variant === 'object') data.variant = variant;
    data.variants = product.variants.reduce((memo, v) => {
      if (typeof v.units === 'number') memo.push(v.units);
      return memo;
    }, []);
  }
  return processAvailability(data);
};

export function buildVariantLinks(product, current) {
  const { alias } = product;
  const variantIndex = product.variants.indexOf(current);
  const links = [];

  const [first, prev, next, last] = [
    product.variants[0],
    product.variants[variantIndex - 1],
    product.variants[variantIndex + 1],
    product.variants[product.variants.length - 1],
  ];

  if (first) {
    links.push({
      rel: 'first',
      href: buildProductUrl({ alias, sku: first.sku }),
    });
  }

  if (prev) {
    links.push({
      rel: 'prev',
      href: buildProductUrl({ alias, sku: prev.sku }),
    });
  }

  if (next) {
    links.push({
      rel: 'next',
      href: buildProductUrl({ alias, sku: next.sku }),
    });
  }

  if (last) {
    links.push({
      rel: 'last',
      href: buildProductUrl({ alias, sku: last.sku }),
    });
  }

  return links;
}

// Helpers

function sortByValueOrOrder(attr) {
  return typeof attr.value === 'number' ? attr.value : attr.order;
}

function assignTargetPath(target, targetPath) {
  if (target && !isBlank(targetPath) && targetPath.startsWith(target.path)) {
    return { ...target, path: targetPath };
  } else {
    return target;
  }
}

function findString(targets, key) {
  const target = targets.find(t => has(t, key));
  if (target) {
    const value = get(target, key);
    if (!isBlank(value)) return blocksToText(value);
  }
}
