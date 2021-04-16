const ProductInfoProperties = () => (
  <div className="uk-margin">
    <ul className="uk-list uk-text-small uk-margin-remove">
      <li>
        <span className="uk-text-muted">Diagonal display: </span>
        <span>15.4"</span>
      </li>
      <li>
        <span className="uk-text-muted">CPU: </span>
        <span>Intel® Core™ i7</span>
      </li>
      <li>
        <span className="uk-text-muted">RAM: </span>
        <span>16 GB</span>
      </li>
      <li>
        <span className="uk-text-muted">Video Card: </span>
        <span>AMD Radeon Pro 555</span>
      </li>
    </ul>
    <div className="uk-margin-small-top">
      <a
        className="uk-link-heading js-scroll-to-description"
        href="#description"
        tmp-next-on-click="UIkit.switcher('.js-product-switcher').show(1);"
      >
        <span className="tm-pseudo">Detailed specifications</span>
        <span
          className="uk-margin-xsmall-left"
          uk-icon="icon: chevron-down; ratio: .75;"
        />
      </a>
    </div>
  </div>
);

export default ProductInfoProperties;
