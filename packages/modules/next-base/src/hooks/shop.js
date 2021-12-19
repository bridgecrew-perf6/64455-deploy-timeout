import { useMemo, useState, useCallback, useEffect } from 'react';

import {
  useConfig,
  useRouter,
  useQuery,
  useTranslation,
  usePage,
  useSeo,
  wrapQuery,
  useGlobalContext,
  usePrevious,
} from '@foundation/next';

import {
  get,
  set,
  unset,
  pick,
  omit,
  last,
  union,
  lookup,
  isBlank,
  isBoolean,
  without,
  truncate,
  blocksToText,
  isEqual,
  difference,
} from '@foundation/lib/util';

import locales from '@app/config/locales';

import {
  setProductUrl,
  buildProductUrl,
  getProductAttributes,
  buildVariants,
  buildAvailability,
  getProductOffers,
  variantToProduct,
  prepareBreadcrumbs,
  buildCategorySeo,
} from '@app/lib/shop';

import { getCategory } from '@app/lib/rpc';

import { buildImage, lookupImageSettings } from '@app/hooks/image';

import shopConfig from '@app/config/shop';

const productCardImageSettings = lookupImageSettings('productCard');

const query = wrapQuery(getCategory);

const passThrough = () => true;

const markerMapping = {
  sale: 'warning',
  hightlight: 'primary',
};

export const useProductUrl = (product, variant) => {
  const { alias } = product;
  const sku = variant?.sku ?? product.master?.sku;
  return useMemo(() => buildProductUrl({ alias, sku }), [alias, sku]);
};

export const useAddress = (parts = []) => {
  if (parts.length === 0) parts = ['street', 'postalCode', 'city', 'country'];

  const address = useConfig('shop.address');

  const location = useMemo(
    () => parts.map(part => address(part)).filter(s => s),
    [address, parts]
  );

  return [address, location];
};

export const useOpeningHours = () => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const hours = useConfig('shop')('openingHours');

  const openingHours = useMemo(
    () =>
      (hours ?? []).reduce((memo, entry) => {
        memo[entry.day] = memo[entry.day] || {
          day: entry.day,
          name: get(locales, [locale, 'weekdays', 'short', entry.day]),
          times: [],
        };
        if (entry.closed) {
          memo[entry.day].times.push(t('app:closed'));
        } else {
          memo[entry.day].times.push(`${entry.from} - ${entry.to}`);
        }
        return memo;
      }, {}),
    [hours, locale, t]
  );

  return Object.values(openingHours);
};

export function useContact(section = 'shop') {
  const contact = useConfig(section)('contact') ?? [];
  return (type, key = 'value') => {
    const entry = contact.find(c => c.type === type && c.value);
    if (typeof key === 'string' || Array.isArray(key)) {
      return get(entry, key);
    } else {
      return entry;
    }
  };
}

