const ProductVariant = () => (
  <div>
    <div className="uk-text-small uk-margin-xsmall-bottom">Color</div>
    <ul className="uk-subnav uk-subnav-pill tm-variations" uk-switcher="true">
      <li>
        <a className="tm-variation-color" uk-tooltip="Space Grey">
          <div
            style={{
              backgroundColor: '#aaaeb1',
            }}
          />
        </a>
      </li>
      <li>
        <a className="tm-variation-color" uk-tooltip="Silver">
          <div
            style={{
              backgroundColor: '#dddfde',
            }}
          />
        </a>
      </li>
    </ul>
  </div>
);

export default ProductVariant;
