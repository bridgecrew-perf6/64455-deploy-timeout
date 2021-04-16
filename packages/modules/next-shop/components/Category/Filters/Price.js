const CategoryFiltersPrice = () => (
  <section className="uk-card-body uk-open js-accordion-section">
    <h4 className="uk-accordion-title uk-margin-remove">Prices</h4>
    <div className="uk-accordion-content">
      <div
        className="uk-grid-small uk-child-width-1-2 uk-text-small"
        uk-grid="true"
      >
        <div>
          <div className="uk-inline">
            <span className="uk-form-icon uk-text-xsmall">from</span>
            <input className="uk-input" type="text" placeholder="$59" />
          </div>
        </div>
        <div>
          <div className="uk-inline">
            <span className="uk-form-icon uk-text-xsmall">to</span>
            <input className="uk-input" type="text" placeholder="$6559" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CategoryFiltersPrice;
