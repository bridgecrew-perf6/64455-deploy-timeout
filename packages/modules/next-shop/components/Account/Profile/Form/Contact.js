const AccountProfileFormContact = () => (
  <fieldset className="uk-fieldset">
    <legend className="uk-h4">Contact</legend>
    <div
      className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s"
      uk-grid="true"
    >
      <div>
        <label>
          <div className="uk-form-label">First Name</div>
          <input className="uk-input" type="text" defaultValue="Thomas" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Last Name</div>
          <input className="uk-input" type="text" defaultValue="Bruns" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Phone Number</div>
          <input
            className="uk-input"
            type="tel"
            defaultValue="8 (800) 555-35-35"
          />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Date of Birth</div>
          <input className="uk-input" type="date" defaultValue="1990-01-01" />
        </label>
      </div>
    </div>
  </fieldset>
);

export default AccountProfileFormContact;
