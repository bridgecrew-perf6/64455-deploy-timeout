import { Link } from '@foundation/next';

const ProductCardInfo = () => (
  <div className="tm-product-card-info">
    {/* Type */}
    <div className="uk-text-meta uk-margin-xsmall-bottom">Laptop</div>
    {/* Title */}
    <h3 className="tm-product-card-title">
      <Link className="uk-link-heading" href="/product">
        Apple MacBook Pro 15 (Silver)
      </Link>
    </h3>
    {/* Properties */}
    <ul className="uk-list uk-text-small tm-product-card-properties">
      <li>
        <span className="uk-text-muted">Diagonal display: </span>
        <span>15.4"</span>
      </li>
      <li>
        <span className="uk-text-muted">CPU: </span>
        <span>Intel® Core™ i7</span>
      </li>
      <li>
        <span className="uk-text-muted">RAM: </span>
        <span>16 GB</span>
      </li>
      <li>
        <span className="uk-text-muted">Video Card: </span>
        <span>AMD Radeon Pro 555</span>
      </li>
    </ul>
  </div>
);

export default ProductCardInfo;
