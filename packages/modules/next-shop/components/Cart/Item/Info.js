const CartItemInfo = () => (
  <div>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-expand@s uk-text-center"
      uk-grid="true"
    >
      {/* Price */}
      <div>
        <div className="uk-text-muted uk-hidden@m">Price</div>
        <div>$1599.00</div>
      </div>
      {/* Quantity */}
      <div className="tm-cart-quantity-column">
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
      {/* Sum */}
      <div>
        <div className="uk-text-muted uk-hidden@m">Sum</div>
        <div>$1599.00</div>
      </div>
      {/* Actions */}
      <div className="uk-width-auto@s">
        <a className="uk-text-danger" uk-tooltip="Remove">
          <span uk-icon="close" />
        </a>
      </div>
    </div>
  </div>
);

export default CartItemInfo;