export function useProductProperties(filter = passThrough) {
  const config = useConfig('shop');

  return useMemo(() => {
    const properties = config('properties') ?? [];
    return properties.reduce((memo, property, i) => {
      const prop = omit(property, 'i18n');
      const name = config(['properties', i, 'name']);
      const pluralName = config(['properties', i, 'pluralName']);
      const basic = config(['properties', i, 'basic']);
      const item = {
        ...prop,
        alias: property.alias,
        name,
        pluralName,
        basic,
      };
      if (filter(item)) memo.push(item);
      return memo;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
}

export function useProductAttributes(product, options = {}) {
  const properties = useProductProperties();
  return useMemo(
    () => getProductAttributes(product, { ...options, properties }),
    [options, product, properties]
  );
}

export function useVariants(product, options = {}) {
  const { variants } = product;
  const { autoSelect } = options;

  const properties = useProductProperties();

  const [variant, setVariant] = useState(options.id ?? options.sku);

  const [selection, setSelection] = useState({ ...options.selection });

  const changeVariant = useCallback(
    identifier => {
      setSelection({});
      setVariant(identifier);
    },
    [setSelection, setVariant]
  );

  const changeSelection = useCallback(
    selection => {
      setVariant();
      setSelection(selection);
    },
    [setSelection, setVariant]
  );

  const setProperty = useCallback(
    (property, value) => {
      changeSelection(selection => {
        if (isBlank(value)) {
          unset(selection, property);
        } else {
          set(selection, property, value);
        }
        return { ...selection };
      });
    },
    [changeSelection]
  );

  const attributes = useMemo(
    () => getProductAttributes(product, { ...options, properties }),
    [options, product, properties]
  );

  return useMemo(() => {
    const data = buildVariants(product, {
      setSelection: changeSelection,
      properties,
      variant,
      variants,
      selection,
      autoSelect,
    });

    const getAttribute = name =>
      data.selectedProperties.find(attr => attr.alias === name) ||
      attributes.find(attr => attr.alias === name);

    const getAttributeValue = name =>
      lookup(getAttribute(name), ['value'], ['values', 0]);

    return {
      ...data,
      getAttribute,
      getAttributeValue,
      setProperty,
      setVariant: changeVariant,
      setSelection: changeSelection,
    };
  }, [
    product,
    changeSelection,
    properties,
    variant,
    variants,
    selection,
    autoSelect,
    attributes,
    setProperty,
    changeVariant,
  ]);
}

export function useVariantAsProduct(product, variant, expandMaster = false) {
  return useMemo(() => {
    if (expandMaster && variant._type === 'product.master') {
      return product;
    } else {
      return variantToProduct(product, variant);
    }
  }, [expandMaster, product, variant]);
}

export function useProductOffers(product) {
  return useMemo(() => getProductOffers(product), [product]);
}

export function useProductAvailability(variantId, attributes, options = {}) {
  const {
    initialData,
    initialUnits = -1,
    limitQuantity = true,
    availabilityQuery = () => null,
  } = options;

  const router = useRouter();

  const { t } = useTranslation();

  const current = useQuery([variantId], availabilityQuery, {
    staleTime: 30 * 1000,
    initialData,
  });

  const isAvailable = current.data?.isAvailable;
  const units = current.data?.units ?? initialUnits;
  const pricing = current.data?.pricing ?? {};
  const conversions = current.data?.conversions;
  const currentlyOrderable = current.data?.isOrderable;

  const status = useMemo(() => {
    const info = attributes.find(attr => attr.alias === 'availability');
    const defined = last(info?.values ?? []);
    if (isAvailable === true || isAvailable === undefined) {
      return { label: t('shop:availabilityInStock'), alias: 'in-stock' };
    } else if (isAvailable === false && defined?.alias) {
      return pick(defined, 'label', 'alias', 'isUnavailable');
    } else if (isAvailable === false) {
      return {
        label: t('shop:availabilityOutOfStock'),
        alias: 'out-of-stock',
        isUnavailable: true,
      };
    } else {
      return {
        label: t('shop:availabilityUnknown'),
        alias: 'unknown',
        isUnavailable: true,
      };
    }
  }, [attributes, isAvailable, t]);

  // Note: isOrderable means available from stock, or on request
  // See PropertyValue custom option: isUnavailable
  let isOrderable = isAvailable || !status.isUnavailable;

  if (isBoolean(currentlyOrderable)) {
    isOrderable = isOrderable && currentlyOrderable;
  }

  let maxQuantity = units; // Note: -1 means unlimited

  if (isOrderable && limitQuantity && units > 0) {
    // limited, from stock only
    maxQuantity = units;
  } else if (isOrderable) {
    // unlimited, on request
    maxQuantity = -1;
  } else if (limitQuantity && units > -1) {
    // limited, from stock only
    maxQuantity = units;
  } else {
    maxQuantity = isAvailable ? -1 : 0;
  }

  return {
    current,
    isOrderable,
    isAvailable: Boolean(isAvailable),
    isLoading: current.status === 'loading',
    isPending: current.data?.isAvailable === undefined,
    inStock: units > 0 || units === -1,
    pricing: router.isPreview ? {} : pricing,
    units,
    status,
    maxQuantity,
    conversions,
  };
}

export const withProduct = (Component, config = {}) => {
  return function ProductComponent(props) {
    const { item } = props;
    const router = useRouter();

    const options =
      router.query.sku === item?.master?.sku ? {} : pick(router.query, 'sku');

    const variants = useVariants(item, { ...options, ...config });

    const {
      master,
      selected,
      selectedVariant,
      images,
      attributes,
      initialUnits,
    } = variants;

    const initialData = useMemo(() => {
      if (typeof window === 'undefined') {
        // only on server
        return buildAvailability(item, selectedVariant);
      }
    }, [item, selectedVariant]);

    const availability = useProductAvailability(
      selected?._id || master?._id,
      attributes,
      { ...config, initialUnits, initialData }
    );

    useEffect(() => {
      if (selectedVariant) {
        if (selectedVariant.sku !== router.query.sku) {
          setProductUrl(router, selectedVariant.sku);
        }
      } else if (item?.master?.sku && item?.master?.sku !== router.query.sku) {
        setProductUrl(router, item?.master?.sku);
      }
    }, [item.master.sku, router, selectedVariant]);

    return (
      <Component
        {...props}
        variant={selected}
        variants={variants}
        availability={availability}
        images={images}
      />
    );
  };
};

export const withPurchaseButtonLabel = Component => {
  return function PurchaseButtonLabel(props) {
    const {
      variants,
      availability,
      quantity = 1,
      isProcessing = false,
      isProcessed = false,
      showSelection = false,
    } = props;

    const { complete, target, selectedProperties } = variants;

    const { isAvailable, isOrderable, isLoading, isPending } = availability;

    const { t } = useTranslation();

    const canOrder = complete && isOrderable && !isLoading;

    const label = useMemo(() => {
      if (isProcessed) {
        return t('shop:cartAdded');
      } else if (isProcessing) {
        return t('shop:cartProcessing');
      } else if (target) {
        const optionName = !isBlank(target.basic?.name)
          ? target.basic.name
          : target.name;

        return t('shop:cartChooseOption', { option: optionName });
      } else if (canOrder || isPending) {
        return t('shop:cartAdd', { count: quantity });
      } else if (isLoading || isPending) {
        return t('shop:availabilityCheck');
      } else {
        return isOrderable
          ? t('shop:availabilityInStock')
          : t('shop:availabilityOutOfStock');
      }
    }, [
      isProcessed,
      isProcessing,
      target,
      canOrder,
      isPending,
      isLoading,
      t,
      quantity,
      isOrderable,
    ]);

    const selectionLabels = useMemo(
      () =>
        complete && showSelection
          ? selectedProperties.map(o => o.value.label)
          : [],
      [complete, selectedProperties, showSelection]
    );

    const isEnabled = (canOrder || isPending) && complete && quantity > 0;

    const status = isProcessed
      ? 'processed'
      : isProcessing
      ? 'processing'
      : 'idle';

    return (
      <Component
        {...props}
        label={label}
        selectionLabels={selectionLabels}
        isEnabled={isEnabled}
        isPending={isPending}
        isLoading={isLoading}
        isAvailable={isAvailable}
        isOrderable={isOrderable}
        status={status}
      />
    );
  };
};

export function useCategory() {
  const global = useGlobalContext(true);
  const router = useRouter();
  const page = usePage();
  const defaults = [page.category, page.node];

  const queryOptions = pick(router, 'locale', 'locales');
  const queryPath = Array.isArray(router.query?.path)
    ? `/${router.query?.path.join('/')}`
    : '/';

  const result = useQuery([queryPath, queryOptions], query, {
    staleTime: 60 * 60 * 24 * 1000, // 24 hours
    keepPreviousData: true,
  });

  const [category, node] = Array.isArray(result.data) ? result.data : defaults;

  const breadcrumbs = useMemo(() => prepareBreadcrumbs(category), [category]);

  useEffect(() => {
    global.set(['productCategory', router.locale], category);
    global.set('breadcrumbs', breadcrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, breadcrumbs]);

  return [category, node, prepareBreadcrumbs(category)];
}

export function useCategorySeo(category) {
  const defaultSeo = useSeo();
  return useMemo(
    () => buildCategorySeo(category, defaultSeo),
    [category, defaultSeo]
  );
}

export function withProductCategory(Component) {
  return function ProductCategory(props) {
    const [category, node] = useCategory();
    return <Component {...props} category={category} node={node} />;
  };
}

export function useProducts(items = []) {
  const { t } = useTranslation();

  return useMemo(() => {
    const { ratio, defaultPlaceholder } = productCardImageSettings;
    return items.map((item, index) => {
      const { pricing, brand, attributes } = item;
      let markers = [];

      const _id = lookup(item, '_id', 'objectID');
      const title = lookup(item, 'label', 'title', 'name');
      const body = blocksToText(lookup(item, 'description', 'text'));
      const kind = item.kind ? t(`lexicons:productTypes.${item.kind}`) : null;

      const text = truncate(body, { length: 180, separator: /,? +/ });

      const color = lookup(item, ['display', 'color', 0]);

      const colors = without(
        lookup(item, ['variable', 'display', 'color']) ?? [],
        color
      )
        .sort()
        .reverse();

      const images = item.images ?? [];

      const image = buildImage(images[0], {
        ratio,
        format: 'jpg',
        placeholder: defaultPlaceholder,
      });

      if (Array.isArray(item.markers)) {
        markers = [].concat(item.markers).sort();
      } else if (typeof item.markers === 'object') {
        const markersObject = item.markers ?? {};
        markers = Object.keys(markersObject).reduce((m, marker) => {
          if (marker.startsWith('_')) return m;
          if (markersObject[marker]) m.push(marker);
          return m;
        }, []);
        markers = [].concat(markers).sort();
      }

      const attrs = difference(
        shopConfig.variantOptions || [],
        shopConfig.imageAttributes || []
      );

      if (typeof item.variable?.attributes === 'object') {
        Object.assign(attributes, pick(item.variable?.attributes, attrs));
      }

      const product = {
        _id,
        _key: item._key ?? `${_id}-${index}`,
        alias: item.alias,
        master: item.master,
        pricing,
        kind,
        brand,
        title,
        text,
        image,
        markers,
        attributes,
        color,
        colors,
      };

      if (item.isVariant) {
        product.variant = pick(item, 'sku');
      }

      return product;
    });
  }, [items, t]);
}

export function useProductMarkers(item, extra = []) {
  const { t } = useTranslation();
  const { markers = [] } = item;

  return useMemo(() => {
    const sorted = [].concat(union(markers, extra)).sort();
    return sorted.reduce((m, marker) => {
      const label = t(`lexicons:productMarkers.${marker}`);
      const type = markerMapping[marker];
      if (!isBlank(label)) m.push({ marker, label, type });
      return m;
    }, []);
  }, [markers, extra, t]);
}

export function useCategoryPaths(onChange) {
  const router = useRouter();
  const page = usePage();
  const global = useGlobalContext(true);
  const category =
    global.get(['productCategory', router.locale]) ?? page.category ?? {};

  const { path, paths } = category;

  const previous = usePrevious({ path, paths });

  const categoryPaths = useMemo(() => {
    return [].concat(paths ?? path ?? []);
  }, [path, paths]);

  useEffect(() => {
    const previousCategories = [].concat(
      previous?.paths ?? previous?.path ?? []
    );
    if (
      typeof onChange === 'function' &&
      !isEqual(categoryPaths, previousCategories)
    ) {
      onChange(categoryPaths);
    }
  }, [categoryPaths, previous, onChange]);

  return categoryPaths;
}
