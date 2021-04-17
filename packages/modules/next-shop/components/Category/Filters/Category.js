import { Link } from '@foundation/next';

const CategoryFiltersCategory = () => (
  <section className="uk-card-small uk-card-body">
    <h4 className="uk-margin-small-bottom">Categories</h4>
    <ul className="uk-nav uk-nav-default">
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
  </section>
);

export default CategoryFiltersCategory;
