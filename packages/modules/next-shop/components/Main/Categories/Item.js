import { Link } from '@foundation/next';

const MainCategoriesItem = () => (
  <div>
    <Link
      className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large"
      href="/subcategory"
    >
      <div className="tm-ratio tm-ratio-4-3">
        <div className="tm-media-box">
          <figure className="tm-media-box-wrap">
            <img
              className="item-brand"
              src="/images/catalog/laptops.png"
              alt="Laptops"
            />
          </figure>
        </div>
      </div>
      <div className="uk-margin-small-top">
        <div className="uk-text-truncate">Laptops</div>
        <div className="uk-text-meta uk-text-xsmall uk-text-truncate">
          from $149
        </div>
      </div>
    </Link>
  </div>
);

export default MainCategoriesItem;
