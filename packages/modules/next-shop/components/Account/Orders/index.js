import AccountContainer from '@shop/components/Account/Container';
import AccountOrdersItem from '@shop/components/Account/Orders/Item';

const AccountOrdersPage = () => (
  <AccountContainer title="Orders">
    <div>
      <AccountOrdersItem />
      <AccountOrdersItem />
    </div>
  </AccountContainer>
);

export default AccountOrdersPage;
