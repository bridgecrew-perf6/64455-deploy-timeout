import CheckoutSummaryItem from '@shop/components/Checkout/Summary/Item';

const CheckoutSummaryItems = () => (
  <section className="uk-card-body">
    <h4>Items in order</h4>
    <CheckoutSummaryItem />
    <CheckoutSummaryItem />
  </section>
);

export default CheckoutSummaryItems;
