import CommonHeader from '@shop/components/Common/Header';
import Advantages from '@shop/components/Advantages';
import CommonFooter from '@shop/components/Common/Footer';
import OffcanvasNav from '@shop/components/Offcanvas/Nav';
import OffcanvasCart from '@shop/components/Offcanvas/Cart';

const DefaultLayout = ({ children }) => (
  <div className="tm-page">
    <CommonHeader></CommonHeader>
    <main className="tm-page-main">
      {children}
      <Advantages></Advantages>
    </main>
    <CommonFooter></CommonFooter>
    <OffcanvasNav></OffcanvasNav>
    <OffcanvasCart></OffcanvasCart>
  </div>
);

export default DefaultLayout;
