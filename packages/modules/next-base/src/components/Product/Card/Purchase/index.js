import ProductCardPurchasePricing from '@shop/components/Product/Card/Purchase/Pricing';

const ProductCardPurchase = props => (
  <div
    className="uk-grid-small uk-child-width-1-1 tm-product-card-shop"
    uk-grid="true"
  >
    <ProductCardPurchasePricing {...props} />
  </div>
);

export default ProductCardPurchase;
