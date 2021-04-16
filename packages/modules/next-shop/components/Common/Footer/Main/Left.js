import { Link } from '@foundation/next';

const CommonFooterMainLeft = () => (
  <div>
    <ul className="uk-nav uk-nav-default">
      <li>
        <Link href="/catalog">Catalog</Link>
      </li>
      <li>
        <Link href="/brands">Brands</Link>
      </li>
      <li>
        <Link href="/delivery">Delivery</Link>
      </li>
      <li>
        <Link href="/faq">FAQ</Link>
      </li>
      <li>
        <a href="#">Payment</a>
      </li>
    </ul>
  </div>
);

export default CommonFooterMainLeft;
