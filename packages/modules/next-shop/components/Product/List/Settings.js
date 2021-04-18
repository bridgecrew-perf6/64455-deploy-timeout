const ProductListSettings = ({ mode, setMode }) => {
  return (
    <div className="uk-card-header">
      <div className="uk-grid-small uk-flex-middle" uk-grid="true">
        {/* Sorting */}
        <div className="uk-width-1-1 uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small">
          <span className="uk-margin-small-right uk-text-muted">Sort by:</span>
          <ul className="uk-subnav uk-margin-remove">
            <li className="uk-active uk-padding-remove">
              <a className="uk-text-lowercase" href="#">
                relevant
                <span
                  className="uk-margin-xsmall-left"
                  uk-icon="icon: chevron-down; ratio: .5;"
                />
              </a>
            </li>
            <li>
              <a className="uk-text-lowercase" href="#">
                price
              </a>
            </li>
            <li>
              <a className="uk-text-lowercase" href="#">
                newest
              </a>
            </li>
          </ul>
        </div>
        {/* Filters button & change view */}
        <div className="uk-width-1-1 uk-width-auto@s uk-flex uk-flex-center uk-flex-middle">
          {/* Filters button */}
          <button
            className="uk-button uk-button-default uk-button-small uk-hidden@m"
            uk-toggle="target: #filters"
            type="button"
          >
            <span
              className="uk-margin-xsmall-right"
              uk-icon="icon: settings; ratio: .75;"
            />
            Filters
          </button>
          {/* Change view */}
          <div className="tm-change-view uk-margin-small-left">
            <ul className="uk-subnav uk-iconnav">
              <li className={mode === 'grid' ? 'uk-active' : null}>
                <a
                  uk-icon="grid"
                  uk-tooltip="Grid"
                  onClick={() => setMode('grid')}
                />
              </li>
              <li className={mode === 'list' ? 'uk-active' : null}>
                <a
                  uk-icon="list"
                  uk-tooltip="List"
                  onClick={() => setMode('list')}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSettings;
