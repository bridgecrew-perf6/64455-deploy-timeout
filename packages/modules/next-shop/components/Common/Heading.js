import { Link } from '@foundation/next';

const CommonHeading = () => (
  <div className="uk-text-center">
    <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/catalog">Catalog</Link>
      </li>
      <li>
        <Link href="/category">Laptops & Tablets</Link>
      </li>
      <li>
        <span>Laptops</span>
      </li>
    </ul>
    <h1 className="uk-margin-small-top uk-margin-remove-bottom">Laptops</h1>
    <div className="uk-text-meta uk-margin-xsmall-top">289 items</div>
  </div>
);

export default CommonHeading;
