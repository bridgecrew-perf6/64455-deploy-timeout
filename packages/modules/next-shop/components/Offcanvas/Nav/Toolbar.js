import { Link } from '@foundation/next';

const OffcanvasNavToolbar = () => (
  <nav className="uk-card-small uk-card-body">
    <ul className="uk-nav uk-nav-default">
      <li>
        <Link href="/news">News</Link>
      </li>
      <li>
        <Link href="/faq">FAQ</Link>
      </li>
      <li>
        <a href="#">Payment</a>
      </li>
    </ul>
  </nav>
);

export default OffcanvasNavToolbar;
