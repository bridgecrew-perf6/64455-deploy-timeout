const CheckoutSummaryInfo = () => (
  <section className="uk-card-body">
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-text-muted">Shipping</div>
      </div>
      <div className="uk-text-right">
        <div>Pick up from store</div>
        <div className="uk-text-meta">Free, tomorrow</div>
      </div>
    </div>
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-text-muted">Payment</div>
      </div>
      <div className="uk-text-right">
        <div>Online by card</div>
      </div>
    </div>
  </section>
);

export default CheckoutSummaryInfo;
