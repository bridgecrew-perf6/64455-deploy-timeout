import CheckoutFormShippingPickup from '@shop/components/Checkout/Form/Shipping/Pickup';
import CheckoutFormShippingLocal from '@shop/components/Checkout/Form/Shipping/Local';
import CheckoutFormShippingRegional from '@shop/components/Checkout/Form/Shipping/Regional';

const CheckoutFormShipping = () => (
  <section>
    <h2 className="tm-checkout-title">Shipping</h2>
    <div className="uk-card uk-card-default uk-card-small uk-card-body tm-ignore-container">
      <div
        className="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-3@s uk-flex-center"
        uk-switcher="true"
        uk-grid="true"
      >
        <div>
          <a className="tm-choose" href="#">
            <div className="tm-choose-title">pick up from store</div>
            <div className="tm-choose-description">Free, tomorrow</div>
          </a>
        </div>
        <div>
          <a className="tm-choose" href="#">
            <div className="tm-choose-title">delivery in city</div>
            <div className="tm-choose-description">Free, tomorrow</div>
          </a>
        </div>
        <div>
          <a className="tm-choose" href="#">
            <div className="tm-choose-title">regional delivery</div>
            <div className="tm-choose-description">
              Via Belgian Post or postal courier services. Sending to any
              country
            </div>
          </a>
        </div>
      </div>
      <div className="uk-switcher uk-margin">
        {/* Pick up */}
        <CheckoutFormShippingPickup />
        {/* Shipping in St Petersburg */}
        <CheckoutFormShippingLocal />
        {/* Regional shipping */}
        <CheckoutFormShippingRegional />
      </div>
    </div>
  </section>
);

export default CheckoutFormShipping;
