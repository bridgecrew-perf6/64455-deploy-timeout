import ProductCardMedia from '@shop/components/Product/Card/Media';
import ProductCardBody from '@shop/components/Product/Card/Body';

const ProductCard = () => (
  <article className="tm-product-card">
    {/* Media */}
    <ProductCardMedia></ProductCardMedia>
    {/* Body */}
    <ProductCardBody></ProductCardBody>
  </article>
);

export default ProductCard;
