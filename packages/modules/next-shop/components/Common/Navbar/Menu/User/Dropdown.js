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
      <li>
        <Link href="/account">
          Orders
          <span>(2)</span>
        </Link>
      </li>
      <li>
        <Link href="/favorites">
          Favorites
          <span>(3)</span>
        </Link>
      </li>
      <li>
        <Link href="/account/profile">Personal</Link>
      </li>
      <li>
        <Link href="/account/settings">Settings</Link>
      </li>
      <li className="uk-nav-divider" />
      <li>
        <a href="#">Log out</a>
      </li>
    </ul>
  </div>
);

export default CommonNavbarMenuUserDropdown;
