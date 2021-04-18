const CategoryFiltersScreenSize = () => (
  <section className="uk-card-body js-accordion-section">
    <h4 className="uk-accordion-title uk-margin-remove">
      Screen Size
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
            id="screen-size-1"
            name="screen-size"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="screen-size-1">
            <span>
              11.6" and smaller
              <span className="uk-text-meta uk-text-xsmall">45</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-size-2"
            name="screen-size"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="screen-size-2">
            <span>
              12" - 13.5"
              <span className="uk-text-meta uk-text-xsmall">178</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-size-3"
            name="screen-size"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="screen-size-3">
            <span>
              14" - 14.5"
              <span className="uk-text-meta uk-text-xsmall">461</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-size-4"
            name="screen-size"
            defaultValue={4}
            type="checkbox"
          />
          <label htmlFor="screen-size-4">
            <span>
              15" - 15.6"
              <span className="uk-text-meta uk-text-xsmall">148</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-size-5"
            name="screen-size"
            defaultValue={5}
            type="checkbox"
          />
          <label htmlFor="screen-size-5">
            <span>
              17" - 17.3"
              <span className="uk-text-meta uk-text-xsmall">73</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-size-6"
            name="screen-size"
            defaultValue={6}
            type="checkbox"
          />
          <label htmlFor="screen-size-6">
            <span>
              18.4" and larger
              <span className="uk-text-meta uk-text-xsmall">54</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersScreenSize;
