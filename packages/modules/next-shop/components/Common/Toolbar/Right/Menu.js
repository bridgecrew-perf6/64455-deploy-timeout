import { Link } from '@foundation/next';

const CommonToolbarRightMenu = () => (
  <ul className="uk-navbar-nav">
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
);

export default CommonToolbarRightMenu;
