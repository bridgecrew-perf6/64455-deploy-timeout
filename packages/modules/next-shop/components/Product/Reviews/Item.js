const ProductReviewsItem = () => (
  <article>
    <section className="uk-grid-small uk-child-width-1-1" uk-grid="true">
      <header>
        <div className="uk-h4 uk-margin-remove">Thomas Bruns</div>
        <time className="uk-text-meta">May 21, 2018</time>
      </header>
      <div>
        <ul className="uk-iconnav uk-margin-bottom tm-rating">
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
        <div>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div
          className="uk-grid-small uk-flex-middle uk-margin-top"
          uk-grid="true"
        >
          <div className="uk-text-meta">Was this review helpful to you?</div>
          <div>
            <button
              className="uk-button uk-button-default uk-button-small"
              type="button"
            >
              Yes<span className="uk-margin-xsmall-left uk-text-muted">14</span>
            </button>
            <button
              className="uk-button uk-button-default uk-button-small uk-margin-small-left"
              type="button"
            >
              No<span className="uk-margin-xsmall-left uk-text-muted">2</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </article>
);

export default ProductReviewsItem;
