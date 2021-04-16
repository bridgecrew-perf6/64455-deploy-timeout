const OffcanvasCartHeader = () => (
  <header className="uk-card-header uk-flex uk-flex-middle">
    <div className="uk-grid-small uk-flex-1" uk-grid="true">
      <div className="uk-width-expand">
        <div className="uk-h3">Cart</div>
      </div>
      <button className="uk-offcanvas-close" type="button" uk-close="true" />
    </div>
  </header>
);

export default OffcanvasCartHeader;
