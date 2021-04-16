import CommonNavbarMenuPagesDropdown from '@shop/components/Common/Navbar/Menu/Pages/Dropdown';

const CommonNavbarMenuPagesItem = () => (
  <li>
    <a href="#">
      Pages
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </a>
    <CommonNavbarMenuPagesDropdown></CommonNavbarMenuPagesDropdown>
  </li>
);

export default CommonNavbarMenuPagesItem;
