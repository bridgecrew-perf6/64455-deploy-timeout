const CheckoutFormShippingLocal = () => (
  <section>
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
    <div
      className="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s"
      uk-grid="true"
    >
      <div className="uk-width-1-1 uk-text-meta">
        Choose a convenient date and delivery interval
      </div>
      <div>
        <select className="uk-select">
          <option>Tomorrow</option>
          <option>25 May</option>
          <option>26 May</option>
          <option>27 May</option>
          <option>28 May</option>
          <option>29 May</option>
          <option>30 May</option>
          <option>1 June</option>
        </select>
      </div>
      <div>
        <select className="uk-select">
          <option>09:00 – 12:00</option>
          <option>12:00 – 15:00</option>
          <option>15:00 – 18:00</option>
          <option>18:00 – 21:00</option>
          <option>21:00 – 23:00</option>
        </select>
      </div>
    </div>
  </section>
);

export default CheckoutFormShippingLocal;
