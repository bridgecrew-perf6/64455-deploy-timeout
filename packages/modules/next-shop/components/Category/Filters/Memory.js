const CategoryFiltersMemory = () => (
  <section className="uk-card-body js-accordion-section">
    <h4 className="uk-accordion-title uk-margin-remove">
      RAM
      <span
        className="tm-help-icon"
        uk-icon="icon: question; ratio: .75;"
        tmp-next-on-click="event.stopPropagation();"
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
            id="ram-1"
            name="ram"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="ram-1">
            <span>
              2 GB
              <span className="uk-text-meta uk-text-xsmall">17</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-2"
            name="ram"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="ram-2">
            <span>
              4 GB
              <span className="uk-text-meta uk-text-xsmall">359</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-3"
            name="ram"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="ram-3">
            <span>
              6 GB
              <span className="uk-text-meta uk-text-xsmall">81</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-4"
            name="ram"
            defaultValue={4}
            type="checkbox"
          />
          <label htmlFor="ram-4">
            <span>
              8 GB
              <span className="uk-text-meta uk-text-xsmall">346</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-5"
            name="ram"
            defaultValue={5}
            type="checkbox"
          />
          <label htmlFor="ram-5">
            <span>
              12 GB
              <span className="uk-text-meta uk-text-xsmall">13</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-6"
            name="ram"
            defaultValue={6}
            type="checkbox"
          />
          <label htmlFor="ram-6">
            <span>
              16 GB
              <span className="uk-text-meta uk-text-xsmall">72</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-7"
            name="ram"
            defaultValue={7}
            type="checkbox"
          />
          <label htmlFor="ram-7">
            <span>
              24 GB
              <span className="uk-text-meta uk-text-xsmall">1</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="ram-8"
            name="ram"
            defaultValue={8}
            type="checkbox"
          />
          <label htmlFor="ram-8">
            <span>
              32 GB
              <span className="uk-text-meta uk-text-xsmall">11</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersMemory;
