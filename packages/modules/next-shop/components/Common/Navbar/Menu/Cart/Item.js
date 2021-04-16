import { Link } from '@foundation/next';

const CommonNavbarMenuCartItem = () => (
  <Link
    className="uk-navbar-item uk-link-muted tm-navbar-button"
    href="/cart"
    uk-toggle="target: #cart-offcanvas"
    tmp-next-on-click="return false"
  >
    <span uk-icon="cart" />
    <span className="uk-badge">2</span>
  </Link>
);

export default CommonNavbarMenuCartItem;
