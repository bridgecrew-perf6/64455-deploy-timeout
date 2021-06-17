import ProductMedia from '@shop/components/Product/Media';
import ProductInfo from '@shop/components/Product/Info';
import ProductDescription from '@shop/components/Product/Description';

const ProductDetails = () => (
  <div>
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <div
        className="uk-grid-small uk-grid-collapse uk-grid-match"
        uk-grid="true"
      >
        {/* Media */}
        <ProductMedia></ProductMedia>
        {/* Info */}
        <ProductInfo></ProductInfo>
        {/* Description */}
        <ProductDescription></ProductDescription>
      </div>
    </div>
  </div>
);

export default ProductDetails;
