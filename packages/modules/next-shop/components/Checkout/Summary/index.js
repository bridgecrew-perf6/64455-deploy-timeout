import CheckoutSummaryItems from '@shop/components/Checkout/Summary/Items';
import CheckoutSummaryInfo from '@shop/components/Checkout/Summary/Info';
import CheckoutSummarySubtotal from '@shop/components/Checkout/Summary/Subtotal';
import CheckoutSummaryTotal from '@shop/components/Checkout/Summary/Total';

const CheckoutSummary = () => (
  <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
    <div
      className="uk-card uk-card-default uk-card-small tm-ignore-container"
      uk-sticky="offset: 30; bottom: true; media: @m;"
    >
      <CheckoutSummaryItems />
      <CheckoutSummaryInfo />
      <CheckoutSummarySubtotal />
      <CheckoutSummaryTotal />
    </div>
  </div>
);

export default CheckoutSummary;
