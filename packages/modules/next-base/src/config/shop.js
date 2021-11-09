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
  variantOptions: ['color', 'size', 'shoeSize'],
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
