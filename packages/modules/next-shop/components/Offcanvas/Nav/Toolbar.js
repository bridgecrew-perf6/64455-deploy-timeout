import { Link } from '@foundation/next';

const OffcanvasNavToolbar = () => (
  <nav className="uk-card-small uk-card-body">
    <ul className="uk-nav uk-nav-default">
      <Link href="/news" as="li">
        News
      </Link>
      <Link href="/faq" as="li">
        FAQ
      </Link>
      <Link href="#" as="li">
        Payment
      </Link>
    </ul>
  </nav>
);

export default OffcanvasNavToolbar;
