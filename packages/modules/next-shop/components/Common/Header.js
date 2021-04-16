import CommonToolbar from '@shop/components/Common/Toolbar';
import CommonNavbar from '@shop/components/Common/Navbar';

const CommonHeader = () => (
  <header className="tm-page-header">
    <div className="uk-navbar-container uk-light uk-visible@m tm-toolbar-container">
      <CommonToolbar />
    </div>
    <CommonNavbar />
  </header>
);

export default CommonHeader;
