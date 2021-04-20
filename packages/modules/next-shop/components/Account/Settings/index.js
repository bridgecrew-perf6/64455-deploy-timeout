import AccountContainer from '@shop/components/Account/Container';
import AccountSettingsForm from '@shop/components/Account/Settings/Form';

const AccountSettingsPage = () => (
  <AccountContainer title="Settings">
    <div className="uk-card-body">
      <AccountSettingsForm />
    </div>
  </AccountContainer>
);

export default AccountSettingsPage;
