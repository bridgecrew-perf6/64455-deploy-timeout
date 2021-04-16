import { Link } from '@foundation/next';

const CartItemProduct = () => (
  <div>
    <div className="uk-grid-small" uk-grid="true">
      {/* Image */}
      <div className="uk-width-1-3">
        <div className="tm-ratio tm-ratio-4-3">
          <Link className="tm-media-box" href="/product">
            <figure className="tm-media-box-wrap">
              <img
                src="/images/products/1/1-small.jpg"
                alt="Apple MacBook Pro 15 (Silver)"
              />
            </figure>
          </Link>
        </div>
      </div>
      {/* Info */}
      <div className="uk-width-expand">
        <div className="uk-text-meta">Laptop</div>
        <Link className="uk-link-heading" href="/product">
          Apple MacBook Pro 15 (Silver)
        </Link>
      </div>
    </div>
  </div>
);

export default CartItemProduct;
