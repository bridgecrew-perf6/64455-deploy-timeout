import CommonHeader from '@shop/components/Common/Header';
import CommonFooter from '@shop/components/Common/Footer';
import OffcanvasNav from '@shop/components/Offcanvas/Nav';

import { SnipcartContainer } from '@shop/components/Snipcart';

const CommonLayout = ({ children }) => {
  return (
    <div className="tm-page">
      <CommonHeader />
      <main className="tm-page-main">{children}</main>
      <CommonFooter />
      <OffcanvasNav />
      <SnipcartContainer />
    </div>
  );
};

export default CommonLayout;
