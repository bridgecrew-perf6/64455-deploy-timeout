const CartFooter = () => (
  <div className="uk-card-footer">
    <label>
      <span className="uk-form-label uk-margin-small-right">Promo Code</span>
      <div className="uk-inline">
        <a
          className="uk-form-icon uk-form-icon-flip"
          href="#"
          uk-icon="arrow-right"
        />
        <input className="uk-input uk-form-width-small" type="text" />
      </div>
    </label>
  </div>
);

export default CartFooter;
