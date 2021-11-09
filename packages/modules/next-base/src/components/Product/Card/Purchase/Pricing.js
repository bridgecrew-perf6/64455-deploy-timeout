import { Link } from '@foundation/next';

import ProductPurchasePricing from '@shop/components/Product/Purchase/Pricing';

import { ArrowRight24 } from '@carbon/icons-react';

const ProductCardPurchasePricing = props => {
  const { url } = props;
  return (
    <ProductPurchasePricing {...props}>
      <Link className="uk-link-heading tm-product-card-link" href={url}>
        <ArrowRight24 />
      </Link>
    </ProductPurchasePricing>
  );
};

export default ProductCardPurchasePricing;
