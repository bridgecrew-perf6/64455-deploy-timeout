import CommonNavbarLeft from '@shop/components/Common/Navbar/Left';
import CommonNavbarRight from '@shop/components/Common/Navbar/Right';

const CommonNavbar = () => (
  <div
    className="uk-navbar-container tm-navbar-container"
    uk-sticky="cls-active: tm-navbar-container-fixed"
  >
    <div className="uk-container" uk-navbar="true">
      <CommonNavbarLeft />
      <CommonNavbarRight />
    </div>
  </div>
);

export default CommonNavbar;
