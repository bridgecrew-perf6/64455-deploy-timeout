import { Link } from '@foundation/next';

const CatalogSectionBody = () => (
  <div className="uk-card-body">
    <ul className="uk-list">
      <Link href="/subcategory" as="li">
        Laptops
      </Link>
      <Link href="/subcategory" as="li">
        Tablets
      </Link>
      <Link href="/subcategory" as="li">
        Peripherals
      </Link>
      <Link href="/subcategory" as="li">
        Keyboards
      </Link>
      <Link href="/subcategory" as="li">
        Accessories
      </Link>
    </ul>
  </div>
);

export default CatalogSectionBody;
