import { defaultLocale } from '@root/i18n';

import {
  parseDate,
  formatDate,
} from '@atelierfabien/next-foundation/lib/util/date'; // specific

const dateFormat = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const shortFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export default {
  autohidePurchaseOptions: false,
  outOfStockPurchase: true,
  linkToBrand: false,
  linkToVariant: false,
  image: {
    ratio: '4:5',
    useItemRatio: true,
  },
  thumbnail: {
    ratio: '1:1',
  },
  preview: {
    ratio: '1:1',
    scale: 0.4,
  },
  hiddenVariantOptions: [],
  minVariants: 1, // set to 1 to hide variants unless more than one
  variantOptions: ['color', 'size', 'shoeSize', 'date'],
  variantOptionMapping: {
    date: (value, { option, context = {} }) => {
      const date = parseDate(value);
      if (date) {
        const locale = context.locale || defaultLocale;
        const value = date.getTime();
        const _id = String(value);
        const label = formatDate(date, {
          locale,
          format: option.format || dateFormat,
        });
        const shortLabel = formatDate(date, { locale, format: shortFormat });
        return { _id, label, shortLabel, value, numeric: true };
      }
    },
  },
  imageAttributes: ['color'],
  list: {
    perPage: 6,
    perPageOptions: [
      { label: '6', value: 6 },
      { label: '12', value: 12 },
      { label: '24', value: 24 },
      { label: '48', value: 48 },
    ],
    // sortByOptions: [
    //   { label: 'shop:sortByPriceAsc', value: 'price_asc' },
    //   { label: 'shop:sortByPriceDesc', value: 'price_desc' },
    // ],
  },
  ssr: {
    perPage: 48,
  },
  revalidation: {
    category: 60 * 60 * 24, // 24 hours
    product: 60 * 60, // 1 hour
  },
};
