const CheckoutSummaryTotal = () => (
  <section className="uk-card-body">
    <div className="uk-grid-small uk-flex-middle" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-text-muted">Total</div>
      </div>
      <div className="uk-text-right">
        <div className="uk-text-lead uk-text-bolder">$3119</div>
      </div>
    </div>
    <button
      className="uk-button uk-button-primary uk-margin-small uk-width-1-1"
      type="button"
    >
      checkout
    </button>
  </section>
);

export default CheckoutSummaryTotal;
