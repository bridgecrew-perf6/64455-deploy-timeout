import CartItemProduct from '@shop/components/Cart/Item/Product';
import CartItemInfo from '@shop/components/Cart/Item/Info';

const CartItem = () => (
  <div className="uk-card-body">
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle"
      uk-grid="true"
    >
      {/* Product cell */}
      <CartItemProduct />
      {/* Other cells */}
      <CartItemInfo />
    </div>
  </div>
);

export default CartItem;
