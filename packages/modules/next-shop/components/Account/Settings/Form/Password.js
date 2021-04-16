const AccountSettingsFormPassword = () => (
  <fieldset className="uk-fieldset">
    <legend className="uk-h4">Password</legend>
    <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
      <div>
        <label>
          <div className="uk-form-label">Current Password</div>
          <input className="uk-input uk-form-width-large" type="password" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">New Password</div>
          <input className="uk-input uk-form-width-large" type="password" />
        </label>
      </div>
      <div>
        <label>
          <div className="uk-form-label">Confirm Password</div>
          <input className="uk-input uk-form-width-large" type="password" />
        </label>
      </div>
      <div>
        <button className="uk-button uk-button-primary" type="button">
          update password
        </button>
      </div>
    </div>
  </fieldset>
);

export default AccountSettingsFormPassword;
