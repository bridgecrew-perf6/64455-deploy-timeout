import { Link } from '@foundation/next';

import ProductCardProperties from '@shop/components/Product/Card/Properties';
import ProductCardTags from '@shop/components/Product/Card/Tags';

const ProductCardInfo = ({ item, url }) => (
  <div className="tm-product-card-info">
    <div
      className="uk-grid uk-grid-small uk-flex-middle uk-margin-bottom tm-product-card-header"
      uk-grid="true"
    >
      <div className="uk-width-expand">
        <h3 className="uk-text-truncate tm-product-card-title">
          <Link className="uk-link-heading" href={url}>
            {item.title}
          </Link>
        </h3>
      </div>
      <ProductCardTags item={item} />
    </div>
    <ProductCardProperties item={item} />
  </div>
);

export default ProductCardInfo;
