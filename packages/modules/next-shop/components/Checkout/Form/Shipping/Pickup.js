import CommonMap from '@shop/components/Common/Map';

const CheckoutFormShippingPickup = () => (
  <section>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s"
      uk-grid="true"
    >
      <div>
        <CommonMap />
      </div>
      <div className="uk-text-small">
        <div className="uk-text-bolder">Store Name</div>
        <div>Blvd. de Waterloo 59, Brussels, Belgium</div>
        <div>Daily 10:00–22:00</div>
      </div>
    </div>
  </section>
);

export default CheckoutFormShippingPickup;
