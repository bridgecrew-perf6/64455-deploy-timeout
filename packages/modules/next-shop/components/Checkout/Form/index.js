import CheckoutFormContact from '@shop/components/Checkout/Form/Contact';
import CheckoutFormShipping from '@shop/components/Checkout/Form/Shipping';
import CheckoutFormPayment from '@shop/components/Checkout/Form/Payment';

const CheckoutForm = () => (
  <form className="uk-form-stacked uk-width-1-1 tm-checkout uk-width-expand@m">
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Contact Information */}
      <CheckoutFormContact />
      {/* Shipping */}
      <CheckoutFormShipping />
      {/* Payment */}
      <CheckoutFormPayment />
    </div>
  </form>
);

export default CheckoutForm;
