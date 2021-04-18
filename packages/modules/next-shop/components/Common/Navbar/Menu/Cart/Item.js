import { Link } from '@foundation/next';

const CommonNavbarMenuCartItem = () => (
  <Link
    className="uk-navbar-item uk-link-muted tm-navbar-button"
    href="/cart"
    uk-toggle="target: #cart-offcanvas"
    onClick={e => e.preventDefault()}
  >
    <span uk-icon="cart" />
    <span className="uk-badge">2</span>
  </Link>
);

export default CommonNavbarMenuCartItem;
