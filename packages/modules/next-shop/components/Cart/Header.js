const CartHeader = () => (
  <header className="uk-card-header uk-text-uppercase uk-text-muted uk-text-center uk-text-small uk-visible@m">
    <div className="uk-grid-small uk-child-width-1-2" uk-grid="true">
      {/* Product cell */}
      <div>product</div>
      {/* Other cells */}
      <div>
        <div className="uk-grid-small uk-child-width-expand" uk-grid="true">
          <div>price</div>
          <div className="tm-quantity-column">quantity</div>
          <div>sum</div>
          <div className="uk-width-auto">
            <div
              style={{
                width: '20px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default CartHeader;
