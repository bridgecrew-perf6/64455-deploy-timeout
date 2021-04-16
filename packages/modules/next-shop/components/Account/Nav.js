import { Link } from '@foundation/next';

const AccountNav = () => (
  <nav>
    <ul className="uk-nav uk-nav-default tm-nav">
      <li>
        <Link href="/account">
          Orders
          <span className="tm-spaced">(2)</span>
        </Link>
      </li>
      <li>
        <Link href="/favorites">
          Favorites
          <span className="tm-spaced">(3)</span>
        </Link>
      </li>
      <li>
        <Link href="/account/profile">Personal Info</Link>
      </li>
    </ul>
  </nav>
);

export default AccountNav;
