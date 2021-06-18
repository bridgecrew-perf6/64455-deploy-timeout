import CommonQuantity from '@shop/components/Common/Quantity';

const CartItemInfo = () => (
  <div>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-expand@s uk-text-center"
      uk-grid="true"
    >
      {/* Price */}
      <div className="uk-flex uk-flex-center uk-flex-middle">
        <div className="uk-text-muted uk-hidden@m">Price</div>
        <div>$1599.00</div>
      </div>
      {/* Quantity */}
      <CommonQuantity target="product-1" value={1} buttons />
      {/* Sum */}
      <div className="uk-flex uk-flex-center uk-flex-middle">
        <div className="uk-text-muted uk-hidden@m">Sum</div>
        <div>$1599.00</div>
      </div>
      {/* Actions */}
      <div className="uk-flex uk-flex-center uk-flex-middle uk-width-auto@s">
        <a className="uk-text-danger" uk-tooltip="Remove">
          <span uk-icon="close" />
        </a>
      </div>
    </div>
  </div>
);

export default CartItemInfo;
