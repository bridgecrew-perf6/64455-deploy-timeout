const ProductInfoDelivery = () => (
  <div className="uk-margin">
    <div className="uk-padding-small uk-background-muted uk-border-rounded">
      <div
        className="uk-grid-small uk-child-width-1-1 uk-text-small"
        uk-grid="true"
      >
        {/* Delivery */}
        <div>
          <div className="uk-grid-collapse" uk-grid="true">
            <span className="uk-margin-xsmall-right" uk-icon="cart" />
            <div>
              <div className="uk-text-bolder">Delivery</div>
              <div className="uk-text-xsmall uk-text-muted">
                In stock, free, tomorrow
              </div>
            </div>
          </div>
        </div>
        {/* Pick up */}
        <div>
          <div className="uk-grid-collapse" uk-grid="true">
            <span className="uk-margin-xsmall-right" uk-icon="location" />
            <div>
              <div className="uk-text-bolder">Pick up from store</div>
              <div className="uk-text-xsmall uk-text-muted">
                In stock, free, tomorrow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductInfoDelivery;
