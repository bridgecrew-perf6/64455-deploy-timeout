import CommonHeader from '@shop/components/Common/Header';
import AccountSidebar from '@shop/components/Account/Sidebar';
import Advantages from '@shop/components/Advantages';
import CommonFooter from '@shop/components/Common/Footer';
import OffcanvasNav from '@shop/components/Offcanvas/Nav';
import OffcanvasCart from '@shop/components/Offcanvas/Cart';

const AccountLayout = ({ children }) => (
  <div className="tm-page">
    <CommonHeader></CommonHeader>
    <main className="tm-page-main">
      <section className="uk-section uk-section-small">
        <div className="uk-container">
          <div className="uk-grid-medium" uk-grid="true">
            <AccountSidebar></AccountSidebar>
            {children}
          </div>
        </div>
      </section>
      <Advantages></Advantages>
    </main>
    <CommonFooter></CommonFooter>
    <OffcanvasNav></OffcanvasNav>
    <OffcanvasCart></OffcanvasCart>
  </div>
);

export default AccountLayout;
