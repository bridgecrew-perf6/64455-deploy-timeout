import AccountProfileForm from '@shop/components/Account/Profile/Form';

const AccountProfilePage = () => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <header className="uk-card-header">
        <h1 className="uk-h2">Personal Info</h1>
      </header>
      <div className="uk-card-body">
        <AccountProfileForm />
      </div>
      <div className="uk-card-footer uk-text-center">
        <button className="uk-button uk-button-primary" type="button">
          save
        </button>
      </div>
    </div>
  </div>
);

export default AccountProfilePage;
