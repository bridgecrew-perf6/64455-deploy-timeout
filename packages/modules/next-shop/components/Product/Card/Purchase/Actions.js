const ProductCardPurchaseActions = () => (
  <div className="tm-product-card-add">
    <div className="uk-text-meta tm-product-card-actions">
      {/* Favorite */}
      <a
        className="tm-product-card-action js-add-to js-add-to-favorites tm-action-button-active js-added-to"
        title="Add to favorites"
      >
        <span uk-icon="icon: heart; ratio: .75;" />
        <span className="tm-product-card-action-text">Add to favorites</span>
      </a>
      {/* Compare */}
      <a
        className="tm-product-card-action js-add-to js-add-to-compare tm-action-button-active js-added-to"
        title="Add to compare"
      >
        <span uk-icon="icon: copy; ratio: .75;" />
        <span className="tm-product-card-action-text">Add to compare</span>
      </a>
    </div>
    {/* Add to cart */}
    <button
      className="uk-button uk-button-primary tm-product-card-add-button tm-shine js-add-to-cart"
      type="button"
    >
      <span className="tm-product-card-add-button-icon" uk-icon="cart" />
      <span className="tm-product-card-add-button-text">add to cart</span>
    </button>
  </div>
);

export default ProductCardPurchaseActions;
