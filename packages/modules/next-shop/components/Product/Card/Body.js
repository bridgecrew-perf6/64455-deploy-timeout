import ProductCardInfo from '@shop/components/Product/Card/Info';
import ProductCardPurchase from '@shop/components/Product/Card/Purchase';

const ProductCardBody = () => (
  <div className="tm-product-card-body">
    {/* Info */}
    <ProductCardInfo />
    {/* Shop */}
    <ProductCardPurchase />
  </div>
);

export default ProductCardBody;
