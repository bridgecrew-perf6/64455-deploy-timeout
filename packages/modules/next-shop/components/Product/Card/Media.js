import { Link } from '@foundation/next';
import ProductCardImage from '@shop/components/Product/Card/Image';

const ProductCardMedia = () => (
  <div className="tm-product-card-media">
    <div className="tm-ratio tm-ratio-4-3">
      <Link className="tm-media-box" href="/product">
        {/* Labels */}
        <div className="tm-product-card-labels">
          <span className="uk-label uk-label-warning">top selling</span>
          <span className="uk-label uk-label-danger">trade-in</span>
        </div>
        {/* Image */}
        <ProductCardImage />
      </Link>
    </div>
  </div>
);

export default ProductCardMedia;
