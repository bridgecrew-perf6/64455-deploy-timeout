const ProductRating = () => (
  <div className="uk-flex uk-flex-middle">
    <ul className="uk-iconnav uk-margin-xsmall-bottom tm-rating">
      <li>
        <span className="uk-text-warning" uk-icon="star" />
      </li>
      <li>
        <span className="uk-text-warning" uk-icon="star" />
      </li>
      <li>
        <span className="uk-text-warning" uk-icon="star" />
      </li>
      <li>
        <span className="uk-text-warning" uk-icon="star" />
      </li>
      <li>
        <span className="uk-text-warning" uk-icon="star" />
      </li>
    </ul>
    <div className="uk-margin-xsmall-left">
      <a
        className="uk-text-meta js-scroll-to-description"
        href="#description"
        tmp-next-on-click="UIkit.switcher('.js-product-switcher').show(3);"
      >
        (2)
      </a>
    </div>
  </div>
);

export default ProductRating;
