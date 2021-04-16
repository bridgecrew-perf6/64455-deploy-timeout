import AccountProfileFormContact from '@shop/components/Account/Profile/Form/Contact';
import AccountProfileFormAddress from '@shop/components/Account/Profile/Form/Address';

const AccountProfileForm = () => (
  <form className="uk-form-stacked">
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Contact */}
      <AccountProfileFormContact />
      {/* Address */}
      <AccountProfileFormAddress />
    </div>
  </form>
);

export default AccountProfileForm;
