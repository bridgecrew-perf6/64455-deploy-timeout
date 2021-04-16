const CategoryFiltersBrand = () => (
  <section className="uk-card-body js-accordion-section uk-open">
    <h4 className="uk-accordion-title uk-margin-remove">Brands</h4>
    <div className="uk-accordion-content">
      <ul className="uk-list tm-scrollbox">
        <li>
          <input
            className="tm-checkbox"
            id="brand-1"
            name="brand"
            defaultValue={1}
            type="checkbox"
          />
          <label htmlFor="brand-1">
            <span>
              Acer
              <span className="uk-text-meta uk-text-xsmall">177</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-2"
            name="brand"
            defaultValue={2}
            type="checkbox"
          />
          <label htmlFor="brand-2">
            <span>
              Apple
              <span className="uk-text-meta uk-text-xsmall">18</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-3"
            name="brand"
            defaultValue={3}
            type="checkbox"
          />
          <label htmlFor="brand-3">
            <span>
              ASUS
              <span className="uk-text-meta uk-text-xsmall">150</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-4"
            name="brand"
            defaultValue={4}
            type="checkbox"
          />
          <label htmlFor="brand-4">
            <span>
              Dell
              <span className="uk-text-meta uk-text-xsmall">170</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-5"
            name="brand"
            defaultValue={5}
            type="checkbox"
          />
          <label htmlFor="brand-5">
            <span>
              HP
              <span className="uk-text-meta uk-text-xsmall">498</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-6"
            name="brand"
            defaultValue={6}
            type="checkbox"
          />
          <label htmlFor="brand-6">
            <span>
              MSI
              <span className="uk-text-meta uk-text-xsmall">54</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-7"
            name="brand"
            defaultValue={7}
            type="checkbox"
          />
          <label htmlFor="brand-7">
            <span>
              Samsung
              <span className="uk-text-meta uk-text-xsmall">1</span>
            </span>
          </label>
        </li>
        <li>
          <input
            className="tm-checkbox"
            id="brand-8"
            name="brand"
            defaultValue={8}
            type="checkbox"
          />
          <label htmlFor="brand-8">
            <span>
              Sony
              <span className="uk-text-meta uk-text-xsmall">1</span>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </section>
);

export default CategoryFiltersBrand;
