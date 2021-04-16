import ProductInfoPricing from '@shop/components/Product/Info/Pricing';
import ProductInfoCart from '@shop/components/Product/Info/Cart';

const ProductInfoPurchase = () => (
  <div className="uk-margin">
    <div className="uk-padding-small uk-background-primary-lighten uk-border-rounded">
      <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
        {/* Prices */}
        <ProductInfoPricing></ProductInfoPricing>
        {/* Add to cart */}
        <ProductInfoCart></ProductInfoCart>
      </div>
    </div>
  </div>
);

export default ProductInfoPurchase;
