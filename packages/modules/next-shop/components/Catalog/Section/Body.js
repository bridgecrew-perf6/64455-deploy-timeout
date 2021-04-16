import { Link } from '@foundation/next';

const CatalogSectionBody = () => (
  <div className="uk-card-body">
    <ul className="uk-list">
      <li>
        <Link href="/subcategory">Laptops</Link>
      </li>
      <li>
        <Link href="/subcategory">Tablets</Link>
      </li>
      <li>
        <Link href="/subcategory">Peripherals</Link>
      </li>
      <li>
        <Link href="/subcategory">Keyboards</Link>
      </li>
      <li>
        <Link href="/subcategory">Accessories</Link>
      </li>
    </ul>
  </div>
);

export default CatalogSectionBody;
