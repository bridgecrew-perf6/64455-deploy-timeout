import { Link } from '@foundation/next';

const OffcanvasCartItem = () => (
  <article>
    <div className="uk-grid-small" uk-grid="true">
      {/* Image */}
      <div className="uk-width-1-4">
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
        <div className="uk-text-meta uk-text-xsmall">Laptop</div>
        <Link className="uk-link-heading uk-text-small" href="/product">
          Apple MacBook Pro 15 (Silver)
        </Link>
        <div
          className="uk-margin-xsmall uk-grid-small uk-flex-middle"
          uk-grid="true"
        >
          <div className="uk-text-bolder uk-text-small">$1599.00</div>
          <div className="uk-text-meta uk-text-xsmall">1 × $1599.00</div>
        </div>
      </div>
      {/* Delete */}
      <div>
        <a
          className="uk-icon-link uk-text-danger uk-invisible-hover"
          href="#"
          uk-icon="icon: close; ratio: .75"
          uk-tooltip="Remove"
        />
      </div>
    </div>
  </article>
);

export default OffcanvasCartItem;
