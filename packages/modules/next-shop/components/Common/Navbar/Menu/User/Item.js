import { Link } from '@foundation/next';

const CommonNavbarMenuUserItem = () => (
  <Link
    className="uk-navbar-item uk-link-muted tm-navbar-button"
    href="/account"
    uk-icon="user"
    partial
  />
);

export default CommonNavbarMenuUserItem;
