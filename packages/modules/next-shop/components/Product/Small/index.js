import ProductSmallImage from '@shop/components/Product/Small/Image';
import ProductSmallInfo from '@shop/components/Product/Small/Info';

const ProductSmall = () => (
  <div className="uk-grid-small uk-height-1-1" uk-grid="true">
    {/* Image */}
    <ProductSmallImage></ProductSmallImage>
    {/* Info */}
    <ProductSmallInfo></ProductSmallInfo>
  </div>
);

export default ProductSmall;
