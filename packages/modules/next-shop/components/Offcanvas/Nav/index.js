import OffcanvasNavHeader from '@shop/components/Offcanvas/Nav/Header';
import OffcanvasNavMenu from '@shop/components/Offcanvas/Nav/Menu';
import OffcanvasNavToolbar from '@shop/components/Offcanvas/Nav/Toolbar';
import OffcanvasNavSocial from '@shop/components/Offcanvas/Nav/Social';

const OffcanvasNav = () => (
  <div id="nav-offcanvas" uk-offcanvas="overlay: true">
    <aside className="uk-offcanvas-bar uk-padding-remove">
      <div className="uk-card uk-card-default uk-card-small tm-shadow-remove">
        <OffcanvasNavHeader></OffcanvasNavHeader>
        <OffcanvasNavMenu></OffcanvasNavMenu>
        <OffcanvasNavToolbar></OffcanvasNavToolbar>
        <OffcanvasNavSocial></OffcanvasNavSocial>
      </div>
    </aside>
  </div>
);

export default OffcanvasNav;
