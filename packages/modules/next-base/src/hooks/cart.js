import { useState, useMemo, useEffect, useCallback } from 'react';
import { createGlobalState } from 'react-use';

import {
  usePrevious,
  useTranslation,
  useDocumentEvent,
  useSettings,
  mapTranslations,
} from '@foundation/next';

import {
  get,
  pick,
  defaults,
  isEqual,
  isBlank,
  isEmpty,
  once,
} from '@foundation/lib/util';

import currencyConfig from '@app/config/currency';

import i18n from '@root/i18n';

const isDevelopment = process.env.NODE_ENV === 'development';

const defaultCurrency = currencyConfig.default ?? 'EUR';

const isBrowser = typeof window !== 'undefined';

const feedbackTimeout = 1000;

const coreAttributes = ['color', 'size', 'shoeSize'];

const useSnipcartStatus = createGlobalState(false);

// ProductDefinition:
//
// id – string
// name – string
// price – number or array
// url – string
// description – an optional string
// image – an optional string
// categories – an optional
// metadata – an optional {}
// fileGuid – an optional string
// quantity – an optional number
// minQuantity – an optional number
// maxQuantity – an optional number
// quantityStep – an optional number
// dimensions – an optional Dimensions
// customFields – an optional
// stackable – an optional StackingOptions
// shippable – boolean
// hasTaxesIncluded – an optional boolean
// taxable – boolean
// taxes – an optional

const itemDefaults = {
  hasTaxesIncluded: true,
  shippable: true,
  taxable: true,
};

export function variantToCartItem(variant, quantity = 1) {
  const isMaster = variant._type === 'product.master';
  const itemOptions = {};

  const item = {};
  item.id = variant._id;
  item.price = variant.snipcartPrice;
  item.url = variant.snipcartUrl;
  item.quantity = quantity;

  if (variant.units > 0) item.maxQuantity = variant.units;

  if (!isBlank(variant.name)) item.name = variant.name;
  if (!isBlank(variant.description)) item.description = variant.description;

  if (!isBlank(variant.previewUrl)) item.image = variant.previewUrl;

  if (Array.isArray(variant.attributes)) {
    const variantOptions = variant.options ?? {};
    const descriptiveLabels = variant.attributes.reduce((m, attr) => {
      const isOption =
        attr.variantOption || (isMaster && coreAttributes.includes(attr.alias));
      if (isOption && !isEmpty(attr.values)) {
        if (variantOptions[attr.alias]) {
          const { label } = variantOptions[attr.alias];
          itemOptions[attr.alias] = label;
          m.push(label);
        } else {
          const values = attr.values.map(v => v.label).join(' / ');
          m.push(values);
        }
      }
      return m;
    }, []);

    if (!isEmpty(descriptiveLabels)) {
      item.description = descriptiveLabels.join(' / ');
      itemOptions.summary = item.description;
    }
  }

  const metadata = pick(variant, [
    'identifier',
    'sku',
    'productId',
    'href',
    'outOfStockPurchase',
  ]);

  item.metadata = { ...metadata, ...itemOptions };

  if (!isBlank(variant.customFields)) {
    // not implemented yet
    item.customFields = variant.customFields;
  }

  return defaults(item, itemDefaults);
}

export function useSnipcart() {
  const Snipcart = useSnipcartApi();

  const addToCart = useMemo(
    () =>
      async (variant, quantity = 1) => {
        if (Snipcart) {
          const item = variantToCartItem(variant, quantity);
          // eslint-disable-next-line no-console
          if (isDevelopment) console.log('SNIPCART ITEM', item);
          return Snipcart.api.cart.items.add(item);
        } else {
          throw new Error('Snipcart not available');
        }
      },
    [Snipcart]
  );

  return { addToCart };
}

