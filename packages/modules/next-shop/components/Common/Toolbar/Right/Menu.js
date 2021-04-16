import { Link } from '@foundation/next';

const CommonToolbarRightMenu = () => (
  <ul className="uk-navbar-nav">
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
);

export default CommonToolbarRightMenu;
