import CommonFooterSideLeft from '@shop/components/Common/Footer/Side/Left';
import CommonFooterMain from '@shop/components/Common/Footer/Main';
import CommonFooterAddress from '@shop/components/Common/Footer/Address';
import CommonFooterSideRight from '@shop/components/Common/Footer/Side/Right';
import CommonFooterProviders from '@shop/components/Common/Footer/Providers';

const CommonFooter = () => (
  <footer className="tm-page-footer">
    <section
      className="uk-section uk-section-default uk-section-small"
      data-section="payment-providers"
    >
      <div className="uk-container uk-flex uk-flex-center">
        <CommonFooterProviders />
      </div>
    </section>
    <section
      className="uk-section uk-section-secondary uk-section-small uk-light uk-box-shadow-medium"
      data-section="page-footer"
    >
      <div className="uk-container">
        <div
          className="uk-grid-medium uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l"
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
