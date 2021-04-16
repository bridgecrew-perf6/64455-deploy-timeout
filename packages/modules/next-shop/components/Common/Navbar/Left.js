import CommonNavbarLogo from '@shop/components/Common/Navbar/Logo';
import CommonNavbarMenu from '@shop/components/Common/Navbar/Menu';

const CommonNavbarLeft = () => (
  <div className="uk-navbar-left">
    {/* Hamburger */}
    <button
      className="uk-navbar-toggle uk-hidden@m"
      uk-toggle="target: #nav-offcanvas"
      uk-navbar-toggle-icon="true"
      type="button"
    />
    {/* Logo */}
    <CommonNavbarLogo />
    {/* Navigation */}
    <nav className="uk-visible@m">
      <CommonNavbarMenu />
    </nav>
  </div>
);

export default CommonNavbarLeft;
