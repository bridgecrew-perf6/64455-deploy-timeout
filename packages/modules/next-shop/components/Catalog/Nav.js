const CatalogNav = () => (
  <aside className="uk-width-1-4 uk-visible@m tm-aside-column">
    <nav
      className="uk-card uk-card-default uk-card-body uk-card-small"
      uk-sticky="bottom: true; offset: 90"
    >
      <ul
        className="uk-nav uk-nav-default"
        uk-scrollspy-nav="closest: li; scroll: true; offset: 90"
      >
        <li>
          <a href="#laptops-tablets">Laptops & Tablets</a>
        </li>
        <li>
          <a href="#phones-gadgets">Phones & Gadgets</a>
        </li>
        <li>
          <a href="#tv-video">TV & Video</a>
        </li>
        <li>
          <a href="#games-entertainment">Games & Entertainment</a>
        </li>
        <li>
          <a href="#photo">Photo</a>
        </li>
      </ul>
    </nav>
  </aside>
);

export default CatalogNav;
