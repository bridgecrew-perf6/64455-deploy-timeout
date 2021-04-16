import AccountSettingsFormEmail from '@shop/components/Account/Settings/Form/Email';
import AccountSettingsFormPassword from '@shop/components/Account/Settings/Form/Password';
import AccountSettingsNotifications from '@shop/components/Account/Settings/Notifications';

const AccountSettingsForm = () => (
  <form className="uk-form-stacked">
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Email */}
      <AccountSettingsFormEmail />
      {/* Password */}
      <AccountSettingsFormPassword />
      {/* Email notifications */}
      <AccountSettingsNotifications />
    </div>
  </form>
);

export default AccountSettingsForm;
