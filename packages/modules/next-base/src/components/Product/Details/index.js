import ProductMedia from '@shop/components/Product/Media';
import ProductInfo from '@shop/components/Product/Info';

const ProductDetails = props => (
  <div>
    <div className="uk-card uk-card-default tm-ignore-container">
      <div className="uk-grid-small uk-grid-collapse" uk-grid="true">
        <ProductMedia {...props} />
        <ProductInfo {...props} />
      </div>
    </div>
  </div>
);

export default ProductDetails;
