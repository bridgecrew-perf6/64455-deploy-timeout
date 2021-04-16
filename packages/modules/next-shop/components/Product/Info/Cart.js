const ProductInfoCart = () => (
  <div>
    <div className="uk-grid-small" uk-grid="true">
      {/* Quantity */}
      <div>
        <a
          tmp-next-on-click="increment(-1, 'product-1')"
          uk-icon="icon: minus; ratio: .75"
        />
        <input
          className="uk-input tm-quantity-input"
          id="product-1"
          type="text"
          maxLength={3}
          defaultValue={1}
        />
        <a
          tmp-next-on-click="increment(+1, 'product-1')"
          uk-icon="icon: plus; ratio: .75"
        />
      </div>
      {/* Add to cart button */}
      <div>
        <button
          className="uk-button uk-button-primary tm-product-add-button tm-shine js-add-to-cart"
          type="button"
        >
          add to cart
        </button>
      </div>
      {/* Actions buttons */}
      <div className="uk-width-auto uk-width-expand@s uk-flex uk-flex-middle uk-text-meta">
        <a
          className="uk-margin-small-right js-add-to js-add-to-favorites tm-action-button-active js-added-to"
          uk-tooltip="Add to favorites"
        >
          <span uk-icon="heart" />
        </a>
        <a
          className="js-add-to js-add-to-compare tm-action-button-active js-added-to"
          uk-tooltip="Add to compare"
        >
          <span uk-icon="copy" />
        </a>
      </div>
    </div>
  </div>
);

export default ProductInfoCart;
