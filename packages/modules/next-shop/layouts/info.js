import CommonHeader from '@shop/components/Common/Header';
import CommonHeading from '@shop/components/Common/Heading';
import Advantages from '@shop/components/Advantages';
import CommonFooter from '@shop/components/Common/Footer';
import OffcanvasNav from '@shop/components/Offcanvas/Nav';
import OffcanvasCart from '@shop/components/Offcanvas/Cart';

const LayoutsInfo = () => (
  <div className="tm-page">
    <CommonHeader></CommonHeader>
    <main className="tm-page-main">
      <section className="uk-section uk-section-small">
        <div className="uk-container">
          <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
            <CommonHeading></CommonHeading>
            <div className="tm-page-container">
              <div data-block="pages" />
            </div>
          </div>
        </div>
      </section>
      {/* Advantages */}
      <Advantages></Advantages>
    </main>
    <CommonFooter></CommonFooter>
    <OffcanvasNav></OffcanvasNav>
    <OffcanvasCart></OffcanvasCart>
  </div>
);

export default LayoutsInfo;
