import ProductPurchasePricing from '@shop/components/Product/Purchase/Pricing';
import ProductPurchaseCart from '@shop/components/Product/Purchase/Cart';

const ProductPurchase = () => (
  <div className="uk-margin">
    <div className="uk-padding-small uk-background-primary-lighten uk-border-rounded">
      <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
        {/* Prices */}
        <ProductPurchasePricing />
        {/* Add to cart */}
        <ProductPurchaseCart />
      </div>
    </div>
  </div>
);

export default ProductPurchase;
