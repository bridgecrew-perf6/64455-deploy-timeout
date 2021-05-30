import CommonAddress from '@shop/components/Common/Address';
import CommonMap from '@shop/components/Common/Map';

const CheckoutFormShippingPickup = () => (
  <section>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s"
      uk-grid="true"
    >
      <div>
        <CommonMap className="tm-ratio tm-ratio-16-9" />
      </div>
      <CommonAddress className="uk-text-small" />
    </div>
  </section>
);

export default CheckoutFormShippingPickup;
