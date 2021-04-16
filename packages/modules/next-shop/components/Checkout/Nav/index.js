import CheckoutNavLeft from '@shop/components/Checkout/Nav/Left';
import CheckoutNavRight from '@shop/components/Checkout/Nav/Right';

const CheckoutNav = () => (
  <div className="uk-navbar-container tm-navbar-container">
    <div className="uk-container" uk-navbar="true">
      <CheckoutNavLeft />
      <CheckoutNavRight />
    </div>
  </div>
);

export default CheckoutNav;
