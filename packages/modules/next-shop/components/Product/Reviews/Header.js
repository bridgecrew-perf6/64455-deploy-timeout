const ProductReviewsHeader = () => (
  <div className="uk-width-1-1 uk-width-1-5@s uk-text-center tm-reviews-column">
    <div className="uk-text-meta uk-text-uppercase">average rating</div>
    <div className="uk-heading-medium">5.0</div>
    <div className="uk-flex uk-flex-center">
      <ul className="uk-iconnav tm-rating">
        <li>
          <span className="uk-text-warning" uk-icon="star" />
        </li>
        <li>
          <span className="uk-text-warning" uk-icon="star" />
        </li>
        <li>
          <span className="uk-text-warning" uk-icon="star" />
        </li>
        <li>
          <span className="uk-text-warning" uk-icon="star" />
        </li>
        <li>
          <span className="uk-text-warning" uk-icon="star" />
        </li>
      </ul>
    </div>
    <div className="uk-margin-small-top uk-text-meta">based on 2 reviews</div>
    <button
      className="uk-button uk-button-primary uk-margin-top uk-width-1-1"
      uk-toggle="target: #review"
      type="button"
    >
      write a review
    </button>
  </div>
);

export default ProductReviewsHeader;
