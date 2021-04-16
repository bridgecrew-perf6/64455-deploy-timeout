import { Link } from '@foundation/next';

const CommonNavbarMenuCompareItem = () => (
  <Link
    className="uk-navbar-item uk-link-muted uk-visible@m tm-navbar-button"
    href="/compare"
  >
    <span uk-icon="copy" />
    <span className="uk-badge">3</span>
  </Link>
);

export default CommonNavbarMenuCompareItem;
