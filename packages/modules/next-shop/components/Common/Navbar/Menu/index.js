import CommonNavbarMenuCatalogItem from '@shop/components/Common/Navbar/Menu/Catalog/Item';
import CommonNavbarMenuBrandsItem from '@shop/components/Common/Navbar/Menu/Brands/Item';
import CommonNavbarMenuPagesItem from '@shop/components/Common/Navbar/Menu/Pages/Item';
import CommonNavbarMenuBlogItem from '@shop/components/Common/Navbar/Menu/Blog/Item';
import CommonNavbarMenuAboutItem from '@shop/components/Common/Navbar/Menu/About/Item';
import CommonNavbarMenuContactsItem from '@shop/components/Common/Navbar/Menu/Contacts/Item';

const CommonNavbarMenu = () => (
  <ul className="uk-navbar-nav">
    <CommonNavbarMenuCatalogItem></CommonNavbarMenuCatalogItem>
    <CommonNavbarMenuBrandsItem></CommonNavbarMenuBrandsItem>
    <CommonNavbarMenuPagesItem></CommonNavbarMenuPagesItem>
    <CommonNavbarMenuBlogItem></CommonNavbarMenuBlogItem>
    <CommonNavbarMenuAboutItem></CommonNavbarMenuAboutItem>
    <CommonNavbarMenuContactsItem></CommonNavbarMenuContactsItem>
  </ul>
);

export default CommonNavbarMenu;
