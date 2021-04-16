const CheckoutSummarySubtotal = () => (
  <section className="uk-card-body">
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-text-muted">Subtotal</div>
      </div>
      <div className="uk-text-right">
        <div>$3148</div>
      </div>
    </div>
    <div className="uk-grid-small" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-text-muted">Discount</div>
      </div>
      <div className="uk-text-right">
        <div className="uk-text-danger">−$29</div>
      </div>
    </div>
  </section>
);

export default CheckoutSummarySubtotal;
