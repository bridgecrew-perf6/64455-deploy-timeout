const ProductVariantValue = ({ title }) => (
  <div>
    <div className="uk-text-small uk-margin-xsmall-bottom">{title}</div>
    <ul className="uk-subnav uk-subnav-pill tm-variations" uk-switcher="">
      <li aria-expanded="true" className="uk-active">
        <a>256 GB</a>
      </li>
      <li aria-expanded="false">
        <a>512 GB</a>
      </li>
    </ul>
  </div>
);

export default ProductVariantValue;
