import ProductReviewsHeader from '@shop/components/Product/Reviews/Header';
import ProductReviewsBody from '@shop/components/Product/Reviews/Body';

const ProductReviews = () => (
  <section>
    <div className="uk-grid-small uk-grid-divider" uk-grid="true">
      <ProductReviewsHeader />
      <ProductReviewsBody />
    </div>
  </section>
);

export default ProductReviews;
