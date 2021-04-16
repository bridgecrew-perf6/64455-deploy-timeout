import { Link } from '@foundation/next';
import MainCategoriesItem from '@shop/components/Main/Categories/Item';

const MainCategories = () => (
  <section className="uk-section uk-section-default uk-section-small">
    <div className="uk-container">
      <div
        className="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-6@m"
        uk-grid="true"
      >
        <MainCategoriesItem />
        <MainCategoriesItem />
        <MainCategoriesItem />
        <MainCategoriesItem />
        <MainCategoriesItem />
        <MainCategoriesItem />
      </div>
      <div className="uk-margin uk-text-center">
        <Link
          className="uk-link-muted uk-text-uppercase tm-link-to-all"
          href="/catalog"
        >
          <span>see all categories</span>
          <span uk-icon="icon: chevron-right; ratio: .75;" />
        </Link>
      </div>
    </div>
  </section>
);

export default MainCategories;
