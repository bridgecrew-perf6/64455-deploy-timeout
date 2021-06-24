import { usePage, Link } from '@foundation/next';

const CommonHeading = () => {
  const { title } = usePage();
  return (
    <div className="uk-text-center">
      <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
        <Link href="/" as="li">
          Home
        </Link>
        <Link href="/catalog" as="li">
          Catalog
        </Link>
        <Link href="/category" as="li">
          Laptops & Tablets
        </Link>
        <li>
          <span>Laptops</span>
        </li>
      </ul>
      <h1 className="uk-margin-small-top uk-margin-remove-bottom">{title}</h1>
      <div className="uk-text-meta uk-margin-xsmall-top">289 items</div>
    </div>
  );
};

export default CommonHeading;
