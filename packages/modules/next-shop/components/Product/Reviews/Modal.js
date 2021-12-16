import ProductRatingStars from '@shop/components/Product/Rating/Stars';

const ProductReviewsModal = () => (
  <div id="review" uk-modal="true">
    <div className="uk-modal-dialog uk-modal-body">
      <button
        className="uk-modal-close-outside"
        type="button"
        uk-close="true"
      />
      <h2 className="uk-modal-title uk-text-center">Review</h2>
      <form className="uk-form-stacked">
        <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
          <div>
            <label>
              <div className="uk-form-label uk-form-label-required">Name</div>
              <input className="uk-input" type="text" required />
            </label>
          </div>
          <div>
            <label>
              <div className="uk-form-label uk-form-label-required">Email</div>
              <input className="uk-input" type="email" required />
            </label>
          </div>
          <div>
            <div className="uk-form-label">Rating</div>
            <ProductRatingStars />
          </div>
          <div>
            <label>
              <div className="uk-form-label uk-form-label-required">Review</div>
              <textarea
                className="uk-textarea"
                rows={5}
                required
                defaultValue=""
              />
            </label>
          </div>
          <div className="uk-text-center">
            <button className="uk-button uk-button-primary" type="button">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default ProductReviewsModal;
