import ProductReviewsItem from '@shop/components/Product/Reviews/Item';

const ProductReviewsBody = () => (
  <div className="uk-width-1-1 uk-width-expand@s">
    <div
      className="uk-grid-small uk-grid-divider uk-child-width-1-1"
      uk-grid="true"
    >
      <ProductReviewsItem />
      <ProductReviewsItem />
    </div>
  </div>
);

export default ProductReviewsBody;
