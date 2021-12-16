import ProductCardPurchasePricing from '@shop/components/Product/Card/Purchase/Pricing';
import ProductCardPurchaseActions from '@shop/components/Product/Card/Purchase/Actions';

const ProductCardPurchase = () => (
  <div className="tm-product-card-shop">
    {/* Prices */}
    <ProductCardPurchasePricing />
    {/* Actions buttons */}
    <ProductCardPurchaseActions />
  </div>
);

export default ProductCardPurchase;
