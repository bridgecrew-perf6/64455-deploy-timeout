const CheckoutFormContact = () => (
  <section>
    <h2 className="tm-checkout-title">Contact Information</h2>
    <div className="uk-card uk-card-default uk-card-small uk-card-body tm-ignore-container">
      <div
        className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s"
        uk-grid="true"
      >
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">
              First Name
            </div>
            <input className="uk-input" type="text" required />
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">
              Last Name
            </div>
            <input className="uk-input" type="text" required />
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">
              Phone Number
            </div>
            <input className="uk-input" type="tel" required />
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">Email</div>
            <input className="uk-input" type="email" required />
          </label>
        </div>
      </div>
    </div>
  </section>
);

export default CheckoutFormContact;
