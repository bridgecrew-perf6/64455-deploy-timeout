import { Link } from '@foundation/next';

const CartCheckout = () => (
  <div className="uk-width-1-1 tm-aside-column uk-width-1-4@m">
    <div
      className="uk-card uk-card-default uk-card-small tm-ignore-container"
      uk-sticky="offset: 30; bottom: true; media: @m;"
    >
      <div className="uk-card-body">
        <div className="uk-grid-small" uk-grid="true">
          <div className="uk-width-expand uk-text-muted">Subtotal</div>
          <div>$3148</div>
        </div>
        <div className="uk-grid-small" uk-grid="true">
          <div className="uk-width-expand uk-text-muted">Discount</div>
          <div className="uk-text-danger">−$29</div>
        </div>
      </div>
      <div className="uk-card-body">
        <div className="uk-grid-small uk-flex-middle" uk-grid="true">
          <div className="uk-width-expand uk-text-muted">Total</div>
          <div className="uk-text-lead uk-text-bolder">$3119</div>
        </div>
        <Link
          className="uk-button uk-button-primary uk-margin-small uk-width-1-1"
          href="/checkout"
        >
          checkout
        </Link>
      </div>
    </div>
  </div>
);

export default CartCheckout;
