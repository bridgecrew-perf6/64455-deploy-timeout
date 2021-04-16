import ProductCardInfo from '@shop/components/Product/Card/Info';
import ProductCardPurchase from '@shop/components/Product/Card/Purchase';

const ProductCardBody = () => (
  <div className="tm-product-card-body">
    {/* Info */}
    <ProductCardInfo></ProductCardInfo>
    {/* Shop */}
    <ProductCardPurchase></ProductCardPurchase>
  </div>
);

export default ProductCardBody;
