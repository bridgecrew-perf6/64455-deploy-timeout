import AccountOrders from '@shop/components/Account/Orders';

const AccountPage = () => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <header className="uk-card-header">
        <h1 className="uk-h2">Orders</h1>
      </header>
      <AccountOrders />
    </div>
  </div>
);

export default AccountPage;
