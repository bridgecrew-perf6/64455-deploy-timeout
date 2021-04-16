import { Link } from '@foundation/next';
import ProductCard from '@shop/components/Product/Card';

const MainTrending = () => (
  <section className="uk-section uk-section-small">
    <div className="uk-container">
      <h2 className="uk-text-center">Trending Items</h2>
      <div className="uk-card uk-card-default tm-ignore-container">
        <div
          className="uk-grid-collapse uk-child-width-1-3 uk-child-width-1-4@m tm-products-grid"
          uk-grid="true"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="uk-margin uk-text-center">
        <Link
          className="uk-link-muted uk-text-uppercase tm-link-to-all"
          href="/subcategory"
        >
          <span>shop all</span>
          <span uk-icon="icon: chevron-right; ratio: .75;" />
        </Link>
      </div>
    </div>
  </section>
);

export default MainTrending;
