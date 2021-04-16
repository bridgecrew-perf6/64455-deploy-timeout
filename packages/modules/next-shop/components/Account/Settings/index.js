import AccountSettingsForm from '@shop/components/Account/Settings/Form';

const AccountSettingsPage = () => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <header className="uk-card-header">
        <h1 className="uk-h2">Settings</h1>
      </header>
      <div className="uk-card-body">
        <AccountSettingsForm />
      </div>
    </div>
  </div>
);

export default AccountSettingsPage;
