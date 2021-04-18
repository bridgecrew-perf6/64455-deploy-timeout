const CategoryFiltersType = () => (
  <section className="uk-card-body js-accordion-section uk-open">
    <h4 className="uk-accordion-title uk-margin-remove">
      Type
      <span
        className="tm-help-icon"
        uk-icon="icon: question; ratio: .75;"
        onClick={e => e.stopPropagation()}
      />
      <div
        className="uk-margin-remove"
        uk-drop="mode: click;boundary-align: true; boundary: !.uk-accordion-title; pos: bottom-justify;"
      >
        <div className="uk-card uk-card-body uk-card-default uk-card-small uk-box-shadow-xlarge uk-text-small">
          A small description for this property
        </div>
      </div>
    </h4>
    <div className="uk-accordion-content">
      <ul className="uk-list tm-scrollbox">
        <li>
          <input
            className="tm-checkbox"
            id="type-1"
            name="type"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="type-1">
            <span>
              Notebook
              <span className="uk-text-meta uk-text-xsmall">150</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="type-2"
            name="type"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="type-2">
            <span>
              Ultrabook
              <span className="uk-text-meta uk-text-xsmall">18</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="type-3"
            name="type"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="type-3">
            <span>
              Transformer
              <span className="uk-text-meta uk-text-xsmall">6</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersType;
