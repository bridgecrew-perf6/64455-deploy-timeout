const CommonNavbarMenuSearchDropdown = () => (
  <div
    className="uk-navbar-dropdown uk-padding-small uk-margin-remove"
    uk-drop="mode: click;cls-drop: uk-navbar-dropdown;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
  >
    <div className="uk-container">
      <div className="uk-grid-small uk-flex-middle" uk-grid="true">
        <div className="uk-width-expand">
          <form className="uk-search uk-search-navbar uk-width-1-1">
            <input
              className="uk-search-input"
              type="search"
              placeholder="Search"
              autoFocus
            />
          </form>
        </div>
        <div className="uk-width-auto">
          <a className="uk-navbar-dropdown-close" href="#" uk-close="true" />
        </div>
      </div>
    </div>
  </div>
);

export default CommonNavbarMenuSearchDropdown;