export function useSnipcartApi(fn = () => null) {
  const [isReady, setReady] = useSnipcartStatus();
  const [isExecuted, setExecuted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useMemo(() => once(fn), []);

  useEffect(() => {
    if (isBrowser && window?.Snipcart) setReady(true);
  }, [setReady]);

  useDocumentEvent(
    'snipcart.ready',
    () => {
      if (isExecuted) return;
      setExecuted(true);
      if (!isReady) setReady(true);
      if (isBrowser) handler(window?.Snipcart);
    },
    { once: true }
  );

  if (isBrowser && isReady && !isExecuted) {
    handler(window?.Snipcart);
  }

  if (isBrowser && window?.Snipcart) return window.Snipcart;
}

export function useSnipcartSettings(options = {}) {
  const { confirmation = true, translationMapping = {} } = options;

  const Snipcart = useSnipcartApi();

  const { locale, currency, setCurrency } = useSettings();

  const { t } = useTranslation();

  const languageCode = useMemo(() => {
    return (locale ?? i18n.defaultLocale).toLowerCase();
  }, [locale]);

  const currencyCode = useMemo(() => {
    return (currency ?? defaultCurrency).toLowerCase();
  }, [currency]);

  useEffect(() => {
    if (!Snipcart) return;
    const state = Snipcart.store.getState();
    const currency = get(
      state,
      ['session', 'settings', 'currency'],
      defaultCurrency
    );

    const count = get(state, ['cart', 'items', 'count'], 0);

    if (confirmation && count > 0 && currency !== currencyCode) {
      // eslint-disable-next-line no-alert
      const result = window.confirm(t('shop:confirmCurrencyChange'));
      if (!result) {
        setCurrency(currency.toUpperCase());
        return;
      }
    }

    Snipcart.api.session.setLanguage(
      languageCode,
      mapTranslations(t, translationMapping)
    );

    Snipcart.api.session.setCurrency(currencyCode);
  }, [
    Snipcart,
    languageCode,
    currencyCode,
    setCurrency,
    confirmation,
    t,
    translationMapping,
  ]);

  return { languageCode, currencyCode };
}

export function useSnipcartState(fn = () => null) {
  const Snipcart = useSnipcartApi();

  const [state, setState] = useState({});

  useEffect(() => {
    if (Snipcart) {
      return Snipcart.store.subscribe(() => {
        const storeState = Snipcart.store.getState();
        if (!isEqual(state, storeState)) {
          if (typeof fn === 'function') fn(state);
          setState(storeState);
        }
      });
    }
  }, [Snipcart, state, setState, fn]);

  return state;
}

export function useSnipcartStats() {
  const state = useSnipcartState();

  const currency = get(
    state,
    ['session', 'settings', 'currency'],
    defaultCurrency
  ).toUpperCase();

  const isLoading = get(state, ['session', 'loading'], false);
  const isSandboxMode = get(state, ['session', 'isSandboxMode'], false);
  const count = get(state, ['cart', 'items', 'count'], 0);
  const items = get(state, ['cart', 'items', 'items'], []);
  const total = get(state, ['cart', 'total'], 0);
  return { count, total, items, isSandboxMode, isLoading, currency };
}

export function useCartSubmit(variant, quantity = 1, options = {}) {
  const {
    availability,
    setQuantity = () => {},
    setProcessing = () => {},
    setProcessed = () => {},
    showNotification = showEssentialNotification,
    timeout = feedbackTimeout,
  } = options;

  const { current, isOrderable, conversions } = availability;

  const { t } = useTranslation();

  const { addToCart } = useSnipcart();

  return useCallback(
    e => {
      e.preventDefault();
      let count = quantity;
      let promise;

      if (variant?._id) {
        setProcessing(true);
        promise = current.refetch().then(({ data }) => {
          // For limited items, restrict the quantity currently in stock
          count = isOrderable
            ? quantity
            : Math.min(quantity, data?.units ?? quantity);

          // Add to cart if enough quantity or on request
          if (quantity <= data.units || isOrderable) {
            if (quantity !== count) {
              showNotification(t('shop:cartAdddedLimited'), 'warning', timeout);
            }

            const item = { ...variant };

            // Use multi-currency conversions, if provided
            item.snipcartPrice = conversions ?? variant?.pricing?.price;

            // Mark item as out of stock purchase, if needed
            item.outOfStockPurchase = quantity > data.units;

            return addToCart(item, count)
              .then(() => setProcessed(true))
              .catch(e => {
                // eslint-disable-next-line no-console
                if (isDevelopment && e) console.error(e.message);
                return Promise.reject(new Error(t('shop:cartError')));
              });
          } else {
            return Promise.reject(
              new Error(t('shop:availabilityNotAvailable'))
            );
          }
        });
      } else {
        promise = Promise.reject(new Error(t('shop:availabilityNotAvailable')));
      }

      promise
        .then(
          () => {
            showNotification(
              t('shop:cartAdded', { count }),
              'success',
              timeout
            );
          },
          err => {
            showNotification(err.message, 'danger', timeout);
          }
        )
        .finally(() => {
          setTimeout(() => {
            setProcessing(false);
            setProcessed(false);
            setQuantity(1);
          }, timeout);
        });
    },
    [
      addToCart,
      current,
      isOrderable,
      quantity,
      setProcessed,
      setProcessing,
      setQuantity,
      showNotification,
      t,
      timeout,
      variant,
      conversions,
    ]
  );
}

export function useCart(options = {}) {
  const { variant, variants, availability } = options;
  const { complete, selectedVariant, attributes } = variants;
  const { maxQuantity } = availability;

  const [quantity, setQuantity] = useState(1);

  const previousVariant = usePrevious(selectedVariant);

  const [isProcessing, setProcessing] = useState(false);
  const [isProcessed, setProcessed] = useState(false);

  const isDisabled = !complete || isProcessing || maxQuantity === 0;

  useEffect(() => {
    if (previousVariant && selectedVariant !== previousVariant) setQuantity(1);
  }, [previousVariant, selectedVariant]);

  const onChangeQuantity = useCallback((target, count) => {
    setQuantity(count);
  }, []);

  const onClickAdd = useCartSubmit({ ...variant, attributes }, quantity, {
    ...options,
    availability,
    setQuantity,
    setProcessing,
    setProcessed,
  });

  return {
    quantity,
    maxQuantity,
    isDisabled,
    isProcessing,
    isProcessed,
    onChangeQuantity,
    onClickAdd,
  };
}

// Notifications

export function showCartNotification(message, status = 'primary', timeout = 0) {
  if (typeof window !== 'undefined' && window.UIkit && !isBlank(message)) {
    UIkit.notification({
      message,
      status,
      timeout: timeout > 0 ? timeout : feedbackTimeout,
      pos: 'top-right',
    });
  }
}

export function showEssentialNotification(
  message,
  status = 'primary',
  timeout = 0
) {
  if (['warning', 'danger'].includes(status)) {
    showCartNotification(message, status, timeout);
  }
}
