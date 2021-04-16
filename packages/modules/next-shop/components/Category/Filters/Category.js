import { Link } from '@foundation/next';

const CategoryFiltersCategory = () => (
  <section className="uk-card-small uk-card-body">
    <h4 className="uk-margin-small-bottom">Categories</h4>
    <ul className="uk-nav uk-nav-default">
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
  </section>
);

export default CategoryFiltersCategory;
