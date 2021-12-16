import ProductMediaImage from '@shop/components/Product/Media/Image';
import ProductMediaImages from '@shop/components/Product/Media/Images';

const ProductMedia = () => (
  <div className="uk-width-1-1 uk-width-expand@m tm-product-media">
    <div
      className="uk-grid-collapse uk-child-width-1-1"
      uk-slideshow="finite: true; ratio: 4:3;"
      uk-grid="true"
    >
      {/* Primary image */}
      <ProductMediaImage />
      {/* Additional images */}
      <ProductMediaImages />
    </div>
  </div>
);

export default ProductMedia;
