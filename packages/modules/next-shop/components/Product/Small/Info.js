import { Link } from '@foundation/next';

const ProductSmallInfo = () => (
  <div className="uk-width-expand">
    <div className="tm-product-card-body uk-padding-remove uk-height-1-1">
      <div className="tm-product-card-info">
        <div className="uk-text-meta uk-margin-xsmall-bottom">Laptop</div>
        <Link className="tm-product-card-title" href="/product">
          Apple MacBook Pro 15 (Silver)
        </Link>
      </div>
      <div className="tm-product-card-shop">
        <div className="tm-product-card-prices">
          <del className="uk-text-meta">$1899.00</del>
          <div className="tm-product-card-price">$1599.00</div>
        </div>
        <div className="tm-product-card-add">
          <button
            className="uk-button uk-button-primary tm-product-card-add-button tm-shine js-add-to-cart"
            type="button"
          >
            <span className="tm-product-add-button-icon" uk-icon="cart" />
            <span className="tm-product-card-add-button-text">add to cart</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductSmallInfo;
