import AccountOrdersTable from '@shop/components/Account/Orders/Table';

const AccountOrdersItem = () => (
  <section className="uk-card-body">
    <h3>
      <a className="uk-link-heading" href="#">
        #36637649
        <span className="uk-text-muted uk-text-small">from June 17, 2018</span>
      </a>
    </h3>
    <AccountOrdersTable />
  </section>
);

export default AccountOrdersItem;
