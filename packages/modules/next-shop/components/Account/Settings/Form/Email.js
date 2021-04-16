const AccountSettingsFormEmail = () => (
  <fieldset className="uk-fieldset">
    <legend className="uk-h4">Email</legend>
    <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
      <div>
        <label>
          <div className="uk-form-label">Current Email</div>
          <input
            className="uk-input uk-form-width-large"
            type="email"
            defaultValue="example@example.com"
            disabled
          />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">New Email</div>
          <input className="uk-input uk-form-width-large" type="email" />
        </label>
      </div>
      <div>
        <button className="uk-button uk-button-primary" type="button">
          update email
        </button>
      </div>
    </div>
  </fieldset>
);

export default AccountSettingsFormEmail;
