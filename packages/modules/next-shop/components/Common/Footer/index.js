import CommonFooterSideLeft from '@shop/components/Common/Footer/Side/Left';
import CommonFooterMain from '@shop/components/Common/Footer/Main';
import CommonFooterAddress from '@shop/components/Common/Footer/Address';
import CommonFooterSideRight from '@shop/components/Common/Footer/Side/Right';

const CommonFooter = () => (
  <footer className="tm-page-footer">
    <section className="uk-section uk-section-secondary uk-section-small uk-light">
      <div className="uk-container">
        <div
          className="uk-grid-medium uk-child-width-1-1 uk-child-width-1-4@m"
          uk-grid="true"
        >
          <CommonFooterSideLeft />
          <CommonFooterMain />
          <CommonFooterAddress />
          <CommonFooterSideRight />
        </div>
      </div>
    </section>
  </footer>
);

export default CommonFooter;
