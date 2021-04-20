import AccountSidebar from '@shop/components/Account/Sidebar';

const AccountLayout = ({ children }) => (
  <section
    className="uk-section uk-section-small"
    uk-height-viewport="expand: true"
  >
    <div className="uk-container">
      <div className="uk-grid-medium" uk-grid="true">
        <AccountSidebar />
        {children}
      </div>
    </div>
  </section>
);

export default AccountLayout;
