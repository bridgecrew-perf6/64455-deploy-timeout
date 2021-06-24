const ProductVariantValue = ({ title }) => (
  <div>
    <div className="uk-text-small uk-margin-xsmall-bottom">{title}</div>
    <div
      className="uk-grid uk-grid-xsmall tm-variations"
      uk-grid="true"
      uk-switcher="true"
    >
      <div>
        <div className="tm-pill tm-variation-value">
          <a>256 GB</a>
        </div>
      </div>
      <div>
        <div className="tm-pill tm-variation-value">
          <a>512 GB</a>
        </div>
      </div>
    </div>
  </div>
);

export default ProductVariantValue;
