import CartHeader from '@shop/components/Cart/Header';
import CartItem from '@shop/components/Cart/Item';
import CartFooter from '@shop/components/Cart/Footer';

const CartDetails = () => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      {/* Header */}
      <CartHeader />
      {/* Body */}
      <CartItem />
      <CartItem />
      {/* Footer */}
      <CartFooter />
    </div>
  </div>
);

export default CartDetails;
