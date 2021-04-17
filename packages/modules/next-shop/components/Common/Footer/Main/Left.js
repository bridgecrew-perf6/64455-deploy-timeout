import { Link } from '@foundation/next';

const CommonFooterMainLeft = () => (
  <div>
    <ul className="uk-nav uk-nav-default">
      <Link href="/catalog" as="li">
        Catalog
      </Link>
      <Link href="/brands" as="li">
        Brands
      </Link>
      <Link href="/delivery" as="li">
        Delivery
      </Link>
      <Link href="/faq" as="li">
        FAQ
      </Link>
      <Link href="#" as="li">
        Payment
      </Link>
    </ul>
  </div>
);

export default CommonFooterMainLeft;
