import AccountContainer from '@shop/components/Account/Container';
import AccountProfileForm from '@shop/components/Account/Profile/Form';

const AccountProfilePage = () => (
  <AccountContainer title="Personal Info">
    <div className="uk-card-body">
      <AccountProfileForm />
    </div>
    <div className="uk-card-footer uk-text-center">
      <button className="uk-button uk-button-primary" type="button">
        save
      </button>
    </div>
  </AccountContainer>
);

export default AccountProfilePage;
