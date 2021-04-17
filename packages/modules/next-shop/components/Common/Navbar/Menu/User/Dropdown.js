import { Link } from '@foundation/next';

const CommonNavbarMenuUserDropdown = () => (
  <div
    className="uk-padding-small uk-margin-remove"
    uk-dropdown="pos: bottom-right; offset: -10; delay-hide: 200;"
    style={{
      minWidth: '150px',
    }}
  >
    <ul className="uk-nav uk-dropdown-nav">
      <Link href="/account" as="li">
        Orders
        <span className="uk-spaced">(2)</span>
      </Link>
      <Link href="/favorites" as="li">
        Favorites
        <span className="uk-spaced">(3)</span>
      </Link>
      <Link href="/account/profile" as="li">
        Personal
      </Link>
      <Link href="/account/settings" as="li">
        Settings
      </Link>
      <li className="uk-nav-divider" />
      <li>
        <a href="#">Log out</a>
      </li>
    </ul>
  </div>
);

export default CommonNavbarMenuUserDropdown;
