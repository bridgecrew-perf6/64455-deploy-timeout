import { Link } from '@foundation/next';

const CatalogSectionHeader = () => (
  <header className="uk-card-header">
    <div className="uk-grid-small uk-flex-middle" uk-grid="true">
      <Link href="/category">
        <img
          src="/images/catalog/computers.svg"
          alt="Laptops & Tablets"
          width={50}
          height={50}
        />
      </Link>
      <div className="uk-width-expand">
        <h2 className="uk-h4 uk-margin-remove">
          <Link className="uk-link-heading" href="/category">
            Laptops & Tablets
          </Link>
        </h2>
        <div className="uk-text-meta">367 items</div>
      </div>
    </div>
  </header>
);

export default CatalogSectionHeader;
