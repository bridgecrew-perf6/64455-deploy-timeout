const ProductVariantColor = ({ title }) => (
  <div>
    <div className="uk-text-small uk-margin-xsmall-bottom">{title}</div>
    <div
      className="uk-grid uk-grid-xsmall tm-variations"
      uk-grid="true"
      uk-switcher="true"
    >
      <div>
        <a className="tm-pill tm-variation-color" uk-tooltip="Space Grey">
          <div
            style={{
              backgroundColor: '#aaaeb1',
            }}
          />
        </a>
      </div>
      <div>
        <a className="tm-pill tm-variation-color" uk-tooltip="Silver">
          <div
            style={{
              backgroundColor: '#dddfde',
            }}
          />
        </a>
      </div>
    </div>
  </div>
);

export default ProductVariantColor;
