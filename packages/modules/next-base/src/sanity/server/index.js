export * from './currency';
export * from './lexicons';
export * from './navigation';
export * from './settings';
export * from './snipcart';

export { fetchProducts } from './product';

const development = process.env.NODE_ENV === 'development';

export const inDevelopment = fn => {
  return (req, res) => (development ? fn(req, res) : res.status(404).send());
};
