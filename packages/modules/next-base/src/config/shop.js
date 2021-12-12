import { defaultLocale } from '@root/i18n';

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
  variantOptions: ['color', 'size', 'shoeSize', 'date'],
  variantOptionMapping: {
    date: (value, { option, context = {} }) => {
      const date = parseDate(value);
      if (date) {
        const locale = context.locale ?? defaultLocale;
        const value = date.getTime();
        const _id = String(value);
        const label = date.toLocaleDateString(
          locale,
          option.format ?? dateFormat
        );
        const shortLabel = date.toLocaleDateString(locale, shortFormat);
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
};

function parseDate(str) {
  try {
    const date = new Date(str);
    if (isValidDate(date)) return date;
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d);
}
