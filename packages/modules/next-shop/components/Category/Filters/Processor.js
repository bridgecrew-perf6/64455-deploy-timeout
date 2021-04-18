const CategoryFiltersProcessor = () => (
  <section className="uk-card-body js-accordion-section">
    <h4 className="uk-accordion-title uk-margin-remove">
      CPU
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
            id="cpu-1"
            name="cpu"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="cpu-1">
            <span>
              AMD A-series
              <span className="uk-text-meta uk-text-xsmall">102</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-2"
            name="cpu"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="cpu-2">
            <span>
              AMD E-series
              <span className="uk-text-meta uk-text-xsmall">21</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-3"
            name="cpu"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="cpu-3">
            <span>
              AMD FX
              <span className="uk-text-meta uk-text-xsmall">1</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-4"
            name="cpu"
            defaultValue={4}
            type="checkbox"
          />
          <label htmlFor="cpu-4">
            <span>
              AMD Ryzen
              <span className="uk-text-meta uk-text-xsmall">1</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-5"
            name="cpu"
            defaultValue={5}
            type="checkbox"
          />
          <label htmlFor="cpu-5">
            <span>
              Intel Atom
              <span className="uk-text-meta uk-text-xsmall">8</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-6"
            name="cpu"
            defaultValue={6}
            type="checkbox"
          />
          <label htmlFor="cpu-6">
            <span>
              Intel Celeron
              <span className="uk-text-meta uk-text-xsmall">38</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-7"
            name="cpu"
            defaultValue={7}
            type="checkbox"
          />
          <label htmlFor="cpu-7">
            <span>
              Intel Core M<span className="uk-text-meta uk-text-xsmall">6</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-8"
            name="cpu"
            defaultValue={8}
            type="checkbox"
          />
          <label htmlFor="cpu-8">
            <span>
              Intel Core i3
              <span className="uk-text-meta uk-text-xsmall">143</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-9"
            name="cpu"
            defaultValue={9}
            type="checkbox"
          />
          <label htmlFor="cpu-9">
            <span>
              Intel Core i5
              <span className="uk-text-meta uk-text-xsmall">273</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-10"
            name="cpu"
            defaultValue={10}
            type="checkbox"
          />
          <label htmlFor="cpu-10">
            <span>
              Intel Core i7
              <span className="uk-text-meta uk-text-xsmall">218</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-11"
            name="cpu"
            defaultValue={11}
            type="checkbox"
          />
          <label htmlFor="cpu-11">
            <span>
              Intel Xeon
              <span className="uk-text-meta uk-text-xsmall">3</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="cpu-12"
            name="cpu"
            defaultValue={12}
            type="checkbox"
          />
          <label htmlFor="cpu-12">
            <span>
              Intel Pentium
              <span className="uk-text-meta uk-text-xsmall">86</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersProcessor;
