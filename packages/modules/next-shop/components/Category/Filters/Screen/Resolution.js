const CategoryFiltersScreenResolution = () => (
  <section className="uk-card-body js-accordion-section">
    <h4 className="uk-accordion-title uk-margin-remove">
      Screen Resolution
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
            id="screen-resolution-1"
            name="screen-resolution"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-1">
            <span>
              3840×2160
              <span className="uk-text-meta uk-text-xsmall">12</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-2"
            name="screen-resolution"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-2">
            <span>
              3200×1800"
              <span className="uk-text-meta uk-text-xsmall">12</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-3"
            name="screen-resolution"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-3">
            <span>
              2880×1800
              <span className="uk-text-meta uk-text-xsmall">10</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-4"
            name="screen-resolution"
            defaultValue={4}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-4">
            <span>
              2560×1600
              <span className="uk-text-meta uk-text-xsmall">7</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-5"
            name="screen-resolution"
            defaultValue={5}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-5">
            <span>
              2560×1440
              <span className="uk-text-meta uk-text-xsmall">13</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-6"
            name="screen-resolution"
            defaultValue={6}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-6">
            <span>
              1920×1080
              <span className="uk-text-meta uk-text-xsmall">341</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-7"
            name="screen-resolution"
            defaultValue={7}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-7">
            <span>
              1600×900
              <span className="uk-text-meta uk-text-xsmall">11</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-8"
            name="screen-resolution"
            defaultValue={8}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-8">
            <span>
              1440×900
              <span className="uk-text-meta uk-text-xsmall">13</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-9"
            name="screen-resolution"
            defaultValue={9}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-9">
            <span>
              1366×768
              <span className="uk-text-meta uk-text-xsmall">237</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="screen-resolution-10"
            name="screen-resolution"
            defaultValue={10}
            type="checkbox"
          />
          <label htmlFor="screen-resolution-10">
            <span>
              1024×600
              <span className="uk-text-meta uk-text-xsmall">5</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersScreenResolution;
