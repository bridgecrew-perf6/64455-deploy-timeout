import { Link } from '@foundation/next';

const AccountNav = () => (
  <nav>
    <ul className="uk-nav uk-nav-default tm-nav">
      <Link href="/account" as="li">
        Orders
        <span className="tm-spaced">(2)</span>
      </Link>
      <Link href="/favorites" as="li">
        Favorites
        <span className="tm-spaced">(3)</span>
      </Link>
      <Link href="/account/profile" as="li">
        Personal Info
      </Link>
    </ul>
  </nav>
);

export default AccountNav;
