import Basic from '@shop/components/Page/Types/Basic';
import Default from '@shop/components/Page/Types/Default';
import Product from '@shop/components/Page/Types/Product';

const types = new Map();

types.set('default', Default);
types.set('basic', Basic);
types.set('product', Product);

export default types;
