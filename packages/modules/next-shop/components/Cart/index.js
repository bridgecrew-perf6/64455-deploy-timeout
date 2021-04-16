import CartDetails from '@shop/components/Cart/Details';
import CartCheckout from '@shop/components/Cart/Checkout';

const CartPage = () => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Items */}
    <CartDetails />
    {/* Checkout */}
    <CartCheckout />
  </div>
);

export default CartPage;
