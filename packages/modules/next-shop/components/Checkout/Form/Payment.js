const CheckoutFormPayment = () => (
  <section>
    <h2 className="tm-checkout-title">Payment</h2>
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <div className="uk-card-body">
        <div
          className="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-3@s uk-flex-center"
          uk-switcher="true"
          uk-grid="true"
        >
          <div>
            <a className="tm-choose" href="#">
              <div className="tm-choose-title">payment upon receipt</div>
              <div className="tm-choose-description">Cash, credit card</div>
            </a>
          </div>
          <div>
            <a className="tm-choose" href="#">
              <div className="tm-choose-title">online by card</div>
              <div className="tm-choose-description">Visa, MasterCard</div>
            </a>
          </div>
          <div>
            <a className="tm-choose" href="#">
              <div className="tm-choose-title">electronic payment</div>
              <div className="tm-choose-description">
                PayPal, Yandex.Money, QIWI
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="uk-card-footer">
        <div
          className="uk-grid-small uk-flex-middle uk-flex-center uk-text-center"
          uk-grid="true"
        >
          <div className="uk-text-meta">
            <span
              className="uk-margin-xsmall-right"
              uk-icon="icon: lock; ratio: .75;"
            />
            Security of payments is is provided by secure protocols
          </div>
          <div>
            <img
              src="/images/verified-by-visa.svg"
              title="Verified by Visa"
              style={{
                height: '25px',
              }}
            />
          </div>
          <div>
            <img
              src="/images/mastercard-securecode.svg"
              title="MasterCard SecureCode"
              style={{
                height: '25px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CheckoutFormPayment;
