import CommonNavbarMenuSearchItem from '@shop/components/Common/Navbar/Menu/Search/Item';
import CommonNavbarMenuSearchDropdown from '@shop/components/Common/Navbar/Menu/Search/Dropdown';
import CommonNavbarMenuCompareItem from '@shop/components/Common/Navbar/Menu/Compare/Item';
import CommonNavbarMenuUserItem from '@shop/components/Common/Navbar/Menu/User/Item';
import CommonNavbarMenuUserDropdown from '@shop/components/Common/Navbar/Menu/User/Dropdown';
import CommonNavbarMenuCartItem from '@shop/components/Common/Navbar/Menu/Cart/Item';

const CommonNavbarRight = () => (
  <div className="uk-navbar-right">
    {/* Search */}
    <CommonNavbarMenuSearchItem />
    <CommonNavbarMenuSearchDropdown />
    {/* Compare */}
    <CommonNavbarMenuCompareItem />
    {/* User */}
    <CommonNavbarMenuUserItem />
    <CommonNavbarMenuUserDropdown />
    {/* Cart */}
    <CommonNavbarMenuCartItem />
  </div>
);

export default CommonNavbarRight;
