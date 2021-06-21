import CommonQuantity from '@shop/components/Common/Quantity';
import ProductPurchaseButton from '@shop/components/Product/Purchase/Button';

const ProductPurchaseCart = () => (
  <div>
    <div className="uk-grid-small" uk-grid="true">
      {/* Quantity */}
      <CommonQuantity target="product-1" value={1} buttons />
      {/* Add to cart button */}
      <div>
        <ProductPurchaseButton />
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

export default ProductPurchaseCart;
