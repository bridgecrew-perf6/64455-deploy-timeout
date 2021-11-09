import ProductCardInfo from '@shop/components/Product/Card/Info';
import ProductCardPurchase from '@shop/components/Product/Card/Purchase';

const ProductCardBody = props => {
  return (
    <div className="tm-product-card-body">
      <ProductCardInfo {...props} />
      <ProductCardPurchase {...props} />
    </div>
  );
};

export default ProductCardBody;
