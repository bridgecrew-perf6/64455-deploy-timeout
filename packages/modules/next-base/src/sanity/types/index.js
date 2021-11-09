import banner from './banner';
import collection from './collection';
import homepage from './homepage';
import node from './node';
import page from './page';
import product from './product';
import category from './category';
import route from './route';

const queries = client => ({
  banner: banner(client),
  collection: collection(client),
  homepage: homepage(client),
  node: node(client),
  page: page(client),
  product: product(client),
  category: category(client),
  route: route(client),
});

export default queries;
