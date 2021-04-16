const CheckoutFormShippingRegional = () => (
  <section>
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-1-1">
        <label>
          <div className="uk-form-label uk-form-label-required">Country</div>
          <select className="uk-select">
            <option>Choose the country</option>
            <option value="BE">Belgium</option>
          </select>
        </label>
      </div>
    </div>
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <label>
          <div className="uk-form-label uk-form-label-required">City</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div className="uk-width-1-3 uk-width-1-6@s">
        <label>
          <div className="uk-form-label uk-form-label-required">Post Code</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
    </div>
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <label>
          <div className="uk-form-label uk-form-label-required">Street</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div className="uk-width-1-3 uk-width-1-6@s">
        <label>
          <div className="uk-form-label uk-form-label-required">House</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
    </div>
    <div
      className="uk-grid-small uk-child-width-1-3 uk-child-width-1-4@s"
      uk-grid="true"
    >
      <div>
        <label>
          <div className="uk-form-label">Building</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Entrance</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Floor</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Apartment</div>
          <input className="uk-input" type="text" />
        </label>
      </div>
      <div className="uk-width-1-1">
        <label>
          <div className="uk-form-label">Comment</div>
          <textarea
            className="uk-textarea"
            rows={5}
            placeholder="Additional information: phone numbers or doorphone code"
            defaultValue=""
          />
        </label>
      </div>
    </div>
  </section>
);

export default CheckoutFormShippingRegional;
