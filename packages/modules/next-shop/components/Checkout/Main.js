import { Link } from '@foundation/next';
import CheckoutForm from '@shop/components/Checkout/Form';
import CheckoutSummary from '@shop/components/Checkout/Summary';

const CheckoutMain = () => (
  <main>
    <section className="uk-section uk-section-small">
      <div className="uk-container">
        <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
          <section className="uk-text-center">
            <Link className="uk-link-muted uk-text-small" href="/cart">
              <span
                className="uk-margin-xsmall-right"
                uk-icon="icon: arrow-left; ratio: .75;"
              />
              Return to cart
            </Link>
            <h1 className="uk-margin-small-top uk-margin-remove-bottom">
              Checkout
            </h1>
          </section>
          <section>
            <div className="uk-grid-medium" uk-grid="true">
              {/* Form */}
              <CheckoutForm />
              {/* Checkout */}
              <CheckoutSummary />
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
);

export default CheckoutMain;
