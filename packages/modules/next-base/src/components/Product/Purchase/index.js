import ProductPurchasePricing from '@shop/components/Product/Purchase/Pricing';
import ProductPurchaseCart from '@shop/components/Product/Purchase/Cart';

const ProductPurchase = props => {
  const { variant, availability } = props;
  return (
    <div className="uk-margin tm-product-purchase">
      <div className="uk-padding-small uk-background-primary-lighten uk-border-rounded">
        <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
          {/* Prices */}
          <ProductPurchasePricing item={variant} availability={availability} />
          {/* Add to cart */}
          <ProductPurchaseCart {...props} />
        </div>
      </div>
    </div>
  );
};

export default ProductPurchase;
