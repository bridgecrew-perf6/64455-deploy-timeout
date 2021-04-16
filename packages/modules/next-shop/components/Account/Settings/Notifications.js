const AccountSettingsNotifications = () => (
  <fieldset className="uk-fieldset">
    <legend className="uk-h4">Email Notifications</legend>
    <ul className="uk-list uk-margin-remove">
      <li>
        <input
          className="tm-checkbox"
          id="notification-1"
          type="checkbox"
          name="notification"
          defaultValue={1}
          defaultChecked
        />
        <label htmlFor="notification-1">
          <span>Weekly Newsletter</span>
        </label>
      </li>
      <li>
        <input
          className="tm-checkbox"
          id="notification-2"
          type="checkbox"
          name="notification"
          defaultValue={1}
          defaultChecked
        />
        <label htmlFor="notification-2">
          <span>New Product Announcements</span>
        </label>
      </li>
      <li>
        <input
          className="tm-checkbox"
          id="notification-3"
          type="checkbox"
          name="notification"
          defaultValue={1}
          defaultChecked
        />
        <label htmlFor="notification-3">
          <span>Product Specials</span>
        </label>
      </li>
    </ul>
  </fieldset>
);

export default AccountSettingsNotifications;
