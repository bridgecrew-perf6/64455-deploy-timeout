import { Link } from '@foundation/next';

const OffcanvasCartFooter = () => (
  <footer className="uk-card-footer">
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand uk-text-muted uk-h4">Subtotal</div>
      <div className="uk-h4 uk-text-bolder">$3148.00</div>
    </div>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-small"
      uk-grid="true"
    >
      <div>
        <Link
          className="uk-button uk-button-default uk-margin-small uk-width-1-1"
          href="/cart"
        >
          view cart
        </Link>
      </div>
      <div>
        <Link
          className="uk-button uk-button-primary uk-margin-small uk-width-1-1"
          href="/checkout"
        >
          checkout
        </Link>
      </div>
    </div>
  </footer>
);

export default OffcanvasCartFooter;
