import { useMemo } from 'react';
import { useCurrency } from '@foundation/next';
import { mergeObjects } from '@foundation/lib/util';

import ProductPurchaseTags from '@shop/components/Product/Purchase/Tags';

const ProductPurchasePricing = props => {
  const { children, item, availability } = props;

  const c = useCurrency();

  const pricing = useMemo(() => {
    return mergeObjects({ price: 0 }, item.pricing, availability?.pricing);
  }, [availability, item]);

  return (
    <div
      className="uk-grid uk-grid-small tm-product-card-pricing"
      uk-grid="true"
    >
      <div
        className="uk-grid uk-grid-collapse uk-flex-middle uk-width-expand tm-product-card-price-info"
        uk-grid="true"
      >
        <div className="tm-product-price uk-width-expand">
          {c.format(pricing.price)}
        </div>
        <ProductPurchaseTags item={item} />
      </div>
      {children}
    </div>
  );
};

export default ProductPurchasePricing;
