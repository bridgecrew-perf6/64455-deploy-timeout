const CategoryFiltersHeader = () => (
  <header className="uk-card-header uk-flex uk-flex-middle">
    <div className="uk-grid-small uk-flex-1" uk-grid="true">
      <div className="uk-width-expand">
        <h3>Filters</h3>
      </div>
      <button className="uk-offcanvas-close" type="button" uk-close="true" />
    </div>
  </header>
);

export default CategoryFiltersHeader;
